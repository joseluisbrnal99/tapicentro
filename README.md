# CRM - Tapicentro conectado a WhatsApp

Este servidor conecta un chatbot de WhatsApp (API oficial de Meta) con tu Bitácora, para que los prospectos y pedidos que te escriben por WhatsApp aparezcan solos en tu CRM. No necesitas tocar el código — solo seguir esta guía para configurarlo con tus propias cuentas.

## Cómo funciona (en palabras simples)

1. Alguien te escribe por WhatsApp.
2. Meta le avisa a este servidor ("webhook").
3. Un bot muy simple le hace un par de preguntas (¿cotización nueva o seguimiento de un pedido?) y según lo que responda, crea automáticamente un **Contacto** y un **Negocio** (si es prospecto nuevo) o una **Tarea** (si es seguimiento de pedido) en tu Bitácora.
4. Si el bot no entiende el mensaje, no lo pierde: lo guarda como una tarea marcada "WhatsApp · revisar" para que tú lo veas y respondas a mano.
5. Tu Bitácora ahora vive en este servidor (ya no solo en tu navegador) — entras con una contraseña, y los nuevos prospectos aparecen solos, sin que tengas que exportar/importar nada.

**Importante:** esto es distinto a tu Bitácora de siempre (el archivo que abrías directo). Ese archivo sigue funcionando exactamente igual si lo sigues usando suelto (modo "sin conexión"). Este servidor es una versión adicional, conectada, para cuando quieras el embudo de WhatsApp funcionando en automático.

## Qué necesitas antes de empezar

