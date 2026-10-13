# Aturseva — File 08: Visual Asset Plan

**Status:** `PLANNING — NOT IMPLEMENTED`
**Created:** 2026-10-13 (working-session date; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `e30dcc8` (Files 06+07 merge point; source tree identical to `f407e78` — verified empty diff on `src/`, `public/`, configs). All "verified" claims cite this tree. Line numbers refer to this commit; stable symbol names remain the reference if lines drift.
**Planning dependencies:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (capability/claims truth), `docs/03_BRAND_MISSION_AND_POSITIONING.md` (brand strategy; tagline superseded by owner decision), `docs/04_SITEMAP_AND_NAVIGATION.md` (route/anchor/CTA truth; backlog items 1–8), `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md` (**mandatory design baseline — §12 imagery rules are this file's foundation; not re-opened**), `docs/06_HOMEPAGE_STORYBOARD.md` (frame IDs N/H/J/C/P/S/R/F), `docs/07_MOTION_AND_SCROLL_ANIMATION.md` (motion IDs M-*; media interaction constraints).
**Scope:** visual asset production planning and governance for the single-page Aturseva homepage (`/`) — inventory, strategy, scene planning, delivery specifications, rights/consent framework, QA gates. **No asset is created, fetched, licensed, generated, cropped, recoloured or altered by this document. No source change is authorized or performed.**
**Owner decision boundaries:** official tagline **"Care that walks with you."** is owner-approved and canonical. The logo asset (embedding "Make healthcare intelligent." lettering) is untouched; interim usage rules per File 05 §10. Whether generated imagery is acceptable is **unresolved** (§4/§15). Imagery direction/sourcing is **unresolved** (§20). Nothing in this file resolves an owner decision by being written.

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-13 | Initial creation; 20 sections; evidence-backed asset inventory; VS scene system mapped to File 06 frames; new findings B15–B16 | Files 08+09 combined planning task |

**Backlog convention (continuing Files 04–07):** B1–B8 = File 04 §16 items 1–8; B9 = File 05 §19 item 9; B10 = File 06 §20; B11–B14 = File 07 §19. **New findings from this file's audit start at B15** (assigned in materiality order; convention recorded here for File 09 and File 11). No backlog item is implemented by this document.

---

## 1. Document control, scope and dependencies

- **Type:** asset-production and governance plan — a decision-ready contract between brand direction (Files 03/05), story needs (File 06), motion constraints (File 07) and future implementation (File 11) / QA (File 12). Not a gallery, not a mood board, not an asset set.
- **What File 08 owns:** the definition of which visual assets the site *would need* (if the owner approves any), under what rights/consent/licence regime they may enter the repo, at what specifications they must be delivered, and how they are registered, QA'd and retired.
- **What File 08 does not own:** copy (File 06 §13), motion timings (File 07 §7), component contracts (File 09), implementation sequencing (File 11), measurable QA execution (File 12), the logo asset strategy decision itself (B5 — this file frames options only), and any existing source behaviour.
- **How downstream files consume this:** File 09 §17 cross-references VS scene IDs and asset-register fields defined here; File 11 maps approved batches (§19) to implementation work; File 12 executes §18's unchecked acceptance gates.
- **Verification method:** full source audit at `e30dcc8` (all components, `globals.css`, `layout.tsx`, `page.tsx`, `aturseva-anim.js`, `AnimationProvider.tsx`, `package.json`, `next.config.ts`, complete `public/` tree, deploy workflow) **plus** live-site HTTP checks against the deployed GitHub Pages build and one browser-level font check (`document.fonts`) — evidence cited inline. No visual QA of any *new* asset occurred (none exist). CI/HTTP success is never treated as visual proof.

---

## 2. Current asset inventory — evidence-backed

Audit of the entire deployed-asset surface at `e30dcc8` (local tree + live Pages deployment):

| Asset / role | Existing path | Type / dimensions (verified) | Current use | Evidence | Status | Keep / change recommendation | Rights / consent status |
|---|---|---|---|---|---|---|---|
| Manrope variable font | `public/fonts/Manrope-Variable.woff2` | WOFF2 variable, weight axis 200–800, 24,836 B | body/UI typeface via `@font-face` (`globals.css:88–94`), `--font-sans` | file stat; CSS source; live fetch 200 | **CURRENT RISK (B15)** — 404s on live Pages build (§11.4) | keep file; fix delivery path in File 11 (PROPOSED) | self-hosted; provenance not documented in-repo (licence terms `not verified` — presumably SIL OFL family; confirm before any redistribution claim) |
| Fraunces variable font (roman) | `public/fonts/Fraunces-Variable.woff2` | WOFF2 variable, 300–900, 36,620 B | display serif via `@font-face` (`globals.css:95–101`), `--font-display` | file stat; CSS source | **CURRENT RISK (B15)** — same 404 | keep; fix path (PROPOSED) | same as above (`not verified`) |
| Fraunces variable font (italic) | `public/fonts/Fraunces-Variable-Italic.woff2` | WOFF2 variable italic, 300–900, 45,656 B | italic display accents (one-accent rule, File 05 §6) via `@font-face` (`globals.css:102–108`) | file stat | **CURRENT RISK (B15)** — same 404 | keep; fix path (PROPOSED) | same (`not verified`) |
| Primary logo (with tagline lettering) | `public/assets/logo-primary.svg` | SVG, viewBox 336×100, black fill, `role="img"` + `<title>/<desc>` metadata, 10,460 B | **none** — deployed statically (live `/assets/logo-primary.svg` → 200) but referenced by no component; the inline `Logo.tsx` is the render source | live HTTP 200 (10,460 B); `rg logo-primary src/ scripts/` → no matches; md5 identical to owner upload `Aturseva_Primary_With_Tagline (1).svg` | **VERIFIED CURRENT** as deployed-but-unreferenced (**B16**, new) | keep as canonical provenance copy; keep/remove folds into B5 strategy (OWNER DECISION REQUIRED) | owner-supplied (verbatim copy; consent for use self-evident) — licence metadata `not verified` (none embedded beyond title/desc) |
| Favicon | `src/app/icon.svg` | SVG, 100×100, ink-950 rounded square (rx 22) + ivory symbol at 0.8 scale, 1,844 B | browser tab icon (Next App Router `icon.svg` convention) | file content | **VERIFIED CURRENT** | keep | derived from owner logo symbol; owner asset |
| Film-grain texture | inlined data-URI in `.grain` (`globals.css:154–164`) | 160×160 SVG `feTurbulence` noise, `mix-blend-mode: overlay`, 0.4 opacity | cinematic grain overlay on dark sections (Hero, Connection, Sevika, Footer) | CSS source | **VERIFIED CURRENT** | keep | generated in CSS; no external rights |
| Decorative inline SVGs | `Hero.tsx` (journey arc, ECG), `Journeys.tsx` (broken lanes), `Connection.tsx` (lanes/comets/dots), icon paths in `Nav/Paths/ProductReveal/Sevika/Journeys` | inline vector, `aria-hidden="true"`, hardcoded neutral greys (B9) | narrative linework and UI glyphs | component sources | **VERIFIED CURRENT** | keep; grey values migrate to tokens only on future edit (B9) | authored in-repo; no external rights |
| QA evidence screenshots | `qa/*.png` (45 files) | PNG captures of past QA sessions | repo history evidence only — **not site assets**: outside `public/`, never referenced, not deployed | `git ls-files qa/`; absent from `public/` | **VERIFIED CURRENT** (non-asset) | keep for provenance; never treat as site media | internal artifacts |

**Headline inventory findings:**

1. **Zero photographic or video assets exist in the deployed site** — `public/` contains fonts + one unreferenced logo SVG only; every rendered visual is inline SVG, CSS, or typography (verified: full `public/` tree listing + component audit). This is a **current-state finding, not an instruction to add media** — whether human imagery enters the site at all is the owner's decision (§4, §20).
2. **Inventory correction vs prior docs:** File 06 §1 described `public/` as "fonts + favicon only." The actual tree is fonts + `assets/logo-primary.svg`, with the favicon at `src/app/icon.svg` (App Router convention, still deployed). File 06 is not edited (out of scope); this section is the corrected record. The substance of prior claims (no photos/videos) holds.
3. **Fonts and favicon are deliberately self-hosted** (no CDN, no third-party font service — verified: no external font URLs anywhere in source). Photographic/video content: none to differentiate — there is none.

---

## 3. Asset strategy and creative premise

Carried forward from File 05 §3/§12 (locked; not re-opened):

- **Concept:** human-first, cinematic restraint. The human story leads; the interface supports it. Monochrome black/white/neutral-grey only. Generous negative space. Dignity over drama.
- **What visuals must communicate:** care as a *connected journey* — a person accompanied, a day made humane, a desk made calm. Never that Aturseva replaces clinicians, reception staff, hospitals, or human relationships (File 02 support-not-replacement framing; File 03 §8).
- **Division of labour (File 05 §12 contract):** real human moments establish *emotion*; diagrams (archetype C) clarify the *connected workflow*; product UI (archetype D) demonstrates *supported capability*. **Never blended** — a human photo never wears UI overlays; a diagram never contains photos.
- **Current-state honesty:** the entire live site already tells the complete story without any photographic asset (File 06 §17-verified). Imagery would be an *enhancement of emotional resonance*, not a missing capability. This plan therefore treats every proposed asset as optional until the owner approves direction, sourcing and rights (§4, §20).

---

## 4. Owner decisions versus proposed recommendation — sourcing model

**Generated-imagery acceptability and overall sourcing model are unresolved owner decisions.** No prior repository document or recorded owner instruction approves generated visuals, commissioned photography, or licensed stock for this site (searched Files 02–07; none contain such an approval). Options are presented separately; none is selected:

| Option | Description | Production burden (qualitative) | Consistency control | Rights / consent surface | Turnaround dependencies | Brand-control implication |
|---|---|---|---|---|---|---|
| **A — Commissioned photography** | original shoots for the scene list (§8) | highest: casting, locations, scheduling, monochrome grade in production | highest — art direction on set | model releases per identifiable person; location permissions where applicable | casting + shoot + post per scene; sequential by nature | maximum control; authentic texture |
| **B — Licensed photography/video** | properly licensed existing works | lower than A (selection, not production) | medium — depends on catalogue coherence | licence terms per asset (scope, duration, exclusivity unknown until selected) | licence clearance per asset | medium; risk of generic look (§5 prohibitions still apply) |
| **C — Generated visuals** | AI-generated imagery, only after explicit owner approval | lowest production, highest review | controllable but artefact-prone (§15 controls) | no model releases, but licence/ToS of the generator + disclosure obligations vary and are `not verified` | fastest per asset | lowest authenticity guarantee; reputational risk if presented as real people (§15) |
| **D — Hybrid** | e.g. licensed establishers + generated inserts, or commissioned hero only | mixed | requires strict register separation (§14/§19) | both regimes run in parallel | phased | medium-high; governance overhead |

**Planning recommendation — `PROPOSED — OWNER APPROVAL REQUIRED`:** if the owner wants human imagery, prefer **A or B for any frame showing a human face**, reserving **C (if approved at all) for abstract/non-human texture** (surfaces, objects, environments) where artefact risk and deception risk are lowest. Exact decision required from owner: *"Which sourcing option(s) are approved, and is generated imagery acceptable at all — and if yes, for which asset classes?"* No price, lead time, vendor or volume is stated here (none verified; inventing them is prohibited).

**This task does not fetch, generate, license or purchase any media.**

---

## 5. Visual principles and prohibited imagery

Positive art direction (consistent with Files 02–05; binding for every future asset):

- Quiet, emotionally credible healthcare moments: people shown with **dignity, agency and natural interaction** — waiting with calm attention, listening, being assisted, following a plan at home.
- Eye-level framing; credible, diverse, age-inclusive casting; ordinary people, not glossed models (File 05 §12).
- Indian healthcare context portrayed with respect and normalcy: real clinic textures, natural light, ordinary dignity.
- Negative space as a first-class compositional element (text/CTA safe areas — §10).

Prohibited (binding; audited per asset in §18):

- Stock clichés: grinning handshakes, stethoscope-on-laptop, thumbs-up patient, staged cheering teams.
- Medical-emergency melodrama: rushing trolleys, alarmed faces, distress exploitation, poverty stereotypes.
- Before/after medical outcomes; any visual implying clinical results.
- **No identifiable individual depicted as a real Aturseva customer, doctor, hospital partner, employee or endorser** unless that identity and permission are authentically verified and owner-approved (ties to §14 consent schema).
- No invented testimonial portraits or visual cues implying a real case study.
- No UI artwork or photos implying real queue counts, real patient data, real integrations, clinical evidence or guaranteed outcomes (extends File 02 claims policy to imagery).

---

## 6. Monochrome treatment and visual integrity

Translating File 05 §4/§12 locked monochrome rule into asset acceptance criteria:

- **Site UI palette:** black, white, neutral greys only — no teal/green/gold/beige/warm-ivory cast, no purple/blue, no colour gradients, no coloured glow. Verified current token values are all neutral (`globals.css:13–54`, `ink/brand/gold/ivory` legacy names carry neutral values — B9-adjacent naming note, File 05 §5.3).
- **Photographic grade (future assets):** neutral greyscale conversion preserving **facial readability, skin/fabric texture and luminance separation** — faces stay ≥ mid-grey against surroundings (File 05 §12). No coloured duotones, no sepia/warm cast. Grain may echo the `.grain` stage treatment (≤ 0.4 opacity equivalent).
- **Skin-tone dignity rule:** real skin tones in photographs must **not be unnaturally flattened solely to force the site monochrome**. The approved treatment is a *documented image grade* (per-asset, §14 metadata) applied at production time — separate from the site UI palette, which remains strictly neutral. The register records the grade recipe so QA (§18) can verify consistency, and so the distinction "UI = tokens; photos = graded captures" stays explicit.
- **Diagnostic legibility check (acceptance):** a greyscale asset must remain legible at target sizes — subject/background separation ≥ the luminance delta used by current lane greys (e.g. `#7a8083` vs `#f4f4f5` surfaces — verified values in `Journeys.tsx`/`globals.css`).
- **No asset is altered now.** The existing inline SVGs' hardcoded greys remain as-is (B9, touch-when-edited).

---

## 7. Story/frame-to-asset map

Maps File 06 frame IDs → File 07 motion relations → asset requirement. Scene IDs **VS-01…VS-08** are defined here (File 09 §17 cross-references them). `existing` = verified current implementation; `proposed` = owner-gated future asset.

| Frames (File 06) | Motion (File 07) | Section / anchor | Asset needed | Narrative purpose | Desktop / mobile crop | Motion dependency | Accessibility alternative | Risk | Acceptance criterion (per asset) | Owner decision dependency | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| N-01–03 | M-N | Nav / `#site-nav` | **none** — wordmark is the inline `Logo` component (`word` variant); no photographic need | orientation | n/a | n/a | Logo `role="img" aria-label="Aturseva"` (verified) | n/a | **n/a — no asset** (explicit) | — | EXISTING — VERIFIED |
| H-01–H-05 | M-H1–H3 | Hero / `#top` | **VS-01 (proposed, optional):** one human-first still (or short film — §9) in the reserved right-of-text negative space (File 06 §6/§14 reservation) | emotional anchor: "no one walks it alone" made visible | 21:9 or 16:9 wide; mobile: omit or 4:5 below/behind text (§10) | entrance must not delay H1 comprehension (File 07 §8: first fade < 0.3s); if film: muted loop + poster + reduced-motion → poster (§13) | decorative (`aria-hidden` + sr-only context text already present) — never the sole carrier of the promise | LCP/CLS on the largest viewport element; copy contrast over image | contrast-safe area preserved; poster state complete; §18 checklist green | §9 route + §4 sourcing | PROPOSED — OWNER DECISION REQUIRED |
| J-01–J-03 | M-J1–J3 | Journeys / `#journeys` | **VS-02/VS-03/VS-04 (proposed, optional):** one consistent set — patient+carer waiting / doctor's day / front-desk assisted walk-in — as quiet split-crop inserts (1:1 or 4:5) | put a human face on each of the three *fragmented* journeys (problem framing, pre-Aturseva) | 4:5 or 1:1 per card; mobile stacks under lane SVG | reveal (M-J1) unaffected — static inserts; no new motion | decorative; cards' meaning is the copy+chips (verified) | montage inconsistency diluting the "one coherent set" idea; clutter vs restraint | set graded consistently; no card visually louder than another; §18 green | §4 sourcing; casting/consent per §14 | PROPOSED — OWNER DECISION REQUIRED |
| C-01–C-06, C-01m, C-01r | M-C1–C6, M-Cm, M-Cr | Connection / `#connection` | **none** — designed workflow graphics already exist in code (lanes, hub, comets, dots; verified `Connection.tsx:50–106`) | the diagram *is* the story; comprehension is paramount | n/a | external media must not compete with diagram comprehension or cause labels to lose contrast | sr-only `<h2>` verified; diagram decorative | media would fight the signature sequence for attention | **n/a — no asset** (explicit) | — | EXISTING — VERIFIED |
| P-01–P-03 | M-P1–P3 | ProductReveal / `#platform` | **none** — the representative UI window is the primary evidence; do not decorate it in a way that implies real data | supporting-evidence archetype (File 05 §11-D) | n/a | tilt scrub (M-P2) unaffected | "Representative preview" badge verified present (`ProductReveal.tsx:31–34`) | decoration could imply live operation | **n/a — no asset** (explicit) | — | EXISTING — VERIFIED |
| S-01–S-03 | M-S1–S3 | Sevika / `#sevika` | **VS-05 (proposed, optional):** at-home follow-through moment (medicine, glass of water, phone nearby) as a quiet split visual | the after-visit continuity made tangible | 4:5 split (60/40 text rule, File 05 §12); mobile stacks | static insert; message stagger (M-S2) unaffected | decorative; thread is real DOM text (verified) | implying the depicted person is a real patient (prohibited §5) | no identifiable-patient implication; §18 green | §4 sourcing + §14 consent | PROPOSED — OWNER DECISION REQUIRED |
| R-01–R-03 | M-R1–R3 | Paths / `#paths` | **VS-08 (proposed, optional):** small orientation portraits per role card — **only if** they improve orientation and add zero CTA ambiguity | "which door is mine" recognition | 1:1 small crop or none; mobile same | static; card reveal (M-R2) unaffected | decorative; role identity is the eyebrow + title | portraits could read as real customers/endorsers (§5) — highest caution zone | no endorsement implication; §18 green; if in doubt, omit | §4 sourcing + §14 consent | PROPOSED — OWNER DECISION REQUIRED (recommend restraint: omit by default) |
| F-01–F-02 | M-F (static) | Footer | **none** — quiet close; imagery would add noise | grounding, not persuasion | n/a | static by design | n/a | n/a | **n/a — no asset** (explicit) | — | EXISTING — VERIFIED |

**Explicit no-asset zones** (Connection, ProductReveal, Footer) are decisions, not omissions: they protect diagram comprehension, evidence honesty and the quiet close respectively.

---

## 8. Shot-list / scene concepts (planning — not a storyboard replacement)

Scene concepts for owner review, aligned to File 05 §12 preferred moments. Casting, ethnicity, gender, disability, age, clothing and location are **not prescribed** beyond the credibility rules in §5 — aim for representative, non-stereotyped care moments; a concise coherent set, not a large photo library.

| Scene ID | File 06 frame/section | Story purpose | Subject / action | Framing / composition | Background / environment | Light / tone | Negative space / text safe area | Aspect ratio / crops | Mobile fallback | Motion use | Rights / consent needs | Status / approval |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| VS-01 | H-01–H-05 (Hero) | companionship anchor | a patient and a carer side by side, calm attention — waiting as a shared moment, not suffering | medium-wide, eye-level; subjects right-of-centre leaving left 40% clean for H1/lead (File 06 §6 reservation) | clinic waiting area, softly out of focus | natural window light, gentle falloff; neutral grade | left 40% at ≥ mid-grey so ivory copy holds 4.5:1 | 21:9 hero wide; 16:9 secondary | omit (arc + ECG carry mobile) or 4:5 behind dimmed overlay | none on the still; film variant per §9 | model releases ×2 (identifiable) | PROPOSED — OWNER DECISION REQUIRED |
| VS-02 | J-01–J-02 (patient card) | the long wait, humanized | person checking a token slip / watching the room, composed not distressed | medium, seated eye-level | waiting-room seating, real texture | ambient, even | top-right chip area clean | 4:5 (card split) | stacks below lane SVG | none (static insert) | release ×1 | PROPOSED — OWNER DECISION REQUIRED |
| VS-03 | J-02 (doctor card) | the full day, with agency | doctor between patients — reviewing a list, brief pause, not posing at camera | medium close, slightly off-axis | clinic corridor / consultation room ambient | practical light, quiet | lower-third title zone clean | 4:5 (card split) | stacks | none | release ×1; avoid implying a named/real partner doctor | PROPOSED — OWNER DECISION REQUIRED |
| VS-04 | J-03 (hospital card) | the busy desk, with dignity | reception staff assisting an older walk-in patient with registration — staff in charge, patient at ease (File 04 §11-D inclusion rule) | medium two-shot across the counter | front desk, real paperwork/QR stand texture | warm-neutral practical light (graded neutral) | right-third safe | 4:5 (card split) | stacks | none | releases ×2 | PROPOSED — OWNER DECISION REQUIRED |
| VS-05 | S-01–S-03 (Sevika support) | the follow-through at home | a evening moment at a table: medicine, glass of water, phone nearby — hands and objects; face optional | close-medium; shallow depth for intimacy (File 05 §12) | home interior, evening | low ambient lamp + screen glow, neutral grade | left 40% text side clean | 4:5 split (60/40 rule) | stacks below bullets | none | release if face/identifiable; else property ok | PROPOSED — OWNER DECISION REQUIRED |
| VS-06 | C-01–C-06 (Connection) | *reserved — no media* | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | NO ASSET (§7 explicit) |
| VS-07 | P-01–P-03 (ProductReveal) | *reserved — no media* | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | NO ASSET (§7 explicit) |
| VS-08 | R-01–R-03 (Paths) | orientation (optional) | quiet role-context portraits — *only if* §7 risk assessment passes | tight 1:1, low emphasis | role-plausible environment | soft neutral | n/a (no text over image) | 1:1 small | same | none | releases per depicted person | PROPOSED — restraint default: omit |

**Scene-set coherence rule:** VS-02/03/04/05 (and VS-01 if approved) must read as one photographic world — same grade recipe, light philosophy and casting reality — regardless of sourcing option (§4). This is an acceptance criterion (§18), checked by eye at approval previews and re-checked per added asset.

---

## 9. Hero media decision matrix

A video is **not mandatory**. No asset is assumed ready before owner direction and File 12 performance/accessibility testing. The current SVG/typography hero is a complete, verified, zero-asset implementation (File 06 §6 "honest record").

| Criterion | Route 1 — no new media (current) | Route 2 — static frame (VS-01 still) | Route 3 — short muted looping film |
|---|---|---|---|
| Narrative value | promise carried by H1 + arc + ECG (verified complete) | highest per-byte: one credible human moment | adds presence ("the world breathes"); marginal over a great still |
| Visual plausibility with brand | already live and brand-consistent | high if §5/§6 rules hold | high, but must stay *quiet* (no cinematic urgency, §5) |
| Loading / LCP risk | none (verified: zero image requests) | one hero-viewport image; must not delay LCP — poster/blur placeholder strategy required | poster + video fetch budgeting; preload discipline required |
| Responsive crop | n/a | 21:9 → mobile omit/4:5 (§10) | same crops per breakpoint; object-position contract |
| Reduced-motion / no-JS fallback | n/a | still renders (it *is* the fallback) | **poster frame renders; film never autoplays under reduced motion** (§13) |
| Captions / transcript | n/a | n/a | only if meaningful audio ever exists — default is **muted, no audio track**, so captions n/a; if audio is ever added: captions + transcript required (§12) |
| Poster frame | n/a | the asset itself | explicit poster export required (same §6 grade) |
| File size / encoding targets *(proposed test criteria — not measured claims)* | n/a | AVIF ≤ ~180 KB proposed budget for hero wide; WebP fallback ≤ ~250 KB | H.264 MP4 + VP9 WebM; proposed budget ≤ ~2.5 MB combined; loop 6–10 s; silent | 
| Effect on copy contrast | none (verified stage) | left-40% safe-area rule + luminance floor (§6/§10) | same, plus motion must not shift luminance under text |
| Decision status | **VERIFIED CURRENT — valid permanent fallback** | `PROPOSED — OWNER DECISION REQUIRED` | `PROPOSED — OWNER DECISION REQUIRED` |

> **Route 4 — procedural 3D (code-only), added 2026-10-14 (planning record; ARCHIVED same day):** the owner approved planning a fourth route — a **monochrome, procedurally generated 3D diya** in the hero, built with the external agent skill **img2threejs** (code-only output; no image/video/mesh asset enters the repo, so §4 imagery gates are not triggered). Full plan was written as `docs/14_3D_HERO_AND_IMG2THREEJS_PLAN.md`. **The owner rejected this direction on 2026-10-14** ("ye diya wala mujhe sahi nai laga") — File 14 is now `ARCHIVED — OWNER REJECTED DIRECTION`; the rejection and the successor plan (product-UI-first redesign, `docs/15_PRODUCT_UI_FIRST_LANDING_REDESIGN_PLAN.md`) are recorded in File 13 §10. Routes 2 and 3 remain independently open; Route 1 remains the verified standing default.

---

## 10. Aspect ratios, responsive crops and safe areas

Ratios by role (File 05 §12 carried forward; no real photo file exists, so all are proposals — "use current dimensions where a real file exists" resolves to: only the logo 336×100 and favicon 100×100 are real, both fixed-usage):

- **Hero wide:** 21:9 primary, 16:9 secondary; mobile omits or 4:5 (VS-01).
- **Split editorial (cards / Sevika):** 4:5 or 1:1; 60/40 text-side negative-space rule.
- **Editorial bands:** 3:1 (reserved; no current consumer — do not produce without a section that needs it).

Crop and safe-area rules (acceptance-checked):

- **Focal point:** face/subject anchored per breakpoint; the focal coordinates, if adopted, live in the asset register (§14/§19) as the file-source-of-truth — not in ad-hoc CSS.
- **Face/head/joint safeguards:** never crop heads at hairline, chin mid-face, or joints at frame edges (File 05 §12).
- **Typography/CTA safe areas:** hero left 40% at ≥ mid-grey luminance (ivory copy contrast); card inserts keep title/chip zones clean; no text over VS-08 portraits.
- **Approval previews:** every asset is approved at the actual target breakpoints (≥1280, 1024–1279, 768–1023, 640–767, <640 — File 05 §16 widths) before integration — not on a lightbox mock.
- **Zoom/reflow:** crops must survive 200% zoom / reflow without losing the subject (File 12 test target).

---

## 11. Asset delivery specifications

### 11.1 Naming, directories, metadata record (recommendations — none created)

- Naming: `aturseva-{section}-{scene}-{role}-{ratio}.{ext}` (lowercase kebab; no spaces; version bump `-v2` only on replacement, old file retired through the register). Example (hypothetical): `aturseva-hero-vs01-wide-21x9.avif`.
- Directory approach: `public/media/{hero|journeys|sevika|paths}/` — separate from the existing `public/fonts/` and `public/assets/` (logo). **No directory is created by this task.**
- Metadata record: a future `docs/ASSET_REGISTER.md` (or JSON) implementing §19's schema — created only when the first approved asset exists. The register is the source of truth for rights, grade, crops and retirement.

### 11.2 Format selection (proposed guidance — support not yet tested)

- **SVG:** line art, icons, logo lockups (current practice: all vector is inline or `public/assets/`).
- **AVIF primary / WebP fallback / JPEG last resort** for photographs, via `<picture>`; PNG only where transparency is essential and fallback chains can't carry alpha.
- **MP4 (H.264) + WebM (VP9)** for film, silent, looped; poster exported as the still-frame rules above.
- Responsive delivery: `srcset`/`sizes` per breakpoint class; explicit `width`/`height` (or CSS aspect-ratio) on every image to reserve space — CLS budget: zero from media (File 12 target).

### 11.3 Version control

Assets are git-LFS candidates above ~300 KB binary (decision for File 11; current repo has no LFS objects — verified `package.json`/git config). Register records each file's SHA/size at adoption; replacements retire, never overwrite silently.

### 11.4 Static-export delivery constraint — **B15 (new, CURRENT RISK, verified live this audit)**

The Pages deployment (`next.config.ts`: `output: "export"`, `basePath: "/aturseva-landing"`, `images.unoptimized: true`) has a verified asset-path failure mode that any future media must not repeat:

- `globals.css:88–108` `@font-face` uses root-absolute `url("/fonts/…")`. The built CSS on the live site still contains `url(/fonts/Manrope-Variable.woff2)` (verified from the deployed CSS chunk), while the files deploy under the basePath: live `/aturseva-landing/fonts/Manrope-Variable.woff2` → **200 (24,836 B)** but `/fonts/Manrope-Variable.woff2` → **404**. Browser-level check on the live URL: `document.fonts.check('16px Manrope')` = **false**, `check('16px Fraunces')` = **false**, zero loaded font faces — **the live site currently renders with fallback fonts** (Georgia / system sans). Dev (:3005, root-served) and preview (:3006, self-contained) are unaffected (dev verified: 3 loaded faces, both checks true).
- **B15 = "self-hosted font URLs 404 on the GitHub Pages build (root-absolute CSS url vs basePath deployment); live typography falls back."** Priority P1 (brand alignment on production). Fix routing belongs to File 11 (e.g. basePath-aware reference strategy / `next/font/local` migration — PROPOSED, not implemented).
- **Rule for all future media (binding):** no root-absolute URL references for `public/` assets in CSS or JSX; every reference strategy must be proven against **both** deploy targets (root dev/Vercel and basePath Pages) before merge — verified by a live fetch, not by dev-server behaviour alone. This section is the contract; File 11 owns the B15 fix and the pattern enforcement; File 12 owns the regression test.

---

## 12. Accessibility and nonvisual equivalents

Requirements for every future asset (File 12 verifies; nothing here is a compliance claim — WCAG 2.2 AA remains a File 12 test target):

- **Descriptive vs decorative:** narrative stills/films are *decorative atmosphere* — `alt=""` / `aria-hidden` with the story carried by real DOM text (current hero already does this: sr-only ECG description, `Hero.tsx:128–130` — verified pattern). Informative diagrams already ship with sr-only headings (Connection `<h2>`, verified) — any *new* informative graphic must ship a textual equivalent.
- **Alt text:** if an asset ever becomes informative (e.g. VS-08 role portraits), alt text describes the moment, not the marketing message; no claims inside alt text.
- **Captions/transcripts:** mandatory only if meaningful audio exists; default video direction is silent (§9) so the requirement stays n/a until changed.
- **No essential message only inside a video** — every future film's message must already exist in DOM text.
- **Readable contrast behind copy:** §10 safe-area luminance floors; checked at approval previews (manual) and File 12 (test).
- **Reduced-motion / autoplay constraints:** §13; no autoplay-with-audio ever; film loops freeze to poster under reduced motion.

---

## 13. Motion and media interaction constraints

Coordinated with File 07 (exact timings live there; this section cites IDs, does not duplicate them):

- **No scroll-jacking** by or for any asset (File 07 §2.5 rule; verified none exists). A hero film must not gate or pace scroll; the Connection pin's monopoly on scrubbed storytelling stays untouched (§7 explicit no-asset zone).
- **Non-motion state for every media treatment:** still = its own fallback; film = poster + full content in DOM; overlays freeze under `prefers-reduced-motion: reduce` (CSS kill-switch verified `globals.css:127–135`; JS branch verified `aturseva-anim.js:437–439`).
- **Keyboard-accessible controls:** if a film ever carries meaningful audio or >5 s foreground attention, a visible pause control is required (File 07 §14 proposed requirement — carried here as binding for media).
- **Anti-live-data rule:** no motion may imitate live counters, incoming patient data, token progression or operational feeds (File 07 §9; verified compliant today — `#token-counter` static "42"). Film content must not show ticking numbers or "live" UI in motion.
- **Frame-ID dependencies:** VS-01 interacts with M-H1–H3 (must not delay the <0.3s headline comprehension budget); VS-02–05/08 are static inserts orthogonal to M-J/M-S/M-R reveals; no asset touches M-C* or M-P* (no-asset zones).

---

## 14. Consent, licensing, provenance and privacy

Governance checklist + metadata schema for the future register. **No legal review has been performed or is implied.** No real patient/doctor data may appear in any asset, illustrative UI or comp (extends File 02 PHI boundary to imagery).

Register fields (schema for §19):

| Field | Content |
|---|---|
| `asset_id` | register key (naming per §11.1) |
| `creator / source` | photographer, agency, library, or generator + model/version |
| `licence / usage rights` | licence name, scope (web/static export), territory, term |
| `consent / model release` | yes/no per identifiable person; release reference |
| `release dates / restrictions` | start, expiry, renewal obligations |
| `intended channels` | landing site (both deploy targets), preview artifact |
| `modifications allowed` | crop/grade rules per §6/§10 (grade recipe recorded) |
| `attribution text` | required attribution, if any |
| `ai_generated` | true/false + disclosure obligation status (§15) |
| `privacy review` | no PHI, no identifiable patient documents/screens; pass/fail + reviewer |
| `removal contact / process` | owner-designated contact; retirement steps (§11.3) |

Process gates: adopt → register → §18 acceptance → deploy; retirement unregisters with git history retained. Every `not verified` rights field in §2 must become verified before any redistribution beyond the current self-hosted use.

---

## 15. Generated imagery controls — conditional appendix (only if separately approved)

Acceptance of generated visuals is **unresolved** (§4). This appendix is a decision path, not a permission:

- If the owner approves generated visuals for a class of assets: every such asset is registered with `ai_generated: true` and its generator/model; **never presented as photography of real people** (no generated faces in testimonial-adjacent contexts; VS-08 prohibited zone unless separately cleared).
- Consistency checks across scenes: same grade, same "world" — a generated insert must pass the §8 coherence rule against the rest of the set.
- Artefact review mandatory: hands, faces, medical equipment (wrong anatomy, impossible instruments), text-in-image (garbled lettering) — human review before acceptance; rejection criteria explicit in §18.
- No deceptive clinical evidence; no implied real endorsement (§5 binds generated assets identically).
- **No sample images are generated, and no production prompts are written, by this task.** Generation is not the decided option.

---

## 16. Logo and brand-asset mismatch

- Canonical approved tagline (verbatim, owner-approved): **"Care that walks with you."** The logo asset's embedded phrase "Make healthcare intelligent." (vector lettering, not editable text) is a known mismatch — **B5** (File 04 §16 item 5).
- **Untouched, per binding rules:** the logo is not altered, cropped, covered, recoloured, traced or redrawn; no replacement is created. Verified current usage stands: header uses the `word` variant (no embedded phrase — `Nav.tsx:27`); footer uses the `full` variant (`Footer.tsx:13`); interim rules per File 05 §10 (embedded lettering never relied upon, never edited around).
- **B16 (new, this audit):** the owner-supplied master `public/assets/logo-primary.svg` (10,460 B; md5-identical to the owner upload; carries `<title>`/`<desc>`; live-deployed at `/assets/logo-primary.svg`) is **unreferenced by any component** — the inline `Logo.tsx` is the render source. Keep-or-remove, and whether the file becomes the canonical distribution copy, folds into the B5 asset-strategy decision. **OWNER DECISION REQUIRED**; no option selected here.
- Future approaches (owner decisions only, none selected): (a) tagline-free lockup (word variant) + separate canonical tagline text line; (b) a newly commissioned/approved asset carrying the official tagline. Until one is explicitly chosen, current usage continues unchanged.

---

## 17. Product UI and illustrative asset controls

- **"Representative preview"** is the canonical label for non-live UI windows/cards (File 02 §8; File 04 cross-doc rule 6). Current verified placement: ProductReveal badge above the window (`ProductReveal.tsx:31–34`). Known gaps tracked as B2 (Connection cards) and B3 (Sevika thread) — **label additions are File 09 §9/§11 contracts and File 11 implementations; this file only binds the rule for any *future* mock asset.**
- Sample values (names "Ramesh S.", "Dr. Mehta", "Priya D.", "Arun M."; tokens #11–#14; "Tokens today: 42"; "11 / 42"; timers) remain static, illustrative, never animated to appear live (File 07 §10; verified compliant).
- Sevika conversation stays clearly illustrative; doctor-approved attribution chips remain visible on every medical reminder (verified `Sevika.tsx:98–103`, `Connection.tsx:178–198`).
- Future illustrative assets (if any mock is ever redrawn as artwork) inherit all rules: neutral palette, no live-implying motion, label placement outside animated elements (B2/B3 lessons).

---

## 18. QA / acceptance and decision gates

Pre-production gate (per scene-set) and per-asset acceptance checklist. **All boxes unchecked — no checks have been executed.** `M` = manual review; `T` = File 12 test requirement.

**Pre-production gate (before any asset is produced):** [ ] owner direction approved (§4 option) [ ] sourcing/rights route confirmed [ ] scene-set coherence plan (§8) [ ] grade recipe documented (§6) [ ] consent plan for identifiable people (§14).

Per-asset checklist:

- [ ] provenance complete in register (M)
- [ ] visual quality at target breakpoints (M — approval previews §10)
- [ ] monochrome palette compliance — no hue, no warm cast (M)
- [ ] brand alignment — §5 prohibitions review (M)
- [ ] responsive crop + focal point per §10 (M)
- [ ] safe area / text contrast floors (M; contrast ratio T)
- [ ] alt/caption/transcript as §12 classifies (M)
- [ ] no unverified claims, no implied endorsement, no PHI (M)
- [ ] licence/consent fields verified, not `unknown` (M)
- [ ] file dimensions/weight within §9/§11 budgets (T)
- [ ] correct placement — no layout shift; `width`/`height` reserved (T)
- [ ] mobile behaviour incl. omission strategy (M/T)
- [ ] reduced-motion behaviour — poster/frozen state (T)
- [ ] **both deploy targets fetch the asset 200** — root and basePath (T; B15 lesson §11.4)
- [ ] generated-asset controls §15, if class approved (M)

---

## 19. Asset register template and batch priorities

Empty reusable template (no fabricated records — every row below is schema, not data):

| asset_id | scene | frames | creator/source | licence | consent | ai_generated | grade recipe | crops/focal | size/format | adopted (commit) | retired | checks (§18) | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — | — | — | — | — | — |

Batches (map to Files 09/11/12; **no fake dates or spend estimates**):

- **Batch A — direction & rights:** owner resolves §4 sourcing option(s) + §9 hero route + B16/B5 logo-asset strategy; register schema adopted. *(Blocks everything below.)*
- **Batch B — small coherent set:** produce VS-01 (or hero route chosen) + VS-02/03/04/05 set (± VS-08 only if §7 risk passes); per-asset §18 acceptance.
- **Batch C — authorized integration:** File 11 implements File 09 §17 media contracts (slots, srcset, posters, alt classes, both-deploy-target fetch proof); B15 path fix lands first or together so the delivery pattern is proven.
- **Batch D — QA & optimization:** File 12 executes §18 `T` items; register updated with results; retirement process proven on one sacrificial asset if practical.

---

## 20. Open owner decisions and handoff

**Genuinely unresolved owner decisions (nothing below is resolved by writing this file):**

1. Sourcing model for human imagery — §4 options A/B/C/D; generated-imagery acceptability as such (and per class: faces vs objects/environments).
2. Hero media route — §9 Route 1 (keep current zero-asset hero, a valid permanent fallback) vs Route 2 (VS-01 still) vs Route 3 (film).
3. Logo/tagline asset strategy incl. B16 disposition of `public/assets/logo-primary.svg` (keep as canonical copy / remove; folds into B5).
4. Whether any planned scene requires real-location access, staff or patient participation → §14 consent machinery activation.
5. Any asset priorities not covered by the §8 scene list (e.g. OG/social preview image beyond the current text-only OG metadata — `layout.tsx` has no `og:image` today, verified; adding one would itself be an owner-gated asset decision).

**Engineering recommendations (clearly separated from decisions):** prefer restraint — Route 1 or 2 over 3; omit VS-08 by default; fix B15 before any media lands (§11.4 rule); keep the no-asset zones (Connection/ProductReveal/Footer) unless the owner explicitly reopens them.

**Handoff:** File 09 §17 consumes §7/§8 IDs and §11/§12/§13 contracts; File 11 consumes §19 batches and B15/B16; File 12 consumes §18. No downstream file exists yet for these handoffs except as planning references.

---

**End of File 08.**
