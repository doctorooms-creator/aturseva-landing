# Aturseva — File 12: QA, SEO & Performance Plan

> **TASK MODE: PLANNING — NOT EXECUTED.** This document defines the test, evidence, and acceptance
> system for the Aturseva landing site. It creates no test results. Every test defined here is
> `NOT RUN` unless a future authorized task executes it and records evidence. A documentation-only
> deployment success (including the push that publishes this file) is **not** code QA, visual QA,
> performance data, accessibility conformance, SEO verification, or a B15 fix.

---

## 1. Document control, baseline, scope, and authority

| Field | Value |
|---|---|
| Document | `docs/12_QA_SEO_AND_PERFORMANCE_PLAN.md` (File 12) |
| Source baseline at authoring | commit `6a4a6d2` (`6a4a6d215f12bf500cd69e00cbb581253ffedcd5`), branch `main`, clean working tree — verified at task start |
| Companion document | `docs/13_DEPLOYMENT_AND_HANDOVER_PLAN.md` (File 13 — release, rollback, handover contract) |
| Upstream planning set | Files 02–11 (all verified present in `docs/`; see §2 authority order) |
| Task scope | Documentation only. No source, config, workflow, asset, dependency, or existing-doc changes; no tests, builds, or browser QA executed as implementation QA; no automation of any kind created |
| Approval authority | Owner (product decisions, gates, wording, imagery, integrations). Implementer/QA roles only act inside an authorized batch prompt |

**Status vocabulary (binding across Files 12/13; inherited from File 11 §4):**
`VERIFIED CURRENT` · `CURRENT RISK` · `PROPOSED` · `OWNER DECISION REQUIRED` · `NOT IMPLEMENTED` · `NOT RUN`.
Test outcomes: `PASS` · `FAIL` · `BLOCKED` · `NOT RUN`. Acceptance that depends on a future fix is labelled
`POST-FIX EXPECTATION` and points at its File 11 batch.

**Authority order when documents disagree** (from the Files 12+13 task prompt, consistent with prior files):
File 02 (product truth/claims) → recorded owner decisions (canonical tagline **“Care that walks with you.”**) →
File 04 (routes/anchors/CTA truth) → File 05 (locked monochrome design system) → File 06 (story/frame IDs) →
File 07 (motion + reduced-motion contract) → File 08 (assets/rights/scene IDs) → File 09 (component contracts,
B1–B18 crosswalk) → File 10 (architecture, deploy modes, guardrails) → File 11 (batch sequencing, gates,
rollback) → **actual current source code** (docs never override source facts silently).

**Dependency:** this file is written against the current source at `6a4a6d2`. If HEAD moves before a test run,
re-verify the facts cited here (paths and line numbers are baseline-scoped) before executing.

---

## 2. QA philosophy

1. **Risk-based layering.** Trust/claims defects (B1–B4) outrank accessibility, which outranks functional
   behaviour, which outranks visual polish — the same priority order File 07 §19 uses. Tests exist to protect
   the brand promise “honest by design”, not to make the site look finished.
2. **Functional facts vs visual proof.** Reading source can establish *expected* behaviour; only executed
   browser checks on the target environment can establish visual/rendered truth. No test may be marked `PASS`
   from code reading, HTTP 200 alone, a green docs deploy, or a prior run that does not match the current
   source SHA and environment.
3. **Evidence must be reproducible.** Every executed test records the source SHA, environment, URL, viewport,
   steps, and captured artifacts (§19) so any re-run under the same conditions is comparable.
4. **No unsupported pass claims.** WCAG 2.2 AA, performance thresholds, and SEO health are **targets until
   measured**. Absence of a recorded failure is never evidence of success.
5. **Inherited evidence is inherited.** The only live production measurement on record — the B15 font failure —
   was browser-verified and documented in **File 08 §11.4** and inherited by Files 10/11. This file inherits it
   without re-running it; it is attributed there, not here.
6. **Scope discipline.** QA never edits the product repo (`/home/z/my-project/`), never adds
   analytics/trackers/testing packages/CI/browser extensions/third-party services, and never creates scheduled
   or background automation. All tooling used for evidence is manual and already available (browser devtools,
   `agent-browser`, plain HTTP fetches).

---

## 3. Environment matrix

| Environment | URL / origin | Serves | Asset URL shape | Role in testing |
|---|---|---|---|---|
| Local dev | `http://localhost:3005/` (`bun run dev`) | Next.js dev server, root path | root-relative `/_next/...`, `/fonts/...` | Source-of-truth behaviour; fastest iteration; **not** production evidence |
| Self-contained preview | `http://localhost:3006/` (`bun run preview`, artifact from `bun run build:preview`) | Single `preview/index.html`; CSS + 3 base64 fonts + GSAP + ScrollTrigger + animation engine inlined | zero external requests (self-containment audited by `scripts/build-preview.ts`) | User-facing sandbox preview through the gateway; parity target; **not** production |
| GitHub Pages production | `https://doctorooms-creator.github.io/aturseva-landing/` | Actions static export (`DEPLOY_TARGET=pages`, `basePath: /aturseva-landing`, `distDir: .next-pages`) | basePath-prefixed `/_next/...` for app assets; root-absolute `/fonts/...` in emitted CSS **currently 404s (B15)** | The only live environment; every release claim is proven here |
| Root-served static / Vercel | `bun run build` output; Vercel import documented in README §“Deploy to Vercel” | Build target only | root-relative | **`PROPOSED` build target, not a live deployment** — no Vercel credentials or deploy exist; never call it live |

Rules: environment labels are mandatory on every test record (§19); a result on dev/preview never substitutes
for a production result; preview parity is itself a test target (T-FONT-08, T-SM-04) because the preview
inlines the *same* animation engine (`src/lib/aturseva-anim.js`) as the app.

---

## 4. Test data and fixture rules

1. **Only documented illustrative data.** Static sample names/values already in source and documented in
   Files 06/09: “Ramesh S.”, “Priya D.”, “Arun M.”, “Dr. K. Mehta” (KM avatar), “City Care Hospital”,
   tokens #11–#14, “11 / 42” queue progress, “Token #14 — 20 min left”, “OPD 2”, “11:00 – 2:00”, reminder
   times 11:15 / 14:10 / 20:00 / +3 days, Sevika Hinglish example messages (File 02 §Sevika framing).
2. **No real patient data, no PHI, no production credentials** in any fixture, screenshot, or log (extends to
   evidence files; see File 13 §security).
3. **No fabricated testimonials, metrics, partners, pricing, compliance, launch dates, or outcomes** —
   verifying their *absence* is a test (T-COPY-04…07); inventing them for test data is a defect.
4. **No new sample values minted by QA.** If a test scenario needs data the source does not contain, the test
   is written against existing values or is `BLOCKED` pending an authorized copy batch — QA never invents
   product content.
5. **Static-value rule.** Sample tokens/counters/timers must remain static or illustrative at all times
   (File 11 §19: “no implied real-time values in fake UIs”). The animated `token-counter` (0→42 inside the
   Connection scrub, `aturseva-anim.js:198–206` / mobile `:269–277`) is accepted illustration *inside a labelled
   preview context* per File 02; B2/B10 labelling governs its trustworthiness (T-MOCK-02).

---

## 5. Smoke and build verification strategy

**Verified command surface (`package.json` at `6a4a6d2` — exactly five scripts; nothing else exists):**

| Command | What it does (verified) | QA role |
|---|---|---|
| `bun run dev` | `next dev -p 3005 --webpack` (tees to `dev.log`) | environment bring-up for dev-layer tests |
| `bun run build` | `next build` (root target; includes the TypeScript compile gate) | build/type smoke — future execution step |
| `bun run build:pages` | `DEPLOY_TARGET=pages next build` → static export into `.next-pages/` | production-shape build smoke |
| `bun run build:preview` | `bun scripts/build-preview.ts` — fetches SSR HTML from :3005, compiles Tailwind, inlines 3 fonts + GSAP/ScrollTrigger + engine, **fails on self-containment violations** | preview build + self-containment audit |
| `bun run preview` | `bun --hot scripts/serve-preview.ts` — serves `preview/index.html` on :3006 | preview environment bring-up |

