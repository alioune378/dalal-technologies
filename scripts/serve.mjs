// Local static server for dist/ (clean URLs, 404 page).
// POST requests are answered 200 so the contact form can be tried locally;
// in production Netlify Forms receives them.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const port = Number(process.argv[2] || 4321);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      console.log('[form]', decodeURIComponent(body).slice(0, 200));
      res.writeHead(200, { 'content-type': 'text/plain' }).end('ok');
    });
    return;
  }
  const url = new URL(req.url, 'http://x');
  let p = normalize(join(dist, decodeURIComponent(url.pathname)));
  if (!p.startsWith(dist)) return res.writeHead(403).end();
  if (existsSync(p) && statSync(p).isDirectory()) {
    if (!url.pathname.endsWith('/')) return res.writeHead(301, { location: url.pathname + '/' + url.search }).end();
    p = join(p, 'index.html');
  }
  if (!existsSync(p)) {
    res.writeHead(404, { 'content-type': types['.html'] });
    return res.end(readFileSync(join(dist, '404.html')));
  }
  res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' });
  res.end(readFileSync(p));
}).listen(port, () => console.log(`Serving dist/ on http://localhost:${port}`));
