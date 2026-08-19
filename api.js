// api.js — endpoints REST que usa Bitácora ("modo conectado") para leer/escribir
// datos en el servidor en vez de mantenerlos solo en memoria del navegador.

const crypto = require("crypto");
const store = require("./store");

const KINDS = ["contacts", "companies", "deals", "tasks", "payments"];

// --- sesiones muy simples (sin base de datos de usuarios: un solo dueño/negocio) ---
const sessions = new Set();
const loginAttempts = new Map(); // ip -> { count, resetAt }

function isRateLimited(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  entry.count++;
  return entry.count > 8;
}

function login(body, ip) {
  if (isRateLimited(ip)) {
    return { status: 429, json: { error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." } };
  }
  const expected = process.env.ADMIN_PASSWORD || "";
  const given = (body && body.password) || "";
  if (!expected) {
    return { status: 500, json: { error: "El servidor no tiene configurada ADMIN_PASSWORD." } };
  }
  const a = Buffer.from(String(given));
  const b = Buffer.from(String(expected));
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!match) return { status: 401, json: { error: "Contraseña incorrecta." } };
  const token = crypto.randomBytes(24).toString("hex");
  sessions.add(token);
  return { status: 200, json: { token: token } };
}

function isAuthed(req) {
  const header = req.headers["authorization"] || "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token && sessions.has(token);
}

function handleAll() {
  return { status: 200, json: store.all() };
}

function handleList(kind) {
  return { status: 200, json: store.list(kind) };
}

function handleCreate(kind, body) {
  const record = store.insert(kind, sanitize(kind, body));
  return { status: 201, json: record };
}

function handleUpdate(kind, id, body) {
  const record = store.update(kind, id, sanitize(kind, body));
  if (!record) return { status: 404, json: { error: "No encontrado" } };
  return { status: 200, json: record };
}

function handleDelete(kind, id) {
  const ok = store.remove(kind, id);
  if (!ok) return { status: 404, json: { error: "No encontrado" } };
  return { status: 200, json: { ok: true } };
}

// Evita que el cliente sobrescriba id/createdAt vía el body.
function sanitize(kind, body) {
  const clean = Object.assign({}, body);
  delete clean.id;
  delete clean.createdAt;
  return clean;
}

module.exports = { KINDS, login, isAuthed, handleAll, handleList, handleCreate, handleUpdate, handleDelete };
