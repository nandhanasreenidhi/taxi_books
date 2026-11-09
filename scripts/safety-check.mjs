#!/usr/bin/env node
/**
 * WAYVIA safety net. Run with `npm run safety` after every phase.
 *
 *  1. Routes: every route path from the original project must still exist in src/routes/index.tsx.
 *  2. Protected files: stores, services and shared types must be byte-identical to the original,
 *     because the redesign is visual only (booking maths, state shape and status transitions stay put).
 *  3. Store contract: the persisted-state key, version and the public action names are asserted.
 *
 * Baselines live in docs/baseline/ and were generated from the original Phase 6 upload.
 * Update them only when you intentionally change business logic: `npm run safety -- --update-baseline`.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baselineDir = resolve(root, 'docs/baseline');
const routesBaselinePath = resolve(baselineDir, 'routes.json');
const hashBaselinePath = resolve(baselineDir, 'protected-files.json');
const portalBaselinePath = resolve(baselineDir, 'portal-files.json');

const PROTECTED = [
  'src/store/useCustomerStore.ts',
  'src/store/useBookingStore.ts',
  'src/store/usePortalStore.ts',
  'src/services/bookingService.ts',
  'src/services/index.ts',
  'src/types/index.ts',
];

/**
 * Phase 1 freeze: the Customer, Driver and Admin portals (and the shared pieces they render with)
 * must be identical to the Phase 0 checkpoint while the public site is being redesigned.
 */
const PORTAL_DIRS = ['src/pages/customer', 'src/pages/driver', 'src/pages/admin', 'src/layouts', 'src/components/customer'];
const PORTAL_SHARED = [
  'src/components/common/Button.tsx',
  'src/components/common/Badge.tsx',
  'src/components/common/Logo.tsx',
  'src/data/mockData.ts',
  'src/styles/animations.ts',
];
const listFiles = (dir) =>
  existsSync(resolve(root, dir))
    ? readdirSync(resolve(root, dir), { withFileTypes: true })
        .filter((d) => d.isFile())
        .map((d) => `${dir}/${d.name}`)
    : [];
const portalFiles = () => [...PORTAL_DIRS.flatMap(listFiles), ...PORTAL_SHARED].sort();

const STORE_CONTRACT = {
  file: 'src/store/useCustomerStore.ts',
  mustContain: [
    "name: 'wayvia-customer-storage'",
    'version: 2',
    'createBooking:', 'updateBooking:', 'acceptBooking:', 'cancelBooking:',
    'applyPromoCode:', 'addWalletMoney:', 'resetToDemoDefaults:',
  ],
};

const read = (rel) => readFileSync(resolve(root, rel), 'utf8');
const sha = (text) => createHash('sha256').update(text).digest('hex');
const routesIn = (text) => [...text.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).sort();

const update = process.argv.includes('--update-baseline');
let failed = false;
const fail = (msg) => { failed = true; console.error(`  FAIL  ${msg}`); };
const ok = (msg) => console.log(`  ok    ${msg}`);

if (update) {
  mkdirSync(baselineDir, { recursive: true });
  writeFileSync(routesBaselinePath, JSON.stringify(routesIn(read('src/routes/index.tsx')), null, 2) + '\n');
  writeFileSync(hashBaselinePath, JSON.stringify(Object.fromEntries(PROTECTED.map((f) => [f, sha(read(f))])), null, 2) + '\n');
  writeFileSync(portalBaselinePath, JSON.stringify(Object.fromEntries(portalFiles().map((f) => [f, sha(read(f))])), null, 2) + '\n');
  console.log('Baselines updated.');
  process.exit(0);
}

console.log('WAYVIA safety check');

// 1. Routes
if (!existsSync(routesBaselinePath)) {
  fail('docs/baseline/routes.json missing');
} else {
  const expected = JSON.parse(readFileSync(routesBaselinePath, 'utf8'));
  const actual = routesIn(read('src/routes/index.tsx'));
  const missing = expected.filter((r) => !actual.includes(r));
  const added = actual.filter((r) => !expected.includes(r));
  if (missing.length) fail(`routes removed: ${missing.join(', ')}`);
  else ok(`all ${expected.length} original routes present`);
  if (added.length) console.log(`  note  new routes (allowed): ${added.join(', ')}`);
}

// 2. Protected files
if (!existsSync(hashBaselinePath)) {
  fail('docs/baseline/protected-files.json missing');
} else {
  const expected = JSON.parse(readFileSync(hashBaselinePath, 'utf8'));
  for (const file of PROTECTED) {
    if (!expected[file]) { fail(`${file}: no baseline hash`); continue; }
    if (sha(read(file)) === expected[file]) ok(`${file} unchanged`);
    else fail(`${file} was modified (business logic must stay untouched)`);
  }
}

// 3. Portals frozen (Phase 1)
if (!existsSync(portalBaselinePath)) {
  fail('docs/baseline/portal-files.json missing');
} else {
  const expected = JSON.parse(readFileSync(portalBaselinePath, 'utf8'));
  const actualFiles = portalFiles();
  const changed = actualFiles.filter((f) => expected[f] && sha(read(f)) !== expected[f]);
  const missing = Object.keys(expected).filter((f) => !actualFiles.includes(f));
  const added = actualFiles.filter((f) => !expected[f]);
  if (changed.length) fail(`portal files modified: ${changed.join(', ')}`);
  if (missing.length) fail(`portal files removed: ${missing.join(', ')}`);
  if (added.length) fail(`unexpected new portal files: ${added.join(', ')}`);
  if (!changed.length && !missing.length && !added.length) ok(`${Object.keys(expected).length} portal files identical to the Phase 0 checkpoint`);
}

// 4. Store contract
const storeText = read(STORE_CONTRACT.file);
const missingTokens = STORE_CONTRACT.mustContain.filter((t) => !storeText.includes(t));
if (missingTokens.length) fail(`store contract broken, missing: ${missingTokens.join(' | ')}`);
else ok('customer store contract intact (persist key, version, actions)');

console.log(failed ? '\nSAFETY CHECK FAILED' : '\nSAFETY CHECK PASSED');
process.exit(failed ? 1 : 0);
