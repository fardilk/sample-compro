/**
 * Every entry the mobile drawer and the desktop mega menu render must resolve
 * to a page the build actually produced. Four call sites once had their own
 * slug logic and disagreed, which shipped links to pages that never existed.
 *
 * Run: npx tsx src/utils/menuLinks.check.ts   (requires a prior `npm run build`)
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { mainMenu } from './hoverMenu';
import { menuHref, isPlaceholder } from './menuLinks';

const dist = join(process.cwd(), 'dist');

const resolves = (href: string): boolean => {
  const path = href.split(/[?#]/)[0].replace(/\/$/, '');
  // A fragment-only href has no page behind it; isPlaceholder filters those out
  // before this runs, so reaching here with an empty path is a bug in the walk.
  if (path === '') return false;
  if (path === '/') return existsSync(join(dist, 'index.html'));
  return (
    existsSync(join(dist, path)) ||
    existsSync(join(dist, `${path}.html`)) ||
    existsSync(join(dist, path, 'index.html'))
  );
};

assert.ok(existsSync(dist), 'dist/ is missing; run `npm run build` first');

let checked = 0;
let placeholders = 0;
const broken: string[] = [];

for (const group of mainMenu) {
  for (const child of group.children ?? []) {
    const entries: Array<[typeof child, typeof child | undefined]> = (child.children ?? []).length
      ? (child.children ?? []).map((leaf) => [leaf, child] as [typeof child, typeof child])
      : [[child, undefined]];

    for (const [item, parent] of entries) {
      const href = menuHref(group.label, item, parent);
      if (isPlaceholder(href)) {
        placeholders += 1;
        continue;
      }
      checked += 1;
      if (!resolves(href)) broken.push(`${group.label} > ${item.label} -> ${href}`);
    }
  }
}

assert.deepEqual(broken, [], `menu entries point at pages that were not built:\n${broken.join('\n')}`);
assert.ok(checked > 20, `expected the whole menu to be walked, only checked ${checked}`);

console.log(`menuLinks: ${checked} entries resolve, ${placeholders} still without a destination`);
