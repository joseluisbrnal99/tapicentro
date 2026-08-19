// store.js — almacenamiento simple basado en un archivo JSON (sin dependencias externas).
// Usa el mismo formato que el botón "Exportar datos" de Bitácora, así que el archivo
// data.json de este servidor es, en esencia, un "export" de Bitácora que vive siempre
// actualizado en el servidor en vez de en la memoria del navegador.

const fs = require("fs");
const path = require("path");

const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, "data.json");

const EMPTY_DB = {
  contacts: [],
  companies: [],
  deals: [],
  tasks: [],
  payments: [],
  waConversations: {} // por número de teléfono: { state, data, contactId, updatedAt }
};

function load() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Object.assign({}, EMPTY_DB, parsed);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error("No se pudo leer data.json, iniciando vacío:", err.message);
    }
    return JSON.parse(JSON.stringify(EMPTY_DB));
  }
}

let db = load();
let saveTimer = null;

function saveNow() {
  const tmpFile = DATA_FILE + ".tmp";
  fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2));
  fs.renameSync(tmpFile, DATA_FILE);
}

// Guarda de forma "debounced" (agrupa escrituras que ocurren muy seguido) para no
// golpear el disco en cada tecla, pero sin arriesgar perder datos por mucho tiempo.
function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(function () {
    saveTimer = null;
    try {
      saveNow();
    } catch (err) {
      console.error("Error guardando data.json:", err.message);
    }
  }, 150);
}

function nextId(prefix) {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function nowISO() {
  return new Date().toISOString();
}
function todayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

const KINDS = ["contacts", "companies", "deals", "tasks", "payments"];

function list(kind) {
  assertKind(kind);
  return db[kind].slice();
}

function get(kind, id) {
  assertKind(kind);
  return db[kind].find(function (x) { return x.id === id; }) || null;
}

function insert(kind, obj) {
  assertKind(kind);
  const record = Object.assign({ id: nextId(kind.slice(0, -1)), createdAt: nowISO() }, obj);
  db[kind].push(record);
  scheduleSave();
  return record;
}

function update(kind, id, patch) {
  assertKind(kind);
  const record = db[kind].find(function (x) { return x.id === id; });
  if (!record) return null;
  Object.assign(record, patch);
  scheduleSave();
  return record;
}

function remove(kind, id) {
  assertKind(kind);
  const before = db[kind].length;
  db[kind] = db[kind].filter(function (x) { return x.id !== id; });
  if (kind === "contacts") {
    // limpia referencias huérfanas, igual que hace Bitácora en el navegador
    db.deals.forEach(function (d) { if (d.contactId === id) d.contactId = ""; });
    db.tasks.forEach(function (t) {
      if (Array.isArray(t.relatedContactIds)) {
        t.relatedContactIds = t.relatedContactIds.filter(function (cid) { return cid !== id; });
      }
    });
    db.payments.forEach(function (p) { if (p.contactId === id) p.contactId = ""; });
  }
  scheduleSave();
  return db[kind].length < before;
}

function assertKind(kind) {
  if (KINDS.indexOf(kind) === -1) throw new Error("Tipo de dato desconocido: " + kind);
}

function all() {
  return {
    contacts: db.contacts,
    companies: db.companies,
    deals: db.deals,
    tasks: db.tasks,
    payments: db.payments
  };
}

function findContactByPhone(phone) {
  return db.contacts.find(function (c) { return c.phone && normalizePhone(c.phone) === normalizePhone(phone); }) || null;
}

function normalizePhone(p) {
  return String(p || "").replace(/[^\d]/g, "").slice(-10); // compara por los últimos 10 dígitos
}

function getConversation(phone) {
  return db.waConversations[phone] || null;
}
function setConversation(phone, convo) {
  db.waConversations[phone] = Object.assign({}, convo, { updatedAt: nowISO() });
  scheduleSave();
}
function clearConversation(phone) {
  delete db.waConversations[phone];
  scheduleSave();
}

module.exports = {
  list, get, insert, update, remove, all, saveNow,
  nextId, nowISO, todayISO,
  findContactByPhone, normalizePhone,
  getConversation, setConversation, clearConversation
};
