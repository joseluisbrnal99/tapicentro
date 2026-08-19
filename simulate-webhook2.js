const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

  // 1) Standalone mode via file:// must behave exactly like before (no login gate, seed task).
  const page1 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors1 = [];
  page1.on('pageerror', err => errors1.push('PAGEERROR: ' + err.message));
  await page1.goto('file://' + path.resolve(__dirname, '..', 'public', 'bitacora.html'));
  await page1.waitForTimeout(500);
  const loginGateInStandalone = await page1.isVisible('#login-form').catch(() => false);
  await page1.click('#main-nav [data-view="tasks"]');
  await page1.waitForTimeout(200);
  const seedTaskVisible = await page1.isVisible('text=Entrega de muestrarios');
  console.log('STANDALONE: login gate shown?', loginGateInStandalone, '| seed task visible?', seedTaskVisible);
  console.log('STANDALONE ERRORS:', JSON.stringify(errors1));
  await page1.close();

  // 2) Connected mode: edit a contact locally, verify it lands on the server via API.
  const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page2.goto('http://localhost:3903/');
  await page2.waitForTimeout(500);
  if (await page2.isVisible('#login-form')) {
    await page2.fill('#login-password', 'test1234');
    await page2.click('#login-form button[type=submit]');
    await page2.waitForTimeout(800);
  }
  await page2.click('#main-nav [data-view="contacts"]');
  await page2.waitForTimeout(300);
  await page2.click('[data-edit-contact]');
  await page2.waitForTimeout(200);
  await page2.fill('#f-notes', 'Nota editada desde el navegador para probar sincronización.');
  await page2.click('#contact-form button[type=submit]');
  await page2.waitForTimeout(500);
  await page2.close();

  const loginRes = await fetch('http://localhost:3903/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: 'test1234' }) });
  const { token } = await loginRes.json();
  const contactsRes = await fetch('http://localhost:3903/api/contacts', { headers: { Authorization: 'Bearer ' + token } });
  const contacts = await contactsRes.json();
  console.log('SERVER SIDE NOTES AFTER EDIT:', contacts.map(c => c.notes));

  await browser.close();
})();
