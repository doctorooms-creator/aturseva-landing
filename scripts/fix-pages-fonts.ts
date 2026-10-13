/**
 * fix-pages-fonts.ts — B15 release-gate step for the GitHub Pages export.
 *
 * Defect (B15): globals.css declares the three self-hosted @font-face blocks
 * with root-absolute url("/fonts/…"). `next build` (DEPLOY_TARGET=pages)
 * rewrites asset <link> URLs for the basePath (/aturseva-landing) but does
 * NOT rewrite url() references inside the emitted CSS — so production
 * requests https://…//fonts/*.woff2 at the site root → 404, and the live
 * site renders fallback fonts (verified: File 08 §11.4 evidence).
 *
 * Fix (family F1 — basePath-aware URL construction, selected on build
 * evidence in File 11 §10): after the pages build, rewrite every
 * root-absolute font url() in every emitted .next-pages CSS file to the
 * basePath-prefixed equivalent. Dev (:3005, root-served) and the preview
 * (build-preview.ts compiles globals.css directly) are untouched.
 *
 * Hard assertions (File 10 §11: no rewrite without an assertion): any
 * unexpected state exits non-zero so the deploy fails loudly instead of
 * shipping broken fonts.
 *
 * Wired into `bun run build:pages`; runs locally and in GitHub Actions
 * (.github/workflows/deploy-pages.yml — unchanged).
 */

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const ROOT = import.meta.dir + "/..";
const DIST = join(ROOT, ".next-pages");
const BASE = "/aturseva-landing";
const FONTS = [
  "Manrope-Variable.woff2",
  "Fraunces-Variable.woff2",
  "Fraunces-Variable-Italic.woff2",
];

function fail(msg: string): never {
  console.error("\n✖ fix-pages-fonts: " + msg);
  process.exit(1);
}

function walk(dir: string, ext: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, ext));
    else if (e.name.endsWith(ext)) out.push(p);
  }
  return out;
}

/* ── 0) sanity: the export exists ─────────────────────────────── */
if (!existsSync(DIST) || !statSync(DIST).isDirectory()) {
  fail(".next-pages/ not found — run the pages build first (DEPLOY_TARGET=pages next build)");
}

/* ── 1) rewrite root-absolute font url()s in every emitted CSS ── */
/* Matches url(/fonts/…), url("/fonts/…") and url('/fonts/…'). */
const FONT_URL = /url\((["']?)\/fonts\//g;
const cssFiles = walk(DIST, ".css");
if (cssFiles.length === 0) fail("no CSS files found under .next-pages — build output shape changed?");

let total = 0;
for (const file of cssFiles) {
  const src = readFileSync(file, "utf8");
  const hits = src.match(FONT_URL) || [];
  if (hits.length === 0) continue;
  FONT_URL.lastIndex = 0;
  writeFileSync(file, src.replace(FONT_URL, `url($1${BASE}/fonts/`));
  total += hits.length;
  console.log(`  ${file.replace(ROOT + "/", "")}: ${hits.length} font url() → ${BASE}/fonts/`);
}
console.log(`  rewritten ${total} root-absolute font url() reference(s) in ${cssFiles.length} CSS file(s)`);

/* ── 2) assertions ────────────────────────────────────────────── */
if (total < FONTS.length) {
  fail(`expected ≥${FONTS.length} font url() rewrites, found ${total} — @font-face declarations missing from the build?`);
}
for (const name of FONTS) {
  const exported = join(DIST, "fonts", name);
  if (!existsSync(exported)) fail(`font missing from export: .next-pages/fonts/${name}`);
  const referenced = cssFiles.some((f) =>
    readFileSync(f, "utf8").includes(`${BASE}/fonts/${name}`)
  );
  if (!referenced) fail(`${name} is not referenced with the ${BASE}/fonts/ prefix after rewrite`);
}
/* no root-absolute font url() may remain anywhere in the CSS */
const leftover = /url\((["']?)\/fonts\//;
for (const f of cssFiles) {
  if (leftover.test(readFileSync(f, "utf8"))) {
    fail(`root-absolute url(/fonts/…) still present in ${f.replace(ROOT + "/", "")}`);
  }
}
/* guard: no root-absolute /fonts/ reference in any emitted HTML either */
for (const f of walk(DIST, ".html")) {
  if (/["'(]\/fonts\//.test(readFileSync(f, "utf8"))) {
    fail(`root-absolute /fonts/ reference in ${f.replace(ROOT + "/", "")}`);
  }
}

console.log(`✔ fix-pages-fonts: all font URLs basePath-prefixed (${BASE}), assertions green`);
