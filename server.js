// server.js — servidor HTTP sin dependencias externas (solo módulos nativos de Node).
// Sirve: la Bitácora (frontend estático), la API REST del CRM, y el webhook de WhatsApp.

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

loadDotEnvIfPresent();

const api = require("./api");
const wa = require("./whatsapp");
const bot = require("./bot");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

function loadDotEnvIfPresent() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  lines.forEach(function (line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eq = trimmed.indexOf("=");
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    var val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  });
}

function readJsonBody(req) {
  return new Promise(function (resolve, reject) {
    var chunks = [];
    var size = 0;
    req.on("data", function (chunk) {
      size += chunk.length;
      if (size > 10 * 1024 * 1024) { // 10MB máx (fotos van como dataURL base64)
        reject(new Error("Cuerpo demasiado grande"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", function () {
      const raw = Buffer.concat(chunks);
      resolve({ raw: raw, text: raw.toString("utf8") });
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  });
  res.end(body);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function serveStatic(req, res, pathname) {
  var relPath = pathname === "/" ? "/bitacora.html" : pathname;
  const filePath = path.join(PUBLIC_DIR, path.normalize(relPath).replace(/^(\.\.[/\\])+/, ""));
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end("Prohibido"); }
  fs.readFile(filePath, function (err, data) {
    if (err) { res.writeHead(404); return res.end("No encontrado"); }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const API_ROUTE = /^\/api\/([a-zA-Z]+)(?:\/([^/]+))?\/?$/;

async function handleApi(req, res, pathname, query) {
  if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }

  if (pathname === "/api/config" && req.method === "GET") {
    return sendJson(res, 200, { connected: true, name: "CRM - Tapicentro" });
  }

  if (pathname === "/api/login" && req.method === "POST") {
    const body = await readJsonBody(req);
    var parsed = {};
    try { parsed = JSON.parse(body.text || "{}"); } catch (e) {}
    const ip = req.socket.remoteAddress || "unknown";
    const result = api.login(parsed, ip);
    return sendJson(res, result.status, result.json);
  }

  // todo lo demás bajo /api/ requiere sesión iniciada
  if (!api.isAuthed(req)) {
    return sendJson(res, 401, { error: "No autorizado. Inicia sesión." });
  }

  if (pathname === "/api/all" && req.method === "GET") {
    const result = api.handleAll();
    return sendJson(res, result.status, result.json);
  }

  const match = pathname.match(API_ROUTE);
  if (!match) return sendJson(res, 404, { error: "Ruta no encontrada" });
  const kind = match[1];
  const id = match[2];
  if (api.KINDS.indexOf(kind) === -1) return sendJson(res, 404, { error: "Tipo desconocido: " + kind });

  if (req.method === "GET" && !id) {
    return sendJson(res, 200, api.handleList(kind).json);
  }
  if (req.method === "POST" && !id) {
    const body = await readJsonBody(req);
    var data = {};
    try { data = JSON.parse(body.text || "{}"); } catch (e) { return sendJson(res, 400, { error: "JSON inválido" }); }
    const result = api.handleCreate(kind, data);
    return sendJson(res, result.status, result.json);
  }
  if (req.method === "PUT" && id) {
    const body = await readJsonBody(req);
    var data2 = {};
    try { data2 = JSON.parse(body.text || "{}"); } catch (e) { return sendJson(res, 400, { error: "JSON inválido" }); }
    const result = api.handleUpdate(kind, id, data2);
    return sendJson(res, result.status, result.json);
  }
  if (req.method === "DELETE" && id) {
    const result = api.handleDelete(kind, id);
    return sendJson(res, result.status, result.json);
  }
  return sendJson(res, 405, { error: "Método no permitido" });
}

async function handleWebhook(req, res, pathname, query) {
  if (pathname !== "/webhook/whatsapp") { res.writeHead(404); return res.end(); }

  if (req.method === "GET") {
    const challenge = wa.verifyWebhookSubscription(query);
    if (challenge !== null) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end(challenge);
    }
    res.writeHead(403);
    return res.end("Verificación fallida");
  }

  if (req.method === "POST") {
    const body = await readJsonBody(req);
    const signature = req.headers["x-hub-signature-256"];
    if (!wa.verifySignature(body.raw, signature)) {
      console.warn("[webhook] firma inválida — mensaje rechazado");
      res.writeHead(401);
      return res.end();
    }
    var payload = {};
    try { payload = JSON.parse(body.text); } catch (e) {}
    const messages = wa.parseIncomingMessages(payload);
    // Responde 200 de inmediato (Meta espera respuesta rápida) y procesa después.
    res.writeHead(200);
    res.end("EVENT_RECEIVED");
    for (const m of messages) {
      try {
        if (m.hasMedia) {
          const reply = "Por ahora solo puedo leer mensajes de texto 🙏. ¿Me lo puedes escribir con palabras?";
          await wa.sendText(m.from, reply);
          continue;
        }
        const reply = await bot.handleIncomingMessage(m.from, m.text, m.name);
        await wa.sendText(m.from, reply);
      } catch (err) {
        console.error("[bot] error procesando mensaje:", err);
      }
    }
    return;
  }

  res.writeHead(405);
  res.end();
}

const server = http.createServer(async function (req, res) {
  try {
    const parsed = url.parse(req.url, true);
    const pathname = decodeURIComponent(parsed.pathname);
    if (pathname.startsWith("/webhook/")) return await handleWebhook(req, res, pathname, parsed.query);
    if (pathname.startsWith("/api/")) return await handleApi(req, res, pathname, parsed.query);
    return serveStatic(req, res, pathname);
  } catch (err) {
    console.error("Error no manejado:", err);
    try { sendJson(res, 500, { error: "Error interno del servidor" }); } catch (e) {}
  }
});

server.listen(PORT, function () {
  console.log("CRM - Tapicentro escuchando en el puerto " + PORT);
  if (!process.env.ADMIN_PASSWORD) console.warn("⚠️  ADMIN_PASSWORD no está configurada — nadie podrá iniciar sesión en el CRM.");
  if (!process.env.WHATSAPP_VERIFY_TOKEN) console.warn("⚠️  WHATSAPP_VERIFY_TOKEN no está configurada — Meta no podrá verificar el webhook.");
  if (!process.env.WHATSAPP_APP_SECRET) console.warn("⚠️  WHATSAPP_APP_SECRET no está configurada — se rechazarán todos los webhooks entrantes.");
  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) console.warn("⚠️  WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID no configurados — el bot no podrá responder mensajes.");
});

module.exports = server;
