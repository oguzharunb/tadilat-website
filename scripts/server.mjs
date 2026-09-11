import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv.includes('--dist') ? 'dist' : '.');
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex > -1 ? process.argv[portIndex + 1] : process.env.PORT || 4173);
const allowed = new Set(['.html', '.css', '.js', '.svg', '.txt', '.json']);
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.json': 'application/json' };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + sep) || !allowed.has(extname(file)) || pathname.split('/').some(segment => segment.startsWith('.'))) {
      response.writeHead(404).end('Not found');
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': `${mime[extname(file)]}; charset=utf-8`, 'X-Content-Type-Options': 'nosniff' });
    response.end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Site hazır: http://127.0.0.1:${port}`));
