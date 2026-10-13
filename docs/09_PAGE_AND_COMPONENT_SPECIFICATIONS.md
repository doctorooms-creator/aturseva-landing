# Aturseva — File 09: Page and Component Specifications

**Status:** `PLANNING — NOT IMPLEMENTED`
**Created:** 2026-10-13 (working-session date; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `e30dcc8` (source tree identical to `f407e78` — verified empty diff; all line citations refer to `e30dcc8`, stable symbol names remain the reference if lines drift).
**Planning dependencies:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (capability/claims truth — authority 1), owner decisions in project history (authority 2 — canonical tagline **"Care that walks with you."**), `docs/04_SITEMAP_AND_NAVIGATION.md` (route/anchor/CTA truth — authority 3), `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md` (design system — authority 4), `docs/06_HOMEPAGE_STORYBOARD.md` (frame IDs — authority 5), `docs/07_MOTION_AND_SCROLL_ANIMATION.md` (motion detail — authority 6), current source code (implementation truth — authority 7), `docs/08_VISUAL_ASSET_PLAN.md` (asset plan/VS scene IDs — created in the same batch as this file).
**Scope:** the engineering/design contract for the existing single landing route `/` and its current components — current verified behaviour, separated from proposed future contracts. **This document implements nothing, patches no metadata, and authorizes no edits. File 11 owns batch sequencing; File 12 owns measurable QA execution.**
**Verification method:** full source audit at `e30dcc8` (every rendered component, `layout.tsx`, `page.tsx`, `globals.css`, `aturseva-anim.js`, `AnimationProvider.tsx`, `package.json`, `next.config.ts`, deploy workflow, complete `public/` tree) plus live-site HTTP/browser checks (font verification evidence in §5 and File 08 §11.4). **No visual QA pass of the page was run for this document; no accessibility/performance conformance is claimed.** Unexecuted tests are marked `NOT RUN`.

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-13 | Initial creation; 27 sections; per-component contracts; CTA matrix reconciled with File 04 §10; backlog B1–B18 consolidated with crosswalk; new findings B17–B18 (B15–B16 originate in File 08, same batch) | Files 08+09 combined planning task |

**Backlog convention (canonical, continuing Files 06–08):** B1–B8 = File 04 §16 items (see §26 crosswalk for the 7/8 ordering nuance); B9 = File 05 §19 item 9; B10 = File 06; B11–B14 = File 07; **B15–B16 = File 08 (same batch); B17–B18 = this file.** IDs are never renumbered; resolved items keep their ID with evidence.

---

## 1. Document control, purpose and authority

- **Purpose:** a component-by-component contract detailed enough for a future batched implementation plan (File 11) and test plan (File 12), grounded exclusively in verified current behaviour.
- **Exclusions:** no implementation, no copy changes, no asset creation, no route creation, no metadata patching, no QA execution. File 10 (architecture) and File 11 (implementation plan) do not exist yet; references to them are planning pointers, not created documents.
- **Status labels:** `VERIFIED CURRENT` (source-cited this audit), `CURRENT RISK` (source-cited defect/fragility), `PROPOSED` (future contract, not implemented), `OWNER DECISION REQUIRED`, `NOT IMPLEMENTED` / `NOT RUN`.
- **Conflict rule:** when a planning document and source disagree, the mismatch is documented (e.g. §26 double-boot note) — neither is silently rewritten. Current code is evidence for what exists; approved owner decisions govern future direction.

---

## 2. Route inventory and information architecture

**Verified route surface (`src/app/` at `e30dcc8`):** `layout.tsx`, `page.tsx`, `globals.css`, `icon.svg` — exactly one route, `/`. No other route files exist anywhere in `src/app/`.

| Route / anchor | Status | Evidence |
|---|---|---|
| `/` (homepage) | `VERIFIED CURRENT` — the only route | `src/app/page.tsx` |
| `#top` (hero), `#main` (skip target), `#site-nav`, `#nav-mobile` | `VERIFIED CURRENT` | `Hero.tsx:10`, `page.tsx:14–18`, `Nav.tsx:17,79` |
| `#journeys`, `#connection`, `#platform`, `#sevika`, `#paths` | `VERIFIED CURRENT` — the five story anchors (File 04 §5 1:1) | section `id` attributes in each component |
| `/patients`, `/doctors`, `/hospitals`, `/sevika` (pages), `/how-it-works` | **`PROPOSED / NOT LIVE`** — File 04 §6 Phase-1 proposals; no route files exist | `src/app/` tree listing |

**Binding rule:** no CTA, link, doc or test may describe a proposed route as working. Every current interactive element resolves to an in-page anchor (verified — full matrix §14).

---

## 3. Homepage composition and render order

`src/app/page.tsx` (30 lines) — DOM order = story order (File 06 §5; File 04 §9):

| Order | Element | Source | Purpose | Anchor | Shared deps | Import behaviour | Storyboard frames |
|---|---|---|---|---|---|---|---|
| 0 | Skip link "Skip to content" | `page.tsx:14–16` | a11y bypass | `#main` | `.skip-link` CSS | server component | — |
| 0b | Nav (fixed header) | `Nav.tsx` ("use client") | orientation | `#site-nav` | `Logo` | client (menu state) | N-01–03 |
| 1 | Hero | `Hero.tsx` | emotional frame | `#top` | `Logo` | server | H-01–05 |
| 2 | Journeys | `Journeys.tsx` | the problem | `#journeys` | — | server | J-01–03 |
| 3 | Connection | `Connection.tsx` | signature convergence | `#connection` | `Logo` | server | C-01–06, C-01m, C-01r |
| 4 | ProductReveal | `ProductReveal.tsx` | labelled evidence | `#platform` | — | server | P-01–03 |
| 5 | Sevika | `Sevika.tsx` | continued care | `#sevika` | — | server | S-01–03 |
| 6 | Paths | `Paths.tsx` ("use client") | role doors | `#paths` | — | client (toast state) | R-01–03 |
| 7 | Footer | `Footer.tsx` | quiet close | — | `Logo` | server | F-01–02 |
| 8 | AnimationProvider | `AnimationProvider.tsx` ("use client") | lazy GSAP boot | — | `aturseva-anim.js` | client, code-split | all M-* |

Verified: order matches File 04 §9 and File 06 §5 exactly; no structural drift. `<main id="main">` wraps sections 1–6; footer follows `main` (shell notes §5).

---

## 4. Design-system implementation contract

Authoritative source: File 05 (not redefined here). What a component contract needs:

- **Monochrome tokens:** `ink-*` (near-black scale), `brand-*` (primary grey accent), `gold-*` (second grey accent), `ivory-*` (paper lights) — all values verified neutral (`globals.css:13–54`). **Legacy naming caution:** `brand/gold/ivory` names carry neutral values; they must not be reinterpreted as coloured branding (File 05 §5.3 rename is a proposed File 11 refactor, tracked there as §19-1, no B-ID).
- **Typography:** `--font-display` Fraunces (italic accents — one-accent rule per heading, File 05 §6), `--font-sans` Manrope; self-hosted WOFF2 via `@font-face` (§5). `.eyebrow` = 11–12px extrabold uppercase 0.26em tracking (`globals.css:140–142`).
- **Spacing rhythm:** section paddings `py-24 sm:py-32`; card padding `p-4`–`p-7`; grid gaps `gap-6`; 4/8-based utilities throughout (verified usage).
- **Frame widths:** `max-w-7xl` shell (1280px), `max-w-3xl`/`max-w-2xl`/`max-w-5xl` content bands (verified per component).
- **Surfaces/borders/radius:** `rounded-2xl`/`rounded-3xl` cards; hairline borders (`border-ink-100/80`, `border-white/10` on dark); `shadow-soft`/`shadow-lift`/`shadow-glow` tokens; `.glass` frosted cards on dark stages.
- **Focus behaviour:** global `:focus-visible` — 2px `gold-500` outline, 3px offset, 6px radius (`globals.css:122–126`). Verified present on all interactive elements via global rule.
- **Touch targets:** 48px primary CTAs (`h-12`, Hero), 44px secondary (`h-11`, nav hamburger, scroll cue, Paths CTAs) — verified.
- **Motion principles:** File 07 §2 (calm, informative, monochrome, no spectacle) — compact per-component cross-ref in §18.
- **Grain + ambient glows:** `.grain` overlay 0.4 opacity on dark stages; neutral radial glows (verified `bg-brand-600/25`-class usages — neutral values).
- **Semantics constraint:** colour never carries meaning alone — queue states are text-first (verified `ProductReveal.tsx:5–16`), lanes differentiate by label+position+grey (File 06 §17).

---

## 5. Global shell: layout, metadata, fonts and theme

**Verified current facts:**

- `layout.tsx:4–14` — `metadata`: title `"Aturseva — Care that walks with you"` (canonical tagline, verbatim — owner-approved); description `"Aturseva weaves patients, doctors, and hospitals into one calm, coordinated experience — from the first booking to Sevika's doctor-approved follow-up care."`; `openGraph`: same title + description `"One journey, in step: patients, doctors, and hospitals connected by Aturseva."`, `type: "website"`. `viewport` (`layout.tsx:16–20`): `themeColor "#0a0a0b"`, `width: "device-width"`, `initialScale: 1`. `<html lang="en">`; `<body>` carries no utility classes.
- **Verified absent (do not invent):** canonical URL, robots directives, twitter-card metadata, `og:image`, structured data, analytics/tracking of any kind. OG preview is text-only today; a future `og:image` is an owner-gated File 08 §20-5 asset decision.
- **Fonts:** three self-hosted WOFF2 variable fonts in `public/fonts/` (Manrope 200–800; Fraunces 300–900 roman + italic) via `@font-face` with `font-display: swap` (`globals.css:88–108`). The `@fontsource-variable/*` devDependencies in `package.json` are **unused by app code** (verified: no imports) — package-hygiene note only, no backlog ID.
- **B15 (`CURRENT RISK`, verified live — from File 08 §11.4):** the `@font-face` URLs are root-absolute (`/fonts/…`); on the GitHub Pages export (`basePath: /aturseva-landing`) the deployed CSS still requests origin-root paths → **404 → the live site renders with fallback fonts** (browser-verified: `document.fonts.check('16px Manrope'|'16px Fraunces')` both false, zero loaded faces; dev :3005 verified healthy with 3 loaded faces). Fix belongs to File 11 (`PROPOSED` options: basePath-aware reference strategy or `next/font/local` migration). **Future acceptance expectation:** every asset reference must fetch 200 on **both** deploy targets (root and basePath) — proof by live fetch, not dev-server behaviour.
- **Shell layout:** `body` is plain block flow (`globals.css:114–117`); the footer's `mt-auto` (`Footer.tsx:5`) therefore computes to `0px` (browser-verified) — the sticky-footer-on-short-pages intent (File 04 §17-5 "sticky footer intact") is **not actually implemented**. No observable defect today (page height 7458px ≫ viewport — verified), but the pattern is inert. **B18 (new, `CURRENT RISK` latent, P3):** add a flex-column shell (`min-h-screen flex flex-col` on body/appropriate wrapper + keep `mt-auto`) in a future File 11 pass if the File 04 acceptance criterion is meant literally.
- **Skip link:** `.skip-link` fixed, translates into view on focus (`globals.css:145–147`) — verified first element in DOM (`page.tsx:14–16`), target `#main` exists.
- **Deploy targets (next.config.ts, verified):** default = root-served standard build (dev :3005, preview :3006, Vercel); `DEPLOY_TARGET=pages` → `output: "export"`, `basePath: "/aturseva-landing"`, `distDir: ".next-pages"`, `images: { unoptimized: true }`. One workflow (`.github/workflows/deploy-pages.yml`) builds and publishes the Pages artifact on push to main.

---

## 6. Navigation component contract

**Source:** `src/components/Nav.tsx` (client). Frames N-01–03; motion M-N.

**Verified current behaviour:**

| Aspect | Contract |
|---|---|
| Structure | `<header id="site-nav" class="fixed inset-x-0 top-0 z-50">` → `<nav aria-label="Main navigation">`; wordmark `Logo variant="word"` (h-8/h-9, ivory) → `#top` with `aria-label="Aturseva — back to top"` |
| Desktop links (≥lg) | The Journeys → `#journeys` · How it connects → `#connection` · Platform → `#platform` · Sevika → `#sevika` (`LINKS`, lines 6–11) |
| Desktop CTA | "Get started" pill → `#paths` (brand-400, hover lift) — `hidden` below `sm` (line 44–49) |
| Mobile menu | 44×44 hamburger (`h-11 w-11`), `aria-expanded`/`aria-controls="nav-mobile"`/dynamic `aria-label` "Open menu"/"Close menu" (lines 50–56); panel `#nav-mobile`: ink-950/95, blur, same 4 links (44px+ rows) + full-width "Get started"; every link `onClick` closes the panel (lines 77–105) |
| Scrolled state | `nav-scrolled` toggled at `scrollY > 48` (passive listener, `aturseva-anim.js:38–41`); styles: 82% ink-950 surface, 14px blur, hairline white/8, deep shadow (`globals.css:273–277`), 350ms transition (267–269). Reversible; identical all widths |
| CTA truth | all five destinations are honest in-page anchors (File 04 §10 rows 1–7) — `VERIFIED CURRENT` |

**Verified gaps / not implemented (do not claim as current):**

- **Escape-to-close:** absent (no key handler). **Focus return to toggle after menu close:** absent (relies on DOM order). Both are `PROPOSED` future refinements (File 07 §12 note) for File 11.
- **Active-section indication:** absent (verified) — `PROPOSED` (File 04 §7: IntersectionObserver + neutral underline, reduced-motion-safe).
- **"Platform" label clarity:** current label leads to the labelled preview; self-explaining label (e.g. "How it works") is a File 04 §10-4 `PROPOSED` wording change — final wording at implementation.

**Header overlay/contrast consideration:** the fixed header crosses light sections (Journeys→ProductReveal band) when scrolled; the 82% ink surface maintains dark-on-dark consistency; contrast over light sections is a File 12 test target (File 05 §17), not a verified result.

---

## 7. Hero component contract

**Source:** `src/components/Hero.tsx`. Frames H-01–05; motion M-H1–H3. Anchor `#top`.

**Verified content (exact copy):**

- Eyebrow: "Aturseva · Care in step" (with mark badge: 12×12 rounded, `Logo variant="mark"`).
- H1 (Fraunces, `2.6rem`→`text-7xl`): "Healthcare is a journey." / *"No one should walk it alone."* (second line italic accent — one-accent rule).
- Lead: "Aturseva weaves **patients**, **doctors**, and **hospitals** into one calm, coordinated experience — from the first booking to the last follow-up."
- CTA pair: "Begin the journey" → `#journeys` (h-12, brand-400); "I'm a patient · doctor · hospital" → `#paths` (h-12 outline) — both honest in-page; secondary wording simplification is File 04 §10-9 `PROPOSED` only.
- Journey arc (≥md only, `aria-hidden`): milestones "Book" / "Wait, informed" / "Consult"; gradient stops `#9aa0a3→#bfc4c6→#d0d2d4` (B9 hardcoded greys).
- ECG base: `#8b9093` stroke, sr-only text "A calm heartbeat line — Aturseva keeps the pulse of every journey." (lines 128–130).

**Layout contract:** `min-h-svh` dark stage (`ink-950`/`ivory-50`), left-aligned content block (`max-w-7xl`, `pt-32/36` clears fixed nav), ambient neutral glows + `.grain`; ECG pinned to stage bottom (`mt-auto` within the hero's own flex column — verified working inside this section). Mobile: arc hidden (<md), CTAs wrap full-width, H1 at 2.6rem.

**Media slot:** right-of-text negative space is reserved for **VS-01** (File 08 §7) — an *optional, owner-approved* still/film. **No hero video requirement exists as fact** (File 08 §9: current zero-asset route is a valid permanent fallback). If ever integrated: alt/decorative classification, poster, both-deploy fetch proof, and contrast floors per File 08 §10–§13.

**Animation mapping:** M-H1 fades (`data-hero-fade`, 0.9s, stagger 0.09, start 0.15), M-H2 arc draw (1.6s @0.55) + milestone pop (0.45s `back.out(2.2)` @1.2), M-H3 ECG loop (7s). **Static states:** no-JS and reduced-motion render the natural, fully visible DOM (verified: hidden states are applied only inside builders). Alt/contrast rules: copy never sits over unverified imagery; current stage guarantees contrast by construction.

---

## 8. Journeys component contract

**Source:** `src/components/Journeys.tsx`. Frames J-01–03; motion M-J1–J3. Anchor `#journeys`.

**Verified content (exact):** eyebrow "The problem today"; H2 "Three journeys. *Rarely in step.*"; lead "Every clinic day, three separate journeys unfold around the same appointment — each running on its own, each carrying its own weight."

| Card | Title | Body (exact) | Chips (exact) | Lane grey |
|---|---|---|---|---|
| Patient | "The long wait" | "Books an appointment, then waits — away from work and family, never quite sure when the turn will come." | Unclear token status · Hours in waiting rooms · Forgotten follow-ups | `#7a8083` |
| Doctor | "The full day" | "A packed OPD, a queue to keep fair, notes to write — and every patient's next visit to remember." | Back-to-back slots · Manual queue calls · Follow-up blind spots | `#565b5e` |
| Hospital | "The busy desk" | "The front desk juggles calls, walk-ins, and tokens while every counter asks for the same information again." | Phone-only booking · Paper tokens · Fragmented view | `#a5abae` |

Card footer line: "…a journey with a gap in the middle". Bridge: italic "What if these journeys spoke to each other?" + 44×44 icon-only scroll cue (`aria-label="Scroll to see how the journeys connect"`) → `#connection`.

**Role/visuals:** storytelling via copy + broken-lane SVGs (decorative, `aria-hidden`, visible at all breakpoints — verified); lanes animate as dash draws (M-J2, per-path, `top 92%`, once). Responsive: `md:grid-cols-3` stack→grid. **Constraints:** no fourth persona; no capability claims beyond File 02 matrix; no portrait inserts unless VS-02/03/04 are owner-approved (File 08 §7 — `PROPOSED`). Acceptance: chips remain legible; card semantics `<article>` with `<h3>`; consistent lane greys across the set (continuity into Connection).

---

## 9. Connection component contract

**Source:** `src/components/Connection.tsx`; animation `aturseva-anim.js:77–312`. Frames C-01–C-06, C-01m, C-01r; motion M-C1–C6, M-Cm, M-Cr. Anchor `#connection`. Section heading is sr-only `<h2>` "How Aturseva connects the three journeys".

**Verified illustrative sample data (exact):**

| Element | Content |
|---|---|
| Captions (crossfade, exact) | 1 "Today, three journeys move apart…" · 2 "Aturseva joins them into one calm flow." · 3 "One booking travels — doctor and hospital, instantly in step." · 4 "And Sevika stays beside the patient." |
| Booking card (ivory) | eyebrow "Patient · Booking" · "Appointment confirmed" · "Dr. Mehta · General OPD · 11:30 AM" · chip "Token #14" |
| Doctor card (glass) | eyebrow "Doctor · Today" · "Dr. Mehta's OPD" · "Token 11 in room · 3 waiting" · progress bar (60% width, brand-400) |
| Hospital card (glass) | eyebrow "Hospital · Front desk" · "One live queue" · "Online + walk-in, synced across counters" · "Tokens today: **42**" (`#token-counter`, static) |
| Sevika bubble 1 | "Your token is **#14** — about 20 minutes left." + "Doctor approved" chip |
| Sevika bubble 2 | "Aaj raat 8 baje — first dose, after food." + "Doctor approved" chip — **Hinglish inside illustrative Sevika dialogue**; must be covered by the same B2/B3 labelling as the thread |

**Choreography contract (verified):** desktop ≥768 — pinned/scrubbed (`top top` → `+=260%`, scrub 1, `anticipatePin: 1`, `onRefresh: positionOverlay`): lanes draw apart → converge (attr-`d` morph to CONVERGED paths) → unified lane draws → booking travels past station dots (booking 616,295 · doctor 792,311 · hospital 960,300 · sevika 1150,215) → cards pop in sequence; captions crossfade at scrub positions. Mobile <768 — static 2-col card grid (`globals.css:226–248`: labels/stems hidden, cards `p-3`/11px) + choreographed autoplay **once** at `top 72%` (`aturseva-anim.js:223–286`). Reduced motion — static finale: converged lanes, all dots visible, last caption only (`setConnectionStatic`, lines 288–312). Cards/overlay are `pointer-events: none` (verified); `positionOverlay` re-runs at 350ms/resize/fonts-ready (boot sequence, lines 425–451).

**Known gaps (tracked, not fixed here):**

- **B2 (`CURRENT RISK`, P0):** the three cards + two bubbles carry sample names/tokens/counts with **no visible "Representative preview" label** — the ProductReveal badge pattern must be extended here. **Placement contract for the future fix:** the label must sit **outside the animated/faded elements** — e.g. a persistent caption-area or stage-level label — never inside a `.conn-card` that pops via `autoAlpha`, and never inside a caption that crossfades. It must also survive the mobile static grid and the reduced-motion finale.
- **B10 (P1, folds into B2):** label legibility under mobile card condensation (11px cards) — 11px-floor label styling required.
- **B11 (P2):** caption 3's "instantly in step" — future copy pass may soften to "in step" (`PROPOSED` copy only).

**No live status behaviour or real data may be invented** — the queue values stay static; "One live queue" describes the confirmed capability (File 02 rows 2–3), governed by the future label.

---

## 10. ProductReveal component contract

**Source:** `src/components/ProductReveal.tsx`. Frames P-01–03; motion M-P1–P3. Anchor `#platform`.

**Verified structure/content (exact):**

- Intro: eyebrow "The platform"; H2 "One workspace. *Every side of care.*"; lead "The same appointment, living calmly in three places at once — the patient's phone, the doctor's day, and the hospital's desk."
- **"Representative preview" badge** — pill, uppercase, dot marker, centred above the window (lines 31–34): the canonical label pattern for all non-live UI.
- Window chrome: three neutral dots; title "Aturseva workspace · City Care Hospital"; right-aligned "Live" + blinking dot (brand-500, `aria-hidden` dot). The "Live" chip is classified (Files 06 §9 / 07 §10) as chrome + capability language over a labelled preview — **not** a data-signal; the blink dot is decorative and frozen under reduced motion. Queue states are text-first ("In consult"/"Waiting"/"Next up"/"4 ahead"), never colour-only.
- Left panel (doctor's day): avatar "KM", "Dr. K. Mehta", "General Physician", "OPD 11:00 – 2:00"; SCHEDULE: 11:00 Ramesh S. #11 In consult · 11:30 Priya D. #12 Waiting · 12:00 Arun M. #13 Waiting.
- Middle panel (front desk): "Front desk · Live queue" / "OPD 2"; QUEUE: #11 Ramesh S. In consult (active, blink) · #12 Priya D. Next up · #13 Arun M. 3 ahead · #14 You 4 ahead; "Queue progress 11 / 42" bar (26%, brand gradient); "+38 more tokens in today's live queue".
- Right panel (Sevika): eyebrow "Sevika · Assistant"; "Doctor-approved reminders" row with a **mock toggle**; reminders 11:15 "Token #14 — 20 min left" · 14:10 "Prescription ready" · 20:00 "First dose reminder"; footnote "Every message is approved by the doctor before Sevika sends it."
- Feature row (4 cards): Smart booking / Live, fair queue / Doctor-first design / Sevika follow-up (exact bodies in source).

**Layout:** `md:grid-cols-[250px_1fr_240px]`; mobile stacks panels by border (verified simplification — tertiary content hidden rather than shrunk per File 05 §16 rule; 12px text floor held, `text-[11px]` only for non-essential chips/footnotes).

**Interactions:** none beyond scroll motion — M-P1 reveal, M-P2 tilt scrub (`rotateX 10→0`, scale floor 0.96, `top 90%→42%`), M-P3 blink loop. Status/blinking dots must never be read as live medical/workflow status; the neutral visual grammar + badge govern the whole window.

**B17 (new, `CURRENT RISK`, P3 — this audit):** the "Doctor-approved reminders" row is a `<label class="… cursor-pointer">` wrapping decorative spans with **no associated form control** (`ProductReveal.tsx:137–143`) — it implies interactivity that does not exist (cursor suggests click; nothing happens) and is semantically a label without a control. `PROPOSED` future fix (File 11): neutral non-interactive presentation (plain row with a static state glyph) or a genuinely disabled control; keep the illustrative-classification intact.

---

## 11. Sevika component contract and safety boundaries

**Source:** `src/components/Sevika.tsx`. Frames S-01–03; motion M-S1–S3. Anchor `#sevika`.

**Verified content (exact):** eyebrow "Continuous care"; H2 "Sevika stays, *long after the visit ends.*"; lead: "Sevika is Aturseva's caring assistant. She carries reminders, queue updates, and follow-up nudges to the patient — each one **approved by the doctor first**. Support, never a substitute."; bullets: "Doctor-approved before anything goes out" · "Gentle, plain-language reminders" · "Follow-up check-ins that close the loop".

**The five-message illustrative conversation (verbatim, Hinglish contained inside the thread):** 08:00 "The day begins" — "Good morning, Ramesh. Aapki appointment aaj 11:30 baje hai — Dr. Mehta, OPD 2." · 11:15 "The wait, eased" — "Token #14 — about 20 minutes left. Aap time nikal sakte hain, main bata dungi." · 14:10 "After the consult" — "Prescription ready hai — 3 dawaiyan, first dose aaj raat 8 baje, khaana ke baad." · 20:00 "The gentle nudge" — "Time for your first dose — 1 tablet, after food. Dr. Mehta ki aur se wish you good health." · +3 days "The follow-up" — "How are you feeling today? Aapka jawab Dr. Mehta tak pahunch jayega." Every message carries a "Doctor approved" chip (verified, lines 98–103). Blockquote: "Aturseva ne hamara saath diya." — "— the promise we build by" (lines 74–79).

**Safety boundaries (binding; all verified held in current copy):** Sevika is a support companion — never a clinician replacement, never an autonomous diagnosis/prescription/dose-changing agent (File 02 §4/§8). The 14:10 message *relays* the doctor's prescription plan (does not originate one); the 20:00 message attributes the reminder to Dr. Mehta; the +3d check-in routes the answer to the doctor. No example crosses the line.

**B3 (`CURRENT RISK`, P0 — future requirement, not fixed here):** a visible **"Illustrative Sevika conversation — representative preview"** label is required on the thread, and the blockquote must be framed as brand philosophy (or labelled illustrative dialogue) — never presentable as a real testimonial: **"Aturseva ne hamara saath diya." must not appear as a testimonial without authentic, owner-approved evidence** (File 04 §16-3). **Placement contract:** the label must sit **outside** the animated elements — not inside a `.sevika-msg` (they stagger in via `autoAlpha`) and not hidden inside an animation; a persistent header-row above the thread satisfies this. Mobile: single-column stack; label persists.

**Motion:** M-S1 reveals; M-S2 message stagger (0.6s, i×0.14) + connector-line scrub; M-S3 blockquote reveal. Static/no-JS: full thread is real DOM text in reading order (screen-reader-friendly — verified).

---

## 12. Paths component and CTA contract

**Source:** `src/components/Paths.tsx`. Frames R-01–03; motion M-R1–R3. Anchor `#paths`.

**Verified content (exact):** eyebrow "Begin"; H2 "Where do you fit *in the journey?*"; lead "Three paths, one direction — care that moves in step."

| Card | Title (exact) | Body (exact) | CTA |
|---|---|---|---|
| Patients | **"Walk in without the wait"** — **B1** | "Book ahead, watch your token move in real time, and let Sevika remember the follow-ups for you." | "I'm a patient" → toast |
| Doctors | "Keep the day humane" | "A fair, visible queue; schedules ready before you arrive; an assistant that never forgets your patients." | "I'm a doctor" → toast |
| Hospitals | "One calm front desk" | "Online and walk-in patients in one live list — synced across counters, displays, and departments." | "I'm a hospital" → toast |

Closing line: "Aturseva supports your doctors and hospitals — it never replaces them."

**Exact current CTA behaviour (verified, `PathCta` lines 5–40):** click sets local state → toast renders `role="status" aria-live="polite"`, fixed bottom, text "Early access for {role}s opens soon — Team Aturseva will reach out.", auto-dismiss 3.8s, timer cleaned on unmount. **No data is captured; no one is reached out to.**

**Tracked issues and the honest future contract:**

- **B1 (P0):** "Walk in without the wait" implies no waiting — violates File 02 row 3 claims policy. `PROPOSED` truthful alternatives (final wording at authorized implementation): "Walk in with greater clarity" / "Know where you are in the queue".
- **B4 (P0):** toast CTAs imply outreach while capturing nothing. Acceptable future options only: (a) a real, owner-confirmed destination/action; (b) honest in-page navigation; (c) removal/disablement pending a genuine process. **No lead form, email routing, CRM capture or outreach promise may be invented.** Gated on File 04 §18-3 owner destination decisions.
- "in real time" (patient body): describes the confirmed queue-visibility capability (File 02 rows 2–3) — claims-safe as capability language; no change required.

**Motion:** M-R1/M-R2 reveals; M-R3 toast interaction (per click). Static states: cards fully visible; toast is DOM text (visible without motion).

---

## 13. Footer and logo contract

**Source:** `src/components/Footer.tsx`. Frames F-01–02; motion M-F (static by design).

**Verified content (exact):** full logo `variant="full"` h-24 ivory (`Footer.tsx:13` — **embeds "Make healthcare intelligent." lettering; B5 mismatch; asset untouched**); philosophy line "Aturseva ne hamara saath diya." (italic, unlabelled — **B3**); support line "Support that walks with patients, doctors, and hospitals — never in place of them."; link groups — Explore: The Journeys/How it connects/Platform → `#journeys/#connection/#platform`; Care: Sevika/For you → `#sevika/#paths`; Paths: Patients/Doctors/Hospitals → all three share `#paths` (shared-target clarity note, File 04 §10-17); bottom bar: **"© 2025 Aturseva. Care, coordinated."** (**B8** fixed year) + disclaimer "Interface visuals shown are representative previews of the product."

**Binding rules:** canonical tagline stays **"Care that walks with you."** (owner-approved; used verbatim in title/meta). The logo's embedded phrase is neither edited nor concealed (no crop/cover/recolour/trace/redraw/replacement — File 08 §16). B5 logo-asset strategy (incl. B16 disposition of `public/assets/logo-primary.svg`, File 08 §2/§16) is a separate owner decision. The philosophy line remains brand philosophy — not proof of customer results. Footer quote/tagline pairing rule: official tagline may appear as a separate text line near the wordmark at most once per page (File 05 §10) — `PROPOSED`, not implemented. Shell note: footer's `mt-auto` is inert without a flex-column shell — **B18** (§5).

---

## 14. CTA, link, anchor and action matrix

Reconciled 1:1 with File 04 §10 (18 rows; no business decision resolved here). "Verified" = source-audited this task.

| # | Element | Label | Current destination/action (verified) | Works? | Mobile behaviour | Success/failure state | Analytics | Unresolved owner decision | Proposed future contract | Backlog |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Header wordmark | Aturseva logo | `#top` | Yes (in-page) | same | n/a | none (none approved) | — | keep | — |
| 2 | Nav link 1 | The Journeys | `#journeys` | Yes | collapses into menu | n/a | none | — | keep | — |
| 3 | Nav link 2 | How it connects | `#connection` | Yes | menu | n/a | none | — | keep | — |
| 4 | Nav link 3 | Platform | `#platform` | Yes | menu | n/a | none | label wording review (File 04 §10-4) | self-explaining label | — |
| 5 | Nav link 4 | Sevika | `#sevika` | Yes | menu | n/a | none | — | keep | — |
| 6 | Nav action | Get started | `#paths` | Yes | full-width in menu | n/a | none | real destination when it exists | relabel when route exists | — |
| 7 | Mobile menu items | same 4 + Get started | same anchors; menu closes on click | Yes | — | n/a | none | — | keep | — |
| 8 | Hero primary | Begin the journey | `#journeys` | Yes | full-width wrap | n/a | none | — | keep | — |
| 9 | Hero secondary | I'm a patient · doctor · hospital | `#paths` | Yes | wrap | n/a | none | wording review | "Find your path" style simplification | — |
| 10 | Journeys scroll cue | (icon, aria-label) | `#connection` | Yes | same | n/a | none | — | keep | — |
| 11 | In-section CTAs (Connection/ProductReveal/Sevika) | — | **none exist** (verified) | n/a | n/a | n/a | n/a | route existence | add none unless a route exists | — |
| 12 | Paths CTA — Patients | I'm a patient | toast only; **captures nothing** | displays toast | same | toast 3.8s, `role="status"` | none | **destination/process (File 04 §18-3)** | real destination / in-page nav / removal | **B4** |
| 13 | Paths CTA — Doctors | I'm a doctor | toast only | same | same | same | none | same | same | **B4** |
| 14 | Paths CTA — Hospitals | I'm a hospital | toast only | same | same | same | none | same | same | **B4** |
| 15 | Footer Explore group | 3 links | `#journeys/#connection/#platform` | Yes | stacks | n/a | none | — | keep | — |
| 16 | Footer Care group | Sevika / For you | `#sevika/#paths` | Yes | stacks | n/a | none | — | keep | — |
| 17 | Footer Paths group | Patients/Doctors/Hospitals | all → `#paths` (shared target) | Yes | stacks | n/a | none | route existence | split to routes when built | — |
| 18 | Footer legal/contact | — | **none exist** (verified) | n/a | n/a | n/a | n/a | policy content / contact process | add only when real | — |

**Acceptance test (future, per row):** destination resolves to an existing anchor/route; behaviour matches this matrix; toast CTAs are never described as submission. Links to nonexistent endpoints are prohibited (rule: proposed ≠ working).

---

## 15. Reusable UI primitives and state model

**Exist today (verified, as concrete patterns — not yet abstracted components):**

- **Buttons/links:** primary pill (brand-400 bg, ink-950 text, h-12/h-11, hover `-translate-y-0.5`); outline pill (border ivory/25); icon-only circle 44×44 (scroll cue, hamburger); nav pill. All honour the global focus ring.
- **Cards:** light card (`rounded-3xl border-ink-100/80 bg-white p-6/7 shadow-soft` hover `shadow-lift`); dark `.glass` card; `.conn-card-inner` variants; `.sevika-msg` bubble.
- **Badges/labels:** "Representative preview" pill (`ProductReveal.tsx:31–34` — canonical); "Doctor approved" `.approval-chip`; "Token #N" chip; `.eyebrow` section label; problem/frustration chips.
- **Icons:** inline stroke SVGs (24/20/16 viewBox set), `aria-hidden`, `currentColor`.
- **Toast:** `PathCta` inline implementation (`role="status"`, fixed bottom, auto-dismiss) — if retained after B4 resolution, consolidate as a shared primitive in File 11.
- **Sample-data styling:** `.ui-row`/`.ui-chip` neutral grammar; text-first states.

**Proposed consolidation (File 11, `PROPOSED`):** extract shared Button/Label primitives *when batch work touches them* — not speculative abstraction. **Rules:** labels stay accessible (real text, not tone/grey alone); "Representative preview" and "Illustrative conversation" labels are content, never decoration; critical state is never colour-only.

---

## 16. Data, content and copy governance

- **Static representative values only:** patient/doctor names ("Ramesh S.", "Priya D.", "Arun M.", "Dr. K. Mehta", "You"), tokens (#11–#14), counts ("42", "11/42", "+38", "3 waiting"), times ("11:30 AM", "08:00–20:00") are illustrative sample data — never animated as live, never described as real.
- **Clinical language:** informational framing only; estimates ("about 20 minutes left") stay informational; no outcomes, no urgency.
- **Care reminders:** always doctor-attributed (chips + footnote verified).
- **Tagline:** owner-approved "Care that walks with you." verbatim wherever used (title/meta today); the logo-embedded line is never quoted as the tagline.
- **Language split:** English marketing copy; **Hinglish only inside clearly labelled illustrative Sevika dialogue** (Sevika thread + the two Connection Sevika bubbles — labelling via B2/B3 extends to the bubbles).
- **Every proposed copy change is marked `PROPOSED`/not implemented** (B1 alternatives, B11 softening, nav label, hero secondary wording, B3 framing).
- **Prohibited (invented):** social proof, metrics, customer names as real, testimonials-as-real, integration promises, launch/pricing/trial claims, compliance statements, health outcomes (File 02 §9–§10 policy).

---

## 17. Visual assets and media integration contracts

Cross-references File 08 (VS scene IDs; asset register). **No media asset is approved today** — every slot below is `OWNER DECISION REQUIRED`, and the existing implementation remains the valid fallback:

| Slot | File 08 scene | Required delivery (if approved) | A11y treatment | Loading contract | Failure/fallback state | Owner gate |
|---|---|---|---|---|---|---|
| Hero right-of-text | VS-01 | 21:9/16:9 AVIF+WebP (+poster if film) | decorative (`alt=""`/`aria-hidden`); story stays in DOM text | never delays LCP; `width`/`height` reserved; lazy except hero-critical; **both deploy targets fetch 200 (B15 rule)** | current zero-asset hero (permanent valid fallback) | §9 route + sourcing |
| Journeys card inserts | VS-02, VS-03, VS-04 | 4:5 or 1:1 set, consistent grade | decorative | lazy; CLS zero | cards without inserts (current) | sourcing + consent |
| Sevika split visual | VS-05 | 4:5, 60/40 text rule | decorative | lazy | current text+thread layout | sourcing + consent |
| Paths portraits | VS-08 | 1:1 small | decorative; **restraint default: omit** | lazy | current cards | sourcing + consent + §7 risk |
| Connection / ProductReveal / Footer | **none** — explicit no-asset zones (File 08 §7 no-asset rows; §8 reserves VS-06/VS-07 as explicitly empty; footer carries no scene ID) | n/a | n/a | n/a | current | — (do not reopen without owner instruction) |

Every future integration inherits File 08 §12–§13 (alt classes, captions-if-audio, reduced-motion poster/frozen state, no scroll-jacking, pause control if >5 s foreground) and §18 acceptance (incl. the both-targets fetch proof). File 11 implements these contracts only after the File 08 Batch A owner gate.

---

## 18. Motion and interaction implementation contract

File 07 owns all timings. Compact cross-reference (no duplication):

| Component / frames | Trigger | Final state | Static state | Reduced-motion | Lifecycle cleanup | QA hooks |
|---|---|---|---|---|---|---|
| Nav N-01–03 / M-N | scroll >48px | 82% ink surface | transparent | instant surface change | n/a (passive listener persists — single page, benign) | File 07 §17 #13 |
| Hero H-01–05 / M-H1–H3 | load / ambient | all visible; arc drawn; ECG loop | fully visible pre-JS | fully visible, ECG frozen | none exists (**B13** latent) | #1, #5 |
| Journeys J-01–03 / M-J1–J3 | viewport reveals | visible cards, lanes drawn | visible | visible | **B13** | #2 |
| Connection C-01–06 / M-C1–C6 | pin+scrub | finale (dots lit, caption 4) | full diagram visible | **M-Cr static finale** | **B13** | #3, #5, #10 |
| Connection mobile C-01m / M-Cm | `top 72%` once | condensed finale | static card grid | M-Cr (autoplay skipped) | **B13** | #4 |
| ProductReveal P-01–03 / M-P1–P3 | reveal + tilt scrub + blink | upright window, label visible | visible, label present | visible; blink frozen | **B13** | #2, #8 |
| Sevika S-01–03 / M-S1–M-S3 | reveal + stagger + line scrub | full thread + quote | full thread (DOM text) | visible | **B13** | #6, #7 |
| Paths R-01–03 / M-R1–R3 | reveals + click toast | cards visible; toast announces | visible; toast = DOM text | visible | timer cleanup verified (`Paths.tsx:15–17`) | #14 |
| Footer F-01–02 / M-F | none | static | static | static | n/a | #8 |

**Motion-related backlog carried (not fixed here):** **B11** "instantly in step" phrasing (copy pass); **B12** reduced-motion/media-query re-evaluation requires reload (`aturseva-anim.js:32–33,437` — listen to `change` in a future pass); **B13** no ScrollTrigger kill/revert on unmount (pre-routing invariant; File 11 Phase 3); **B14** dead `--animate-drift` token (`globals.css:64` — remove or adopt, File 11 Phase 1).

**Status correction (documented, no code change):** File 07 §18 Phase-1 item "Guard `initAtursevaAnimations` against double-boot" is **already satisfied in source** — `window.__atursevaAnimBooted` guard exists (`aturseva-anim.js:26–27`, verified this audit). Remaining Phase-1 items (B14 removal, `scroll-margin-top` token, timing consolidation) remain open.

**Invariants:** no essential content only inside animation (verified); no fake-live UI motion (verified); reduced-motion = complete static page (verified); keyboard navigation triggers no extra motion (verified).

---

## 19. Responsive and breakpoint contract

**Source-verified breakpoints (no invented widths):** Tailwind defaults as used — `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280; the anim module's own split is `≥768` / `≤767` (`mm.add`, verified); the Connection CSS recomposition block is `max-width: 767px` (`globals.css:226`).

| Width band | Verified behaviour | Proposed refinements (not implemented) |
|---|---|---|
| ≥1280 | full composition; `max-w-7xl` frame; glows scale | — |
| 1024–1279 | full nav links; 3-col Paths; split Sevika; Connection pin active | — |
| 768–1023 | nav links hidden (<lg → hamburger); Connection **pin active**; splits hold | — |
| 640–767 | `sm:` type steps; Connection → static 2-col cards + autoplay once; conn labels/stems hidden | B10 label floor |
| <640 | single column; hero arc hidden (markup); CTAs full-width; conn cards `p-3`/11px; product window stacks (250px/240px panels collapse) | B10 label floor |

**Contracts:** no horizontal overflow (verified `overflow-x: clip` on body + no wider-than-viewport elements observed); touch targets ≥44px (verified inventory); pin/autoplay/static behaviour per File 07 §13 (touch never forced into desktop choreography — verified); text-size/zoom/reflow targets belong to File 12 (`NOT RUN`); optional future assets carry per-breakpoint crop/focal contracts (File 08 §10). No new breakpoints are proposed.

---

## 20. Accessibility contract

**Verified current semantics:** skip link first in DOM → `#main`; one `<h1>` (hero) + `<h2>` per section + `<h3>` cards; Connection heading is sr-only; `aria-label` on nav (`"Main navigation"`), wordmark link, menu toggle (dynamic), scroll cue; decorative SVGs `aria-hidden`; Logo `role="img" aria-label="Aturseva"`; toast `role="status" aria-live="polite"`; focus-visible global ring; DOM order = reading order; no colour-only state; no flashing >3/s; reduced-motion dual insurance (CSS kill-switch `globals.css:127–135` + JS branch `aturseva-anim.js:437–439`).

**Contract requirements (future work, `NOT RUN` today):**

- Menu control naming stays accurate when open/closed (verified today); **add Escape-close + explicit focus return** (`PROPOSED`).
- "Representative preview" / "Illustrative conversation" labels must be real text, visible at all sizes/states (B2/B3/B10 — §9/§11 placement contracts).
- SVG alternatives: decorative stays `aria-hidden`; the Connection diagram's meaning is carried by sr-only h2 + captions + cards (real text — verified).
- Contrast test targets inherited from File 05 §17 (WCAG 2.2 AA: 4.5:1 text / 3:1 large+UI) — **File 12 test targets, not claims**.
- Zoom/reflow 200%: File 12 target. Captions/transcripts: n/a until audio-bearing media exists (File 08 §12).
- Screen-reader announcements: only the toast is a live region (verified); any new status surface must announce honestly.
- **WCAG 2.2 AA conformance is not asserted anywhere in this document.**

---

## 21. Trust, privacy and clinical-safety acceptance

Hard acceptance criteria for any future implementation batch (all currently `NOT RUN`; violations today are tracked, not fixed):

1. No fake testimonials — "Aturseva ne hamara saath diya." never presented as customer evidence without authentic, owner-approved proof (B3).
2. No real patient information anywhere — sample names/values stay illustrative; no PHI in any asset or comp (File 08 §14).
3. No unlabelled mock UI — "Representative preview" visible on ProductReveal (verified) and, after B2, on Connection cards + Sevika thread (future).
4. No autonomous medical claims — Sevika bounded to support/doctor-approved contexts (§11 boundaries).
5. No "zero wait"/no-wait promises — B1 replacement lands before any copy pass ships (proposed wording reviewed at implementation).
6. No fake capture-success toast — B4 resolution required before any CTA implies outreach (honest success/failure only).
7. No unapproved logo replacement — embedded lettering untouched (B5/B16 owner gates).
8. No claim of live sync based on animation — sample values stay static; blink dots stay chrome.
9. Support-not-replacement framing present (verified: Paths closing line, Footer support line, Sevika lead).
10. No medical advice introduced into marketing copy.

---

## 22. SEO, metadata and sharing requirements

**Verified current metadata:** title + OG title "Aturseva — Care that walks with you" (canonical tagline); description + OG description (exact strings §5); `type: website`; `themeColor #0a0a0b`; `lang="en"`; favicon `src/app/icon.svg`. **Verified absent:** canonical, robots, twitter card, `og:image`, structured data, sitemap, analytics — none invented; each addition is a future owner-gated task.

**Planned future checks (File 12; `NOT RUN`):** title/description length and uniqueness; OG text-card rendering; heading semantics order; anchor accessibility (focus + names); alt text inventory once media exists; asset dimensions and static-export behaviour (both deploy targets — B15 regression); `og:image` decision (File 08 §20-5). No structured data, analytics or tracking pixels are proposed without explicit approval and evidence.

---

## 23. Performance and failure contracts

Per-state rendering expectations (current verified behaviour + proposed protections):

| State | Verified/proposed behaviour | Result |
|---|---|---|
| JS / GSAP unavailable | natural DOM = complete visible page; nav = plain anchors; no hidden states (verified by construction) | full content, zero motion |
| Fonts load late | `font-display: swap` (verified); `document.fonts.ready → ScrollTrigger.refresh()` re-positions overlay (verified) | graceful swap; overlay correct after fonts |
| **Fonts 404 (live Pages build)** | fallback families render (verified live — **B15**) | readable page, wrong brand typography — fix in File 11 |
| Media fails (future assets) | none exist today; future slots must define alt/placeholder/poster per File 08 §17 | current fallback = zero-asset layout |
| Direct anchor load (`/#sevika` etc.) | browser jumps; triggers evaluate on refresh; in-view sections render settled (verified pattern) | complete page |
| Section revisited | `once: true` reveals stay fired; mobile autoplay does not replay (verified) | stable |
| Viewport changes mid-animation | ScrollTrigger native refresh re-pins; `onRefresh: positionOverlay` re-places cards (verified) | sequence re-syncs |
| Reduced motion enabled | static finale + full content (verified) | complete page |
| Low-end mobile | current: tilt scrub is light, autoplay once; `PROPOSED` fallback order (tilt → autoplay → static) for File 11 | graceful degradation |

**File 12 test targets (not results):** LCP unblocked by JS; zero CLS from reveals/pin spacer; media budgets per File 08 §9; 60fps desktop / ≥50fps mid-tier mobile scroll. No benchmark is claimed.

---

## 24. Component-by-component specification matrix

Master matrix (details in §5–§13; statuses: VC = VERIFIED CURRENT, CR = CURRENT RISK, P = PROPOSED, OD = OWNER DECISION REQUIRED):

| Component | Source | Anchor | Audience / intent | Current content/data | Layout contract | Interactions / CTA | Frames | Motion | Assets (File 08) | Responsive state | A11y contract | Current risks / backlog | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Shell / layout | `layout.tsx`, `page.tsx` | — | all | metadata (§5); skip link | block-flow body; main wraps 1–6 | skip link → `#main` | — | — | none | — | skip link; landmarks | **B15** fonts live; **B18** inert `mt-auto` | title/tagline verbatim; both-target asset fetch | VC + CR |
| Nav | `Nav.tsx` | `#site-nav` | orientation | 4 links + CTA (§6) | fixed top; max-w-7xl | 5 anchors; menu toggle | N-01–03 | M-N | none | links <lg → menu 44px | aria-expanded/controls/label | label clarity (P); no active-section (P); no Escape (P) | matrix §14 rows 1–7 honest | VC |
| Hero | `Hero.tsx` | `#top` | patients first | exact copy §7 | min-h-svh dark; left block; pt-32/36 | 2 CTAs (h-12) | H-01–05 | M-H1–H3 | VS-01 slot (OD) | arc <md hidden; CTAs wrap | sr-only ECG text; one h1 | B6 imagery (OD); B15 fonts | headline ≤1s; static complete | VC |
| Journeys | `Journeys.tsx` | `#journeys` | all three roles | 3 cards + chips (§8) | 3-col grid; max-w-7xl | scroll cue → `#connection` | J-01–03 | M-J1–J3 | VS-02/03/04 (OD) | stack <md | h3 cards; cue aria-label | B9 lane greys | chips legible; lane continuity | VC |
| Connection | `Connection.tsx` | `#connection` | all | captions + 5 overlay elements (§9) | pinned stage ≥768; static grid <768 | none (pointer-events none) | C-01–06, m, r | M-C1–C6, Cm, Cr | **none (explicit)** | 2-col 11px cards | sr-only h2; labels+position | **B2, B10, B11** | label outside animation; static finale complete | VC + CR |
| ProductReveal | `ProductReveal.tsx` | `#platform` | providers + patients | badge + 3-panel window + 4 features (§10) | md:grid-cols-[250px_1fr_240px] | none | P-01–03 | M-P1–P3 | **none (explicit)** | panels stack | badge = content; text-first states | **B17** fake toggle | badge visible all states; 12px floor | VC + CR |
| Sevika | `Sevika.tsx` | `#sevika` | patients (+doctor reassurance) | 5 messages + chips + quote (§11) | lg:grid-cols-2 split | none | S-01–03 | M-S1–S3 | VS-05 (OD) | single column | thread = DOM text | **B3** labels | illustrative label outside animation; boundaries hold | VC + CR |
| Paths | `Paths.tsx` | `#paths` | all | 3 role cards + closing line (§12) | 3-col grid | 3 toast CTAs (B4) | R-01–03 | M-R1–R3 | VS-08 (OD; omit default) | stack | toast role=status | **B1, B4** | honest CTAs; no-wait copy replaced | VC + CR |
| Footer | `Footer.tsx` | — | all | logo + philosophy + 3 groups + legal (§13) | flex→grid groups; mt-auto (inert — B18) | 8 anchor links | F-01–02 | M-F static | **none (explicit)** | grid-cols-2→3 | nav aria-label | **B3, B5, B8, B16** | tagline canonical; disclaimer visible | VC + CR |
| AnimationProvider | `AnimationProvider.tsx` + `aturseva-anim.js` | — | motion engine | lazy GSAP boot; builders (§18) | n/a | n/a | all M-* | engine | none | n/a | reduced-motion branch | **B12, B13** | boot guard verified; cleanup before routing | VC + CR |

---

## 25. Acceptance criteria and test scenarios

Observable criteria for each component/journey — **execution belongs to File 12; nothing below has been run** (`NOT RUN`; unchecked):

- [ ] Links point only to verified destinations (§14 matrix, 18 rows).
- [ ] All representative-data labels visible: ProductReveal badge (today) + Connection cards + Sevika thread (after B2/B3).
- [ ] Labels survive mobile condensation (11px floor — B10) and reduced-motion states (outside animated elements).
- [ ] All meaningful content appears without JS (no-JS render).
- [ ] Section order/anchors match the storyboard (`#top/#journeys/#connection/#platform/#sevika/#paths`).
- [ ] Queue/token values never animate as live data; blink dots stay chrome.
- [ ] Official tagline verbatim wherever used; logo embedded line never quoted as tagline.
- [ ] No colour outside the neutral palette (token audit + visual pass).
- [ ] Focus ring visible on all controls; screen-reader labels where required (menu, cue, logo).
- [ ] No horizontal overflow at 390px/360px widths; touch targets ≥44px.
- [ ] Fonts fetch 200 on both deploy targets (B15 regression check).
- [ ] Media (future) has posters/alt/fallbacks and zero CLS.
- [ ] Toast announces honestly; no capture implication after B4 resolution.
- [ ] Reduced-motion: complete static page; Connection finale renders.
- [ ] Footer sits at document end; sticky behaviour decided per B18 resolution.

---

## 26. Consolidated backlog, dependencies and handoff to File 11

**Canonical B-ID crosswalk** (resolves the legacy File 04 §16 item-number vs B-ID ordering nuance — IDs preserved, never renumbered; B7 keeps its documentation-reconciliation meaning and does **not** reopen the approved tagline):

| Origin | Canonical B-ID | Description | Priority | Status at `e30dcc8` | Downstream |
|---|---|---|---|---|---|
| File 04 §16-1 | B1 | Zero-wait patient title ("Walk in without the wait") | P0 | open (`Paths.tsx:48`) | File 11 Batch 1 (copy) |
| File 04 §16-2 | B2 | Connection cards missing "Representative preview" | P0 | open (`Connection.tsx:127–206`) | File 11 Batch 1 |
| File 04 §16-3 | B3 | Sevika thread + philosophy line illustrative framing | P0 | open (`Sevika.tsx:76–110`, `Footer.tsx:14–16`) | File 11 Batch 1 |
| File 04 §16-4 | B4 | Toast CTAs imply outreach, capture nothing | P0 | open (`Paths.tsx:5–40`) | File 04 Phase A → File 11 Batch 2 (owner-gated) |
| File 04 §16-5 | B5 | Logo embeds mismatched tagline | P1 | open (asset untouched) | File 08 asset task (OD) |
| File 04 §16-6 | B6 | Missing human-first imagery | P2 | open (zero media — verified) | File 08 (OD) |
| **File 04 §16-8** | **B7** | File 03 tagline documentation reconciliation (approved tagline stays canonical) | P2 | open (docs pass) | documentation batch |
| **File 04 §16-7** | **B8** | Fixed "© 2025" | P2 | open (`Footer.tsx:45`) | File 11 Batch 1 |
| File 05 §19-9 | B9 | Hardcoded SVG greys outside tokens | P2 | open (Hero/Journeys/Connection attrs) | File 11 (touch-when-edited) |
| File 06 §20 | B10 | Label legibility under mobile card condensation | P1 | open (folds into B2) | File 11 Batch 1 |
| File 07 §19 | B11 | "instantly in step" caption phrasing | P2 | open (`Connection.tsx:43`) | copy pass |
| File 07 §19 | B12 | Reduced-motion/media-query changes need reload | P2 | open (`aturseva-anim.js:32–33,437`) | File 11 Phase 3 |
| File 07 §19 | B13 | No ScrollTrigger cleanup on unmount | P2 (latent) | open (`AnimationProvider.tsx`) | File 11 Phase 3 |
| File 07 §19 | B14 | Dead token `--animate-drift` | P3 | open (`globals.css:64`) | File 11 Phase 1 |
| File 08 §2/§11.4 | **B15** | **Live Pages font 404** — root-absolute CSS font URLs vs basePath deployment; live site renders fallback fonts (verified) | **P1** | open | **File 11 priority fix** (blocks confident media delivery) |
| File 08 §2/§16 | **B16** | `public/assets/logo-primary.svg` deployed but unreferenced; disposition folds into B5 | P3 | open | File 08 Batch A (OD) |
| File 09 §10 | **B17** | ProductReveal mock toggle = `<label>` with no control, implies interactivity | P3 | open (`ProductReveal.tsx:137–143`) | File 11 Batch 1 |
| File 09 §5 | **B18** | Footer `mt-auto` inert (body not flex) — sticky-footer intent not implemented; latent only | P3 (latent) | open (browser-verified computed `0px`) | File 11 (with B15/shell pass) |
| File 05 §19-1 | — (no B-ID; tracked as File 05 §19-1) | Legacy token-name migration (`brand/gold/ivory` → semantic) | P2 | open | File 11 §5.3 refactor plan |

**Re-verification notes (this audit):** no B1–B14 item is implemented in source at `e30dcc8` (all statuses re-checked against current files — evidence paths above). File 07 §18 Phase-1 "double-boot guard" checklist item is already satisfied (`aturseva-anim.js:26–27`) — status corrected in §18; no ID retired for it.

**Batch grouping for File 11 (substantial batches, not per-item prompts):**

- **Batch 1 — truthfulness & trust (P0/P1):** B1 copy, B2+B10 labels (Connection + mobile floor), B3 labels (Sevika thread + philosophy framing), B8 year, B17 mock-toggle semantics, B18 shell decision. Shared QA: labels visible in all states; copy guardrails.
- **Batch 2 — CTA honesty (owner-gated):** B4 resolution after File 04 §18-3 destination decisions; honest in-page nav / real destination / removal.
- **Batch 3 — delivery & platform health:** **B15 font-path fix (priority)** + both-target fetch regression rule; B12 live re-evaluation; B13 cleanup guard; B14 dead token; B9 token migration (touch-when-edited or here).
- **Batch 4 — assets (owner-gated):** File 08 Batch A→D (B5/B6/B16 decisions, media production/integration per §17).
- **Batch 5 — documentation:** B7 File 03 reconciliation.

**Owner decisions that block coding:** B4 destinations; B5/B16 logo strategy; B6/sourcing/hero-route (File 08 §20). **File 11 owns sequencing; this document authorizes no edit.**

---

## 27. Open decisions, non-goals and final checklist

**Genuinely unresolved owner decisions (complete list):**

1. Generated-imagery acceptability and sourcing model (File 08 §4).
2. Hero media route: current zero-asset hero vs VS-01 still vs film (File 08 §9).
3. Logo/tagline asset strategy incl. `public/assets/logo-primary.svg` disposition (B5/B16).
4. Genuine next-step/process for role CTAs (B4; File 04 §18-3) — the only CTA-truth blocker.

**Non-goals restated:** this planning task modified **no** source, style, token, asset, logo, config, workflow, dependency, lockfile, or existing documentation (Files 02–07 untouched); created no routes, forms, integrations or media; ran no visual/accessibility/performance QA; resolved no owner decision.

**Completion checklist:**

- [x] Both files exist at exact paths (`docs/08_VISUAL_ASSET_PLAN.md`, `docs/09_PAGE_AND_COMPONENT_SPECIFICATIONS.md`).
- [x] Every homepage component has a contract (§6–§13, §24); every File 04 §10 CTA appears in §14.
- [x] Current vs proposed behaviour separated throughout; frame/motion IDs mirror Files 06/07.
- [x] Backlog reconciled B1–B18 with crosswalk (§26); no ID renumbered; B7 semantics preserved.
- [x] Tagline canonical and never marked pending; monochrome-only; no invented routes/claims; no compliance/QA claims.
- [ ] Git scope check + commit/push + GitHub/workflow verification (performed after this document per the task's validation sequence — report records the outcome).

**Linked planning set:** Files 02 · 03 · 04 · 05 · 06 · 07 · 08 (same batch) · 09 (this file). Files 10–13 do not exist yet.

---

**End of File 09.**