**Honesty constraints on commands:**
- There is **no `lint` script and no ESLint configuration in this repository** at the baseline (verified: no
  eslint config file; devDependencies contain none). Do not invent lint commands. The executable code-quality
  gate today is the `next build` type/compile check. Adding linting is a future owner-approved dependency
  change, not an available step.
- All commands above are **proposed future execution steps** for QA tasks; none was run for this documentation
  task. `NOT RUN` applies to all of them.

**Test suite:**

| ID | Test | Preconditions | Steps (future) | Expected | Severity | Evidence | Env | Batch |
|---|---|---|---|---|---|---|---|---|
| T-SM-01 | Clean-tree & diff-scope check | working tree clean or containing only the authorized batch's files | `git status --porcelain`; `git diff --name-only` vs the batch contract | zero unexpected files; stop-and-report otherwise | blocker | command output in batch record | repo | Batch 0 (per §21) |
| T-SM-02 | Root build + type gate | dependencies installed (`bun install --frozen-lockfile`) | `bun run build` | exits 0; no type errors | blocker | build log | local | every batch |
| T-SM-03 | Pages export build | as above | `bun run build:pages`; inspect `.next-pages/` | export succeeds; `index.html` + `\_next/` chunks present under basePath shape | blocker | build log + artifact listing | local | every batch |
| T-SM-04 | Preview build + self-containment | dev server running on :3005 | `bun run build:preview` | report prints `self-containment: OK — 0 root-relative src/href references`; exactly 3 fonts inlined | blocker | build report | local | every batch |
| T-SM-05 | Dependency/lockfile discipline | — | verify `bun.lock` unchanged unless the batch contract authorizes a dependency change | lockfile diff empty for non-dependency batches | high | `git diff -- bun.lock` | repo | every batch |

**Verified dependency observations (facts, no B-IDs minted):** runtime deps are `gsap@^3.13.0`,
`next@^16.1.1`, `react@^19.0.0`, `react-dom@^19.0.0`. The devDependencies `@fontsource-variable/fraunces`
and `@fontsource-variable/manrope` are **not imported anywhere in `src/`** (verified by search at baseline) —
fonts are self-hosted from `public/fonts/` via `@font-face`. Disposition of those unused devDependencies is a
future owner/batch matter (relevant to B15 solution-family selection, File 11 §10); this file records the
fact only.

---

## 6. B15 production font & asset-path regression — critical protocol

**Status: B15 OPEN / UNFIXED / `CURRENT RISK` (P1, highest technical delivery priority).**
Inherited evidence (File 08 §11.4, browser-verified on the live URL at that audit; **not re-measured by this
task**): the emitted live CSS requests root-absolute `/fonts/*.woff2`, which returns **404** under the
`/aturseva-landing` basePath (the files actually live at `/aturseva-landing/fonts/...` → 200; Manrope-Variable
is 24,836 B there); `document.fonts.check('16px Manrope')` and `check('16px Fraunces')` were **false** with
zero loaded font faces — **the live site renders fallback fonts today**. Dev :3005 (root-served) was verified
healthy (3 loaded faces, both checks true). Root cause in source: `globals.css:88–108` `@font-face`
`url("/fonts/…")` root-absolute vs `next.config.ts:14–21` basePath export.

**These tests have not been executed by this documentation task.** They are the binding regression protocol
for the future B15 fix (File 11 Batch 1, §10) and for any asset-delivery change. All rows below:
status `NOT RUN`.

| ID | Test | Env | Steps (future) | Expected | Severity | Evidence |
|---|---|---|---|---|---|---|
| T-FONT-01 | Identify the *actually requested* URL | Pages + dev | load live page; open the emitted CSS chunk; read the exact `url(...)` inside the `@font-face` blocks (do not assume) | the requested URL is recorded verbatim as the test's subject | blocker | CSS excerpt + URL |
| T-FONT-02 | HTTP status at the requested URL | Pages | fetch each requested font URL | **200** for all three (Manrope-Variable, Fraunces-Variable, Fraunces-Variable-Italic) — today this is expected to FAIL (404) until B15 is fixed | blocker (P1) | fetch results ×3 |
| T-FONT-03 | No stray root `/fonts/...` request under Pages | Pages | network panel filter `fonts` | zero requests to origin-root `/fonts/...` unless an explicitly approved strategy intentionally requires it (then documented) | blocker | network capture |
| T-FONT-04 | FontFaceSet loaded faces | Pages | console: `document.fonts.size` and iterate `document.fonts` | 3 loaded faces (2× Fraunces incl. italic + 1× Manrope) | blocker | console output |
| T-FONT-05 | `document.fonts.check` per family | Pages | `document.fonts.check('16px Manrope')`, `check('16px Fraunces')`, `check('16px italic Fraunces')` | all `true` | blocker | console output |
| T-FONT-06 | Computed font families | Pages + dev | `getComputedStyle(document.querySelector('h1')).fontFamily` and on `body` | computed stack resolves to the self-hosted families (Manrope on body per `.font-sans`, Fraunces on display headings per `.font-display`) — layout visibly matches design, not Georgia/system fallback | blocker | computed values + screenshots (heading/body specimens) |
| T-FONT-07 | Root-served parity | dev :3005 (and root build) | repeat T-FONT-02…06 at root path | same expectations — the fix must hold in **both** deploy shapes (File 10 §11 binding rule) | blocker | mirrored evidence |
| T-FONT-08 | Preview parity | preview :3006 | `bun run build:preview`; verify report (3 fonts inlined as base64); confirm rendered typography matches the app | parity preserved; self-containment audit green | high | build report + screenshot |
| T-FONT-09 | Fallback-render regression sweep | Pages | visual pass over Hero H1/H2s, eyebrow labels, Sevika thread, Footer while fonts load and after | no fallback-flash regression beyond `font-display: swap` behaviour; headings settle to brand faces | high | before/after screenshots |

`POST-FIX EXPECTATION`: rows 02–06 flip from FAIL to PASS only after the authorized File 11 Batch 1
implementation lands; a docs-only commit (like this one) changes nothing here. T-FONT-02 failing today is the
**release gate** condition B15 describes (File 13 §8).

---

## 7. Static-export / deployment-path matrix (asset delivery rule as release gate)

**Binding rule (File 08 §11.4 / File 10 §11):** no root-absolute URL references for `public/` assets in CSS or
JSX; every reference strategy must be proven against **both** deploy targets (root dev/Vercel-shape and
basePath Pages) by a live fetch of the *requested* URL, not by dev-server behaviour alone. This is a release
gate for every batch that touches or adds assets.

Current verified surface at `6a4a6d2`: the only `public/` assets are the three fonts (§6) and
`public/assets/logo-primary.svg` (deployed, unreferenced — B16). No `<img>`, `srcset`, `poster`, background
image URLs, or other media exist yet; the grain overlay and all iconography are inline SVG/data-URIs
(verified). The favicon is `src/app/icon.svg` served by Next metadata conventions.

| ID | Test | Applies to | Steps (future) | Expected | Severity |
|---|---|---|---|---|---|
| T-ASSET-01 | CSS url() audit | any touched CSS | enumerate every `url(...)` in emitted CSS on both targets | every URL resolves 200 at its requested location on Pages (and root) | blocker |
| T-ASSET-02 | `<img>`/`src`/`srcset`/poster audit | any added media | enumerate in emitted HTML/JS; fetch each | all 200 on both targets; `width`/`height` reserved (zero CLS) | blocker |
| T-ASSET-03 | Favicon fetch | Pages + root | fetch the icon URL the HTML declares | 200; icon renders | medium |
| T-ASSET-04 | Future `public/` additions | Batch 4 assets (VS-01…VS-08, owner-gated) | per-asset both-target fetch + poster/fallback render | 200 both targets; poster/alt/fallback present (File 08 §17/§18) | blocker for that batch |
| T-ASSET-05 | Unreferenced-asset sweep | repo | compare `public/` contents against emitted references | any unreferenced file is a known, decided item (B16 disposition) or flagged | low |

