/**
 * serve-preview.ts — tiny static server for the self-contained preview.
 *
 * Serves preview/index.html (ONE file, zero external requests) on port 3006.
 * The file is re-read on every request, so `bun run build:preview` output
 * shows up without a server restart (and `bun --hot` keeps this script
 * itself fresh). Run with: `bun run preview`.
 */

const PORT = 3006; // hardcoded: 3005 is the canonical dev server, never touched
const PREVIEW_FILE = import.meta.dir + "/../preview/index.html";

Bun.serve({
  port: PORT,

  async fetch(req) {
    const path = new URL(req.url).pathname;

    // The preview document itself.
    if (path === "/" || path === "/index.html") {
      const file = Bun.file(PREVIEW_FILE);
      if (await file.exists()) {
        return new Response(file, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }
      return new Response(
        "preview/index.html not found — run `bun run build:preview` first.\n",
        { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }

    // Browsers probe for this on every navigation; answer quietly.
    if (path === "/favicon.ico") return new Response(null, { status: 204 });

    // Everything else (e.g. a stray /_next/... request) redirects home —
    // the single-file artifact needs no other routes.
    return new Response(null, {
      status: 302,
      headers: { location: "/" },
    });
  },
});

console.log(
  "→ Aturseva preview on http://localhost:" + PORT + "/ (self-contained index.html)"
);
