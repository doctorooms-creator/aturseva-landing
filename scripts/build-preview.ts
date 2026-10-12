/**
 * build-preview.ts — build the self-contained single-file HTML preview.
 *
 * Why: the sandbox gateway routes by a `?XTransformPort=` query param that
 * Next.js asset URLs (/_next/...) drop, so a multi-file Next.js page breaks
 * through the gateway. This script snapshots the fully server-rendered
 * homepage (port 3005), strips every Next.js script/link reference, compiles
 * the Tailwind CSS, inlines the three variable fonts as base64 data URIs,
 * and inlines GSAP + ScrollTrigger + the site animation engine. The result
 * is ONE html file with zero external requests — served on port 3006.
 *
 * Usage: `bun scripts/build-preview.ts`  (or `bun run build:preview`)
 */

import { existsSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { appendFileSync } from "node:fs";

const ROOT = import.meta.dir + "/..";
const DEV_URL = "http://localhost:3005/";
const TMP_DIR = ROOT + "/.preview-tmp";
const OUT_DIR = ROOT + "/preview";
const OUT_FILE = OUT_DIR + "/index.html";

/* ───────────────────────── helpers ───────────────────────── */

function fail(msg: string): never {
  console.error("\n✖ " + msg);
  process.exit(1);
}

/** Remove every <script ...>...</script> block (Next.js chunks + React
 *  hydration/flight data). Non-greedy so each block ends at ITS closing tag;
 *  React escapes "</script>" inside flight payloads, so this is safe. */
function stripScripts(html: string): string {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "");
}

/** Remove <link ...> tags whose href points at /_next (dev CSS + preloads).
 *  Handles both self-closing and normal forms; non-/_next links are kept. */
function stripNextLinks(html: string): string {
  return html.replace(/<link\b[^>]*\/?>/gi, (tag) => {
    const href = tag.match(/href\s*=\s*["']([^"']*)["']/i);
    return href && href[1].startsWith("/_next") ? "" : tag;
  });
}

/** Inline the favicon (root-relative /icon.svg?…) as a base64 data URI so the
 *  single-file preview keeps its icon with zero external requests. */
async function inlineIcon(html: string): Promise<string> {
  const iconPath = ROOT + "/src/app/icon.svg";
  if (!existsSync(iconPath)) return html;
  const iconBytes = Buffer.from(await Bun.file(iconPath).arrayBuffer());
  const dataUri =
    "data:image/svg+xml;base64," + iconBytes.toString("base64");
  const inlined = html.replace(
    /href="\/icon\.svg[^"]*"/gi,
    'href="' + dataUri + '"'
  );
  if (inlined !== html) console.log("  favicon inlined as data URI (" + (iconBytes.length / 1024).toFixed(1) + " KB)");
  return inlined;
}

/* ─────────────────── 1) fetch SSR'd homepage ─────────────────── */

console.log("→ fetching SSR HTML from " + DEV_URL);
let res: Response;
try {
  res = await fetch(DEV_URL, { headers: { "user-agent": "preview-builder" } });
} catch (e) {
  fail(
    "dev server unreachable at " + DEV_URL +
    " — is `bun run dev` (port 3005) running?\n  " + (e as Error).message
  );
}
if (!res.ok) fail("dev server responded " + res.status + " for " + DEV_URL);
const rawHtml = await res.text();
if (!/<body/i.test(rawHtml) || !rawHtml.includes("Aturseva")) {
  fail("SSR HTML from 3005 looks wrong (no <body> or no 'Aturseva' content)");
}
console.log("  ok — " + rawHtml.length + " bytes of server-rendered markup");

/* ─────────────────── 2) split + process head/body ─────────────────── */

// Locate the three structural anchors. (Next always emits all of them.)
const headOpen = rawHtml.search(/<head\b[^>]*>/i);
const headClose = rawHtml.indexOf("</head>", headOpen);
const bodyOpen = rawHtml.search(/<body\b[^>]*>/i);
const bodyClose = rawHtml.indexOf("</body>", bodyOpen);
if (headOpen < 0 || headClose < 0 || bodyOpen < 0 || bodyClose < 0) {
  fail("could not locate <head>/<body> boundaries in SSR HTML");
}

const preamble = rawHtml.slice(0, headOpen); // <!DOCTYPE html><html lang="en">
let head = rawHtml.slice(headOpen, headClose + "</head>".length); // <head>…</head>
let body = rawHtml.slice(bodyOpen, bodyClose); // <body …>… (no </body>)
const postlude = rawHtml.slice(bodyClose + "</body>".length); // </html>

// Head: drop scripts + /_next links; inline the favicon; keep meta/title/inline styles.
head = await inlineIcon(stripNextLinks(stripScripts(head)));
// Body: drop scripts (React hydration/flight data). We also strip any stray
// /_next link tags here — markup that references /_next can't load through
// the gateway anyway, and the self-containment audit below enforces this.
body = await inlineIcon(stripNextLinks(stripScripts(body)));

/* ─────────────────── 3) compile Tailwind CSS ─────────────────── */

console.log("→ compiling Tailwind CSS (globals.css → .preview-tmp/styles.css)");
mkdirSync(TMP_DIR, { recursive: true });
const tw = Bun.spawnSync(
  ["bunx", "@tailwindcss/cli", "-i", "./src/app/globals.css", "-o", "./.preview-tmp/styles.css", "--minify"],
  { cwd: ROOT, stdout: "pipe", stderr: "pipe" }
);
if (tw.exitCode !== 0) {
  fail(
    "tailwind CLI failed (exit " + tw.exitCode + "). If bunx tried to hit the network:\n" +
    "  stdout: " + tw.stdout.toString().trim() + "\n" +
    "  stderr: " + tw.stderr.toString().trim()
  );
}
const cssPath = TMP_DIR + "/styles.css";
if (!existsSync(cssPath)) fail("tailwind produced no output at " + cssPath);
let css = await Bun.file(cssPath).text();
console.log("  ok — " + css.length + " bytes minified");

