# Aturseva Landing — Worklog

Project: independent marketing landing page for Aturseva.
Workspace: `/home/z/landing-v2/` (fully isolated from `/home/z/my-project/` — the product repo is NEVER touched).
Canonical app: Next.js 16 + TypeScript + Tailwind 4 + GSAP 3.15, dev server on **port 3005** (`bun run dev`).
User-facing preview: self-contained single-file HTML served on **port 3006** (`bun run preview`) — see Task 5.

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Pre-flight + scaffold the isolated landing-v2 workspace (post sandbox-reset)

Work Log:
- Verified `/home/z/landing-v2` had been wiped by a sandbox reset (also `/tmp/skill-test` clones gone; logo + File-01 prompt still safe in `/home/z/my-project/upload/`, read-only).
- Created workspace dirs, copied the approved logo SVG to `public/assets/logo-primary.svg` (original never modified), `git init`.
- Wrote package.json pinning known-good versions for this sandbox (next 16.4.0, react 19.3.0, gsap 3.15.0, tailwindcss ^4, typescript ^5, @fontsource-variable/{manrope,fraunces}); `bun install` OK.
- Copied variable woff2 fonts (Manrope, Fraunces + italic) from @fontsource into `public/fonts/` with stable names for app + preview parity.

Stage Summary:
- Isolated Next.js workspace scaffolded on port 3005; fonts + logo in place; independent git history started (commit 2bb5e30).

---
Task ID: 2
Agent: main (Z.ai Code)
Task: Aturseva design system + app shell

Work Log:
- `src/app/globals.css`: Tailwind 4 `@theme` tokens — ink (deep teal-forest), brand (healing teal-emerald), gold (warm accent), ivory (warm paper) scales; shadows; keyframes (breathe, pulse-ring, ecg-march, blink, drift); self-hosted @font-face; grain overlay; glass cards; nav states; connection-section layout CSS (overlay cards, captions, mobile grid fallback); skip link; reduced-motion kill-switch.
- `src/components/Logo.tsx`: faithful inline copy of the approved logo (symbol + wordmark + optional tagline) driven by `currentColor` — works on ivory AND ink surfaces.
- `src/components/Nav.tsx` (client): fixed nav, scrolled glass state, mobile hamburger menu; `Footer.tsx`: full logo with tagline, philosophy quote, footer nav.

Stage Summary:
- Design language locked: cinematic dark/light alternation, Fraunces display + Manrope body, no blue/indigo anywhere.

---
Task ID: 3
Agent: main (Z.ai Code)
Task: Homepage — full 6-step narrative sections

Work Log:
- §1 Hero (`Hero.tsx`): dark cinematic stage, philosophy-led headline, journey-arc SVG with milestones, marching ECG heartbeat trace.
- §2 Journeys (`Journeys.tsx`): three "broken lane" cards (Patient/Doctor/Hospital) with pain-point chips.
- §3 Connection (`Connection.tsx`): SIGNATURE section — three SVG lanes draw apart, converge into glowing Aturseva hub, unified lane carries booking card → doctor card → hospital card (token counter) → Sevika chat bubbles; overlay items aligned to SVG viewBox coords via JS.
- §4 ProductReveal (`ProductReveal.tsx`): representative workspace mock (doctor day / live queue / Sevika panel) + 4 feature cards, honestly labelled "Representative preview".
- §5 Sevika (`Sevika.tsx`): doctor-approved reminder thread (5 messages, gold approval chips) + philosophy quote block.
- §6 Paths (`Paths.tsx`): three persona cards with CTAs + honest placeholder toast (no fake data collection).
- `page.tsx` / `layout.tsx` / metadata wired; skip-link a11y.

Stage Summary:
- Complete narrative implemented; honest copy only (owner-reported capabilities, no fabricated stats/partners/claims).

---
Task ID: 4
Agent: main (Z.ai Code)
Task: GSAP ScrollTrigger animation engine + QA fix loop

Work Log:
- `src/lib/aturseva-anim.js` (plain JS, no imports — shared verbatim with the preview artifact): nav scroll state, viewBox→px overlay positioning, hero intro (fade stagger + journey draw + milestones), generic [data-reveal] scroll reveals, broken-lane draws, product-window 3D tilt scrub, Sevika thread scrub+stagger.
- Connection behaviour via `gsap.matchMedia`: desktop = pinned scrub (end +=260%) with 5 phases + crossfading captions; mobile = choreographed auto-play (no pin); `prefers-reduced-motion` = static converged finale (all content visible).
- GSAP + ScrollTrigger lazy-loaded through `AnimationProvider` (code-split out of the initial bundle).
- agent-browser desktop (1440×900) + mobile (390×844) QA with VLM screenshot reviews; fixed: lane draw stagger/balance, station dots with halo + connector stems, card anchors (hub collision + right-edge safety), bubble narrative order, caption timings, card text contrast (ink-300→ink-200), grammar bug ("I'm a patients" → "I'm a patient"), queue continuation hint.
- Verified: 0 page errors, 0 console errors, no horizontal overflow (390/390 mobile, 1440/1440 desktop), mobile menu + anchor nav + toast all interactive, footer sits at page bottom.

Stage Summary:
- Signature scroll animation works end-to-end on desktop AND mobile; QA screenshots in `qa/`. Reduced-motion branch is code-verified (static finale) but not browser-emulated.
