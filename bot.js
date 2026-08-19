// bot.js — flujo conversacional simple (máquina de estados por número de teléfono).
// Objetivo: capturar prospectos nuevos y seguimientos de pedidos desde WhatsApp,
// y crearlos automáticamente en la Bitácora (Contactos, Negocios y Tareas).
// Cualquier mensaje que el bot no logre clasificar se guarda como Tarea con la
// etiqueta "WhatsApp sin clasificar" para que una persona lo revise — así ningún
// mensaje se pierde aunque el bot no entienda.

const store = require("./store");

const GREETING =
  "¡Hola! 👋 Soy el asistente de *Tapicentro*. ¿En qué te ayudamos hoy?\n\n" +
  "1️⃣ Quiero cotizar un trabajo nuevo\n" +
  "2️⃣ Ya tengo un pedido en proceso y quiero dar seguimiento\n" +
  "3️⃣ Otro asunto / hablar con una persona";

function classifyMenuChoice(text) {
  const t = (text || "").trim().toLowerCase();
  if (t === "1" || /cotiz|presupuesto|nuevo trabajo|quiero.*tapiz/.test(t)) return "new";
  if (t === "2" || /pedido|seguimiento|folio|ya.*encarg/.test(t)) return "order";
  if (t === "3" || /otro|persona|humano|asesor/.test(t)) return "other";
  return null;
}

function splitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] };
}

function upsertContactFromWhatsApp(phone, fullName, extra) {
  const existing = store.findContactByPhone(phone);
  if (existing) return existing;
  const nameParts = splitName(fullName || phone);
  return store.insert("contacts", Object.assign({
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email: "",
    phone: phone,
    companyId: "",
    address: { hasAddress: false, street: "", neighborhood: "", city: extra && extra.city || "", references: "" },
    notes: "Contacto capturado automáticamente desde WhatsApp.",
    source: "whatsapp"
  }, extra && extra.contactFields));
}

function fallbackToUnclassified(phone, name, text) {
  store.insert("tasks", {
    title: "📩 WhatsApp sin clasificar — " + (name || phone),
    done: false,
    startDate: store.todayISO(),
    dueDate: store.todayISO(),
    relatedContactIds: [],
    notes: "Mensaje de " + phone + (name ? " (" + name + ")" : "") + ":\n\"" + text + "\"\n\nEl bot no pudo clasificar este mensaje automáticamente — revísalo y contacta a la persona.",
    photo: null,
    source: "whatsapp_unclassified"
  });
}

async function handleIncomingMessage(from, text, profileName) {
  const phone = from;
  var convo = store.getConversation(phone) || { state: "start", data: {} };
  var reply = "";

  if (convo.state !== "start" && !String(text || "").trim()) {
    // Mensaje vacío (p. ej. un emoji que llegó como texto vacío) en medio de una
    // conversación en curso: pedimos que lo repita en vez de guardar datos vacíos.
    store.setConversation(phone, convo);
    return "No recibí el mensaje completo, ¿me lo puedes volver a escribir? 🙏";
  }

  // WhatsApp solo manda el nombre de perfil de forma confiable en el primer mensaje
  // de una conversación — lo guardamos en cuanto lo vemos para no perderlo más adelante.
  var capturedProfileName = (convo.data && convo.data.profileName) || profileName || "";

  if (convo.state === "start") {
    reply = GREETING;
    convo = { state: "menu", data: { profileName: capturedProfileName } };
  } else if (convo.state === "menu") {
    const choice = classifyMenuChoice(text);
    if (choice === "new") {
      reply = "¡Perfecto! ¿Cuál es tu nombre completo?";
      convo = { state: "new_name", data: { profileName: capturedProfileName } };
    } else if (choice === "order") {
      reply = "Claro, cuéntame tu nombre y qué pedido tienes con nosotros (puedes incluir el número de folio si lo tienes).";
      convo = { state: "order_info", data: { profileName: capturedProfileName } };
    } else if (choice === "other") {
      fallbackToUnclassified(phone, capturedProfileName, text);
      reply = "Gracias, un miembro del equipo de Tapicentro te contactará pronto. 🙌";
      convo = null; // reinicia la conversación
    } else {
      const attempts = (convo.data.menuAttempts || 0) + 1;
      if (attempts >= 2) {
        // Tras un segundo mensaje que no logramos clasificar, no lo dejamos perdido:
        // se guarda para que una persona lo revise, y se reinicia la conversación.
        fallbackToUnclassified(phone, capturedProfileName, text);
        reply = "Gracias por tu mensaje. Un miembro del equipo de Tapicentro lo revisará y te contactará pronto. 🙌";
        convo = null;
      } else {
        reply = "No logré entender tu respuesta 🤔. Responde con el número de la opción:\n\n" + GREETING;
        convo.data.menuAttempts = attempts;
        // se queda en "menu"
      }
    }
  } else if (convo.state === "new_name") {
    convo.data.name = text.trim();
    reply = "Gracias, " + convo.data.name.split(/\s+/)[0] + ". ¿Qué te gustaría tapizar o qué servicio necesitas? (ej. sala, sillas de comedor, cabecera…)";
    convo.state = "new_detail";
  } else if (convo.state === "new_detail") {
    convo.data.detail = text.trim();
    reply = "¿En qué ciudad te encuentras?";
    convo.state = "new_city";
  } else if (convo.state === "new_city") {
    convo.data.city = text.trim();
    const contact = upsertContactFromWhatsApp(phone, convo.data.name, { city: convo.data.city });
    store.insert("deals", {
      title: "Prospecto WhatsApp — " + (convo.data.detail || "sin detalle"),
      value: 0,
      stage: "lead",
      companyId: "",
      contactId: contact.id,
      nextStep: "Contactar y enviar cotización",
      nextStepDate: store.todayISO(),
      source: "whatsapp"
    });
    reply = "¡Gracias, " + (convo.data.name.split(/\s+/)[0] || "") + "! Ya registramos tu solicitud, en breve te contactamos con una cotización. 🧵";
    convo = null;
  } else if (convo.state === "order_info") {
    // OJO: "text" aquí es la respuesta libre del cliente (su nombre + su pedido mezclados),
    // no un nombre limpio — por eso el contacto usa el nombre de perfil de WhatsApp
    // (o un placeholder) y el mensaje completo se guarda tal cual en la tarea.
    const contact = upsertContactFromWhatsApp(phone, convo.data.profileName || "Cliente WhatsApp", {});
    store.insert("tasks", {
      title: "Seguimiento de pedido — WhatsApp",
      done: false,
      startDate: store.todayISO(),
      dueDate: store.todayISO(),
      relatedContactIds: [contact.id],
      notes: "Mensaje del cliente: \"" + text + "\"",
      photo: null,
      source: "whatsapp"
    });
    reply = "Gracias, alguien de Tapicentro revisará tu pedido y te responde pronto. 🙌";
    convo = null;
  } else {
    // estado desconocido: por seguridad, reinicia sin perder el mensaje
    fallbackToUnclassified(phone, capturedProfileName, text);
    reply = GREETING;
    convo = { state: "menu", data: {} };
  }

  if (convo) store.setConversation(phone, convo);
  else store.clearConversation(phone);

  return reply;
}

module.exports = { handleIncomingMessage, GREETING };
