// whatsapp.js — cliente mínimo para la API de WhatsApp Cloud (Meta), sin dependencias externas.
// Docs oficiales: https://developers.facebook.com/docs/whatsapp/cloud-api

const crypto = require("crypto");

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v20.0";

function verifyWebhookSubscription(query) {
  // Meta llama a GET /webhook/whatsapp?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...
  // cuando configuras la URL del webhook en el panel de desarrolladores.
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];
  const expected = process.env.WHATSAPP_VERIFY_TOKEN || "";
  if (mode === "subscribe" && expected && token === expected) {
    return challenge;
  }
  return null;
}

// Verifica que el POST realmente venga de Meta (y no de alguien fingiendo mensajes falsos),
// usando la firma X-Hub-Signature-256 calculada con el App Secret de tu app de Meta.
function verifySignature(rawBody, signatureHeader) {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) return false; // sin App Secret configurado, no aceptamos webhooks
  if (!signatureHeader) return false;
  const expected = "sha256=" + crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Extrae los mensajes entrantes de texto de un payload de webhook de WhatsApp Cloud API.
// Ignora eventos que no son mensajes (p. ej. confirmaciones de entrega/lectura).
function parseIncomingMessages(payload) {
  const out = [];
  if (!payload || !Array.isArray(payload.entry)) return out;
  payload.entry.forEach(function (entry) {
    (entry.changes || []).forEach(function (change) {
      const value = change.value || {};
      const messages = value.messages || [];
      const contactsByWaId = {};
      (value.contacts || []).forEach(function (c) { contactsByWaId[c.wa_id] = c.profile && c.profile.name; });
      messages.forEach(function (msg) {
        var text = "";
        if (msg.type === "text" && msg.text) text = msg.text.body || "";
        else if (msg.type === "button" && msg.button) text = msg.button.text || "";
        else if (msg.type === "interactive" && msg.interactive) {
          text = (msg.interactive.button_reply && msg.interactive.button_reply.title) ||
                 (msg.interactive.list_reply && msg.interactive.list_reply.title) || "";
        }
        out.push({
          from: msg.from,
          name: contactsByWaId[msg.from] || "",
          type: msg.type,
          text: text,
          hasMedia: ["image", "document", "audio", "video"].indexOf(msg.type) !== -1,
          raw: msg
        });
      });
    });
  });
  return out;
}

async function sendText(to, body) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    console.warn("[whatsapp] WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID no configurados; no se envió el mensaje:", body);
    return { skipped: true };
  }
  const url = "https://graph.facebook.com/" + GRAPH_VERSION + "/" + phoneNumberId + "/messages";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: { body: body }
    })
  });
  const json = await res.json().catch(function () { return null; });
  if (!res.ok) {
    console.error("[whatsapp] error al enviar mensaje:", res.status, json);
  }
  return json;
}

module.exports = { verifyWebhookSubscription, verifySignature, parseIncomingMessages, sendText };
