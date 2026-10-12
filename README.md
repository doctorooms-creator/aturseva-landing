# Aturseva Landing (v1)

Independent marketing landing page for **Aturseva** — fully isolated from the product repo.

**GitHub (public):** <https://github.com/doctorooms-creator/aturseva-landing> (branch `main`)

## Live

- **Public URL (auto-deploys on every push to `main`):**
  <https://doctorooms-creator.github.io/aturseva-landing/>
  (GitHub Actions workflow `.github/workflows/deploy-pages.yml` → static export → Pages)

## Deploy to Vercel (optional, ~2 minutes)

The repo is Vercel-ready (framework auto-detected, `build` script present, zero config needed):

1. Open <https://vercel.com/new> and sign in.
2. **Import** the `doctorooms-creator/aturseva-landing` repository
   (connect the GitHub account if asked — private/public both work on the Hobby plan).
3. Leave every setting as default and click **Deploy**.
4. Vercel runs `next build` and serves the site at `…vercel.app` (custom domain attachable).

Note: a Vercel deploy requires the owner's Vercel account login — that step cannot be
automated from the sandbox. The GitHub Pages URL above is live meanwhile.

## Run

```bash
cd /home/z/landing-v2
bun run dev          # canonical Next.js app → http://localhost:3005
bun run preview      # self-contained preview server → http://localhost:3006
bun run build:preview  # regenerate preview/index.html from the running app
bun run build:pages   # static export for GitHub Pages → .next-pages/ (basePath /aturseva-landing)
```

## User-facing preview (sandbox gateway)

The sandbox gateway routes by the `XTransformPort` query parameter. Next.js dev
assets lose that parameter, so the user-facing preview is the **self-contained
single-file build** on port 3006:

> Open the Preview Panel → append `?XTransformPort=3006` to the URL
> (or "Open in New Tab" and add the parameter).

The file `preview/index.html` inlines compiled CSS, base64 fonts, GSAP +
ScrollTrigger and the shared animation module — zero external requests.

## Structure

- `src/app/` — layout, page, globals.css (design system)
- `src/components/` — Nav, Hero, Journeys, Connection (signature scroll), ProductReveal, Sevika, Paths, Footer, Logo (approved SVG inlined), AnimationProvider
- `src/lib/aturseva-anim.js` — vanilla GSAP engine (shared with preview build)
- `scripts/` — build-preview.ts (artifact builder), serve-preview.ts (port 3006)
- `public/assets/logo-primary.svg` — untouched copy of the approved logo
- `qa/` — agent-browser QA screenshots
- `worklog.md` — agent work log (append-only)

## Constraints honoured

- `/home/z/my-project/` (product repo, incl. its worklog) is never modified.
- No backend/API integration; no fabricated medical claims, stats, partners.
- `prefers-reduced-motion` respected; mobile-responsive; a11y skip-link & ARIA.
