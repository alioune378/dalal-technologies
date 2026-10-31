// End-to-end checks against the production build (dist/), using Playwright + Chromium.
// Run: npm run build && npm test
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const PORT = 4399;
const BASE = `http://localhost:${PORT}`;
const server = spawn('node', ['scripts/serve.mjs', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 700));

const results = [];
const check = async (name, fn) => {
  try {
    const detail = await fn();
    results.push({ name, ok: true, detail: detail || '' });
    console.log(`✓ ${name}${detail ? ' — ' + detail : ''}`);
  } catch (e) {
    results.push({ name, ok: false, detail: String(e.message || e) });
    console.log(`✗ ${name} — ${e.message || e}`);
  }
};
const assert = (c, m) => { if (!c) throw new Error(m); };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`${page.url()} pageerror ${e.message}`));
page.on('console', (m) => m.type() === 'error' && errors.push(`${page.url()} console ${m.text()}`));

// 1. Crawl every internal link from both home pages
const seen = new Map();
await check('Crawl: every internal link resolves (EN + FR)', async () => {
  const queue = ['/en/', '/fr/'];
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    seen.set(path, res.status());
    const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    for (const h of links) {
      if (!h || h.startsWith('http') || h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('#')) continue;
      const clean = h.split('#')[0].split('?')[0];
      if (!seen.has(clean) && !queue.includes(clean)) queue.push(clean);
    }
  }
  const bad = [...seen].filter(([, s]) => s !== 200);
  assert(!bad.length, 'broken: ' + bad.map((b) => b.join(' ')).join(', '));
  return `${seen.size} pages, 0 broken`;
});

await check('No console or runtime errors on any crawled page', async () => {
  assert(!errors.length, errors.slice(0, 5).join(' | '));
  return `${seen.size} pages`;
});

await check('Unique titles and descriptions; FR pages declare lang="fr"', async () => {
  const titles = new Set();
  for (const p of seen.keys()) {
    await page.goto(BASE + p);
    const t = await page.title();
    const d = await page.getAttribute('meta[name=description]', 'content');
    const lang = await page.getAttribute('html', 'lang');
    assert(t && d, `missing meta on ${p}`);
    assert(!titles.has(t), `duplicate title "${t}"`);
    titles.add(t);
    assert(lang === p.split('/')[1], `lang mismatch on ${p}`);
  }
  return `${titles.size} unique titles`;
});

await check('Unknown URL returns the 404 page', async () => {
  const r = await page.goto(BASE + '/en/does-not-exist/');
  assert(r.status() === 404, 'status ' + r.status());
  assert((await page.textContent('h1')).includes('could not be found'), 'wrong page');
});

await check('Language switcher keeps the same page', async () => {
  await page.goto(BASE + '/en/services/business-intelligence/');
  await page.click('.header-tools .lang');
  await page.waitForURL('**/fr/services/business-intelligence/');
  assert((await page.getAttribute('html', 'lang')) === 'fr', 'not french');
  return 'EN → FR on a service page';
});

await check('Root redirects to remembered language', async () => {
  await page.goto(BASE + '/');
  await page.waitForURL(/\/(en|fr)\/$/);
  const first = page.url();
  await page.evaluate(() => localStorage.setItem('dt-lang', 'fr'));
  await page.goto(BASE + '/');
  await page.waitForURL('**/fr/');
  await page.evaluate(() => localStorage.removeItem('dt-lang'));
  return `default ${first.replace(BASE, '')}, remembered /fr/`;
});

await check('Dashboard: filters update KPIs, chart tooltip, data table', async () => {
  await page.goto(BASE + '/en/');
  const dash = page.locator('.dash');
  await dash.scrollIntoViewIfNeeded();
  const before = await dash.locator('.kpi-value').first().textContent();
  await dash.getByRole('radio', { name: '3 months' }).click();
  const after = await dash.locator('.kpi-value').first().textContent();
  assert(before !== after, 'revenue did not change with period');
  await dash.locator('select').selectOption('digital');
  const unit = await dash.locator('.kpi-value').first().textContent();
  assert(unit !== after, 'revenue did not change with unit');
  assert(await dash.locator('.hbars li.on').count() === 1, 'unit not highlighted');
  const box = await dash.locator('.chart svg').boundingBox();
  await page.mouse.move(box.x + box.width * 0.6, box.y + box.height / 2);
  assert(await dash.locator('.tip').isVisible(), 'no tooltip');
  await dash.getByRole('button', { name: 'Show data table' }).click();
  const rows = await dash.locator('tbody tr').count();
  assert(rows === 3, 'table rows ' + rows);
  return `${before} → ${after} → ${unit}; table ${rows} rows`;
});

await check('AI workflow: classify → process → human review → outcome', async () => {
  await page.goto(BASE + '/en/services/ai-automation/');
  const flow = page.locator('.flow');
  await flow.getByRole('button', { name: 'Technical support' }).click();
  await flow.getByRole('button', { name: 'Process request' }).click();
  await flow.getByRole('button', { name: 'Approve routing' }).waitFor({ timeout: 4000 });
  const cat = await flow.locator('.flow-grid dd').first().textContent();
  assert(cat === 'Technical support', 'category ' + cat);
  assert((await flow.locator('.prio').textContent()) === 'High', 'priority');
  await flow.locator('.reassign select').selectOption('operations');
  await flow.getByRole('button', { name: 'Approve routing' }).click();
  const out = await flow.locator('.outcome').textContent();
  assert(out.includes('Operations team') && out.includes('reassigned'), 'outcome ' + out);
  await flow.locator('textarea').fill('short');
  await flow.getByRole('button', { name: 'Process request' }).click();
  assert(await flow.locator('.field-error').isVisible(), 'no validation');
  return 'support / high → reassigned to operations';
});

