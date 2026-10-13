# Aturseva — File 05: Creative Direction & Design System

**Document type:** Implementation-ready creative-direction and design-system specification for the Aturseva marketing site.
**Status:** Planning documentation only. **No code, token, component, asset or site change is authorized by this file.** Nothing here claims to be implemented unless marked "verified in source" with evidence.
**Sources of truth:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (File 02 — capabilities and claims boundaries, authoritative), `docs/03_BRAND_MISSION_AND_POSITIONING.md` (File 03 — brand strategy and tone, subject to the explicitly approved tagline decision below), `docs/04_SITEMAP_AND_NAVIGATION.md` (File 04 — sitemap/navigation/CTA planning and the consolidated backlog).
**Owner decision carried forward:** the official Aturseva tagline is **"Care that walks with you."** — approved, canonical, not a proposal, not unresolved. The approved logo asset embedding "Make healthcare intelligent." remains a known mismatch deferred to a future, separately authorized brand-asset task (File 04 §16 item 5); this document specifies safe interim usage rules only.
**Companion context:** File 01 is absent (sandbox reset); operative boundaries are inherited from File 02 §13 and the task prompt. Nothing from File 01 is invented here.

---

## 1. Document status, purpose, scope and dependencies

- **Status:** File 05 design-system and creative-direction specification, awaiting owner review. Planning only.
- **Purpose:** one reusable design standard answering — what Aturseva should look and feel like; which colours, type, spacing, grids, widths, radii, borders, shadows and motion conventions are allowed; how cinematic human moments balance with abstract workflow graphics and product previews; how headings, paragraphs, UI examples, role cards, navigation and CTAs behave across desktop/mobile; how the approved logo and official tagline are used while the embedded-logo mismatch remains unresolved; and how the brand stays premium, calm, human, accessible and strictly monochrome without drifting into generic SaaS card-grid design.
- **Scope:** creative concept, canonical monochrome colour system, token architecture, typography, layout/spacing, surfaces/elevation, interactive component rules, navigation/footer patterns, section archetypes, imagery treatment rules (rules only — no assets), representative product-UI design, iconography/diagram rules, motion principles (summary), responsive rules, accessibility requirements, governance, design-related backlog, open decisions.
- **Out of scope:** implementation (Files 09/11), homepage storyboard detail (File 06), motion storyboard (File 07), actual asset sourcing/licensing (File 08), QA criteria (File 12), deployment (File 13). Code snippets appear only as explanatory token/class examples, never as instructions to execute now.
- **Dependencies:** File 02 (claims), File 03 (brand personality: calm, respectful, capable, warm, contemporary), File 04 (sitemap, CTA matrix, backlog), and the current source tree (audited for §2).
- **Precedence:** File 02 authoritative for capabilities/claims; owner decisions in this prompt override older File 03 wording (tagline); File 04 owns sitemap/navigation/backlog planning; this file owns creative direction and the design system — and authorizes nothing.

---

## 2. Source audit — current design implementation versus approved direction

**Method:** source-only audit of this repository (no browser screenshots; no runtime rendering inferred). Evidence paths are exact. Every "current, verified" claim below was read from source during this task.

