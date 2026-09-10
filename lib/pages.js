import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/** slug ต้องเป็น a-z 0-9 - _ เท่านั้น — กัน path traversal */
const SLUG_RE = /^[a-z0-9][a-z0-9_-]*$/;

/** cwd ของ serverless function ต่างกันระหว่าง vercel dev กับ production */
function pageRoots() {
  return [
    join(process.cwd(), 'public_pages'),
    join(here, '..', 'public_pages'),
    join('/var/task', 'public_pages'),
  ];
}

const cache = new Map();

export function loadCatalogFor(page) {
  if (!SLUG_RE.test(String(page || ''))) return null;
  if (cache.has(page)) return cache.get(page);

  const tried = [];
  for (const root of pageRoots()) {
    const p = join(root, page, 'catalog.json');
    tried.push(p);
    if (existsSync(p)) {
      const catalog = JSON.parse(readFileSync(p, 'utf8'));
      cache.set(page, catalog);
      return catalog;
    }
  }
  console.error(`[pages] ไม่พบ catalog ของ "${page}" — ลองแล้ว:\n  ${tried.join('\n  ')}`);
  return null;
}

export function listPages() {
  for (const root of pageRoots()) {
    if (!existsSync(root)) continue;
    return readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory() && SLUG_RE.test(d.name))
      .map((d) => d.name);
  }
  return [];
}