await check('Work: status and sector filters, shareable URL', async () => {
  await page.goto(BASE + '/en/work/');
  const all = await page.locator('.project-card').count();
  assert(all === 3, 'expected 3 published projects, got ' + all);
  // Status filter only appears when more than one status has projects.
  const radios = await page.getByRole('radio').count();
  assert(radios === 0, 'empty status filters shown: ' + radios);
  await page.locator('.select-light select').selectOption('real-estate');
  await page.waitForFunction(() => location.search.includes('sector=real-estate'), null, { timeout: 3000 }).catch(() => {});
  assert(page.url().includes('sector=real-estate'), 'url not updated');
  await page.goto(BASE + '/en/work/?sector=real-estate');
  await page.waitForTimeout(300);
  const re = await page.locator('.project-card').count();
  assert(re === 2, 'real estate ' + re);
  return `all ${all}, real estate ${re}`;
});

await check('Contact form: validation, data notice, successful submission', async () => {
  await page.goto(BASE + '/fr/contact/');
  await page.getByRole('button', { name: 'Envoyer le message' }).click();
  const errs = await page.locator('.field-error').count();
  assert(errs === 5, 'errors ' + errs);
  assert(await page.locator('.form-notice').isVisible(), 'no notice');
  await page.fill('#cf-name', 'Test Person');
  await page.fill('#cf-email', 'test@example.com');
  await page.selectOption('#cf-topic', { index: 1 });
  await page.fill('#cf-message', 'Nous souhaitons discuter d’un tableau de bord.');
  await page.check('#cf-consent');
  await page.getByRole('button', { name: 'Envoyer le message' }).click();
  await page.locator('.form-done').waitFor({ timeout: 4000 });
  return '5 errors shown, then sent';
});

await check('Contact links are clickable (mailto / tel)', async () => {
  await page.goto(BASE + '/en/contact/');
  assert(await page.locator('a[href^="mailto:"]').count() > 0, 'no mailto');
  assert(await page.locator('a[href^="tel:+1"]').count() > 0, 'no tel');
});

await check('Hidden projects are not published or mentioned', async () => {
  for (const l of ['en', 'fr']) {
    const r = await page.goto(`${BASE}/${l}/work/senegal-consulaire-digital/`);
    assert(r.status() === 404, 'hidden case study still published ' + l);
    for (const path of ['', 'work/', 'services/', 'legal/']) {
      await page.goto(`${BASE}/${l}/${path}`);
      const body = await page.locator('body').textContent();
      assert(!/Consulaire Digital|Sant Yalla|Sankara|O3S|ServiceOps/.test(body), `hidden project named on /${l}/${path}`);
    }
  }
});

// Mobile
const m = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
const mp = await m.newPage();
await check('Mobile (375px): no horizontal overflow on any page', async () => {
  const bad = [];
  for (const p of seen.keys()) {
    await mp.goto(BASE + p);
    const o = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 0) bad.push(`${p} (+${o}px)`);
  }
  assert(!bad.length, bad.join(', '));
  return `${seen.size} pages`;
});
await check('Mobile menu opens, closes with Escape, navigates', async () => {
  await mp.goto(BASE + '/en/');
  const btn = mp.locator('[data-menu-btn]');
  await btn.click();
  assert((await btn.getAttribute('aria-expanded')) === 'true', 'not expanded');
  assert(await mp.locator('#site-nav').isVisible(), 'nav hidden');
  await mp.keyboard.press('Escape');
  assert((await btn.getAttribute('aria-expanded')) === 'false', 'not closed');
  await btn.click();
  await mp.locator('#site-nav').getByRole('link', { name: 'About' }).click();
  await mp.waitForURL('**/en/about/');
});

await check('Keyboard: skip link and visible focus', async () => {
  await page.goto(BASE + '/en/');
  await page.keyboard.press('Tab');
  const t = await page.evaluate(() => document.activeElement.textContent);
  assert(t.includes('Skip'), 'first tab ' + t);
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  assert(outline !== 'none', 'no focus outline');
});

await check('SEO files: sitemap, robots, hreflang, Open Graph image', async () => {
  const sm = await (await page.goto(BASE + '/sitemap.xml')).text();
  const n = (sm.match(/<loc>/g) || []).length;
  assert(n > 50, 'sitemap urls ' + n);
  const rb = await (await page.goto(BASE + '/robots.txt')).text();
  assert(rb.includes('Sitemap:'), 'robots');
  await page.goto(BASE + '/fr/about/');
  assert(await page.locator('link[hreflang="en"]').count() === 1, 'hreflang');
  const og = await page.getAttribute('meta[property="og:image"]', 'content');
  const r = await page.goto(BASE + new URL(og).pathname);
  assert(r.status() === 200, 'og image missing');
  return `${n} sitemap URLs`;
});

await browser.close();
server.kill();
writeFileSync('tests/results.json', JSON.stringify({ ranAt: new Date().toISOString(), results }, null, 2));
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
