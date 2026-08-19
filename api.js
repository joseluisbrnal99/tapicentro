const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

  await page.goto('http://localhost:3903/');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shot-login-gate.png' });

  const loginVisible = await page.isVisible('#login-form');
  console.log('LOGIN_GATE_VISIBLE', loginVisible);

  await page.fill('#login-password', 'test1234');
  await page.click('#login-form button[type=submit]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shot-connected-dashboard.png' });

  await page.click('#main-nav [data-view="contacts"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'shot-connected-contacts.png' });
  const waChipVisible = await page.isVisible('.wa-chip');
  console.log('WA_CHIP_VISIBLE', waChipVisible);

  await page.click('#main-nav [data-view="tasks"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'shot-connected-tasks.png' });
  const unclassifiedVisible = await page.isVisible('text=WhatsApp · revisar');
  console.log('UNCLASSIFIED_TASK_VISIBLE', unclassifiedVisible);

  await page.click('#main-nav [data-view="pipeline"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'shot-connected-pipeline.png' });

  // Reload the page: token should persist in localStorage, no login prompt again
  await page.reload();
  await page.waitForTimeout(800);
  const loginVisibleAfterReload = await page.isVisible('#login-form');
  console.log('LOGIN_GATE_AFTER_RELOAD', loginVisibleAfterReload);
  await page.screenshot({ path: 'shot-connected-after-reload.png' });

  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