/* ─────────────── 4) inline fonts as base64 data URIs ─────────────── */

// globals.css references url("/fonts/<name>.woff2") three times; swap each
// for a data URI read from public/fonts/<name>.woff2.
const fontDir = ROOT + "/public/fonts";
const fontNames = [
  ...new Set([...css.matchAll(/\/fonts\/([A-Za-z0-9._-]+\.woff2)/g)].map((m) => m[1])),
];
if (fontNames.length !== 3) {
  fail("expected exactly 3 distinct /fonts/ references in compiled CSS, found " + fontNames.length);
}
for (const name of fontNames) {
  const fontFile = fontDir + "/" + name;
  if (!existsSync(fontFile)) fail("font file missing: " + fontFile);
  const bytes = Buffer.from(await Bun.file(fontFile).arrayBuffer());
  const dataUri = "data:font/woff2;base64," + bytes.toString("base64");
  css = css.split("/fonts/" + name).join(dataUri);
  console.log(
    "  font inlined: " + name + " (" + (bytes.length / 1024).toFixed(1) +
    " KB → " + (dataUri.length / 1024).toFixed(1) + " KB base64)"
  );
}
if (css.includes("/fonts/")) fail("font inlining incomplete — url(/fonts/…) still present in CSS");
const fontCount = (css.match(/data:font\/woff2;base64,/g) || []).length;
if (fontCount !== 3) fail("expected exactly 3 inlined fonts, found " + fontCount);

/* ─────────────── 5) assemble the single-file document ─────────────── */

console.log("→ assembling self-contained document");
const gsapJs = await Bun.file(ROOT + "/node_modules/gsap/dist/gsap.min.js").text();
const stJs = await Bun.file(ROOT + "/node_modules/gsap/dist/ScrollTrigger.min.js").text();
const animJs = await Bun.file(ROOT + "/src/lib/aturseva-anim.js").text();
for (const [label, src] of [["gsap", gsapJs], ["ScrollTrigger", stJs], ["aturseva-anim", animJs]] as const) {
  if (!src.trim()) fail("empty payload: " + label);
  if (src.includes("</script")) fail(label + " contains '</script' — cannot inline safely");
}

// Boot the animation engine once the DOM is parsed. (In the Next.js app this
// is done by AnimationProvider; here it is a classic-script bootstrap.)
const bootstrap =
  "<script>window.addEventListener('DOMContentLoaded',function(){" +
  "if(typeof window.initAtursevaAnimations==='function'&&window.gsap&&window.ScrollTrigger){" +
  "window.initAtursevaAnimations(window.gsap,window.ScrollTrigger);}});</script>";

// The compiled CSS already sets html{scroll-behavior:smooth} and the body
// background — nothing else is needed, so no extra flash-guard style block.
const styleTag = "<style>\n" + css + "\n</style>";
const out =
  preamble +
  head.replace(/<\/head>/i, styleTag + "\n</head>") +
  body +
  "\n<script>\n" + gsapJs + "\n</script>" +
  "\n<script>\n" + stJs + "\n</script>" +
  "\n<script>\n" + animJs + "\n</script>" +
  "\n" + bootstrap +
  "\n</body>" +
  postlude;

/* ─────────────── 6) write preview/index.html ─────────────── */

mkdirSync(OUT_DIR, { recursive: true });
await Bun.write(OUT_FILE, out);
console.log("  wrote " + OUT_FILE);

/* ─────────────── 7) report + self-containment audit ─────────────── */

const total = Buffer.byteLength(out, "utf8");
console.log("\n── build report ──────────────────────────────");
console.log("  total size : " + (total / 1024).toFixed(1) + " KB (" + total + " bytes)");
console.log("  css inlined: " + (css.length / 1024).toFixed(1) + " KB (3 fonts base64)");
console.log("  js inlined : gsap " + (gsapJs.length / 1024).toFixed(0) + " KB · ScrollTrigger " + (stJs.length / 1024).toFixed(0) + " KB · anim " + (animJs.length / 1024).toFixed(1) + " KB");

// Audit: any remaining root-relative src/href breaks the gateway (assets lose
// the ?XTransformPort param). Anchors (#…) and /#… are fine — same document.
const offenders = [
  ...out.matchAll(/src="([^"]*)"/g),
  ...out.matchAll(/href="([^"]*)"/g),
]
  .map((m) => m[1])
  .filter((v) => v.startsWith("/") && !v.startsWith("/#"));

if (offenders.length > 0) {
  console.error("  ✖ SELF-CONTAINMENT FAILED — root-relative references remain:");
  for (const o of offenders) console.error("      " + o);
  process.exit(1);
}
console.log("  self-containment: OK — 0 root-relative src/href references");
console.log("───────────────────────────────────────────────\n");

/* ─────────────── 8) gitignore the build temp dir ─────────────── */

const gitignorePath = ROOT + "/.gitignore";
const gitignore = existsSync(gitignorePath) ? await Bun.file(gitignorePath).text() : "";
if (!gitignore.split("\n").some((l) => l.trim() === ".preview-tmp/")) {
  appendFileSync(gitignorePath, (gitignore.endsWith("\n") ? "" : "\n") + ".preview-tmp/\n");
  console.log("→ added .preview-tmp/ to .gitignore");
}

console.log("✔ preview build complete → " + OUT_FILE);
