// Static build: pre-renders every page in English and French with React,
// bundles small client "islands" for the interactive parts, and writes dist/.
// Usage: SITE_URL=https://www.example.com node scripts/build.mjs
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
const tmp = join(root, '.build');
rmSync(out, { recursive: true, force: true });
rmSync(tmp, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const common = { bundle: true, jsx: 'automatic', logLevel: 'warning', legalComments: 'none' };

// 1. Client bundle (code-split per island) and stylesheet
const client = await build({
  ...common,
  entryPoints: { client: join(root, 'src/client.tsx'), site: join(root, 'src/styles/main.css') },
  outdir: join(out, 'assets'),
  entryNames: '[name]-[hash]',
  chunkNames: 'chunks/[name]-[hash]',
  format: 'esm',
  splitting: true,
  minify: true,
  target: ['es2020', 'safari15'],
  define: { 'process.env.NODE_ENV': '"production"', 'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL || '') },
  external: ['/fonts/*', '/brand/*'],
  metafile: true,
});
const outputs = Object.keys(client.metafile.outputs).map((f) => '/' + relative(out, join(root, f)).replace(/\\/g, '/'));
const jsEntry = outputs.find((f) => /\/assets\/client-[^/]+\.js$/.test(f));
const cssEntry = outputs.find((f) => /\/assets\/site-[^/]+\.css$/.test(f));

// 2. Server render bundle
await build({
  ...common,
  entryPoints: [join(root, 'src/prerender.tsx')],
  outfile: join(tmp, 'prerender.mjs'),
  platform: 'node',
  format: 'esm',
  packages: 'external',
});
const { render } = await import(pathToFileURL(join(tmp, 'prerender.mjs')).href);
const { routes, notFound, site } = render();
const base = site.url.replace(/\/$/, '');

// 3. Assemble documents
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const urlOf = (locale, path) => `${base}/${locale}/${path ? path + '/' : ''}`;
const known = new Set(routes.map((r) => `${r.locale}:${r.path}`));

function doc(r) {
  const fullTitle = r.path === '' ? r.title : `${r.title} | ${site.name}`;
  const other = r.locale === 'en' ? 'fr' : 'en';
  const hasAlt = known.has(`${other}:${r.path}`) && r.path !== '404';
  const canonical = urlOf(r.locale, r.path);
  const orgLd =
    r.path === ''
      ? `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          url: base + '/',
          logo: base + '/brand/logo-primary.png',
          email: site.email,
          areaServed: ['US', 'CA', 'SN'],
          knowsLanguage: ['en', 'fr'],
        })}</script>`
      : '';
  return `<!doctype html>
<html lang="${r.locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(r.description)}">
${r.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
${hasAlt && !r.noindex ? `<link rel="alternate" hreflang="${r.locale}" href="${canonical}">\n<link rel="alternate" hreflang="${other}" href="${urlOf(other, r.path)}">\n<link rel="alternate" hreflang="x-default" href="${urlOf('en', r.path)}">` : ''}
<meta property="og:type" content="${r.type || 'website'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(r.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${base}/og/og-${r.locale}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${r.locale === 'fr' ? 'fr_FR' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#071F39">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/brand/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/RedHatDisplay-VF.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/RedHatText-VF.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${cssEntry}">
<script type="module" src="${jsEntry}"></script>
${orgLd}
</head>
<body>
<div id="root">${r.html}</div>
</body>
</html>
`;
}

for (const r of routes) {
  const dir = join(out, r.locale, r.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), doc(r));
}
writeFileSync(join(out, '404.html'), doc(notFound));

// 4. Root: send visitors to their language (remembered choice, then browser language)
writeFileSync(
  join(out, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(site.name)}</title>
<link rel="canonical" href="${base}/en/">
<link rel="alternate" hreflang="en" href="${base}/en/">
<link rel="alternate" hreflang="fr" href="${base}/fr/">
<link rel="alternate" hreflang="x-default" href="${base}/en/">
<meta name="theme-color" content="#071F39">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<script src="/lang-redirect.js"></script>
<noscript><meta http-equiv="refresh" content="0; url=/en/"></noscript>
<style>body{margin:0;background:#071F39;color:#fff;font:16px system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}a{color:#E0B871}</style>
</head>
<body><p><a href="/en/">English</a> · <a href="/fr/">Français</a></p></body>
</html>
`,
);

writeFileSync(join(out, 'lang-redirect.js'), "(function(){var l='en';try{var s=localStorage.getItem('dt-lang');if(s==='fr'||s==='en'){l=s}else if((navigator.language||'').toLowerCase().indexOf('fr')===0){l='fr'}}catch(e){}location.replace('/'+l+'/')})();\n");

// 5. Static files, sitemap, robots
cpSync(join(root, 'public'), out, { recursive: true });
const indexable = routes.filter((r) => !r.noindex);
writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map((r) => {
    const other = r.locale === 'en' ? 'fr' : 'en';
    return `  <url><loc>${urlOf(r.locale, r.path)}</loc><xhtml:link rel="alternate" hreflang="${r.locale}" href="${urlOf(r.locale, r.path)}"/><xhtml:link rel="alternate" hreflang="${other}" href="${urlOf(other, r.path)}"/></url>`;
  })
  .join('\n')}
</urlset>
`,
);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

rmSync(tmp, { recursive: true, force: true });
const kb = (f) => (client.metafile.outputs[Object.keys(client.metafile.outputs).find((k) => k.endsWith(f.split('/').pop()))]?.bytes / 1024).toFixed(1);
console.log(`Built ${routes.length} pages + 404 for ${base}\n  ${jsEntry} ${kb(jsEntry)} kB\n  ${cssEntry} ${kb(cssEntry)} kB`);