---

## 8. Functional navigation & CTA suite

Verified interactive surface at `6a4a6d2` (source of truth for expected behaviour): skip link → `#main`
(`page.tsx:14–16`); Nav wordmark → `#top`; desktop links `#journeys/#connection/#platform/#sevika`
(`Nav.tsx:6–11`); “Get started” → `#paths` (desktop + mobile menu); hamburger toggle with
`aria-expanded`/`aria-controls="nav-mobile"` (`Nav.tsx:50–73`); Hero CTAs “Begin the journey” → `#journeys`
and “I’m a patient · doctor · hospital” → `#paths`; Journeys scroll cue → `#connection` (aria-labelled);
Footer links → `#journeys/#connection/#platform/#sevika/#paths` (×4, `Footer.tsx:23–41`); Paths role buttons
→ toast (B4, §10). All anchors exist in DOM: `#top/#main/#site-nav/#nav-mobile/#journeys/#connection/#platform/#sevika/#paths`.

| ID | Test | Env | Steps (future) | Expected | Severity | Notes |
|---|---|---|---|---|---|---|
| T-NAV-01 | Anchor integrity | all 3 envs | click every link above; also direct-load `/#sevika`, `/#paths` | each lands at the intended section; no dead/missing IDs; direct anchor loads settled (File 07 §17 #11) | blocker | — |
| T-NAV-02 | Skip link | all | keyboard from page top | first Tab reveals skip link; activates moves focus into `#main`; visually hidden otherwise | blocker | — |
| T-NAV-03 | Mobile menu open/close | ≤lg viewport | toggle menu; navigate via panel | panel opens/closes; links close it (`Nav.tsx:87,97`); aria-expanded state correct | high | — |
| T-NAV-04 | Nav scrolled state | all | scroll past 48px and back | `nav-scrolled` surface toggles symmetrically (`aturseva-anim.js:38–41`) | low | File 07 §17 #13 |
| T-NAV-05 | Smooth scroll behaviour | all | click in-page link | smooth scroll on motion; instant under reduced-motion (`globals.css:127–135`) | medium | — |
| T-NAV-06 | CTA destination truth | all | compare every CTA against the File 09 §14 matrix (18 rows) | zero links to nonexistent routes; zero CTAs implying actions the page cannot perform | blocker | B4 owner-gated: a real conversion flow test **cannot exist** until the owner decides the CTA destination/process (File 04 §18-3; Batch 2) — until then the honest-destination check is the only executable test |
| T-NAV-07 | Toast path truth | all | click each Paths role button | toast appears (role=status, aria-live=polite), auto-dismisses 3.8s; wording matches source; **today’s copy implies outreach with no capture — B4 defect, tracked, not fixed here** | high (B4) | `POST-FIX EXPECTATION` for honest wording after Batch 2 |

---

## 9. Story & frame coverage (File 06 → File 07 traceability)

Frames (File 06 §15): `N-01–03`, `H-01–05`, `J-01–03`, `C-01–06` (+ mobile `C-01m`, reduced `C-01r`),
`P-01–03`, `S-01–03`, `R-01–03`, `F-01–02`. Motion refs (File 07 §7): `M-N, M-H1/H2/H3, M-J1/J2/J3,
M-C1–C6, M-Cm, M-Cr, M-P1/P2/P3, M-S1/S2/S3, M-R1/R2/R3, M-F`. Section order (verified `page.tsx:17–26`):
Hero → Journeys → Connection → ProductReveal → Sevika → Paths → Footer. The 14-row File 07 §17 motion QA
matrix is incorporated **by reference** (rows 1–14) and expanded below; none of it has been run.

| ID | Test | Env | Steps (future) | Expected | Severity |
|---|---|---|---|---|---|
| T-FRAME-01 | Hero cascade + arc (H-01…05 / M-H1–H3) | desktop ≥md | load top; observe cascade, arc draw, milestones | fades complete ~0.9s; headline readable pre-JS; arc hidden <md (markup) | high |
| T-FRAME-02 | Journeys reveal + broken lanes (J-01…03 / M-J1–J3) | all | scroll into `#journeys` | intro + 3 cards reveal once; 6 lane paths draw; bridge cue visible | medium |
| T-FRAME-03 | Connection pinned scrub (C-01…06 / M-C1–C6) | desktop ≥768px | slow scroll full pin (top top → +=260%), then reverse | phases A–E reversible; captions crossfade ×4; cards placed by viewBox mapping; token counter 0→42; no stuck pin; no overlay drift after fonts load (`onRefresh: positionOverlay`) | blocker |
| T-FRAME-04 | Connection mobile autoplay (C-01m / M-Cm) | <768px | enter `top 72%` | choreographed sequence plays **once**; static 2-col card grid; no pin; no replay on revisit | high |
| T-FRAME-05 | Connection reduced finale (C-01r / M-Cr) | reduced-motion, all widths | OS reduce + load | converged lanes, all 4 dots, final caption visible; nothing essential hidden | blocker |
| T-FRAME-06 | Labels visible in all modes | desktop + mobile + reduced | inspect lane labels (Patient/Doctor/Hospital) and cards | desktop labels visible; mobile labels hidden by design (`globals.css:227`) with cards condensed — **B10 legibility is the acceptance concern**; preview/“Representative” labels per B2/B3 placement contracts sit outside animated elements (`POST-FIX EXPECTATION`) | high |
| T-FRAME-07 | ProductReveal tilt + badge (P-01…03 / M-P1–P3) | all | scrub through `#platform` | window tilt scrub reversible; intro + badge visible pre-JS; blink dots are chrome only | medium |
| T-FRAME-08 | Sevika thread + line (S-01…03 / M-S1–S3) | all | scroll through `#sevika` | messages stagger in once; line grows with scrub; thread is plain DOM text (SR-readable) | medium |
| T-FRAME-09 | Paths reveal + toast (R-01…03 / M-R1–R3) | all | scroll + click | intro + 3 cards reveal; toast per T-NAV-07 | medium |
| T-FRAME-10 | Footer static (F-01…02 / M-F) | all | inspect | no motion by design; legal line + disclaimer visible | low |

---

## 10. Trust, copy & content checks (claims safety)

Current defects vs future acceptance are strictly separated. Canonical tagline: **“Care that walks with you.”**
(approved; owner decision recorded). The logo-embedded line “Make healthcare intelligent.” is a separate
asset-integrity matter (B5) and must never be quoted as the tagline.

| ID | Test | Env | Steps (future) | Expected — **current status vs target** | Severity |
|---|---|---|---|---|---|
| T-COPY-01 | B1 zero-wait title | all | read Paths patient card title | **CURRENT DEFECT**: “Walk in without the wait” (`Paths.tsx:48`) violates the no-zero-wait rule; `POST-FIX EXPECTATION` (Batch 1, wording `OWNER DECISION REQUIRED`) — replacement copy approved then rendered | P0 |
| T-COPY-02 | B2/B10 representative labels on Connection | all modes/sizes | inspect cards + labels | **CURRENT DEFECT**: no “Representative preview” label on Connection cards; `POST-FIX EXPECTATION` (Batch 1) label present, legible at 390/360px and 200% zoom, outside animated elements | P0 |
| T-COPY-03 | B3 illustrative framing (Sevika thread + philosophy line) | all | inspect `Sevika.tsx:74–79` quote and `Footer.tsx:14–16`; thread | **CURRENT DEFECT**: thread unlabelled; “Aturseva ne hamara saath diya.” reads testimonial-like; `POST-FIX EXPECTATION` (Batch 1) illustrative/philosophy framing per owner preference | P0 |
| T-COPY-04 | No fabricated social proof | all | full-route copy sweep | zero testimonials/reviews/ratings/customer names presented as real; sample names stay clearly illustrative | P0 |
| T-COPY-05 | No unsupported claims | all | sweep vs File 02 §9.2 prohibited inventory (stats, partners, pricing, compliance, outcomes, integrations, dates) | zero occurrences | P0 |
| T-COPY-06 | Tagline correctness | all | sweep tagline usage | only the canonical tagline used as tagline; embedded logo line never quoted as tagline | P1 |
| T-COPY-07 | Live-looking static token sweep | all | inspect mock values (ProductReveal queue/schedule, Connection cards) | values static/illustrative; “Live” chips remain window chrome inside a labelled preview context; no timer implying real time (`POST-FIX EXPECTATION`: whole-of-context labelling after B2) | P1 |
| T-COPY-08 | B11 “instantly in step” caption | all | read Connection caption 3 (`Connection.tsx:43`) | **CURRENT DEFECT**: timing implication; `POST-FIX EXPECTATION` (Batch 1, wording `OWNER DECISION REQUIRED`) | P2 |
| T-COPY-09 | Sevika autonomy boundaries | all | inspect thread copy + approval chips | every reminder carries “Doctor approved” attribution; no diagnosis/prescription/dose-change autonomy implied; Hinglish confined to labelled illustrative Sevika examples | P0 |
| T-COPY-10 | Footer honesty | all | read legal/disclaimer | “© 2025” fixed year is **B8 current defect** (Batch 1); previews disclaimer present and accurate | P2 |

---

## 11. Product mock & Sevika tests

| ID | Test | Env | Steps (future) | Expected | Severity |
|---|---|---|---|---|---|
| T-MOCK-01 | ProductReveal badge | all | locate badge above the workspace window | “Representative preview” badge visible pre-JS, all viewports (`ProductReveal.tsx:31–34`) — **VERIFIED CURRENT as markup; visual confirmation NOT RUN** | P0 if missing |
| T-MOCK-02 | Connection card labels (B2) | all modes | see T-COPY-02 | same acceptance; cards are `pointer-events: none` chrome (`#conn-cards`) — verified | P0 |
| T-MOCK-03 | Sevika thread labelling (B3) | all | see T-COPY-03 | illustrative labelling; doctor-approved attribution on every message (verified markup; visual NOT RUN) | P0 |
| T-MOCK-04 | Sample data immutability | all | reload ×3; compare values | identical static values every load (no client-side randomization — verified by construction) | P1 |
| T-MOCK-05 | B17 false-affordance toggle | all | attempt to interact with the “Doctor-approved reminders” control (`ProductReveal.tsx:137–143`) | **CURRENT DEFECT**: `<label>` with cursor-pointer implies a toggle, no control exists; `POST-FIX EXPECTATION` (Batch 1): no false affordance — static presentation or genuinely disabled control | P3 |
| T-MOCK-06 | No autonomy implication | all | read Sevika panel copy (“Every message is approved by the doctor before Sevika sends it.”) | attribution sentence intact; framing consistent with T-COPY-09 | P0 |

---

## 12. Responsive visual test matrix

Viewport categories (Files 05–09 conventions; File 11 §24 environment details): narrow phones **360×** and
**390×844**; tablet (~768 break) ; desktop **1440×900**; wide desktop (≥1920); portrait + landscape on
touch; **200% zoom / reflow**; long-copy states (Sevika Hinglish lines, longest chip rows).

| ID | Test | Viewports | Steps (future) | Expected | Severity |
|---|---|---|---|---|---|
| T-RSP-01 | No horizontal overflow | 360/390 + all | scroll full page | zero horizontal scrollbar (`overflow-x: clip` on body — verified in CSS; behaviour NOT RUN) | high |
| T-RSP-02 | Connection mobile condensation | 360/390 | enter section | static 2-col grid; 11px card text floor legible — **B10 acceptance target** (`POST-FIX EXPECTATION` with B2 label) | P1 |
| T-RSP-03 | Nav/header overlap | all | menu open over content; scroll under fixed header | no content clipped/unreachable; section top padding accounts for fixed nav | high |
| T-RSP-04 | 200% zoom / reflow | desktop | zoom 200%; reflow | no clipped labels; all text reachable; conn cards legible (File 07 §17 #8) | high |
| T-RSP-05 | Breakpoint transition (767↔768) | tablet | resize across the Connection breakpoint | pinned ↔ autoplay modes switch correctly (today: reload required — **B12 current defect**, Batch 3) | medium |
| T-RSP-06 | Orientation change | touch | rotate mid-page/mid-pin | no overlay drift; re-pin correct (File 07 §17 #10) | medium |
| T-RSP-07 | Long copy / label clipping | all | longest strings (italic display lines, uppercase eyebrows, chips) | no truncation/overlap | medium |
| T-RSP-08 | Footer position | all + short/long pages | inspect bottom | footer at document end; sticky-on-short-page behaviour per B18 scope decision (`OWNER DECISION REQUIRED`; `mt-auto` currently inert — verified) | P3 |

**No visual test in this file has been executed; visual QA passing is not claimed.**

---

## 13. Accessibility plan (WCAG 2.2 AA as target only)

No compliance is claimed; everything below is a future measured check. Concrete checks (grounded in current
markup; visual/SR confirmation `NOT RUN`):

- **Keyboard-only:** full navigation without mouse — skip link (T-NAV-02), all links/buttons reachable,
  visible `:focus-visible` ring on every interactive element (gold-500 outline, `globals.css:122–126` —
  verify contrast/offset visually), mobile menu toggle announces via `aria-expanded` (T-NAV-03),
  toast readable (focus not required — live region), touch targets ≥44px on primary controls (hamburger is
  44×44 — verified; verify rendered sizes of all CTAs).
- **Screen-reader DOM order:** story reads Nav → main sections in order; sr-only h2 in Connection
  (`Connection.tsx:39`); sr-only heartbeat description (`Hero.tsx:128–130`); decorative SVGs are `aria-hidden`
  (verified across components); Logo has `role="img"` + `aria-label="Aturseva"`; no orphan labels; toast
  announces politely (`role="status"` `aria-live="polite"`).
- **Labels/roles/live regions:** mobile menu `aria-controls` target exists; scroll cue has aria-label
  (`Journeys.tsx:106`); all nav links use meaningful text.
- **Contrast measurement (File 05 §17 list):** measure representative pairs — ink-900/ivory-50 body text,
  ivory-100/ink-950 surfaces, ink-200 on ink-950 (Hero lead), ink-300 eyebrows on dark, brand-200 italics on
  ink-950, brand-600 eyebrows on ivory-50, gold-300 approval-chip text on brand-900/60, ui-chip variants,
  conn-label ink-300 on ink-950, 11px condensed card text (B10), toast text. Record ratios; **4.5:1 normal,
  3:1 large text as AA targets — no conformance claim until measured.**
- **Zoom/reflow:** T-RSP-04 (320px-equivalent reflow at 200%).
- **Reduced motion:** §14; CSS kill-switch + JS branch both intact (verified in source).
- **No-JS / GSAP-failure readability:** JS disabled → entire page renders with all content visible (verified
  by construction — hidden states only applied inside GSAP builders); toast still functions? **No — Paths
  interaction requires JS; content completeness is the test, not interactivity.**
- **Non-colour-only state distinctions:** active vs waiting queue rows use font-weight/border/bg differences
  (verify a visible differentiator beyond colour); nav-scrolled surface vs transparent distinguishable
  structurally (blur + hairline — verify).
- **Text sizing floors:** 10–11px minimums exist (eyebrow 11px, approval chip 10px, condensed cards 11px) —
  evaluate against legibility targets and owner tolerance (B10 adjacent; documented, not re-decided here).

Accessibility tests use IDs T-A11Y-01…T-A11Y-10 mapped 1:1 onto the bullet groups above (execute in that
order), each recording: method (manual keyboard / VoiceOver or NVDA spot-check / devtools contrast probe),
samples, measurements, and screenshots. **Tooling: already-available manual tooling only; no extensions,
packages, or services added.**

**§13 addendum — measured contrast record (QA-evidence pass, owner-delegated).** Under the standing
"go ahead further" delegation, the representative §13 pairs were measured on the live Pages deploy
(full-reveal state after a complete scroll sweep) using agent-browser's built-in axe-core 4.12.1 audit
plus computed-style probes for the cases axe marks *incomplete* (the grain/glow pseudo-element overlays
prevent background resolution — probes composite the ancestor alpha chain instead; effective stage
background resolves to ink-950 per File 05 §4.3). Headless-lab method; ratios recorded, no conformance
claimed beyond the numbers.

axe-core result: **37 checks passed · 1 violation (color-contrast, 8 nodes) · 1 incomplete
(color-contrast, 10 nodes — all resolved by the probe table below).**

Dark-stage and headline pairs (probe-computed — all clear the 4.5:1 / 3:1 bars by wide margins):

| Pair (per §13 list) | Foreground | Effective bg | Ratio | Size/weight |
|---|---|---|---|---|
| Hero eyebrow (brand-300) | `#bec3c5` | `#0a0a0b` | 11.12:1 | 12px/800 |
| Hero lead (ink-200) | `#c6cacb` | `#0a0a0b` | 11.98:1 | 18px/400 |
| Hero display italic (brand-200) | `#d3d6d8` | `#0a0a0b` | 13.55:1 | 72px/600 |
| Hero strong emphasis (ivory-100) | `#f4f4f5` | `#0a0a0b` | 18.0:1 | 18px/700 |
| Sevika muted text (ink-300 on dark) | `#9aa0a2` | `#0a0a0b` | 7.47:1 | 14px/400 |
| conn-label (ink-300 on ink-950; SVG `fill-ink-300` text) | `#9aa0a2` | `#0a0a0b` | 7.47:1 (same token pair as the Sevika probe) | 10px/700 |
| Approval-chip text (gold-300) | `#ccccce` | measured composite `rgb(9,9,9)` | 12.42:1 | 16px/400 |
| ivory-50 on dark elevated surface | `#fafafa` | `rgb(45,45,45)` | 13.19:1 | 16px/400 |
| ink-900 body on paper-50 | `#101113` | `#fafafa` | 18.1:1 | 16px/400 |
| brand-600 eyebrow on paper-50 | `#5d6366` | `#fafafa` | 5.85:1 | 12px/800 |

**Measured misses — every one on light surfaces, every one a §13-anticipated B10-adjacent minimum
(owner decision per §23 Q1; recorded, deliberately NOT remediated in this pass):**

| Element (axe-measured, live) | Fg on Bg | Ratio | Size |
|---|---|---|---|
| Paths card captions `text-ink-300` ×3 ("a journey with a gap in the middle") | `#9aa0a2` on `#ffffff` | **2.65:1** | 12px semibold uppercase |
| Light-section eyebrows `text-gold-600` ×3 ("Hospital", "Sevika · Assistant", "Hospitals") | `#848788` on `#ffffff` | **3.61:1** | 12px bold |
| Live-queue ui-chip `text-white` on `bg-brand-500` | `#ffffff` on `#7d8386` | **3.84:1** | 11px bold |
| "+38 more tokens" `text-ink-400` on `bg-ivory-100` | `#6f7476` on `#f4f4f5` | **4.30:1** | 11px semibold |

Toast-text pair: not measurable — no toast exists in the current DOM (Batch 2 replaced toast-only CTAs
with honest in-page anchors); the pair is obsolete on the live page. Every other visible text node passed
axe's color-contrast check (within the 37 passes). Size-floor observations for the owner's §23 Q1:
conn-label SVG text renders at 10px, eyebrows 12px, chips/captions 11–12px — all above rendering
legibility but below comfortable body floors; decisions documented, not re-made here. Evidence qa/143–146.

---

## 14. Reduced-motion & animation lifecycle tests

Verified baseline behaviour (source, `aturseva-anim.js`): reduced-motion is evaluated **once at boot**
(`reduceMQ.matches` → `setConnectionStatic()` + return, `:437–439`); mid-session OS toggles require reload
(**B12 current defect**, Batch 3); mobile/desktop split via `gsap.matchMedia()` (768/767); no
ScrollTrigger cleanup/revert on provider unmount (**B13 current defect**, latent pre-routing, Batch 3);
double-boot guard `window.__atursevaAnimBooted` exists (`:26–27`); CSS kill-switch
(`globals.css:127–135`) neutralizes CSS animations/transitions under reduce.

| ID | Test | Env | Steps (future) | Expected | Severity |
|---|---|---|---|---|---|
| T-MOT-01 | Reduced motion at load | desktop + mobile, OS reduce on | load page top→bottom | static finale (T-FRAME-05); hero fully visible from first paint; ECG frozen; no loops | blocker |
| T-MOT-02 | Reduced toggled mid-session | desktop | toggle OS setting without reload | **CURRENT DEFECT (B12)**: mode unchanged until reload — documented baseline; `POST-FIX EXPECTATION` (Batch 3): live re-evaluation, content never hidden by the transition | P2 |
| T-MOT-03 | No forced pin/autoplay under reduce | mobile + desktop | attempt to trigger Connection | no pin, no autoplay timeline under reduce | blocker |
| T-MOT-04 | No-JS completeness | all | disable JS; load | full content visible; plain anchors work; no hidden states (File 07 §17 #9) | blocker |
| T-MOT-05 | No duplicate ScrollTriggers | dev | inspect `ScrollTrigger.getAll().length` after load | one trigger set; boot guard prevents double init | high |
| T-MOT-06 | Cleanup/unmount (post-B13) | dev | after Batch 3 implementation: unmount/remount provider; trigger count returns to baseline | `POST-FIX EXPECTATION`: all triggers killed/reverted; no duplicates; invariant holds pre-routing | P2 (latent) |
| T-MOT-07 | Refresh mid-pin / direct anchor | desktop | reload while pinned; load `/#sevika` | triggers re-evaluate; settled states; no blanks (File 07 §17 #11) | high |
| T-MOT-08 | Rapid scroll + revisit | desktop + mobile | fast scroll down/up | no stuck reveals; content visible on return | medium |

---

## 15. Performance targets & measurement protocol

**All thresholds below are `PROPOSED` targets unless explicitly sourced; none is measured.** Lab vs field:
only lab measurement is currently possible (no analytics/RUM exists or may be added — owner-gated per File 10
§19/§22, ADR-8).

| ID | Metric/behaviour | Target (`PROPOSED` unless noted) | Method (future) | Notes |
|---|---|---|---|---|
| T-PERF-01 | LCP (mobile profile, lab) | ≤ 2.5s | devtools performance panel, mobile emulation, cold cache | aligns with common Core-Web-Vitals-shaped “good” threshold — a target, not a claim |
| T-PERF-02 | CLS | ≤ 0.1 | layout-shift trace, full scroll | zero CLS from media is a File 11 §20 sourced gate for future assets |
| T-PERF-03 | INP (lab interaction probe) | ≤ 200ms | rapid click/scroll probe in performance panel | target only |
| T-PERF-04 | Scroll frame rate | 60fps desktop; ≥50fps mid-tier mobile | devtools FPS meter during pin/scrub | **sourced from File 07 §15 / File 11 §20** |
| T-PERF-05 | JS/GSAP bundle behaviour | GSAP + ScrollTrigger code-split out of initial bundle (lazy import — verified pattern in `AnimationProvider.tsx`) | network panel: initial JS excludes gsap chunks; verify LCP not blocked by JS | verified as design; measurement NOT RUN |
| T-PERF-06 | Font loading | `font-display: swap` (verified); no long fallback lock-in; T-FONT-09 regression | network + filmstrip | B15 gate interplay: today live = permanent fallback (inherited evidence) |
| T-PERF-07 | Render-blocking resources | minimal critical CSS (single compiled stylesheet) | coverage panel | observation + target |
| T-PERF-08 | Media budgets (future, owner-gated) | hero ≤ ~180KB AVIF / ≤ ~250KB WebP; film ≤ ~2.5MB combined; `width`/`height` reserved | per-asset size + CLS check | **sourced from File 11 §20**; no media exists today; nothing is approved by this file |
| T-PERF-09 | Pin performance | Connection pin stable on supported desktop; mobile fallback on mid-range (Batch 3 degradation order) | FPS meter + visual | sourced File 11 §20 |
| T-PERF-10 | Page weight snapshot | record total transferred (HTML+CSS+JS+fonts) per release | network panel “transfer” column | evidence norm, no threshold |

Device profile: mobile emulation (mid-tier Android shape) for lab mobile numbers; physical iOS/Android
spot-checks where available (File 11 §24). **No analytics, RUM, or monitoring product is added by any test.**

**§15 addendum — lab measurement record (QA-evidence pass, owner-delegated).** Headless-Chrome lab
measurements on the live Pages deploy (agent-browser `vitals`, fresh load per run; event-timing probe for
interaction latency; rAF counter for scroll FPS; curl-measured gzipped transfer for page weight). No
CPU/network throttling was applied — numbers are lab-shaped, not field data (field data is impossible by
policy: no analytics/RUM exists or may be added without owner approval):

| ID | Metric | Desktop 1440×900 | Mobile (Galaxy S25 emulation) | §15 target | Status |
|---|---|---|---|---|---|
| T-PERF-01 | LCP | 316 ms (hero span) | 172 ms (hero paragraph) | ≤ 2.5 s | PASS (lab) |
| T-PERF-02 | CLS | 0.0 — zero layout-shift entries | 0.0 — zero entries | ≤ 0.1 | PASS (lab) |
| T-PERF-03 | INP-shaped | worst discrete click 48 ms (event-timing entries; hover-event batches ≤ 152 ms) | — | ≤ 200 ms | PASS (lab probe) |
| T-PERF-04 | Scroll FPS | 60 fps across a 2.5 s continuous scripted scroll (151 frames) | — (mobile has no pin by design) | 60 desktop / ≥50 mobile | PASS (lab) |
| T-PERF-05 | GSAP split | 4 JS chunks (≈122 KB decoded) load after the fonts/first paint in the resource timeline — lazy animation-engine pattern intact | same timeline | code-split by design | PASS (observed) |
| T-PERF-06 | Font loading | 3 woff2 · `font-display: swap` · B15 gate green live (see §6 protocol re-runs) | same | no lock-in | PASS |
| T-PERF-07 | Critical CSS | one compiled stylesheet: 10.0 KB gz / 56.4 KB decoded | same | minimal critical CSS | OK (observed) |
| T-PERF-08 | Media budgets | n/a — no media exists (zero-asset route standing) | — | future assets only | N/A |
| T-PERF-09 | Pin stability | desktop scrub ran inside the 60 fps T-PERF-04 probe without drops | mobile fallback by design | stable pin | PASS (lab) |
| T-PERF-10 | Page weight | **321 KB total gzipped transfer** (HTML 23.2 + CSS 10.0 + JS 195.2 + fonts 107.1 + icon 1.8 KB) | same set | evidence norm | RECORDED |

Multi-browser (T-BR-01) and physical iOS/Android spot-checks (T-BR-02) remain NOT RUN — headless Chrome
is the only engine available in this workspace. LCP/FCP/TTFB additional readings: FCP 316 ms desktop /
172 ms mobile; TTFB ≈ 0.2–0.3 ms (cache-warm lab). Evidence qa/143–146 + the recorded command outputs.

---

## 16. SEO technical audit plan

**Current metadata inventory (`src/app/layout.tsx` — verified, complete list):**
`title: "Aturseva — Care that walks with you."`-shaped title (“Aturseva — Care that walks with you”);
`description` (journey-weaving sentence); `openGraph { title, description, type: "website" }`; `viewport
{ themeColor: "#0a0a0b", width: "device-width", initialScale: 1 }`; `html lang="en"`; favicon via
`src/app/icon.svg` (Next convention). **Verified absent: `og:image`, `twitter`/social cards, `canonical`,
`metadataBase`, `robots` meta or `robots.txt`, `sitemap.xml`, any structured data, any analytics.**
*(Baseline record at this file's authoring time. A later owner-delegated SEO-hygiene pass implemented the
canonical / robots-meta / sitemap subset — see the §16 addendum below.)* Single
route `/` only; navigation is in-page anchors; GitHub Pages serves the static export under the project
subpath.

| ID | Test/audit item | Current state | Future action (owner-gated) |
|---|---|---|---|
| T-SEO-01 | Title/description correctness | present, accurate, canonical tagline in title — verify rendering on live HTML | verify only — **VERIFIED live (QA-evidence pass): canonical tagline title + journey-weaving description rendered** |
| T-SEO-02 | Canonical URL | **present** — `<link rel="canonical" href="https://doctorooms-creator.github.io/aturseva-landing/">` | **IMPLEMENTED (post-roadmap SEO-hygiene pass, owner-delegated — §16 addendum):** the deployed subpath is the production URL policy in effect; `src/lib/site.ts` is the one-pass origin-update point (File 04 §15). Narrowed owner question: subpath permanent, or future custom domain? |
| T-SEO-03 | robots policy | **present** — `<meta name="robots" content="index, follow">` | **IMPLEMENTED (same pass):** the permissive crawler default made explicit (zero behavioural change vs the tag's absence); a physical `robots.txt` deliberately NOT added — ineffective on a Pages project subpath (robots.txt is only honoured at the host root; the meta tag is the effective channel — §16 addendum). No indexing goals implied. |
| T-SEO-04 | Sitemap | **present** — `/aturseva-landing/sitemap.xml`, one URL, no indexing hints | **IMPLEMENTED (same pass):** `src/app/sitemap.ts` (`force-static` for the export); URL-only entry per "do not imply indexing goals"; direct-submission discoverable (§16 addendum). |
| T-SEO-05 | Open Graph image | **absent** (`og:title`/`og:description` only) | propose 1200×630 monochrome OG image — asset creation is owner-gated (File 08 rules; no asset approved here) |
| T-SEO-06 | Twitter/social cards | **absent** | bundle with T-SEO-05 decision |
| T-SEO-07 | `lang` attribute | `en` — verified | verify only |
| T-SEO-08 | Heading order | one `h1` (Hero) → section `h2`s (incl. sr-only Connection h2) → card `h3`s — verified markup; rendered-order check NOT RUN | **VERIFIED live (QA-evidence pass): rendered DOM order = exactly one h1 → section h2s → card h3s, no level skips** |
| T-SEO-09 | Link names meaningful | verified (aria-labels on icon-only controls) | verify |
| T-SEO-10 | Icon/favicon | `icon.svg` present | T-ASSET-03 |
| T-SEO-11 | Static export/basePath behaviour | verified (File 10 §18) | **VERIFIED live (QA-evidence pass): every emitted resource URL carries the `/aturseva-landing` basePath prefix and loaded 200** |
| T-SEO-12 | Route/indexing policy | only `/` exists; no other routes may be presented as live | verify; guard against route invention |
| T-SEO-13 | External SEO services/tracking | none exist | **owner approval required for any addition** |

**§16 addendum — SEO-hygiene implementation record (post-roadmap pass, owner-delegated).**
Under the owner's standing "go ahead" delegation (the same interpretation the Batch-5 and B9-closure
passes used — execute the documented recommended path), the *minimal* additions this section itself
proposes were implemented for **T-SEO-02/03/04 only**:

- `src/lib/site.ts` — single source of truth for the public origin (`SITE_ORIGIN` / `SITE_PATH` /
  `SITE_URL`); this is the File 04 §15 "one-pass origin update" point for any future hosting move.
- `src/app/layout.tsx` — `metadataBase`, `alternates.canonical`, `openGraph.url` (all resolving to the
  live Pages URL, trailing slash matching the served URL), `robots: { index: true, follow: true }`.
- `src/app/sitemap.ts` — one-URL sitemap (`export const dynamic = "force-static"` for `output: "export"`),
  emitted by the Pages build at `/aturseva-landing/sitemap.xml`; URL-only entry (no changeFrequency /
  priority) per "do not imply indexing goals".

**Deliberately NOT added (unchanged owner gates):**

- **`robots.txt` file** — technically ineffective on this host: GitHub Pages project sites serve under
  the `/aturseva-landing` subpath and robots.txt is only honoured at the host root, which this repo
  cannot control. The meta tag is the effective policy channel; the sitemap is direct-submission
  discoverable. Revisit only if hosting moves to a root domain.
- **T-SEO-05 `og:image` / T-SEO-06 twitter cards** — asset creation remains File 08-gated; the text-only
  OG preview is unchanged.
- **T-SEO-13 analytics / SEO services** — owner approval still required; none added.
- **Structured data** — §17 policy "none" unchanged.

Verification: `tsc` clean; dev :3005 and the rebuilt preview :3006 render all three tags with the
production URL; the Pages export emits `sitemap.xml` plus the tags in `index.html` with fix-pages-fonts
assertions green; live re-verification (tags present, sitemap 200, B15 font gate holding, console clean)
is recorded in the repo worklog evidence for this pass.

---

## 17. Structured data policy

**Recommendation: none.** No JSON-LD/microdata exists at baseline (verified) and the verifiable facts do not
justify a schema payload today: there is no organization address/contact, no verified medical business
details, no reviews, and inventing `MedicalOrganization`/`Physician`/`FAQPage` fields would fabricate facts —
prohibited. If the owner later supplies verified organization data, any schema must be: minimal, validated
(schema validator), owner-approved, and covered by T-SEO-13-style review. **Never** invent doctors, ratings,
addresses, specialties, opening hours, offers, or medical claims in schema.

---

## 18. Browser/device matrix & failure-mode tests

Supported-browsers statement (File 07 §17 coverage note): modern evergreen Chrome/Safari/Firefox + iOS/Android
touch spot-checks; desktop 1440×900 and mobile 390×844 (+360) as reference viewports.

| ID | Scenario | Env | Expected (future execution) | Severity |
|---|---|---|---|---|
| T-BR-01 | Chrome/Safari/Firefox desktop pass | 3 browsers | File 07 §17 rows 1–2 hold per browser (hero <1s readable, full-scroll stable) | blocker |
| T-BR-02 | iOS Safari + Android Chrome spot-check | physical or emulation | mobile autoplay once; no pin; legible cards | high |
| T-BR-03 | JS/GSAP failure | block JS or gsap import | full content renders (fallback by construction — verify visually) | blocker |
| T-BR-04 | Slow connection | throttled | page readable with delayed JS; no permanent blanks | blocker |
| T-BR-05 | Font/asset missing (404) | simulate | readable fallback typography (swap); no layout destruction — **this is B15's live reality today** (inherited evidence) | P1 |
| T-BR-06 | Direct hash navigation | `/#sevika`, `/#paths` | settled render; upward scroll complete | high |
| T-BR-07 | Refresh mid-pin | desktop | pin recalculates; no stuck state | high |
| T-BR-08 | Orientation change | touch | T-RSP-06 | medium |
| T-BR-09 | Toast timeout | all | appears → 3.8s → gone; re-click resets (timer cleared — verified logic) | low |
| T-BR-10 | New asset 404 regression | Pages | T-ASSET suite catches any new 404 before release | blocker |

---

## 19. Evidence capture & record format

Per executed test, record exactly (no evidence files are created by this documentation task):

```yaml
test_id: T-XX-NN
source_sha: <full commit SHA under test>
environment: dev-3005 | preview-3006 | pages-production | root-build
url: <exact URL>
viewport_device: e.g. 1440×900 desktop Chrome | 390×844 iOS Safari | 360×? Android
steps: <executed steps>
expected: <from this file>
actual: <observed>
status: PASS | FAIL | BLOCKED | NOT RUN
severity: P0 | P1 | P2 | P3
evidence: <screenshot path(s) under qa/ · network/console excerpts · command output>
tester_time: <who/when>
linked_backlog_batch: <B-IDs and File 11 Batch, if any>
```

Conventions inherited from project practice: screenshots live in `qa/` (existing folder with numbered
captures); worklog entries record task summaries. **Do not create evidence files now** — future authorized
tasks only. Evidence with PHI/secrets is prohibited (File 13 §18).

---

## 20. Defect severity, triage model & ownership

| Level | Meaning (from this project's risk order) | Examples | Release rule |
|---|---|---|---|
| **P0** | Trust/claims blockers — dishonest or unsafe presentation | B1, B2(+B10), B3, B4 (decision), fabricated proof | blocks any release claiming “trust-first”; tracked defects documented openly until fixed |
| **P1** | Release/brand blockers | **B15 (font delivery — explicit release gate)**, B5 brand mismatch | blocks release of batches touching that area; B15 gates Batch 1 merge per File 11 §23 |
| **P2** | Quality defects | B8, B9, B11, B12, B7 | fix within planned batches; not silent |
| **P3** | Minor/latent | B13 (latent), B14, B16, B17, B18 | opportunistic/planned (Batch 3/5/1) |

Triage ownership: only the owner approves wording, assets, integrations, and scope changes; QA reports
`FAIL` facts with evidence; implementers act inside authorized batches. **Exception rule:** a P2/P3 may ride
only in its planned batch; no severity downgrade without an owner decision recorded in the docs.

---

## 21. Regression strategy per File 11 batch

Model (from File 11 §17 layers + §25 board): every authorized batch runs (1) targeted smoke for its scope,
(2) the full regression suite of this file **at its current SHA**, (3) a whole-route content/claims review
(File 11 §19 gate). Mapping:

| Batch (File 11) | Targeted smoke (minimum) | Full-regression emphasis | Notes |
|---|---|---|---|
| 0 — preflight | T-SM-01 | — | process only |
| 1 — typography + trust (B15 gate, B1, B2+B10, B3, B11, B17, B8, B18?) | T-FONT-01…09, T-COPY-01/02/03/08/10, T-MOCK-05 | T-SM-02…05, T-NAV-01…07, T-FRAME-01…10, T-RSP-01…08, T-MOT-01…08, T-A11Y core, T-PERF-05/06/10 | **B15 gate must be green (T-FONT-02 PASS on Pages) before merge** |
| 2 — CTA honesty (B4, owner-gated) | T-NAV-06/07 + matrix rows 12–14 truth | navigation suite + T-COPY-04/05 | decision recorded before implementation |
| 3 — motion lifecycle + tokens (B12, B13, B14, B9 + token migration, B18?) | T-MOT-02/05/06, token zero-visual-diff pass, hex sweep on touched files | full motion + responsive + no-JS | alias-first token migration QA: zero visual diff |
| 4 — asset integration (B6, owner-gated) | T-ASSET-01…05, T-PERF-08, File 08 §18 per-asset checks | full visual + performance snapshot | blocked until B15 pattern proven |
| 5 — brand-asset disposition (B5/B16, owner-gated) | T-COPY-06, asset-integrity checks, T-ASSET-05 | footer/brand visual pass | asset never edited without authorization |
| 6 — documentation reconciliation (B7) | docs link/consistency audit | — | docs-only; no code QA implied |

**Scope creep guard:** QA tasks never enter `/home/z/my-project/`; never “fix” what a test finds outside the
authorized batch — findings become documented defects or feed the next authorized prompt.

---

## 22. Test-to-backlog crosswalk (B1–B18 + no-B-ID task + Batches 0–6)

Every canonical B-ID (File 09 §26 / File 11 §5 — preserved exactly, no renumbering, nothing resolved by this
documentation):

| B-ID | Primary test(s) | Batch | Owner gate | Status |
|---|---|---|---|---|
| B1 zero-wait title | T-COPY-01 | 1 | wording sign-off | OPEN — `OWNER DECISION REQUIRED` |
| B2 Connection labels | T-COPY-02, T-MOCK-02, T-FRAME-06 | 1 | no (pattern approved) | OPEN |
| B3 Sevika framing | T-COPY-03, T-MOCK-03 | 1 | framing preference | OPEN |
| B4 CTA honesty | T-NAV-06/07 | 2 | **destination/process decision** | OPEN — `OWNER DECISION REQUIRED` |
| B5 logo tagline mismatch | T-COPY-06 + Batch 5 asset-integrity checks | 5 | **asset strategy** | OPEN — `OWNER DECISION REQUIRED` |
| B6 imagery absent | T-ASSET-04, T-PERF-08 (future media) | 4 | **sourcing/hero-route/generated** | OPEN — `OWNER DECISION REQUIRED` |
| B7 File 03 tagline reconciliation | docs audit (Batch 6) | 6 | owner doc review | OPEN (does not reopen tagline) |
| B8 © 2025 year | T-COPY-10 | 1 | no | OPEN |
| B9 hardcoded SVG greys | hex sweep on touched components (Batch 3 QA) | 3 (or touch-when-edited) | no | OPEN |
| B10 mobile label legibility | T-COPY-02, T-RSP-02/04 | 1 (with B2) | no | OPEN |
| B11 “instantly in step” | T-COPY-08 | 1 | wording sign-off | OPEN — `OWNER DECISION REQUIRED` |
| B12 reduced-motion reload | T-MOT-02, T-RSP-05 | 3 | no | OPEN |
| B13 ScrollTrigger cleanup | T-MOT-05/06 | 3 | no | OPEN (latent) |
| B14 dead `--animate-drift` | token audit (verify removal/adopt; usage search verified absent at baseline) | 3 | no | OPEN |
| **B15 live font 404** | **T-FONT-01…09 (release gate)** | **1 (merge/release gate)** | no (fix authorized by implementation pass) | **OPEN — `CURRENT RISK` (inherited File 08 §11.4 evidence)** |
| B16 unreferenced logo asset | T-ASSET-05 + Batch 5 disposition | 5 (folds into B5) | **with B5** | OPEN — `OWNER DECISION REQUIRED` |
| B17 false-affordance toggle | T-MOCK-05 | 1 | no | OPEN |
| B18 inert footer `mt-auto` | T-RSP-08 | 1 (if confirmed) / 3 (if deferred) | **scope confirmation** | OPEN — `OWNER DECISION REQUIRED` |
| no-B-ID token migration (legacy `brand/gold/ivory` → semantic aliases per File 05 §19-1) | zero-visual-diff alias pass + hex sweep | 3 | no (alias strategy agreed in-batch) | OPEN — `NOT IMPLEMENTED` |

Batch 0–6 mapping is defined once in File 11 §7/§25; this crosswalk adds tests without reordering batches.
All B-IDs and both Batch tables above: `NOT IMPLEMENTED`; no documentation resolves any ID.

---

## 23. Non-goals & open questions

**Non-goals of this file:** executing any test; fixing any defect; adding analytics/RUM/trackers/testing
packages/CI/extensions/services; approving any media asset (imagery remains owner-gated per File 08);
claiming WCAG/performance/SEO conformance; renumbering or resolving B-IDs; reopening the approved tagline;
entering the product repo; creating any cron/scheduled/background automation.

**Open questions (owner):**
1. Contrast targets — accept 4.5:1/3:1 AA-shaped thresholds as the measurement bar, and what to do about
   10–11px decorative/uppercase minima if measurements miss targets (B10-adjacent)?
2. Performance bar sign-off — are the proposed LCP/CLS/INP numbers in §15 the accepted release targets?
3. SEO additions — canonical/robots/sitemap/OG-image decisions (T-SEO-02…06) and any indexing intent?
   *(partially executed under the standing delegation — the T-SEO-02/03/04 minimal set is implemented per
   the §16 addendum; still open: OG image, twitter cards, analytics approval, and confirming the subpath
   as the permanent production URL)*
4. Browser/device floor — is the evergreen + iOS/Android spot-check matrix the agreed support statement?
5. Structured data — confirm “none” as policy until verified organization facts exist?
6. Q&A tooling — confirm manual/agent-browser tooling only (no purchased QA services)?

---

## 24. “Not yet executed” dashboard & handoff to File 13

**Dashboard (all `NOT RUN` — this task executed no product/browser QA):**

| Suite | Tests | Status |
|---|---|---|
| Smoke/build T-SM-01…05 | 5 | `NOT RUN` |
| Font/B15 T-FONT-01…09 | 9 | `NOT RUN` (B15 evidence inherited from File 08 §11.4) |
| Asset paths T-ASSET-01…05 | 5 | `NOT RUN` |
| Navigation/CTA T-NAV-01…07 | 7 | `NOT RUN` |
| Frames T-FRAME-01…10 | 10 | `NOT RUN` |
| Trust/copy T-COPY-01…10 | 10 | `NOT RUN` |
| Mock/Sevika T-MOCK-01…06 | 6 | `NOT RUN` |
| Responsive T-RSP-01…08 | 8 | `NOT RUN` |
| Accessibility T-A11Y-01…10 | 10 | `NOT RUN` |
| Motion/lifecycle T-MOT-01…08 | 8 | `NOT RUN` |
| Performance T-PERF-01…10 | 10 | `NOT RUN` |
| SEO T-SEO-01…13 | 13 | `NOT RUN` |
| Browser/failure T-BR-01…10 | 10 | `NOT RUN` |

**Handoff to File 13:** release timing, gates, deploy execution, post-deploy checks, rollback, incident
handling, and the handover evidence package are owned by `docs/13_DEPLOYMENT_AND_HANDOVER_PLAN.md`, which
references these test IDs as its release evidence requirements. B15 remains the open priority release gate:
**a docs-only commit — including the one publishing this file — does not fix it, and live font tests stay
`NOT RUN` until an authorized implementation batch executes T-FONT-01…09 and records results.**

**§24 addendum — measured-subset record (post-roadmap QA-evidence pass, owner-delegated).** This dashboard
is the authoring-time snapshot and stands as written. Later authorized passes measured and recorded
subsets in-file: Batches 1–3 evidence (qa/…) covered the T-FONT/B15 gate, mobile-390 overflow, console
cleanliness, reduced-motion finale, CTA/copy and focus states; the SEO-hygiene pass closed T-SEO-02/03/04
(§16 addendum); the QA-evidence pass (this addendum) additionally recorded the §13 contrast table (axe +
probes — 8 measured misses, all B10-adjacent owner-decision items), the §15 lab-metric table (LCP/CLS/
INP-probe/FPS/page weight — all PASS at lab), live verifications for T-SEO-01/08/11, and 320 px + 390 px
overflow checks (both 0 overflow). Still NOT RUN and not claimed: the full formal T-NAV/T-FRAME/T-MOCK/
T-COPY/T-RSP suite rows beyond the specific checks cited above, multi-browser (T-BR-01) and physical-device
(T-BR-02) rows, the formal no-JS run (readability is safe by construction per §13), 200 %-zoom reflow
beyond the 320 px proxy, and any field/RUM data (prohibited without owner approval).

---

*File 12 ends. Authoring task: documentation only; nothing implemented; no test executed; no automation
created. Next: see File 13.*