| # | Finding | Evidence path | Current state (verified) | Alignment with approved direction | Future implication |
|---|---|---|---|---|---|
| 1 | Stack: Next.js 16 + React 19 + Tailwind CSS 4 (`@import "tailwindcss"` + `@theme`) + GSAP 3.13 (lazy-loaded with ScrollTrigger) | `package.json`, `src/app/globals.css`, `src/components/AnimationProvider.tsx`, `src/lib/aturseva-anim.js` | Verified | Aligned — modern, static-exportable, animation-capable | Design system must be expressed as Tailwind 4 theme tokens + a small component layer |
| 2 | Fonts: **Fraunces** (display serif, variable 300–900 + italic variable) and **Manrope** (body/UI sans, variable 200–800), **self-hosted** woff2 with `font-display: swap` | `globals.css` `@font-face` blocks; `public/fonts/` (3 woff2 files: Fraunces-Variable, Fraunces-Variable-Italic, Manrope-Variable); `@fontsource-variable/*` in devDependencies | Verified — self-hosting confirmed by the `@font-face` + `/fonts/` files | Aligned — premium pairing, no external font CDN | Typography system (§6) formalizes roles/scales around these two families |
| 3 | Palette: neutral greys only, split across **four legacy-named scales** — `ink` (950→100, 11 values), `brand` (50→900, 10 values, greys), `gold` (100→700, 7 values, greys), `ivory` (50→300, 4 values) | `globals.css` `@theme` block | Verified — every value is a neutral grey (R≈G≈B); zero coloured hues | Aligned in **values**; misaligned in **naming** ("gold"/"ivory" label greys) | §4/§5 propose canonical naming; renaming is future work (File 11), not done here |
| 4 | Shadows: `--shadow-soft`, `--shadow-lift`, `--shadow-glow` — all neutral (ink or white based) | `globals.css` | Verified | Aligned | Elevate into token architecture (§8) |
| 5 | Section rhythm: strict dark/light alternation — Hero `ink-950` → Journeys `ivory-50` → Connection `ink-950` → ProductReveal `ivory-100` → Sevika `ink-950` → Paths `ivory-50` → Footer `ink-950` | `Hero.tsx`, `Journeys.tsx`, `Connection.tsx`, `ProductReveal.tsx`, `Sevika.tsx`, `Paths.tsx`, `Footer.tsx` class attributes | Verified | Aligned — cinematic contrast creates hierarchy | Preserve as a composition rule (§4, §11) |
| 6 | Cards/surfaces: `rounded-3xl` outer cards with `border-ink-100/80` on light sections; frosted `.glass` (white/5 + blur) on dark; `.sevika-msg` frosted bubbles; `ui-window` product mock with chrome dots | `Paths.tsx`, `Connection.tsx`, `Sevika.tsx`, `ProductReveal.tsx`, `globals.css` | Verified | Mostly aligned; card use is currently restrained (one 3-card grid on Paths) | §8/§11 codify "cards only when they clarify a unit" |
| 7 | Glows/gradients: large blurred radial "ambient glow" divs on dark sections (e.g., `bg-brand-600/25 blur-[130px]`); grain overlay via SVG fractal noise (`opacity 0.4, mix-blend-overlay`) | `Hero.tsx`, `Connection.tsx`, `Sevika.tsx`; `.grain` in `globals.css` | Verified | Aligned — all glows are neutral greys at opacity, not colour | §8 formalizes neutral glow/scrim rules |
| 8 | Logo variants: `word` (symbol+wordmark, header), `mark` (symbol only, hero badge), `full` (symbol+wordmark+"Make healthcare intelligent." lettering, footer) — colour via `currentColor` | `src/components/Logo.tsx` (usage in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`) | Verified | Full-variant lettering mismatches the official tagline — deferred to asset task | §10 sets interim usage rules; options for owner review only |
| 9 | Header: fixed; `.nav-scrolled` state **exists and is toggled** at `scrollY > 48` (condensed translucent surface, hairline border, blur) — verified in the animation module | `Nav.tsx`, `globals.css` `#site-nav.nav-scrolled`, `src/lib/aturseva-anim.js` (nav toggle) | Verified — scrolled state is live behaviour, not dead CSS | Aligned — matches the "sticky/scrolled state" intent recorded in File 04 §7 | Keep; formalize tokens (§10) |
| 10 | Buttons: primary = `rounded-full`, ink-950 text on brand-400 grey fill, `shadow-glow`, hover lift (`-translate-y-0.5`); secondary = outlined ivory on dark; heights h-11 (44px) / h-12 (48px hero) | `Hero.tsx`, `Nav.tsx`, `Paths.tsx`, `Journeys.tsx` | Verified | Aligned — honest labels, 44px+ targets | §9 codifies the full interactive system |
| 11 | Reduced motion: global CSS kill-switch (animation/transition → 0.01ms) + GSAP `reduceMQ` → `setConnectionStatic()` (static finale, everything visible) | `globals.css` `@media (prefers-reduced-motion: reduce)`, `src/lib/aturseva-anim.js` | Verified | Aligned — exceeds common practice | §15/§17 keep as mandatory standard |
| 12 | Responsive: mobile-first Tailwind (`sm:` `md:` `lg:`), plus custom `max-width: 767px` blocks; Connection has a **mobile recomposition** (static 2-col card grid instead of pinned stage) | `globals.css` conn media block, component classes, `aturseva-anim.js` mobileMQ | Verified | Aligned — mobile recomposes rather than squeezes | §16 codifies breakpoints |
| 13 | Motion inventory: hero fade, `data-reveal` scroll reveals, journey lane draws, product tilt, Sevika message stagger, Connection pinned scrub (desktop ≥768) / choreographed autoplay (mobile <768) / static finale (reduced); ambient loops (`breathe`, `pulse-ring`, `ecg-march`, `blink`, `drift`); default ease `power3.out` | `aturseva-anim.js` (454 lines), `globals.css` keyframes | Verified | Aligned with calm-intent; loops are restrained | File 07 owns the full storyboard; §15 sets philosophy |
| 14 | Imagery: **no photographic/video assets exist** — hero and sections are typography + abstract SVG (journey arc, ECG, lanes, workspace mock) | `Hero.tsx` and all section components; `public/` contains fonts + favicon only | Verified | Under-realises the human-first cinematic ambition (File 04 §16 item 6) | §12 defines imagery rules; sourcing belongs to File 08; **no assets created in this task** |
| 15 | Typography in use: hero H1 `text-[2.6rem] sm:text-6xl lg:text-7xl` Fraunces semibold, tight leading (1.06); H2 `text-4xl sm:text-5xl`; body `text-base sm:text-lg`; `.eyebrow` 11px–xs uppercase 0.26em; `.conn-caption` Fraunces lg/2xl | component class attributes, `globals.css` | Verified | Aligned with editorial-premium direction | §6 formalizes the full scale |
| 16 | Static export target for Pages (`basePath /aturseva-landing`, `images.unoptimized`); dev :3005; self-contained preview :3006 | `next.config.ts`, `package.json` scripts | Verified | Constrains implementation (no server rendering, no image pipeline) | §12/§16 asset rules must respect static hosting |

---

## 3. Creative concept and art direction

**Core idea — "presence, not spectacle."** The visual proposition of "Care that walks with you": Aturseva is felt as a calm, continuous presence beside people moving through healthcare. Every screen should feel like someone quietly keeping step with the viewer — never like a machine demonstrating itself. Technology appears only in service of a human moment.

**Emotional tone:** calm, confident, human, attentive, contemporary, dignified. The monochrome system carries this: black/charcoal for gravity and night-time calm of serious moments; paper-white for clarity and daylight; silver-greys for the connective tissue between them.

**Narrative movement (visual grammar of the story, matching File 02 §11.6 and File 04 §9):** a human moment → separate care journeys (fragmented lanes) → connection (the signature convergence) → product interface as *supporting evidence* (representative preview, never the protagonist) → Sevika's ongoing care (the quiet companion) → role-specific next steps (three honest doors).

**Contrast creates hierarchy, not drama.** Dark/light section alternation (verified in source, §2.5) is the primary compositional device: the story moves between cinematic dark stages (Hero, Connection, Sevika, Footer) and clear light rooms (Journeys, ProductReveal, Paths). Contrast is never used to alarm; the palette contains no red, no urgency colour, no alarm state.

**Must feel like:**
- A well-set stage before a quiet play — one idea per frame, generous negative space.
- Editorial print craft: serif display lines with real leading, restrained uppercase eyebrows, honest rag.
- A night ward and a morning clinic in the same film: deep ink sections breathe; light sections read crisply.
- Someone walking beside you — motion that keeps pace (`power3.out` verified default), never sprints.
- Premium healthcare: dignified, unhurried, precise.

**Must not feel like:**
- A generic SaaS dashboard: no default 3/6-card feature grids everywhere, no gradient-hero clichés, no neon glows, no "AI hype" surfaces.
- An emergency-room drama: no alarm colours, no racing motion, no fear framing.
- A template: no stock-photo clichés of smiling models in scrubs, no handshake shots, no floating cross icons.
- A dark mode gimmick: dark sections serve the narrative arc, not fashion.
- A puzzle: if a diagram needs legend-scrolling to decode, it fails.

---

## 4. Canonical colour system — monochrome only

**Locked direction (owner decision):** black, white and neutral greys only. No teal, green, gold, warm ivory/beige cast, purple, blue, coloured gradients, coloured glows or coloured status accents. Opacity and grey-value changes are permitted. Contrast outranks decorative grey nuance.

### 4.1 Current values (verified in source — `globals.css` `@theme`)

| Scale | Values (verified) | Role today |
|---|---|---|
| `ink` | 950 `#0a0a0b` · 900 `#101113` · 800 `#191b1d` · 700 `#26292b` · 600 `#34383a` · 500 `#4b5052` · 400 `#6f7476` · 300 `#9aa0a2` · 200 `#c6cacb` · 100 `#e4e7e8` | dark surfaces; text on light |
| `brand` | 50 `#f5f6f6` · 100 `#e7e9ea` · 200 `#d3d6d8` · 300 `#bec3c5` · 400 `#a6acae` · 500 `#7d8386` · 600 `#5d6366` · 700 `#474c4f` · 800 `#33383a` · 900 `#232729` | primary grey accent (silver on dark, charcoal on light); buttons; links |
| `gold` | 100 `#f0f0f0` · 200 `#dedfdf` · 300 `#ccccce` · 400 `#b4b6b8` · 500 `#9c9fa1` · 600 `#848788` · 700 `#6c6f71` | second grey accent (approval chips, focus ring, milestones) |
| `ivory` | 50 `#fafafa` · 100 `#f4f4f5` · 200 `#eaeaeb` · 300 `#dcddde` | neutral paper-light surfaces |

All values verified neutral (R≈G≈B). The **legacy names** (`brand`, `gold`, `ivory`) mislabel greys; renaming is deliberately deferred (§5.3, File 11) — this task does not touch CSS.

### 4.2 Proposed canonical neutral architecture (naming proposal only — not installed)

One unified **graphite scale** with neutral paper whites — proposed for a future migration; current values can be mapped onto it nearly 1:1:

| Proposed primitive | HEX (proposal) | Notes |
|---|---|---|
| `graphite-950` | `#0a0a0b` | true near-black stage (from ink-950) |
| `graphite-900` | `#101113` | dark elevated surface |
| `graphite-800` | `#191b1d` | dark card surface |
| `graphite-700` | `#26292b` | dark borders on dark |
| `graphite-600` | `#34383a` | deep control fill (dark) |
| `graphite-500` | `#4b5052` | secondary text on light |
| `graphite-400` | `#6f7476` | muted text on light / icons |
| `graphite-300` | `#9aa0a2` | placeholder, data lines, disabled text |
| `graphite-200` | `#c6cacb` | borders on light, dividers |
| `graphite-100` | `#e4e7e8` | light borders, subtle fills |
| `paper-50` | `#fafafa` | page background (neutral white — no ivory cast; current ivory-50 is already `#fafafa`, verified neutral) |
| `paper-100` | `#f4f4f5` | light section background |
| `paper-200` | `#eaeaeb` | light elevated surface / chips |
| `paper-300` | `#dcddde` | light borders strong |

Rule: off-whites must stay **neutral** (B within ±2 of R/G); a warm `#f5f0e8`-style paper is prohibited.

### 4.3 Semantic roles (proposal)

| Role | Light-section value | Dark-section value | Usage |
|---|---|---|---|
| Page background | `paper-50` | `graphite-950` | alternating narrative stages (§2.5 rhythm) |
| Cinematic dark section | — | `graphite-950` (+ ambient neutral glow ≤25% opacity) | Hero, Connection, Sevika, Footer |
| Light section | `paper-50`/`paper-100` | — | Journeys, ProductReveal, Paths |
| Elevated surface (light) | `#ffffff` card + `graphite-100` border | — | role cards, product window |
| Elevated surface (dark) | — | white/5 frosted + white/10 border (`.glass` pattern, verified) | connection cards, sevika bubbles |
| Primary text | `graphite-950` | `paper-50` | headings, body emphasis |
| Secondary text | `graphite-500` | ~`graphite-200` at 80–90% | body support |
| Muted text / captions | `graphite-400` | ~`graphite-300` | timestamps, disclaimers |
| Border/divider | `graphite-200` (light) | white/10 (dark) | hairlines, card edges |
| Interactive control (primary) | fill `graphite-300`-range silver, text `graphite-950` (verified current: brand-400 fill + ink-950 text) | same | primary buttons |
| Hover | fill lightens one step + `translate-y -0.5` lift (verified pattern) | same | buttons, cards |
| Focus ring | `graphite-400`-range 2px outline, 3px offset (verified current: gold-500 `#9c9fa1`) | same | all interactive elements |
| Disabled | `graphite-200` fill + `graphite-400` text + no shadow | same | never colour-coded by hue |
| Data line (diagrams) | distinct grey steps: `#e9ebed`, `#d0d2d4`, `#c9cdd0`, `#c3c8cb` (verified in Connection SVG) + labels | same | lanes, connectors, ECG |
| Overlay/scrim | black at 40–82% (verified nav-scrolled uses ink-950 @82%) | — | nav, modals |
| Selection | `graphite-200` bg + `graphite-950` text (verified `::selection`) | — | global |

### 4.4 Light vs dark usage rules

- Dark sections open and close emotional beats (hero, connection, Sevika, footer — verified rhythm). Light sections carry informational density (journeys, reveal, paths).
- Never two adjacent dark sections (flattens the film) nor three adjacent light ones (loses the pulse).
- Avoid the flat all-grey page: within a section, create depth through **surface steps** (950 stage → 900/800 elevated → glass overlay), one **ambient neutral glow** at ≤25% opacity, and the **grain** overlay (verified `.grain`, 0.4 opacity, overlay blend) on dark stages only.
- Text/background pairing guidance (target WCAG 2.2 AA: 4.5:1 normal, 3:1 large text & UI boundaries — **to be measured in File 12 QA; not claimed compliant here**): primary text pairings above all exceed ~12:1; use secondary pairings ≥4.5:1; avoid `graphite-300`-on-paper for body text (borderline) — reserve for ≥18px bold or decorative labels.

---

## 5. Token architecture and naming conventions

### 5.1 Architecture (proposal)

Two layers, both expressed as Tailwind 4 `@theme` custom properties (current mechanism, verified):

1. **Primitive tokens** — raw values, no meaning: `graphite-*` scale, `paper-*` scale, `font-display`, `font-sans`, `radius-*`, `space-*`, `shadow-*`, `ease-*`, `duration-*`.
2. **Semantic/component tokens** — meaning-bearing aliases that components consume: `color-bg-page`, `color-bg-stage-dark`, `color-text-primary`, `color-text-secondary`, `color-border-subtle`, `color-control-primary`, `color-focus-ring`, etc.

Rule for all future work (governance, §18): components reference semantic tokens, never raw hex. The current codebase partially satisfies this (components use `ink-*`/`brand-*` classes but also **hardcoded SVG hex greys** — verified in `Hero.tsx` gradients and `Connection.tsx` lanes/dots; those live outside Tailwind's reach and should migrate to `currentColor`/CSS vars in a future pass, File 11).

### 5.2 Token dictionary (status: current = verified in source; proposed = this document's recommendation, not installed)

| Token | Purpose | Example value / proposal | Usage | Status |
|---|---|---|---|---|
| `--font-display` | display serif | `"Fraunces", ui-serif, Georgia, serif` | H1/H2, quotes, captions | Current (verified) |
| `--font-sans` | body/UI sans | `"Manrope", ui-sans-serif, system-ui, …` | body, controls, labels | Current (verified) |
| `--color-ink-*` (950–100) | dark scale | `#0a0a0b` … `#e4e7e8` | dark surfaces, text on light | Current (verified) |
| `--color-brand-*` (50–900) | grey accent scale | `#f5f6f6` … `#232729` | buttons, links, silver accents | Current (verified, misnamed) |
| `--color-gold-*` (100–700) | 2nd grey accent | `#f0f0f0` … `#6c6f71` | chips, focus, milestones | Current (verified, misnamed) |
| `--color-ivory-*` (50–300) | paper scale | `#fafafa` … `#dcddde` | light backgrounds | Current (verified, misnamed) |
| `graphite-*` / `paper-*` | unified primitive scale | §4.2 | future canonical naming | Proposed |
| `--radius-sm/md/lg/xl/full` | corner scale | 10/14/20/28px & pill | chips/cards/panels/buttons | Proposed (current usage: ad-hoc `rounded-2xl/3xl/full`, verified) |
| `--space-1…` | 4/8-based spacing scale | 4/8/12/16/24/32/48/64/96/128 | all spacing | Proposed (current usage: Tailwind utilities, effectively 4-based) |
| `--shadow-soft/-lift/-glow` | neutral elevation | verified values §2.4 | cards, buttons-on-dark | Current (verified) |
| `--ease-out-calm` | default easing | `cubic-bezier(0.22, 1, 0.36, 1)` / GSAP `power3.out` (verified default) | all motion | Current behaviour; token formalization Proposed |
| `--duration-fast/base/slow` | motion durations | 200ms / 450ms / 900ms | hovers / reveals / stage moves | Proposed (current: mixed, e.g. 0.35s nav, 0.6s reveals — verified) |
| `--container-max` | content width | `max-w-7xl` (80rem) — verified current | page frame | Current; keep |
| breakpoints | responsive steps | Tailwind `sm 640 / md 768 / lg 1024` + custom `767px` conn breakpoint — verified | layouts, motion contexts | Current |

### 5.3 Legacy-name migration note (for File 11, not now)

Current names `brand/gold/ivory` are historically saturated (they were colours pre-monochrome). Recommended future strategy: introduce `graphite-*`/`paper-*` primitives **as aliases** alongside legacy values (zero visual change), migrate components opportunistically, remove legacy names last. No token renames occur in this task.

---

## 6. Typography system

### 6.1 Source audit (verified)

- **Fraunces** — display serif; self-hosted variable (300–900 + separate italic variable file), `font-display: swap` (§2.2).
- **Manrope** — body/UI sans; self-hosted variable (200–800), `font-display: swap`.
- Current usage pattern: Fraunces for H1/H2 and italic accent lines; Manrope for body, labels, controls; `.eyebrow` = Manrope 11px–xs extrabold uppercase `tracking-[0.26em]`.

### 6.2 Font roles

| Role | Family | Notes |
|---|---|---|
| Display/headline | Fraunces (semibold 600 default; italic for accent phrases) | emotional beats only |
| Body | Manrope 400/500 | all paragraphs |
| UI/control | Manrope 600–800 | buttons, nav, chips |
| Numeric/token values (queue, time) | Manrope (tabular feel via weight, e.g. `font-extrabold` — current token counter verified) | align columns by consistent weight/width |
| Labels/eyebrows | Manrope extrabold, uppercase, wide tracking | one per section maximum |

### 6.3 Type scale (current values verified where marked; remainder proposed)

| Style | Family/weight | Desktop | Mobile | Line-height | Tracking | Status |
|---|---|---|---|---|---|---|
| H1 (hero) | Fraunces 600 | 72px (`lg:text-7xl`) | 41.6px (`2.6rem`) | 1.06 | tight | Current (verified) |
| H2 (section) | Fraunces 600 | 48px (`text-5xl`) | 36px (`text-4xl`) | 1.1–1.15 | tight | Current (verified) |
| H3 (card) | Fraunces 600 | 24px (`text-2xl`) | 24px | 1.2 | normal | Current (verified) |
| Body lead | Manrope 400 | 18px (`text-lg`) | 16px | 1.625 | normal | Current (verified) |
| Body | Manrope 400 | 16px | 16px | 1.625 | normal | Current (verified) |
| Small/support | Manrope 400 | 14–15px | same | 1.55 | normal | Current (verified) |
| Eyebrow label | Manrope 800 | 12px | 11px | 1.2 | 0.26em caps | Current (verified) |
| Quote/pull | Fraunces italic | 24–30px (`text-2xl/3xl`) | 24px | 1.35 | normal | Current (verified) |
| Caption/time | Manrope 700 | 12px | same | 1.4 | 0.14–0.24em where caps | Current (verified) |

**Proposed rules:**
- Body minimum 16px; nothing below 12px anywhere; captions 12–14px.
- Paragraph measure: 60–75 characters (current `max-w-2xl`/`max-w-3xl` leads ≈ verified aligned).
- Headline line-breaks: break at meaning ("Healthcare is a journey. / No one should walk it alone." — verified current pattern); never orphan a single word on the last line of a display block.
- Fluid sizing: future rule — new display styles use `clamp(min, preferred, max)` (recommended rule, not implemented; existing steps stay as verified).
- Italic display text: accent phrases of ≤6 words, one per heading maximum; never full italic paragraphs.
- Numerals in queue/token UI: consistent weight (`font-extrabold`), left-align tabular data columns.
- Fallbacks: verified stacks (`ui-serif, Georgia…` / `ui-sans-serif, system-ui…`); keep. Self-hosted loading with `font-display: swap` verified — keep (avoids layout jank, no external requests).
- Avoid: body below 16px, all-caps paragraphs, decorative type inside controls, tight leading (<1.05) on body text.

---

## 7. Layout grid, spacing and composition

**Current frame (verified):** single content frame `max-w-7xl` (80rem) with `px-5` (20px) mobile / `sm:px-8` (32px) side padding; sections `py-24 sm:py-32` (96/128px) vertical rhythm; centred text blocks `max-w-3xl`; body leads `max-w-2xl`.

**Proposed rules (labelled proposals):**

- **Content widths:** keep `max-w-7xl` page frame; text measure `max-w-3xl` (48rem) for section intros; `max-w-2xl` for paragraph leads. Wide stages (Connection canvas) may extend to the frame edge; never beyond without full-bleed intent.
- **Grid:** 12-column desktop grid inside the frame (gap 24px); tablet 8-column; mobile single column. Cards in a row align to column boundaries (Paths 3-up = 4 columns each — matches current `md:grid-cols-3`, verified).
- **Spacing scale (4/8 base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section vertical padding: 96px mobile / 128px desktop (verified current). Between components in a section: 32–64px. Within cards: 24–28px (verified `p-7` = 28px).
- **Whitespace rhythm:** one breathing space per screen — a full-viewport stage (hero, verified `min-h-svh`) followed by denser rooms; do not pad every section equally.
- **Hero composition (current pattern verified — keep as archetype):** eyebrow+mark → H1 (2 lines, max-w-4xl) → lead paragraph (max-w-2xl) → CTA pair grouped with 16px gap → signature SVG arc below; vertical centring with `pt-32 sm:pt-36` clearing the fixed nav.
- **CTA grouping:** primary + secondary side by side, wrap on mobile with full-width buttons (verified current behaviour).
- **Dense previews/diagrams:** product window `max-w-5xl` (verified); must retain legibility at 320px width by simplifying columns (proposed: hide secondary columns rather than shrink text below 12px). No horizontal overflow: `overflow-x: clip` on body (verified) plus per-component recomposition (Connection mobile grid — verified).
- **Anti-patterns:** arbitrary one-off spacings (use scale); card grids for every section (see §11 archetypes); edge-to-edge text beyond 90rem.

---

## 8. Shape, border, elevation and surface materials

**Verified current language:** outer cards `rounded-3xl` (24px) with `border-ink-100/80` on light, `shadow-soft`, hover `shadow-lift`; inner surfaces `rounded-2xl` (16px); chips/buttons `rounded-full`; product window `rounded-3xl` + chrome bar; frosted `.glass` on dark; `.grain` on stages; ambient neutral glows.

**Proposed radius scale:** `radius-sm 10px` (chips, small inputs) · `radius-md 14px` (inner cards, bubbles) · `radius-lg 20px` (mid panels) · `radius-xl 28px` (outer cards, windows — current 24px `rounded-3xl` may stay) · `radius-full` (buttons, pills, avatars). One step per nesting level; never mix two adjacent radii arbitrarily.

**Borders & dividers:** 1px hairlines only — `graphite-100/200`-range on light (verified `border-ink-100/80`), `white/10` on dark (verified). Dividers separate *meaning* groups, never decorate. No 2px+ decorative borders.

**Elevation (neutral shadows only — verified set, keep):**
- `shadow-soft` — resting light-section cards.
- `shadow-lift` — hover/raised cards, toasts, floating panels.
- `shadow-glow` — primary buttons on dark stages (a white 1px ring + soft white bloom; **not** a colour glow).
Rules: shadows are ink-based (light sections) or white-based (dark sections); never coloured; at most one elevation step per hover; no stacked mega-shadows.

**Glass/frosted surfaces:** only on dark stages, only where they improve legibility over motion/glows (connection cards, sevika bubbles — verified `backdrop-blur-md/sm`); `backdrop-blur` capped at ~14px (verified nav-scrolled uses 14px); never as a default surface treatment; light sections use solid white cards instead.

**Grain/noise:** `.grain` verified (fractal-noise SVG, 0.4 opacity, overlay blend, 160px tile) — dark cinematic stages only; must never reduce text contrast measurably (File 12 QA to sample); not on light sections.

**Surface materials summary:** dark stage (950) → dark elevated (900/800) → glass (white/5+blur) → light paper (50/100) → white card (fff + hairline). Five materials, no more.

**Cards:** only when a unit of content genuinely benefits from containment (a role, a journey, a mock). The current single 3-card grid (Paths, verified) is the maximum card-grid repetition on one page; future role pages must alternate archetypes (§11), not stack card walls. No generic 6-card SaaS feature grids.

---

## 9. Buttons, links and interactive component system

**Verified current styles:** primary = pill (`rounded-full`), fill `brand-400` silver-grey, text `ink-950` bold 14px, `shadow-glow`, hover = fill lightens + `-translate-y-0.5` lift; secondary on dark = outlined `ivory-50/25` → hover `/60`; tertiary links = text with colour-shift hover (`nav-link` pattern); icon-only = 44×44px (`h-11 w-11`) with `aria-label` (verified Journeys cue + mobile menu button); toast = fixed bottom, `role="status" aria-live="polite"` (verified); focus = global `:focus-visible` 2px `gold-500` outline + 3px offset (verified).

**Proposed component matrix (proposals unless marked verified):**

| Variant | Height | Radius | Fill/Border | Text | Notes |
|---|---|---|---|---|---|
| Primary | 48px hero / 44px standard | full | silver fill (brand-400-range) + shadow-glow | ink-950, 700–800 weight | verified pattern |
| Secondary | 44–48px | full | 1px outline (ivory/25 on dark; graphite/300 on light) | primary text | verified on dark |
| Tertiary/text link | inline | — | underline on hover or colour shift | secondary→primary | verified nav pattern |
| Icon-only | 44×44px | xl (12–14px) | hairline border or ghost | — | **must** carry `aria-label` (verified compliance) |
| Disabled | as variant | — | graphite-200 fill, graphite-400 text, no shadow, `aria-disabled` | — | proposed |
| Focus (all) | — | — | 2px neutral outline + 3px offset | — | verified global rule |
| Hover (all) | — | — | one lightness step + optional −2px lift | — | verified pattern; transitions ≤200ms |
| Loading | as variant | — | inline spinner (neutral), label unchanged | — | only where real async exists; none today (no fake loaders) |

**Rules:**
- Labels describe the genuine action (File 03 §8.3, File 04 §10 matrix is binding for destinations).
- **No fake success or "we'll contact you" toasts without real destination/data capture** — the current Paths toast is a recorded backlog violation to fix in a future pass (File 04 §16 item 4), not a pattern to copy.
- Touch targets ≥44×44px (verified current compliance — keep).
- Motion on controls: ≤200ms, opacity/transform only, reduced-motion-safe via the verified global kill-switch.
- No decorative type in controls; buttons never use Fraunces.
- Icon+text pairs: 16–20px icon, 8px gap (verified hero CTA pattern).

---

## 10. Navigation and footer design patterns

**Header (verified current):** fixed top; wordmark (`Logo variant="word"`, `currentColor` ivory) → `#top`; four anchor links (The Journeys / How it connects / Platform / Sevika); "Get started" pill → `#paths`; mobile: 44×44 hamburger with `aria-expanded`/`aria-controls`, panel with same links, closes on selection. **Scrolled state verified live:** `nav-scrolled` toggles at `scrollY > 48` → 82% ink-950 translucent surface, 14px blur, hairline white/8 top border, deep neutral shadow.

**Proposed header principles (from File 04 §7):**
- Wordmark stays; **no tagline in the header** (uncluttered; official tagline lives in footer/title contexts).
- Link labels: concise, self-explaining English; when nav is revised per File 04, "Platform" should become a self-explaining label (e.g., "How it works") — final wording at implementation.
- Scrolled state (verified) is the reference pattern for any future sticky treatment: transparency → 82% ink + blur + hairline, 350ms ease (verified transition).
- Active-section indication: proposed future enhancement (IntersectionObserver + neutral underline/dot), reduced-motion-safe; not implemented.
- Focus/keyboard: visible focus through the verified global outline; menu button state announced (verified); skip-link precedes nav (verified, `#main` target).
- Mobile menu: current pattern is the archetype — full-width links at 44px+ row height, primary action full-width at panel foot, closes on click (all verified).

**Footer (verified current):** full logo (`variant="full"` — embeds "Make healthcare intelligent." lettering), philosophy line "Aturseva ne hamara saath diya." (brand sentiment — labelling gap recorded in File 04 §16 item 3), three link groups (Explore / Care / Paths — all in-page anchors; Paths group's three links share one target, clarity issue recorded), fixed "© 2025" (backlog item 8), representative-previews disclaimer, hairline gradient rule at top.

**Proposed footer principles:**
- Keep dark-stage close (verified rhythm); keep the hairline top rule and grain.
- **Official tagline placement:** "Care that walks with you." appears as a separate text line (Manrope or Fraunces italic, secondary size) near the wordmark — pairing at most once per page (§4 File 04 rule).
- **Interim logo usage rule (safe rule while the mismatch exists — per owner decision):** the header uses the `word` variant (no embedded phrase — verified); the footer may keep the `full` variant (asset untouched). Wherever the official tagline must be unmistakable (title, meta, footer text line), the embedded lettering is never relied upon and never edited around — no overlays, no cropping, no recolouring. **Future options for owner review only (not chosen):** (a) tagline-free lockup (word variant) + separate canonical tagline line in footer; (b) future owner-approved updated asset with the official tagline. Choosing is the brand-asset task's job (File 04 §16 item 5), not this document's.
- Footer groups: regroup per File 04 §7 when routes exist (Explore / For you: Patients·Doctors·Hospitals as routes / Care / Company-legal when real). Responsive stacking: 2-col grid → 1-col (verified current `grid-cols-2 sm:grid-cols-3`).
- Copyright line: dynamic year rule proposed (backlog item 8).
- Skip link + keyboard: verified patterns remain the standard.

---

## 11. Section archetypes and page composition rules

Reusable archetypes — the design system's composition vocabulary. Current homepage mapping is verified; future pages (File 04 sitemap) compose from these.

| Archetype | Purpose | Composition | Light/dark | Density | Graphics balance | Mobile adaptation | Use when / avoid when |
|---|---|---|---|---|---|---|---|
| **A. Cinematic human stage** | open an emotional beat | full-viewport (`min-h-svh`), centred/left H1 + lead + CTA pair, signature SVG beneath | dark stage + grain + one ambient glow | low | typography-led; future: one human image moment (File 08) | stack, arc hidden or simplified (verified hero hides arc <md) | openings & closings only / avoid for dense info |
| **B. Editorial split** | explain one idea deeply | 2-col grid (text 5/12 + visual 7/12), H2 + body + bullet list | either | medium | illustration or labelled mock opposite text | single column, visual after text (verified Sevika pattern) | narratives needing focus / avoid for quick scans |
| **C. Connected-workflow stage** | show the signature convergence | pinned/scrubbed SVG stage (desktop) with lane draws, hub, travelling comet, overlay cards | dark stage | medium | diagram is the hero | mobile recomposes to static 2-col card grid + autoplay captions (verified) | the one signature moment per page / avoid repeating — one per site |
| **D. Representative product reveal** | prove capability visually | centred intro + labelled UI window (chrome, schedule/queue panels) | light | higher | product mock is content | simplify columns, keep label | workflow evidence / avoid fake-live-data or unlabelled mocks |
| **E. Sevika illustrative conversation** | show continued care | split: bullets/quote + message thread with time nodes and approval chips | dark stage | medium | conversational UI | single column (verified) | care-continuity story / avoid unlabelled chat realism |
| **F. Role pathway** | route visitors by identity | centred intro + 3-up cards (icon, eyebrow role, H3, body, CTA) | light | medium | small icon per card | stack full-width (verified) | homepage close & route pages / avoid >1 per page |
| **G. Quiet footer close** | resolve and orient | wordmark/full logo block + link groups + legal line | dark | low | hairline rule, grain | stacked groups (verified) | every page ends here / avoid heavy CTAs |

**Composition rules:** alternate dark/light per §4.4 (verified rhythm preserved); one archetype C per site (signature scarcity); max one card-grid (F) per page; each section owns **one idea**; section intros = eyebrow + H2 + lead (verified pattern). New pages (doctors/hospitals, File 04) compose from B/D/E/F — never new ad-hoc layouts.

---

## 12. Human-first imagery and visual asset treatment (design rules only — no assets created here)

**Direction (locked):** human-first, cinematic healthcare moments supported by monochrome motion graphics. Current state: **no photographic/video assets exist in source** (verified — §2.14); this section defines the rules File 08 will use to source/produce assets.

**Subject matter (preferred moments):** a patient and carer waiting with calm attention; a doctor listening (not posing at a camera); a receptionist assisting an older walk-in patient with registration; a doctor reviewing a schedule in ambient light; a follow-up moment at home (medicine, glass of water, phone nearby). Indian healthcare context portrayed with respect and normalcy: real clinic textures, natural light, ordinary dignity.

**Prohibitions:** stereotypes and caricature; poverty/illness exploitation; medical-emergency melodrama (rushing trolleys, alarmed faces); stock-photo clichés (grinning handshake, stethoscope-on-laptop, thumbs-up patient); identifiable fake "doctors" presented as endorsements; any implication that pictured people are Aturseva customers/partners (sample UI names like "Dr. Mehta"/"Ramesh S." remain illustrative — File 02/04 rule).

**Casting:** credible, diverse, age-inclusive; ordinary people, not glossed models; respectful framing at eye level (never below/above).

**Monochrome grade:** neutral greyscale conversion preserving facial readability, skin/fabric texture and luminance separation (faces stay ≥ mid-grey against surroundings); no coloured duotones, no sepia/warm cast; grain may echo the `.grain` stage treatment (≤0.4 opacity equivalent).

**Framing & crop:** shallow depth for intimacy; generous negative space on the text side (60/40 rule for split layouts); aspect ratios — hero 21:9 / 16:9 wide, split visuals 4:5 or 1:1, editorial bands 3:1; responsive crop keeps the subject's face inside the safe area at all breakpoints; never crop heads at hairline or joints at frame edges.

**Licensing/production:** authentic or properly licensed/generated imagery only; consent and licence documented per asset (File 08's job); whether generated imagery is acceptable is an open owner decision (§20).

**Imagery + motion graphics contract:** real human moments establish *emotion*; diagrams (archetype C) clarify the *connected workflow*; product UI (D) demonstrates *supported capability*. Never blend — a human photo never wears UI overlays; a diagram never contains photos.

---

## 13. Product UI and representative data design

**Verified current inventory:** product window with chrome (three neutral dots), schedule rows (time/name/token/state), queue panel (token/name/state/active), "Representative preview" badge (verified in `ProductReveal`); connection cards with sample values "Dr. Mehta · General OPD · 11:30 AM", "Token #14", "Tokens today: 42" (**no visible label — File 04 §16 item 2, future fix, not done here**); Sevika thread with timestamps, "Doctor approved" chips (verified), Hinglish illustrative dialogue (permitted, File 02 §4.4), **no explicit illustrative context label** (folded into File 04 backlog item 3).

**Rules (for all current and future mocks):**
- Every non-live product UI mock carries a visible **"Representative preview"** label — the ProductReveal badge is the canonical pattern (verified reference).
- Sample names/numbers are obviously illustrative: common Indian sample names ("Ramesh S.", "Priya D."), round-ish token values, no real-looking IDs; never imply live production data, real customers, or named partners.
- Visual hierarchy inside mocks: time/labels in Manrope 700 12px; values 14px; active row = elevated step (verified active-queue-row treatment); status = text first (never colour-only — see §14/§17).
- Keep mocks shallow: 3–5 rows maximum; no microtext below 12px; no over-detailed fake dashboards, no fake analytics charts, no fabricated performance metrics (File 02 claims rule).
- Neutral status states: text/shape differentiate states ("In consult" / "Waiting" / "Next up" / "3 ahead" — verified vocabulary), optionally paired with grey-value steps; **never** hue-coded status.
- Responsive: simplify columns on mobile (hide tertiary columns) rather than shrinking text; the window keeps its label at every size.
- Medical attribution: care/medication reminders inside mocks always carry the "Doctor approved" attribution (verified chip pattern) — Sevika never appears to originate medical advice.
- Mock windows sit on light sections (D archetype) for honest, document-like reading; the dark-stage frosted cards (connection bubbles) stay small and episodic.

---

## 14. Iconography, workflow graphics and data visualization

**Verified current inventory:** outline SVG icons (1.8–2.4 stroke, round caps) for role cards, bullets, CTAs arrows; inline diagram SVGs (journey lanes, arcs, ECG, hub, comets) with hardcoded neutral greys; `.eyebrow`-style lane labels; no icon library in dependencies (all hand-authored paths).

**Rules:**
- **One icon family:** monochrome outline SVG, stroke 1.8–2.4 (24px grid), round caps/joins — matches verified current set. Filled styles only for tiny state dots (verified milestone dots). Never mix filled/outline for the same semantic role.
- Minimum legibility: 16px rendered size for any icon; 20–24px for interactive; stroke ≥1.5px at rendered size.
- Workflow diagrams: nodes 9–11px dots (verified), lanes 2–2.5px stroke, labels in the eyebrow style (verified `.conn-label`); connectors always neutral greys from the data-line set (`#e9ebed/#d0d2d4/#c9cdd0/#c3c8cb` — verified).
- **Never rely on grey value alone:** distinct lanes also differ by label + position + (where needed) dash pattern; status differs by text first. This is an accessibility requirement (§17), not decoration.
- Motion graphics must **directly explain** the real sequence: booking → queue → consultation → records → follow-up, and the doctor/hospital connection (verified Connection narrative does exactly this — keep as the standard).
- The ECG/heartbeat is an emotional signature, not an explainer: it may underline the brand pulse (verified hero usage) but must never substitute for explaining actual product value (File 04 §14 caution).
- No decorative medical symbols (crosses, stethoscopes) scattered as filler; no fake analytics charts or performance metrics anywhere.
- Hardcoded SVG hex values migrate to `currentColor`/CSS vars in a future pass (File 11) so diagrams follow the token system.

---

## 15. Motion, animation and interaction principles (summary — File 07 owns detail)

**Philosophy:** intentional, calm, purposeful — motion explains a relationship or a sequence, never decorates for its own sake. Presence, not spectacle (§3).

**Verified current system (the baseline any future motion extends):**
- Engine: GSAP 3 + ScrollTrigger, lazy-loaded/code-split; default ease `power3.out`.
- Inventory: hero fade-in cascade; `data-reveal` scroll reveals; journey-lane draws; product tilt; Sevika message stagger; Connection — pinned scrub (desktop ≥768), choreographed autoplay (mobile <768), **static finale under reduced motion** (everything visible); ambient loops (`breathe` 6s, `pulse-ring` 2.6s, `ecg-march` 7s, `blink` 1.7s, `drift` 9s).
- Reduced motion: global CSS kill-switch + GSAP `reduceMQ` branch (verified) — the standard to preserve.
- Nav scrolled state: 350ms ease transitions (verified).

**Principles:**
- Scroll animation may support the signature Connection stage but must never gate access to information — all content readable if animation fails or is disabled (verified: reduced-motion keeps everything visible).
- Avoid: constant floating beyond the documented ambient loops, excessive parallax, elastic/bounce easing, scroll hijacking, nausea-inducing effects.
- Motion is never the only way to understand content (pair with labels/layout).
- Mobile stays usable without pinned stages — recompose, don't squeeze (verified pattern).
- Timing tokens (proposed): fast 200ms (hovers) / base 450ms (reveals) / slow 900ms (stage beats); signature Connection scrub length stays as File 07 specifies. Easing token: calm out (`power3.out` / `cubic-bezier(0.22,1,0.36,1)`).
- Every animation ships with a reduced-motion alternative from day one.
- The GSAP engine and current behaviour are untouched by this task.

---

## 16. Responsive design and breakpoint rules

**Verified current conventions:** mobile-first Tailwind steps (`sm` 640 / `md` 768 / `lg` 1024) + a custom `max-width: 767px` breakpoint governing the Connection recomposition and mobile nav; body `overflow-x: clip`; hero arc hidden below `md`; conn cards become a static 2-col grid below 768px; paths grid `md:grid-cols-3`; type steps per §6.3.

**Proposed canonical breakpoints (matching verified usage):**

| Range | Name | Behaviour rules |
|---|---|---|
| <640px | small mobile | single column; 20px gutters; full-width buttons; hamburger nav; Connection = static grid + autoplay; mocks drop tertiary columns |
| 640–767px | large mobile | as above + `sm:` type steps (verified) begin; 2-col card rows where verified |
| 768–1023px | tablet | pinned Connection may activate (≥768 — verified); 2-col splits possible; nav stays hamburger (verified `lg:flex` desktop links) |
| 1024–1279px | desktop | full nav links (verified `lg:`); 3-col role grid; split layouts |
| ≥1280px | wide desktop | frame capped at 80rem (`max-w-7xl` — verified); stage glows scale, content does not widen |

**Rules:**
- No horizontal scrolling at any width (verified clip + per-section recomposition — keep).
- No clipped labels: Connection overlay cards use the mobile grid (verified); any future diagram defines its mobile fallback in specification before build.
- Type scales per §6.3; gutters 20/32px (verified); section padding 96/128px (verified).
- Tap targets ≥44px and focus visibility at every width (verified patterns — keep).
- Desktop animation is never simply squeezed onto mobile: mobile recomposes the story while preserving meaning (verified Connection pattern is the standard).
- Preview windows and tables simplify before shrinking text below 12px.
- Safe spacing under the fixed header: hero clears via `pt-32/36` (verified); anchor targets must account for header height in future pages (proposed: `scroll-margin-top` rule for File 09).

---

## 17. Accessibility and inclusive design requirements

**Testable standards (measure in File 12 QA; conformance is not claimed here):**

- **Contrast:** WCAG 2.2 AA targets — 4.5:1 normal text, 3:1 large text (≥24px regular / ≥18.66px bold) and applicable UI/graphic boundaries. The verified primary pairings (ink-950 on paper-50; ivory-50 on ink-950) are far above target; the audit list for measurement: secondary/muted text pairings, `.eyebrow` labels, chips (`.approval-chip` gold-300 on gold-400/15 over brand-900/60), conn labels, disabled states, focus-ring vs both surfaces, grain-overlaid text.
- **Visible focus:** global `:focus-visible` outline (verified) must remain on every interactive element; never `outline: none` without replacement.
- **Keyboard:** full operation of nav, mobile menu (`aria-expanded` verified), CTAs, and any future components; skip link (verified) first tabbable element; one `<h1>` per page and ordered headings (verified current).
- **Landmarks/ARIA:** `header/nav/main/footer` landmarks (verified); `aria-label` on icon-only controls (verified); decorative SVGs `aria-hidden` (verified pattern); meaningful diagrams get sr-only descriptions (verified Connection sr-only `<h2>` precedent).
- **Motion reduction:** verified global kill-switch + GSAP branch are mandatory for all future motion; no motion-only information.
- **Text reflow/zoom:** content reflows at 200–400% zoom without loss (matters for carer-assisted reading — File 04 §11-D); no fixed 1px-equivalent text.
- **Never encode status by grey value alone** — pair with text/shape/label (§13/§14 rules).
- **Touch targets:** ≥44×44 CSS px for primary touch controls (verified current — keep).
- Avoid tiny all-caps labels below 11px and low-contrast secondary text (`.eyebrow` at 11px is the verified floor — do not go lower).
- No fabricated accessibility certification or legal-compliance claim anywhere on the site (File 02 claims rule).

---

## 18. Design-system governance and handoff format

**How future work consumes this file:**

1. Every new visual component references **semantic token names** (§5), never arbitrary hex; SVG diagrams migrate toward `currentColor`/vars when touched.
2. **New colours require explicit owner approval**; the default answer is neutral monochrome (§4). "A grey" is still a colour decision — propose via token, decide once.
3. Any change to the logo asset or tagline lockup is a **separately authorized asset task** (owner decision, File 04 §16 item 5); interim rules per §10.
4. New component variants are documented with: purpose, states (rest/hover/focus/disabled/loading-if-real), responsive behaviour, accessibility notes — appended to this system in a future revision.
5. **The source code is the implementation truth; this file is the specification** — nothing here is proof of what is deployed. Verified-in-source markers reflect this audit only.
6. Official tagline usage stays exact: **"Care that walks with you."** — no rewording, no translation, no truncation.

**Handoff table format for Files 09/11 (suggested):**

| Token/component | Current evidence (path) | Desired state | Dependencies | Acceptance criteria | Priority | Status |
|---|---|---|---|---|---|---|
| *(example)* semantic colour tokens | `globals.css` legacy names | `graphite/paper` primitives + semantic aliases | File 11 batch plan | zero visual diff after alias swap; no raw hex in new components | P2 | proposed |

---

## 19. Consolidated design-related backlog and phase dependencies

Bringing forward the design-relevant File 04 backlog items (plus this audit's new findings) — **nothing implemented by this document**. Priorities per File 04; downstream files per the roadmap.

| # | Item | Evidence / path | Priority | Dependency | Downstream file | Status |
|---|---|---|---|---|---|---|
| 1 | Legacy token names (`brand`/`gold`/`ivory`) carry neutral values; semantic renaming via safe aliases | `globals.css` @theme (values verified neutral) | P2 | File 11 refactor plan; owner blessing on naming | File 11 (§5.3 strategy) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 2 | Human-first cinematic imagery absent (typography/SVG only — verified) | `Hero.tsx` et al.; `public/` has no photos | P2 (File 04) | Owner: direction, sourcing, licensing, generated-imagery acceptability (§20) | File 08 (asset plan), File 06 (storyboard) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 3 | Connection example cards lack visible "Representative preview" label | `Connection.tsx` cards (verified absent) | P1 (File 04) | None — pattern approved (File 02 §8 row 3) | File 09/11 (Batch 1) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 4 | Sevika conversation needs explicit illustrative context; brand-sentiment line must not read as testimonial | `Sevika.tsx` thread + `Footer.tsx` line (verified unlabelled) | P1 (File 04) | Owner framing preference | File 09/11 (Batch 1) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 5 | "Walk in without the wait" must be replaced with truthful phrase | `Paths.tsx` PATHS[0].title (verified) | P0 (File 04) | Owner sign-off on final wording | File 09/11 (Batch 1 copy) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 6 | Official tagline "Care that walks with you." vs logo-embedded "Make healthcare intelligent." — asset strategy | `Logo.tsx` full variant (verified lettering) | P1 (File 04) | Owner asset decision (§20 open) | File 08 (brand-asset task) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 7 | Role CTAs are toast-only with no destination (design must not pattern-copy) | `Paths.tsx` PathCta (verified) | P0 (File 04) | File 04 Phase A destination decisions | File 09/11 (Batch 2) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 8 | Footer fixed "© 2025" | `Footer.tsx` (verified) | P2 (File 04) | None | File 11 (Batch 1) | **NOT IMPLEMENTED IN FILE 05 TASK** |
| 9 | *(new from this audit)* Hardcoded SVG greys outside the token system (hero gradients, connection lanes/dots) | `Hero.tsx`, `Connection.tsx` inline SVG attrs (verified) | P2 | Touch-when-edited rule or File 11 batch | File 11 | **NOT IMPLEMENTED IN FILE 05 TASK** |

**Future implementation batches (grouped, not one-prompt-per-defect):** Batch 1 — truthfulness labels & copy (items 3, 4, 5, 8; File 04's Batch 1); Batch 2 — CTA destinations once decided (item 7); Batch 3 — brand assets (item 6); Batch 4 — imagery direction (item 2, with File 08); Batch 5 — token migration (items 1, 9, File 11).

**Roadmap role clarity (explicit):** File 05 defines the system. File 06 defines the homepage storyboard. File 07 defines motion details. File 08 defines the actual visual asset plan. File 09 defines page/component specifications. File 11 groups implementation. File 12 defines QA. **Creating this document implements no backlog item.**

---

## 20. Open decisions, proposed defaults and completion checklist

**Genuinely open decisions (only these):**

1. **Logo asset strategy** for resolving the embedded tagline mismatch: tagline-free lockup + separate canonical tagline line (interim rule already safe, §10), vs a future owner-approved updated asset. Owner review required; no asset edited meanwhile.
2. **Human photography/video direction & sourcing:** authentic commissioned vs licensed vs generated imagery (and budget/permissions). Proposed safe default: licensed or commissioned real photography for human moments; generated imagery only if the owner explicitly accepts it for this brand. Non-blocking for File 05.
3. **Semantic-token renaming path:** safe aliases first (zero visual change) then opportunistic migration — proposed default; final call folded into File 11's refactor plan.

**Proposed defaults already embedded (no owner question needed):** unified graphite/paper naming (§4.2); type scale freeze at current verified steps (§6.3); radius/shadow token sets from verified patterns (§8); breakpoint set matching current usage (§16); timing tokens 200/450/900ms + calm-out easing (§15). The official tagline is **not** open — approved: "Care that walks with you."

**Completion checklist:**

- [x] Source facts are distinguished from proposals throughout (verified/current vs proposed markers, evidence paths included).
- [x] Black/white/neutral-grey palette only; no warm or coloured hues proposed anywhere.
- [x] Official tagline is "Care that walks with you." — recorded as canonical, exact, approved.
- [x] Logo asset untouched; mismatch documented with interim safe rules and future options labelled as options (§10, §19 item 6).
- [x] Current fonts/tokens/components recorded from source, not guessed (§2 audit, 16 findings with evidence).
- [x] Human-first cinematic direction described without claiming imagery exists (verified: none does).
- [x] Accessibility and reduced-motion rules are measurable (targets stated; conformance not claimed).
- [x] Existing backlog items mapped to later files and grouped implementation batches (§19).
- [x] No website code, logo/assets, tokens, File 02, File 03, File 04, worklog, deployment config or product workspace (`/home/z/my-project/`) modified.
- [x] Exactly one file created/changed by this task: `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md`.

---

**End of File 05.**
