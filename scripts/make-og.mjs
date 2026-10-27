// Regenerates the Open Graph images in public/og/ (run after `npm run build`).
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
const pub = fileURLToPath(new URL('../public', import.meta.url));
const copy = {
  en: ['Technology that moves business forward.', 'Technology consulting · Business intelligence · Digital engineering'],
  fr: ['Une technologie qui fait avancer l’entreprise.', 'Conseil technologique · Intelligence d’affaires · Ingénierie numérique'],
};
const font = readFileSync(`${pub}/fonts/RedHatDisplay-VF.woff2`).toString('base64');
const logo = readFileSync(`${pub}/brand/logo-reverse.png`).toString('base64');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const [l, [h, s]] of Object.entries(copy)) {
  await p.setContent(`<html><head><style>
  @font-face{font-family:D;src:url(data:font/woff2;base64,${font})}
  body{margin:0;width:1200px;height:630px;background:#071F39;color:#fff;font-family:D;position:relative;overflow:hidden}
  .g{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:64px 64px}
  img{position:absolute;left:80px;top:72px;height:96px}
  h1{position:absolute;left:80px;top:230px;width:760px;font-size:68px;line-height:1.02;letter-spacing:-.03em;font-weight:650;margin:0}
  p{position:absolute;left:80px;bottom:64px;font-size:24px;color:#E0B871;font-weight:550;margin:0}
  .bars{position:absolute;right:96px;bottom:150px;display:flex;align-items:flex-end;gap:18px}
  .bars i{display:block;width:34px;background:linear-gradient(#E0B871,#9C6D25);border-radius:2px}
  </style></head><body><div class="g"></div><img src="data:image/png;base64,${logo}"><h1>${h}</h1><p>${s}</p>
  <div class="bars"><i style="height:120px"></i><i style="height:180px"></i><i style="height:250px"></i></div></body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${pub}/og/og-${l}.png` });
}
await b.close();
console.log('OG images written');