- Una cuenta de Facebook (para crear la cuenta de desarrollador de Meta).
- Un número de teléfono para WhatsApp Business API. **No puede ser el mismo número que ya usas en la app normal de WhatsApp Business**, a menos que lo migres (y al migrarlo, deja de funcionar en la app del celular). Lo más sencillo para empezar: usa el número de prueba gratuito que te da Meta (ver Paso 2) y decide después si quieres pasar tu número real.
- Una cuenta en un servicio de hosting para tener el servidor encendido 24/7. Esta guía usa [Render.com](https://render.com) como ejemplo (tiene un plan gratuito para probar).
- Una cuenta de GitHub (gratis) para subir este código, porque Render despliega desde ahí.

## Paso 1 — Sube este código a GitHub

1. Crea un repositorio nuevo en [github.com](https://github.com) (puede ser privado).
2. Sube la carpeta `whatsapp-backend` completa a ese repositorio (arrastrando los archivos desde la web de GitHub es lo más sencillo si no usas git desde la terminal).

## Paso 2 — Crea tu app de WhatsApp en Meta

1. Ve a [developers.facebook.com](https://developers.facebook.com) e inicia sesión con tu Facebook.
2. Crea una cuenta de desarrollador si no la tienes.
3. Click en **Mis apps → Crear app**. Elige el tipo **"Negocios"**.
4. Dentro de tu app, agrega el producto **WhatsApp**.
5. Meta te da automáticamente:
   - Un **número de prueba** gratuito (puedes mandarle mensajes desde tu celular agregándolo a tus contactos, hasta con algunas personas de prueba autorizadas).
   - Un **token de acceso temporal** (dura 24 horas — sirve para probar, luego necesitas uno permanente, ver Paso 5).
   - Un **Phone Number ID** (un número largo, no es el teléfono en sí).
6. Anota el **Phone Number ID** — lo vas a necesitar.

## Paso 3 — Consigue tu App Secret

1. En el panel de tu app, ve a **Configuración → Básica**.
2. Copia el **"Secreto de la app" (App Secret)**. Este servidor lo usa para comprobar que los mensajes que le llegan de verdad vienen de Meta (y no de alguien fingiendo).

## Paso 4 — Inventa dos contraseñas

Necesitas inventar (tú decides el valor) dos cosas:
- **ADMIN_PASSWORD**: la contraseña con la que vas a entrar a tu Bitácora conectada.
- **WHATSAPP_VERIFY_TOKEN**: cualquier palabra o frase secreta — la vas a escribir dos veces (una en Meta, otra en la configuración del servidor) solo para que se "reconozcan" al conectar el webhook.

## Paso 5 — Consigue un token permanente (para que no se corte cada 24h)

El token temporal del Paso 2 deja de funcionar en 24 horas. Para producción:
1. En Meta for Developers, ve a **Configuración de la app de negocio → Usuarios del sistema**, crea un "usuario del sistema" con rol de administrador.
2. Genera un token para ese usuario con permisos `whatsapp_business_messaging` y `whatsapp_business_management`, sin fecha de expiración.
3. Guarda ese token — es tu **WHATSAPP_TOKEN** definitivo.

(Si por ahora solo quieres probar, puedes usar el token temporal de 24 horas y regresar a este paso después.)

## Paso 6 — Despliega el servidor en Render

1. Entra a [render.com](https://render.com) y crea una cuenta (puedes entrar con tu GitHub).
2. **New → Web Service**, elige el repositorio que subiste en el Paso 1.
3. Configura:
   - **Root directory**: `whatsapp-backend` (si subiste solo esa carpeta al repo, déjalo vacío).
   - **Runtime**: Node.
   - **Build command**: (déjalo vacío — este proyecto no tiene dependencias que instalar).
   - **Start command**: `node server.js`.
4. En la sección **Environment**, agrega estas variables (con los valores que reuniste en los pasos anteriores):

   | Variable | Valor |
   |---|---|
   | `ADMIN_PASSWORD` | la contraseña que inventaste |
   | `WHATSAPP_TOKEN` | tu token (temporal o permanente) |
   | `WHATSAPP_PHONE_NUMBER_ID` | el Phone Number ID de Meta |
   | `WHATSAPP_VERIFY_TOKEN` | la frase secreta que inventaste |
   | `WHATSAPP_APP_SECRET` | el App Secret de tu app |

5. Click en **Deploy**. Cuando termine, Render te da una URL como `https://tapicentro-crm.onrender.com` — esa es la dirección de tu Bitácora conectada.

   > En el plan gratuito de Render, el servidor "se duerme" si nadie lo usa por un rato, y tarda ~30 segundos en despertar con el primer mensaje. Si eso te estorba, el plan pagado más económico (~$7 USD/mes) lo mantiene siempre despierto.

## Paso 7 — Conecta el webhook en Meta

1. En tu app de Meta, ve a **WhatsApp → Configuración**.
2. En **Webhook**, pon:
   - **Callback URL**: `https://tu-app.onrender.com/webhook/whatsapp`
   - **Verify token**: la misma frase secreta que usaste como `WHATSAPP_VERIFY_TOKEN`.
3. Dale **Verificar y guardar**.
4. Suscríbete al campo **`messages`** (es el que le avisa al servidor cuando alguien te escribe).

## Paso 8 — Pruébalo

1. Desde tu celular, mándale un WhatsApp al número de prueba (o a tu número real, si ya lo migraste).
2. Deberías recibir el saludo del bot con las 3 opciones.
3. Sigue la conversación como si fueras un cliente.
4. Abre `https://tu-app.onrender.com` en tu navegador, entra con tu `ADMIN_PASSWORD`, y deberías ver el contacto/negocio/tarea recién creado — con una etiqueta verde de "WhatsApp".

## Costos aproximados

- **Meta / WhatsApp**: las respuestas dentro de las 24 horas después de que alguien te escribe primero (que es como funciona este bot) son **gratis** desde noviembre 2024. Solo pagarías si tú le escribieras primero a alguien fuera de esa ventana usando plantillas — este bot no lo hace.
- **Hosting (Render)**: gratis para probar; desde ~$7 USD/mes si quieres que nunca se duerma.

## Limitaciones a tener en cuenta (para que no te agarren en curva)

- La "base de datos" es un archivo (`data.json`) dentro del servidor. Es sencilla y funciona bien para un negocio de este tamaño, pero **no tiene respaldos automáticos** — sigue usando el botón "Exportar datos" de vez en cuando como respaldo adicional.
- Las sesiones de inicio de sesión se reinician si el servidor se reinicia (por ejemplo, tras un redeploy) — solo tendrías que volver a escribir tu contraseña.
- El bot entiende un flujo simple (nuevo prospecto / seguimiento de pedido / otro). No es una inteligencia artificial conversacional — si alguien escribe algo fuera de ese guion, el bot lo manda a una tarea para que tú lo atiendas a mano, en vez de intentar adivinar.
- Solo se usa un usuario/contraseña (para ti como dueño del negocio). Si más adelante quieres que varios empleados entren con su propio usuario, eso requeriría una mejora aparte.

## Archivos de este proyecto

- `server.js` — servidor principal (rutas, estático, webhook).
- `store.js` — guarda los datos en `data.json`.
- `whatsapp.js` — habla con la API de Meta (enviar/verificar mensajes).
- `bot.js` — el flujo de preguntas del chatbot.
- `api.js` — las rutas `/api/...` que usa la Bitácora conectada.
- `public/bitacora.html` — tu Bitácora (el mismo archivo que ya conocías, con la parte "modo conectado" añadida).
