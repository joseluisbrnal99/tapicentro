// Simula el webhook de WhatsApp Cloud API contra el servidor local, firmando cada
// petición como lo haría Meta (X-Hub-Signature-256), para probar el bot end-to-end
// sin necesitar una cuenta real de Meta.
const crypto = require("crypto");

const BASE = process.env.TEST_BASE || "http://localhost:3900";
const APP_SECRET = process.env.WHATSAPP_APP_SECRET || "test_app_secret";
const FROM = "5216141234567";

function sign(bodyStr) {
  return "sha256=" + crypto.createHmac("sha256", APP_SECRET).update(bodyStr).digest("hex");
}

function makePayload(text, profileName) {
  return {
    object: "whatsapp_business_account",
    entry: [{
      id: "123",
      changes: [{
        field: "messages",
        value: {
          messaging_product: "whatsapp",
          metadata: { phone_number_id: "999" },
          contacts: profileName ? [{ profile: { name: profileName }, wa_id: FROM }] : [],
          messages: [{ from: FROM, id: "wamid." + Date.now(), timestamp: String(Date.now()), type: "text", text: { body: text } }]
        }
      }]
    }]
  };
}

async function sendMessage(text, profileName) {
  const bodyStr = JSON.stringify(makePayload(text, profileName));
  const res = await fetch(BASE + "/webhook/whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Hub-Signature-256": sign(bodyStr) },
    body: bodyStr
  });
  const txt = await res.text();
  console.log("POST", text, "->", res.status, txt);
  return res.status;
}

(async () => {
  // 1) Verificación del webhook (GET)
  const verifyUrl = BASE + "/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=" +
    encodeURIComponent(process.env.WHATSAPP_VERIFY_TOKEN || "verify_test_token") + "&hub.challenge=abc123";
  const verifyRes = await fetch(verifyUrl);
  console.log("GET verify ->", verifyRes.status, await verifyRes.text());

  // 2) Firma inválida debe rechazarse
  const badRes = await fetch(BASE + "/webhook/whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Hub-Signature-256": "sha256=deadbeef" },
    body: JSON.stringify(makePayload("hola"))
  });
  console.log("POST firma inválida ->", badRes.status, "(esperado 401)");

  // 3) Flujo completo: prospecto nuevo
  await sendMessage("hola", "Marta Domínguez");     // -> saludo + menú
  await sendMessage("1");                            // -> pide nombre
  await sendMessage("Marta Domínguez");               // -> pide detalle
  await sendMessage("Quiero tapizar un sillón de 3 plazas"); // -> pide ciudad
  await sendMessage("Chihuahua");                     // -> crea contacto + negocio

  // 4) Flujo: seguimiento de pedido (número distinto)
  process.env.__SECOND = "1";
})();
