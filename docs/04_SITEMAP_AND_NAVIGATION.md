# Aturseva — File 04: Sitemap, Information Architecture, Navigation & Consolidated Implementation Backlog

**Document type:** Implementation-ready information-architecture (IA), sitemap, navigation and CTA specification for the Aturseva marketing site, plus one consolidated backlog of already-known live-site issues.
**Status:** Planning specification — owner review pending. This document is a plan, not permission to implement. Nothing in this file changes code, authorizes deployment changes, or claims that any proposed route, page, label or CTA already exists or works.
**Sources of truth:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (File 02 — product capabilities and prohibited claims) and `docs/03_BRAND_MISSION_AND_POSITIONING.md` (File 03 — proposed brand strategy and tone, subject to the owner decisions recorded in §4 below).
**Owner decision carried forward:** the official Aturseva tagline is **"Care that walks with you."** — owner-approved, canonical, and not pending (§4).
**Companion context:** File 01 (`01_PROJECT_BRIEF_AND_BOUNDARIES.md`) is absent from the workspace (lost to an earlier sandbox reset); its operative boundaries are restated in File 02 §13 and inherited here.

---

## 1. Document status, purpose, scope and dependencies

- **Status:** File 04 IA/navigation specification, awaiting owner review. Planning only.
- **Purpose:** answer, in one durable place — what pages/sections Aturseva should have and why; what hierarchy and navigation pattern gets each visitor (patient, doctor, hospital/clinic team) to the correct path; what every navigation item, hero CTA, section CTA and footer link should do; which page owns each File 02 capability so the homepage never becomes a long list of disconnected features; and which items are current, proposed, blocked, or future implementation work.
- **Scope:** sitemap and routes, navigation hierarchy and labels, header/logo/tagline usage, homepage section order, complete CTA/destination matrix, role-specific visitor journeys, capability-to-page crosswalk, representative-preview and testimonial boundaries, microcopy and accessibility rules, SEO/metadata framework, a consolidated backlog of known live-site issues, phasing and acceptance criteria, and open decisions.
- **Out of scope:** visual design tokens, typography scales, motion rules, storyboard detail, asset sourcing, and implementation itself — these belong to later roadmap files (§17). No code, stylesheet, component, logo, build/deploy configuration, or other document is changed by this task.
- **Dependencies:** File 02 (capabilities, claims guardrails), File 03 (brand strategy, tone), the current source tree of this repository (audited for §5 and §10 — see "verified in source" markers), and owner decisions listed in §18.
- **Precedence:** File 02 owns factual product capabilities and prohibited claims; owner decisions explicitly recorded for this file (official tagline, §4) are authoritative and carried forward even though File 03 has not yet been reconciled; File 03 supplies tone and brand framing beneath those decisions.

---

## 2. Product and brand facts that constrain the information architecture

Only facts grounded in File 02 are load-bearing here. Anything not verified as working product must not be claimed on the site (File 02 §9–§10).

**Patient app (File 02 §3):**
- Discover doctors and hospitals; choose department/doctor and book appointments.
- Join the queue online or as a walk-in; see queue progress, token position/status, and countdown/estimated-wait information **where the app displays it** (informational only — never promise exact wait times, "zero waiting", or priority).
- Doctor-initiated video consultations.
- Digital reports and records access.
- QR walk-in registration; front-desk assisted/manual registration for patients without smartphones — staff remain in charge; QR never implies staff replacement.

**Doctor workflows (File 02 §5):**
- Doctor account, plan selection, payment and login flow (existence confirmed; **no pricing, plan names, trials or launch dates may be stated**).
- Scheduling and availability management; unified queue across online + walk-in; relevant patient context; mark-visited; supported priority handling; follow-up coordination.

**Hospital/clinic software (File 02 §6):**
- Six roles — reception, assistant doctor, doctor, administrator, pharmacy, laboratory — with connected workflows **where the product enables them**. No claim of integration with every external pharmacy/lab.

**Sevika (File 02 §4):**
- Patient-side supportive companion: booking help, queue notifications, doctor-approved medication reminders, doctor-approved diet/care instructions, follow-up reminders, authorised next-appointment booking.
- Hard boundaries: Sevika never diagnoses, prescribes, changes doses, overrides doctors, or makes independent medical decisions. Every reminder/instruction is attributed to a doctor-approved plan.

**Existing AI capabilities:** described at a high level only (File 02 matrix row 14). No AI-diagnosis, AI-prescription, accuracy-percentage, or autonomy claims.

**Not verified / must not be claimed anywhere on the site:** patient/doctor/hospital counts, any statistics, testimonials or customer names, partners, certifications, compliance status (e.g., HIPAA), pricing, app-store links, signup URLs, contact addresses, integrations beyond those listed, and any launch date.

**Site-wide constraints:** professional natural English for all public copy; Hinglish only inside an intentionally labelled illustrative Sevika conversation; monochrome palette (black, white, grey only); human-first storytelling; Aturseva is a helping hand — never a replacement for doctors, nurses, reception, hospital staff, pharmacies or laboratories.

---

## 3. Website goals and audience priority

The site's single job: help each visitor understand *their own* place in one connected healthcare journey — and reach an honest next step.

| Audience | Priority | Key questions they arrive with | Desired next action | What should reassure them |
|---|---|---|---|---|
| **Patients & carers** | Primary | "Will I know when my turn is? Can someone help me book and remember my follow-ups? What about my parents who don't use smartphones?" | Understand the patient journey (booking → queue → consult → records → Sevika's continued care), then reach a genuine next step **only once a real destination is confirmed** | Calm plain language; queue information framed honestly (no zero-wait promises); walk-in and assisted registration shown with staff in charge; Sevika framed as doctor-approved support |
| **Doctors** | Primary (collaborator) | "Does this add work or remove it? Who controls the queue and priorities? What does Sevika do with my patients?" | Understand the doctor workflow (schedule, unified queue, patient context, mark-visited, follow-ups) → account/plan/login flow — without unconfirmed pricing or trial claims — then a genuine next step **only if a destination is confirmed** | Respect for clinical authority; Sevika explicitly follows doctor-approved plans; support-not-replacement stance stated openly |
| **Hospital/clinic operators & administrators** | Primary (collaborator) | "Can online and walk-in patients really share one queue? What do reception, pharmacy and lab teams get? Is this another disconnected tool?" | Understand the connected operational picture (six roles, shared queues, assisted walk-in flow) → a genuine next step **only if a destination is confirmed** | Operational visibility and coordination language (never surveillance); inclusion of non-smartphone walk-ins; honest scope of what is connected |
| **Reception/front-desk, assistant doctors, pharmacy & lab teams** | Supporting | "Will self-service remove my role? What changes in my daily work?" | Recognise themselves inside the hospital/clinic story as respected collaborators | They appear in the narrative as active participants; QR/assisted registration explicitly keeps staff in charge |

**Standing rule (from File 03 §6, carried forward):** patients are the entry point of the story; provider teams appear as collaborators in the same journey — never as opponents, obstacles, or people being "optimised away".

---

## 4. Official brand line and naming hierarchy

**Owner decision (authoritative, carried into this document):**

- **Brand name:** Aturseva.
- **Official tagline:** **"Care that walks with you."** — owner-approved and canonical. It is *not* a candidate and *not* unresolved. Do not describe it as pending elsewhere in this roadmap.
- Verified in source: the browser/page title already reads "Aturseva — Care that walks with you" (`src/app/layout.tsx` metadata title, plus matching OpenGraph title) — i.e., the site's interim title wording happens to align with the now-official tagline. This is recorded as an observed fact, not as a claim that any alignment task was performed.

**Brand-asset mismatch (recorded; NOT fixed in this task):**

- The approved primary logo asset embeds the phrase **"Make healthcare intelligent."** as vector lettering. Verified in source: `src/components/Logo.tsx` renders the tagline lettering as SVG glyph paths in the `full` variant (used in the site footer); the header uses the `word` variant (no tagline); the file header documents it as a faithful copy of `upload/Aturseva_Primary_With_Tagline (1).svg`.
- **Handling:** the approved logo asset remains untouched — no SVG edits, no recolouring, no replacement. The logo-embedded "Make healthcare intelligent." is **not** the official canonical tagline and must not be treated as one. The mismatch is consolidated as a future, separately scoped brand-asset task in §16 (Backlog item 5), planned after owner review. It must not block the sitemap/navigation plan. File 03 can be reconciled to this decision in a later consolidated documentation pass (Backlog item 8) — it is not edited in this task.

**Naming hierarchy recommendations:**

| Level | Recommendation | Notes |
|---|---|---|
| Browser/page title (homepage) | `Aturseva — Care that walks with you` | Already in source; aligns with the official tagline |
| Nav wordmark | "Aturseva" wordmark, `word` variant | Current behaviour, verified — header stays uncluttered |
| Footer naming | "Aturseva" wordmark + official tagline as a separate text line (once the asset task lands) | Until the logo asset is resolved, the footer keeps the current full logo; do not patch it ad hoc |
| Official tagline usage | One prominent pairing per page maximum, adjacent to the wordmark or in the footer — never repeated in every section | Distinguish the *official tagline* from *headlines* (e.g., "Healthcare is a journey."), *supporting copy*, and any future *campaign messages*; those are not taglines |
| Other tagline candidates (File 03 §14 list) | Remain unapproved; do not silently promote any of them | Only "Care that walks with you." is official |

---

## 5. Current site inventory — verified versus proposed

**Method note:** this is a **source audit** of this repository only (files listed under `src/`, `package.json`). No browser/device QA was run for this task; visual claims from earlier QA rounds are not re-asserted here. Every "verified" item below was confirmed by reading source.

**Current structure (all verified in source):** one route only — `/` (single `src/app/page.tsx`; no other page files exist). Page composition order: skip link → `Nav` → `Hero` → `Journeys` → `Connection` → `ProductReveal` → `Sevika` → `Paths` → `Footer` → `AnimationProvider`.

| # | Item | Where in source | Current state (verified) | Classification |
|---|---|---|---|---|
| 1 | Skip link "Skip to content" → `#main` | `page.tsx` | Present | Existing — verified |
| 2 | Fixed header; wordmark logo → `#top`; desktop links: The Journeys / How it connects / Platform / Sevika; "Get started" button → `#paths`; mobile hamburger menu (same links + Get started), `aria-expanded`/`aria-controls` on the toggle | `Nav.tsx` | Present; no scrolled-state change; no active-section indication | Existing — verified |
| 3 | Hero `#top`: eyebrow "Aturseva · Care in step"; H1 "Healthcare is a journey. / No one should walk it alone."; primary CTA "Begin the journey" → `#journeys`; secondary CTA "I'm a patient · doctor · hospital" → `#paths`; journey-arc SVG (milestones: Book / Wait, informed / Consult); animated ECG trace; ambient glows | `Hero.tsx` | Present; typography + abstract SVG only (no photographic/imagery assets) | Existing — verified |
| 4 | Journeys `#journeys`: three persona cards ("The long wait" / "The full day" / "The busy desk") with broken-lane SVGs and problem chips; icon-only scroll cue → `#connection` (has `aria-label`) | `Journeys.tsx` | Present | Existing — verified |
| 5 | Connection `#connection` (signature scroll section): three lanes converge; overlay cards show illustrative data — "Dr. Mehta · General OPD · 11:30 AM", "Token #14", "Tokens today: 42"; crossfading captions; sr-only `<h2>`; GSAP pinned/scrubbed on desktop, choreographed autoplay on mobile, static finale under reduced-motion | `Connection.tsx` | Present; **no visible "Representative preview" label on the example cards** | Existing — verified; **current issue needing future implementation** (Backlog item 2) |
| 6 | ProductReveal `#platform`: workspace mock (schedule + queue), visible "Representative preview" badge; no outbound CTAs | `ProductReveal.tsx` | Present; label verified | Existing — verified |
| 7 | Sevika `#sevika`: five-message illustrative thread (Hinglish with "Doctor approved" chips), bullets, blockquote "Aturseva ne hamara saath diya." attributed "— the promise we build by"; no CTAs; **no visible "Illustrative conversation"-type label on the thread** | `Sevika.tsx` | Present | Existing — verified; labelling gap folded into Backlog item 3 |
| 8 | Paths `#paths`: three cards — Patients ("Walk in without the wait"), Doctors ("Keep the day humane"), Hospitals ("One calm front desk"); each CTA button shows a toast: "Early access for {role}s opens soon — Team Aturseva will reach out."; closing line "Aturseva supports your doctors and hospitals — it never replaces them." | `Paths.tsx` | Present; CTAs have **no real destination and capture no data** (toast-only) | Existing — verified; **current issue needing future implementation** (Backlog items 1 and 4) |
| 9 | Footer: full logo (embeds "Make healthcare intelligent." lettering), philosophy line "Aturseva ne hamara saath diya." (no context label), three link groups (all in-page anchors), fixed "© 2025" line, representative-previews disclaimer | `Footer.tsx` | Present | Existing — verified; issues in Backlog items 3, 5, 7 |
| 10 | Root metadata: title "Aturseva — Care that walks with you", description, OpenGraph, `themeColor #0a0a0b`, `lang="en"` | `layout.tsx` | Present | Existing — verified |
| 11 | Monochrome token system (black/white/grey; `ink`/`brand`/`gold`/`ivory` tokens at neutral-grey values) | `globals.css` | Present | Existing — verified |
| 12 | Stack: Next.js 16 + React 19 + GSAP + Tailwind 4; dev port 3005; `build:pages` static export for GitHub Pages under basePath `/aturseva-landing` | `package.json`, `next.config.ts` | Present | Existing — verified |
| 13 | Any route other than `/` (doctors/hospitals/patients pages, FAQ, contact, privacy/terms/accessibility) | — | Does not exist | **Proposed for future addition** (§6) — nothing proposed here exists today |
| 14 | Scrolled-state header treatment; active-section indication; footer link targets beyond in-page anchors | — | Does not exist | **Proposed** (§7) |
| 15 | Human-first photographic/video imagery | — | Hero and sections are typography + abstract SVG only | **Proposed future direction** (Backlog item 6; Files 05/08 territory) |

---

## 6. Recommended sitemap — primary and secondary routes

**Design constraints honored:** existing live functionality only (static site, no backend, no analytics/lead-capture endpoints); the owner's no-backend-integration constraint; no invented destinations, forms, app links, signup URLs, contact addresses or policies. The sitemap stays deliberately small — every additional page must materially improve clarity for one of the three audiences, or it is not built. Page count is not a goal.

**Deployment note:** the live site is served under the GitHub Pages project basePath (`/aturseva-landing/`). Slugs below are relative to the site root; the Pages base path applies to all of them until the hosting arrangement changes (§15).

### Phase 1 — essentials

| Route / slug | Page | Primary audience | Purpose | Required content | Primary CTA | Status | Dependencies | Rationale |
|---|---|---|---|---|---|---|---|---|
| `/` | Homepage (single-page narrative + in-page anchors) | All three audiences, patients first | Tell the connected-journey story and route each audience to its path | Current sections (§9) with copy corrections from the backlog applied in a later pass | In-page: to role paths; honest interim behaviour per §10 | **Existing — verified** | Copy/backlog fixes (§16) | Already live; the story arc is owner-confirmed in File 02 §11.6 |
| `/doctors` | Doctors page | Doctors | Answer doctor questions (§3): schedule, unified queue, patient context, mark-visited, follow-ups, account/plan/login existence — without pricing/trial claims | Workflow explainer grounded in File 02 rows 6, 13; Sevika boundaries from doctor's perspective; support-not-replacement framing | To be defined at implementation from a **confirmed** destination (§10/§18); until then, honest in-page navigation only | **Proposed — Phase 1** | Owner confirms the genuine doctor next-step destination (app login URL, onboarding contact process, or explicit "no destination yet — keep informational") | The homepage Paths card for doctors currently dead-ends in a toast; a real page materially improves clarity for a primary collaborator audience |
| `/hospitals` | Hospitals & clinics page | Hospital/clinic operators, administrators; reception/pharmacy/lab as supporting readers | Answer operator questions (§3): shared online + walk-in queue, six roles, assisted walk-in flow, operational visibility | Role-by-role workflow explainer grounded in File 02 row 7; reception/assisted-registration flow showing staff in charge; honest scope of connected workflows | To be defined at implementation from a **confirmed** destination; until then, honest in-page navigation only | **Proposed — Phase 1** | Owner confirms the genuine hospital/clinic next-step destination | Same dead-end rationale as `/doctors`; also consolidates the six-role story that must not bloat the homepage |

### Phase 2 — conditional / optional pages

| Route / slug | Page | Primary audience | Purpose | Status | Conditions / dependencies |
|---|---|---|---|---|---|
| `/patients` | Patients page | Patients & carers | Deep patient-journey explainer: discovery/booking, queue information, video consult, records, Sevika continued care, walk-in/assisted registration | **Proposed — Phase 2, conditional** | Build **only if** it materially improves clarity beyond the homepage (it likely does once a real patient-facing destination — e.g., app availability — exists). Interacts with Open Decision 1 (Sevika Hinglish placement): if Hinglish examples move off the homepage, this page is their natural home |
| `/sevika` | Sevika / care-continuity page | Patients & carers (doctors as secondary reassurance) | Full illustrative Sevika conversation, boundaries, doctor-approved attribution | **Proposed — Phase 2, conditional** | Build **only if** Open Decision 1 moves Hinglish examples off the homepage and a `/patients` page does not absorb them. Otherwise Sevika remains a homepage section (`#sevika`) as today |
| `/how-it-works` | Product/workflow explainer | Mixed, leaning provider | Step-by-step connected-visit walkthrough (booking → queue → consult → records → follow-up) using labelled representative previews | **Proposed — Phase 2, optional** | Build only if the doctor/hospital pages and homepage reveal leave a genuine gap; avoid duplicating their content |
| `/faq` | FAQ | All | Answer **only** owner-confirmed, answerable questions | **Proposed — Phase 2, conditional** | Requires owner-supplied confirmed Q&A content; no invented answers; no policy/compliance statements |
| `/contact` or `/get-started` | Contact / get-started | Role-specific | Convert role intent into a genuine next step | **Proposed — unconfirmed; do not build yet** | Requires a **real, confirmed destination or process** (working email/address, confirmed onboarding process, or app link). Until then role CTAs stay as honest in-page navigation or are removed — never a fake capture toast (§10, §16 item 4) |
| `/privacy`, `/terms`, `/accessibility` | Legal / accessibility pages | All | Real policy content | **Proposed — unconfirmed; do not build yet** | Only when the owner supplies or explicitly schedules real policy content. An accessibility statement is a good Phase 2 candidate **if** the owner approves its content; no boilerplate invented here |

**Anchor strategy for Phase 1:** the homepage keeps its in-page anchors (`#journeys`, `#connection`, `#platform`, `#sevika`, `#paths`) as the fast lane; new real routes are linked from the header, Paths cards, and footer once they exist. Anchors and routes are complementary, not competing (§7).

---

## 7. Navigation hierarchy and labels

**Current state (verified):** desktop nav = 4 anchor links (The Journeys / How it connects / Platform / Sevika) + "Get started" → `#paths`; mobile = same set inside a collapsible panel; logo → `#top`; no active-section indication; no scrolled-state treatment; skip link present.

**Recommended hierarchy (future implementation; nothing below exists yet):**

- **Desktop primary navigation (Phase 1):** `Aturseva` (wordmark, → top) · For patients · For doctors · For hospitals · How it connects · Sevika — plus one honest action button whose label reflects a confirmed destination (e.g., "Get started" only once a real destination exists; otherwise the button navigates to the role paths section, as it honestly does today). Cap primary items at 5–6.
- **Mobile menu:** same items in one thumb-friendly panel (current pattern is sound); keep the `aria-expanded`/`aria-controls` behaviour; close on link activation (current behaviour, verified); ensure focus management when the panel opens/closes (to be specified in File 09).
- **Sticky/scrolled state intent:** the header is already fixed. Recommended future treatment: a subtle scrolled state (condensed padding, gentle backdrop/solid surface, hairline border) to preserve readability over light sections — specified in File 05/09, not implemented now.
- **Footer navigation groups (recommended regrouping once routes exist):** *Explore* (homepage narrative anchors) · *For you* (Patients / Doctors / Hospitals as **routes**, replacing the three links that currently all point to `#paths`) · *Care* (Sevika) · *Company/legal* (only when real pages exist). Today's footer links are all honest in-page anchors — verified — but the "Patients / Doctors / Hospitals" labels promise differentiation that a single shared anchor does not deliver; that is a clarity issue, not an honesty violation.
- **Anchor links vs real routes:** anchors serve the single-page story; routes serve role destinations. Rule: an item that always means "a different kind of visitor" becomes a route when it exists; an item that means "a moment in the story" stays an anchor.
- **Active section indication:** recommended future enhancement (e.g., highlighting the current story section in the nav while scrolling). Requires an IntersectionObserver-style pattern and a reduced-motion-safe implementation; specify in File 09/12.
- **Skip link and keyboard accessibility:** keep the existing skip link; ensure visible focus on every interactive element (verified pattern exists in `globals.css` outline rule); maintain one `<h1>` per page and a sensible heading order (current page follows this); keep descriptive link texts (avoid "click here"); maintain ≥44px touch targets for primary controls on mobile.
- **Label style:** concise, honest English. Avoid ambiguous labels such as **"Platform"** unless the destination explains itself — the current "Platform" anchor actually leads to the labelled product preview; when nav is revised, prefer a self-explaining label such as **"How it works"** (final wording decided in the implementation phase with File 03 tone rules). Avoid jargon ("ecosystem", "solution") per File 03 §8.

---

## 8. Header, logo and tagline usage

- **Header:** wordmark only (`word` variant — current, verified). The header stays uncluttered: no tagline in the header. The official tagline "Care that walks with you." pairs with the wordmark in the footer and/or hero-adjacent brand moments — at most one prominent pairing per page (§4).
- **Logo asset integrity:** the approved logo (including its embedded "Make healthcare intelligent." lettering in the `full` variant) is **never** distorted, recoloured, cropped or edited. The inline copy in `Logo.tsx` inherits colour via `currentColor` — that mechanism stays.
- **The logo-embedded phrase is not the official tagline.** The official tagline is "Care that walks with you." The mismatch is recorded as a future, separately scoped **brand-asset task** (§16 item 5): the owner decides the asset strategy (e.g., a tagline-free primary lockup for generic placements, or an updated asset), and only then does the site change. Until that task lands, the footer keeps the current full logo as-is.
- **Do not** patch around the mismatch with ad-hoc overlays, hidden text, or asset substitution in any earlier phase.
- **Tagline usage rules:** official tagline may appear in `<title>`, meta description, footer, and one hero-adjacent moment; it must not be repeated in every section, used as a CTA label, or mixed with the embedded logo phrase in the same lockup.

---

## 9. Homepage section order and information hierarchy

**Confirmed story arc (File 02 §11.6, unchanged):** human journey → how the journeys connect → representative product reveal → Sevika's doctor-guided continued care → role-specific paths.

**Mapping — current sections (all verified in source) to the hierarchy:**

| Order | Story beat | Current component (anchor) | Notes |
|---|---|---|---|
| 0 | Orientation | Skip link → `#main`; fixed nav | Accessibility prerequisite — present |
| 1 | The human journey opens the story | `Hero` (`#top`) | Emotion first, no product pitch; typography + journey-arc + ECG |
| 2 | The problem today | `Journeys` (`#journeys`) | Three persona lanes, rarely in step — sets up the connection |
| 3 | How the journeys connect | `Connection` (`#connection`) | Signature scroll moment; illustrative cards (labelling gap → Backlog 2) |
| 4 | Representative product reveal | `ProductReveal` (`#platform`) | Labelled "Representative preview" — verified |
| 5 | Sevika's ongoing support | `Sevika` (`#sevika`) | Care continues after the visit; doctor-approved attribution |
| 6 | Pathways | `Paths` (`#paths`) | Three doors — patients, doctors, hospitals |
| 7 | Close | `Footer` | Philosophy line, links, representative-previews disclaimer |

**Recommended changes (recommendations only — not implemented):**
- Keep the order exactly as is; it matches the owner-confirmed arc. No section-order change is proposed.
- When `/doctors` and `/hospitals` exist, the Paths cards become the homepage's primary cross-route moment; the hero secondary CTA may then point to the paths section unchanged (still honest), and role cards link to their routes.
- Keep the homepage narrative tight: new capability detail belongs on role pages (§12), never as additional homepage feature tiles.

---

## 10. CTA and destination matrix

**Ground rules:** a CTA must honestly describe its action; a button that implies capture ("Get started", "Early access") must lead to a **real, confirmed destination** or stay as honest in-page navigation — never a toast that implies something happened that did not. No destination URLs are invented here. Current behaviours are source-verified; recommendations are proposals for a future authorized pass.

| # | CTA / link | Current label | Current behaviour (verified in source) | Recommended label (future) | Destination (future) | Audience | Real destination confirmed? | Dependency / owner question | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Header wordmark | Aturseva logo | → `#top` (back to top) | Keep | `#top` | All | Yes (in-page) | — | Current, honest — keep |
| 2 | Nav link 1 | The Journeys | → `#journeys` | Keep | `#journeys` | All | Yes (in-page) | — | Current, honest — keep |
| 3 | Nav link 2 | How it connects | → `#connection` | Keep | `#connection` | All | Yes (in-page) | — | Current, honest — keep |
| 4 | Nav link 3 | Platform | → `#platform` (labelled product preview) | Prefer a self-explaining label, e.g. "How it works" — final wording in implementation | `#platform` | All | Yes (in-page) | Wording review vs File 03 tone | Current, honest; label clarity improvement proposed |
| 5 | Nav link 4 | Sevika | → `#sevika` | Keep | `#sevika` | All | Yes (in-page) | — | Current, honest — keep |
| 6 | Nav action (desktop) | Get started | → `#paths` (navigates to role paths) | Keep only while destination is in-page; relabel when a real route exists | `#paths` → later confirmed destination | All | In-page yes; external no | Owner: genuine get-started destination? | Current, honest interim — revisit with routes |
| 7 | Mobile menu items | Same 4 links + Get started | → same anchors; menu closes on click | Same as desktop recommendations | Same | All | Yes (in-page) | — | Current, honest — keep |
| 8 | Hero primary | Begin the journey | → `#journeys` | Keep | `#journeys` | All | Yes (in-page) | — | Current, honest — keep |
| 9 | Hero secondary | I'm a patient · doctor · hospital | → `#paths` | Simplify wording (e.g., "Find your path") — final wording in implementation | `#paths` | All | Yes (in-page) | Wording review | Current, honest; wording improvement proposed |
| 10 | Journeys scroll cue | (icon-only, `aria-label` "Scroll to see how the journeys connect") | → `#connection` | Keep | `#connection` | All | Yes (in-page) | — | Current, honest — keep |
| 11 | In-section CTAs (Connection / ProductReveal / Sevika) | — | **None exist** (no anchors in these components — verified) | Add none unless a route exists; optionally a quiet "See it connect" from ProductReveal → `/how-it-works` if that page is built | — | — | — | Route existence | No CTA — by design; keep restraint |
| 12 | Paths card CTA — Patients | I'm a patient | Shows toast: "Early access for patients opens soon — Team Aturseva will reach out." **No data is captured; no destination exists** | Replace with a link to `/patients` **if built**, else keep as informational card with no button | `/patients` (conditional) | Patients | **No** | Owner: real patient destination (app availability)? Until then: remove the toast or relabel the button to honest in-page navigation | **Current issue — Backlog item 4** |
| 13 | Paths card CTA — Doctors | I'm a doctor | Same toast pattern; no destination | Link to `/doctors` when built; CTA on that page only when a confirmed doctor destination exists | `/doctors` (proposed) | Doctors | **No** | Owner: doctor onboarding/login destination? | **Current issue — Backlog item 4** |
| 14 | Paths card CTA — Hospitals | I'm a hospital | Same toast pattern; no destination | Link to `/hospitals` when built | `/hospitals` (proposed) | Hospital/clinic teams | **No** | Owner: hospital/clinic contact/onboarding process? | **Current issue — Backlog item 4** |
| 15 | Footer — Explore group | The Journeys / How it connects / Platform | → `#journeys` / `#connection` / `#platform` | Keep | In-page | All | Yes (in-page) | — | Current, honest — keep |
| 16 | Footer — Care group | Sevika / For you | → `#sevika` / `#paths` | Keep | In-page | All | Yes (in-page) | — | Current, honest — keep |
| 17 | Footer — Paths group | Patients / Doctors / Hospitals | All three → `#paths` (same target) | When routes exist: Patients → `/patients`, Doctors → `/doctors`, Hospitals → `/hospitals`; until then, keep shared anchor (honest but low-clarity) | Routes (future) | Role visitors | Routes: no | Route existence | Current, honest — improve with routes |
| 18 | Footer — legal / contact | — | **None exist** (verified) | Add only when real pages/content exist | — | — | No | Owner: policy content, contact process | None — do not invent |

**Toast policy (from this matrix):** the current Paths toast must not survive into any future implementation as-is. It states "Team Aturseva will reach out" while capturing nothing and reaching out to no one — that is implied capture without function. Interim honest options (choose at implementation): (a) remove the buttons and let the cards be informational; (b) keep buttons as in-page navigation to the relevant section/route. A functional lead-capture CTA is only built when the owner confirms a destination and a working process — and it must then visibly succeed or fail honestly. No fake success toasts.

---

## 11. Role-specific visitor journeys and conversion paths

Each journey ends at an honest next step. Where no genuine destination is confirmed, the journey deliberately ends in understanding, not in a fake conversion.

**A. Patient / carer**
1. Lands on `/` — hero says the brand's promise of companionship in plain English ("Healthcare is a journey. No one should walk it alone.").
2. Scrolls the Journeys — recognises their own frustration ("The long wait": unclear token status, hours in waiting rooms, forgotten follow-ups).
3. Sees the Connection — online + walk-in patients joining one shared queue; illustrative cards show token/queue information (labelled as representative once Backlog item 2 lands).
4. ProductReveal — the same appointment on the patient's phone, the doctor's day, the hospital's desk; "Representative preview" label present.
5. Sevika section — continued care at home: doctor-approved reminders, follow-ups; Hinglish examples (placement per Open Decision 1) mirror how they speak.
6. Paths → patient card → **next step:** today, none beyond understanding (toast issue → Backlog 4). Future: `/patients` page, then a genuine patient destination (app availability/link) **only once confirmed**.
7. *Reassurance anchors along the way:* no zero-wait promise (after Backlog 1), staff-in-charge framing for walk-ins, doctor-approved attribution on every Sevika element.

**B. Doctor**
1. Lands on `/` (often via the hero secondary or a future `/doctors` link) — sees respect for clinical authority in the framing ("a helping hand, not a replacement").
2. Journeys — "The full day": back-to-back slots, manual queue calls, follow-up blind spots.
3. Connection + ProductReveal — unified queue, patient context at the point of care, mark-visited; representative previews labelled.
4. Sevika section — sees that Sevika only ever relays **doctor-approved** reminders; boundaries stated openly.
5. Paths → doctor card → **next step:** today, none (toast issue). Future: `/doctors` — workflow explainer; account/plan/login flow described **without pricing or trial claims**; then a genuine doctor destination (login URL / onboarding contact) **only once confirmed**.
6. *Drop-off risk:* if the homepage cannot answer "who controls the queue?", doctors leave unconvinced — the `/doctors` page exists precisely to own this answer.

**C. Hospital / clinic operator or administrator**
1. Lands on `/` → Journeys — "The busy desk": phone-only booking, paper tokens, fragmented view.
2. Connection — one live queue synced across counters; assisted walk-in registration keeping staff in charge.
3. ProductReveal — operational visibility across the workspace (representative preview).
4. Paths → hospital card → **next step:** today, none (toast issue). Future: `/hospitals` — six-role story (reception, assistant doctor, doctor, administrator, pharmacy, laboratory), shared-queue operations, honest scope of connected workflows; then a genuine destination **only once confirmed**.
5. *Reassurance anchors:* visibility/coordination language (never surveillance); no "replaces your staff" framing anywhere.

**D. Non-smartphone walk-in patient (supported by reception)**
1. Arrives via word-of-mouth or with a carer browsing on their behalf; the homepage must stay readable at large zoom levels (accessibility, §14).
2. Journeys/Connection show walk-in patients joining the same queue — with the front desk assisting registration (QR or manual). The story never implies QR eliminates staff: reception is shown doing the assisting.
3. Sevika section notes reminders and follow-ups reach the patient (the product's supported channels; no invented SMS/voice claims — describe only what File 02 confirms).
4. **Next step:** in real life, this visitor is helped by reception staff — the site's honest job is to reassure them that walking in is supported, not to push an app at them.
5. *Navigation implication:* no dark patterns; no "download now" pressure; the Paths patient card copy (post-Backlog 1) should acknowledge assisted walk-in (e.g., "walk in with greater clarity… the front desk can help you join").

**Drop-off risks and mitigations (summary):** role CTAs that promise action but do nothing (Backlog 4) erode trust fastest — mitigate with honest interim navigation; a nav label that does not match its destination ("Platform") mildly confuses — mitigate at implementation; a single shared footer anchor for three different roles — mitigate with routes; no active-section indication on a long single page — mitigate in File 09/12 with a reduced-motion-safe pattern.

---

## 12. Capability-to-page crosswalk

Every File 02 capability matrix row, mapped to where it is explained — and where it must **not** be over-emphasised. The hero stays emotional and capability-light; the homepage carries the story, role pages carry the detail.

| File 02 row | Capability | Homepage treatment | Best dedicated location | Over-emphasis caution |
|---|---|---|---|---|
| 1 | Provider discovery & appointment booking | One line in hero paragraph; Connection shows one booking travelling; Paths patient card mentions "Book ahead" | `/patients` (future) — full booking journey | Do not turn the hero into a feature list; booking is a step in the story, not the headline |
| 2 | QR walk-in registration + assisted/manual front-desk registration | Connection/Hospital lane + Paths hospital card ("One calm front desk") | `/hospitals` — reception workflow; `/patients` — walk-in reassurance | Never imply QR removes staff; assisted registration is a first-class fact, not a footnote |
| 3 | Unified queue & turn updates (informational estimates) | Connection's signature moment (tokens/queue cards); ProductReveal queue panel | `/patients` (patient view) and `/doctors`/`/hospitals` (management view) | Never promise zero waiting, exact times, or priority — estimates are informational (File 02 row 3 wording) |
| 4 | Doctor-initiated video consultations | At most a quiet mention within the journey (not currently a headline — keep it that way) | `/patients` (what a consult can look like) | Do not headline "video consultations" as the brand's core — the connection story is the core |
| 5 | Digital reports & records access | Mentioned within continued-care narrative where present | `/patients` | No "all your records everywhere" implication — describe access, not universality |
| 6 | Doctor scheduling, unified queue, mark-visited, follow-up coordination | ProductReveal workspace (representative); Paths doctor card ("Keep the day humane") | `/doctors` — the core page for this row | No "optimises your OPD" hype; humane-day framing per File 03 tone |
| 7 | Hospital roles: reception, assistant doctor, doctor, administrator, pharmacy, laboratory | Connection hospital lane; Paths hospital card | `/hospitals` — role-by-role section | No implication that every external pharmacy/lab is integrated; "connected workflows where enabled" |
| 8–9 | Sevika booking help & queue notifications | Sevika section thread (illustrative) | `/patients` / `/sevika` (per Open Decision 1) | Notifications reflect queue state — no zero-wait or priority promises |
| 10–11 | Sevika doctor-approved medication reminders & diet/care instructions | Sevika section — the heart of it, with "Doctor approved" attribution on every element (current pattern, verified) | Same | Always attribute to doctor-approved plans; never "AI knows best" framing |
| 12 | Follow-up reminders & authorised next-appointment booking | Sevika thread's follow-up beats | `/patients` | "Authorised" booking only — no autonomous booking claims |
| 13 | Doctor account, plan selection, payment & login flow | **Not on the homepage** (existence only, no detail) | `/doctors` — described factually without pricing, plan names, trials, dates | No pricing/commercial invention of any kind |
| 14 | Existing AI capabilities (high level) | At most one restrained line, if any | `/doctors`/`/hospitals` brief mention | High-level only; no diagnosis/prescription/accuracy implications |

---

## 13. Representative previews, examples and testimonial boundaries

- **ProductReveal mock:** retains its visible **"Representative preview"** label (verified in source — `ProductReveal.tsx`). Keep this pattern as the standard.
- **Connection-section mock:** currently shows illustrative values — "Dr. Mehta", "Token #14", "Tokens today: 42" — with **no visible "Representative preview" label** on those cards (verified in source). This is recorded as a **future implementation item only** (Backlog item 2); it is not fixed in this task and must not be claimed as fixed.
- **Sevika thread:** an illustrative conversation (Hinglish permitted per File 02 §4.4 / File 03 §9) — but the thread itself carries no visible "illustrative" label in source (verified). Labelling it (e.g., "Illustrative Sevika conversation — representative preview") belongs to the same future pass (folded into Backlog item 3).
- **"Aturseva ne hamara saath diya."** is brand sentiment / brand philosophy, or a line inside an explicitly labelled illustrative Sevika conversation. It is **not** a real patient testimonial, verified quote, endorsement, or evidence of outcomes, and must not be presented as one unless the owner supplies an authentic, authorized source and explicitly approves that use. Current placements (footer italic line; Sevika blockquote attributed "— the promise we build by") are consistent with brand-philosophy framing; the future pass (Backlog item 3) should add explicit context so no reader mistakes them for a customer quote.
- **No fictional doctor, hospital, or customer proof may be presented as real.** Example names inside labelled representative previews ("Dr. Mehta", "Ramesh S.", "Priya D.") are acceptable as clearly-illustrative sample data once labels are in place; they must never be framed as customers, users, or partners.

---

## 14. Microcopy, headline and accessibility rules

**Copy rules (from File 02/File 03, consolidated for implementation):**

- Replace **"Walk in without the wait"** (current Patients card title — verified in source) in a future authorized copy pass: it implies zero waiting. Approved alternatives: **"Walk in with greater clarity"** or **"Know where you are in the queue"**; the final UI copy choice is reviewed at implementation. Not fixed in this task.
- Never promise zero waiting, guaranteed queue times, guaranteed clinical outcomes, or "never miss a dose".
- Public copy stays professional natural English; Hinglish only inside labelled illustrative Sevika examples.
- CTA verbs honestly describe the action (§10 matrix); no fake urgency, scarcity, or pressure; no dark patterns.
- No fear-based medical messaging; no jargon or hype ("revolutionising", "synergistic"); benefit before mechanism; attribution to doctor-approved plans in every sensitive context (medication, follow-up).

**Accessibility rules:**

- Clear labels on all interactive elements; visible focus states (a focus-outline rule exists in `globals.css` — verified); sensible heading hierarchy (one `<h1>`, ordered `<h2>+`); descriptive link text; keyboard-operable navigation and mobile menu.
- Reduced-motion support: the Connection section already defines a reduced-motion static finale (verified in its source comment) — preserve and extend this pattern to any future motion (File 07).
- Readable contrast within the monochrome system; body text at comfortable sizes; mobile touch targets ≥44px for primary controls.
- Respect large-zoom reading (matters for the non-smartphone/carer audience, §11-D).

---

## 15. SEO URL, metadata and internal-linking framework

- **Slugs:** short, descriptive, stable English slugs — `/doctors`, `/hospitals`, `/patients`, `/sevika`, `/how-it-works`, `/faq`. No dates, no version suffixes, no keyword-stuffed slugs. Once published, a slug does not change (redirects are manual on static hosting — stability is the strategy).
- **Title convention:** `Aturseva — {page purpose} · Care that walks with you` (homepage keeps its current verified title, which already carries the official tagline). One primary search intent per page: homepage = brand/journey; `/doctors` = doctor workflow questions; `/hospitals` = clinic/hospital operations questions; `/patients` = patient journey questions.
- **Meta description convention:** one or two natural sentences, plain English, no claims beyond File 02, ending with the official tagline where it fits naturally. Homepage's current description (verified) is a sound template.
- **Canonical / social preview:** the stack supports per-page metadata (Next.js `Metadata`); set canonical URLs and OpenGraph per page once routes exist. Note the GitHub Pages **basePath** (`/aturseva-landing`) currently prefixes all URLs — canonical/OG values must reflect the actual public origin; if hosting moves (custom domain/Vercel), metadata needs a one-pass origin update. Social preview imagery is a File 08 decision (monochrome system).
- **Internal linking:** homepage ↔ role pages (Paths cards, footer regrouping per §7); role pages → representative-preview sections of the homepage for the shared story (e.g., "see how the journeys connect"); `/sevika` or the Sevika homepage section cross-linked from `/patients`. Every internal link uses descriptive text.
- **Anti-patterns:** no thin or duplicate pages; no indexing of placeholder pages with unconfirmed content (build nothing until its content is confirmed — §6 conditions); no invented search-volume data, ranking promises, or local-SEO claims; no keyword stuffing; one `<h1>` per page.

---

## 16. Consolidated backlog of known live-site issues (future authorization required)

Planning record only. **Nothing below is implemented in this task.** Items are grouped into batches so a future authorized pass can implement and QA related changes together — no one-prompt-per-item workflow. Priority: P0 = honesty/claims risk; P1 = clarity/brand alignment; P2 = polish. Evidence locations are source-verified in this audit.

| # | Issue | Evidence (source location) | User impact | Intended resolution | Future phase / roadmap file | Priority | Dependency / owner decision | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | **Zero-wait copy** — Patients card title reads "Walk in without the wait" | `Paths.tsx` (PATHS[0].title) | Implies no waiting — violates File 02 row 3 claims policy; erodes trust with queue-literate patients | Replace in an authorized copy pass with "Walk in with greater clarity" or "Know where you are in the queue" (final wording reviewed at implementation) | Phase B → File 09/11 | **P0** | Owner sign-off on final wording choice | **NOT IMPLEMENTED IN THIS TASK** |
| 2 | **Connection mock label** — example cards ("Dr. Mehta", "Token #14", "Tokens today: 42") lack a visible "Representative preview" label | `Connection.tsx` (cards region; no label present — verified) | Example names/numbers can be mistaken for live data | Add a visible "Representative preview" label to the Connection example cards, matching the ProductReveal pattern | Phase B/D → File 09/11 | **P1** | None (pattern already approved in File 02 §8 row 3) | **NOT IMPLEMENTED IN THIS TASK** |
| 3 | **Brand-sentiment context** — "Aturseva ne hamara saath diya." (footer italic line; Sevika blockquote) lacks explicit context; Sevika thread lacks a visible illustrative label | `Footer.tsx` (philosophy line); `Sevika.tsx` (blockquote + thread) | Readers may mistake brand philosophy for a patient testimonial; Hinglish thread may read as a live chat | Add context: label the Sevika thread "Illustrative Sevika conversation — representative preview"; frame the philosophy line as brand philosophy (or labelled illustrative dialogue) — never as a testimonial | Phase B/D → File 09/11 | **P1** | Owner: confirm philosophy framing preference | **NOT IMPLEMENTED IN THIS TASK** |
| 4 | **CTA behaviour** — role CTAs show an "Early access … opens soon — Team Aturseva will reach out" toast while capturing no data and having no destination | `Paths.tsx` (PathCta component) | Visitors are told the team will reach out — nothing is recorded; implied capture without function | Define genuine destinations first (§18 Open Decision 3); then implement real CTAs or honest in-page navigation; never fake success toasts | Phase A decisions → Phase D → File 09/11 | **P0** | Owner: confirm real contact/onboarding destinations or approve removal | **NOT IMPLEMENTED IN THIS TASK** |
| 5 | **Official tagline alignment** — logo asset embeds "Make healthcare intelligent." while the official tagline is "Care that walks with you." | `Logo.tsx` (`full` variant tagline lettering; used in `Footer.tsx`) | Brand inconsistency between asset and approved tagline | Separate brand-asset task after owner review: asset strategy (tagline-free lockup for generic placements, or updated asset). Do **not** edit the approved logo in the meantime | Phase C → File 08 | **P1** | Owner: asset strategy decision | **NOT IMPLEMENTED IN THIS TASK** |
| 6 | **Human-first cinematic imagery** — hero/sections are typography + abstract SVG only | `Hero.tsx` and section components (no photographic assets) | The brand's cinematic human-first ambition is under-realised visually | Plan authentic or properly licensed healthcare imagery/video with real human moments first, monochrome workflow graphics as support | Phase C → Files 05/08 | **P2** | Owner: imagery direction, sourcing, licensing | **NOT IMPLEMENTED IN THIS TASK** (no images sourced/created) |
| 7 | **Copyright year** — footer uses fixed "© 2025" | `Footer.tsx` ("© 2025 Aturseva. Care, coordinated.") | Stale year reads as neglect | Dynamic current year (or corrected static year) in an authorized implementation pass | Phase B/D → File 11 | **P2** | None | **NOT IMPLEMENTED IN THIS TASK** |
| 8 | **Tagline documentation consistency** — File 03 still lists "Care that walks with you." as a candidate and records the tagline as an open decision | `docs/03_BRAND_MISSION_AND_POSITIONING.md` §14/§16 | Future agents may treat the approved tagline as unresolved | Reconcile File 03 in a later consolidated documentation pass to reflect the owner-approved tagline; File 03 is **not** edited in this task | Phase B (docs pass) | **P2** | Owner review of File 03 revisions | **NOT IMPLEMENTED IN THIS TASK** |

**Batching for future implementation:** Batch 1 (copy truthfulness — items 1, 2, 3, 7) as one authorized pass with shared QA; Batch 2 (CTA/destinations — item 4) gated on Phase A decisions; Batch 3 (brand assets — item 5) separate; Batch 4 (visual direction — item 6) with Files 05/08; Batch 5 (docs reconciliation — item 8) as a documentation-only pass.

---

## 17. Phasing, acceptance criteria and ownership

**Phases (planning; none complete except the source audit inside this document):**

- **Phase A — Sitemap/navigation/CTA destination decisions.** Owner confirms: role-page set, genuine CTA destinations (or their deliberate absence), nav label wording direction. Input: this file (§6, §7, §10, §18). Output: confirmed decisions recorded in the next documentation pass.
- **Phase B — Copy/content corrections and brand wording alignment.** Implements Batch 1 (zero-wait copy, representative-preview labels, brand-sentiment context, copyright year) and the File 03 tagline reconciliation (Batch 5). Maps to roadmap files: informed by **File 09 (Page Specifications)** as it matures.
- **Phase C — Design/asset direction.** Monochrome design system refinement, cinematic human-first imagery plan, logo/tagline asset strategy. Maps to **File 05 (Design System)** and **File 08 (Product Visuals & Asset Plan)**.
- **Phase D — Grouped implementation and regression QA.** Route building (`/doctors`, `/hospitals`), nav/footer updates, CTA replacements — implemented in batches with regression QA. Maps to **File 06 (Homepage Storyboard)**, **File 07 (Motion)**, **File 09 (Page Specifications)**, **File 11 (Incremental Implementation Plan)**, **File 12 (QA/SEO/Performance)**.
- **Phase E — Deployment verification and handover.** Post-implementation deploy checks, SEO verification, final handover. Maps to **File 10 (Architecture)** and **File 13 (Deployment/Handover)**.

Future roadmap files referenced above (05–13) do not exist yet; naming them here plans their scope, it does not create them.

**Acceptance criteria (measurable; apply to every future phase):**

1. **Navigation:** every nav/footer item resolves to an existing anchor or route; no link 404s or points to an empty section; mobile menu opens/closes with keyboard and correct ARIA state; active-section indication works without motion for reduced-motion users (when implemented).
2. **CTA honesty:** every CTA in §10's matrix either (a) navigates to a real, confirmed destination, or (b) is honest in-page navigation, or (c) does not exist. Zero capture-implying toasts without function. Zero invented URLs.
3. **Accessibility:** skip link works; visible focus on all interactive elements; one `<h1>` per page and ordered headings; descriptive link texts; contrast within the monochrome system passes review; touch targets ≥44px on mobile; reduced-motion honoured by every animation added.
4. **Copy guardrails:** no prohibited phrases (zero-wait, guarantees, "never miss a dose", replacement framing, statistics, testimonials, pricing, compliance claims, partner names); Hinglish only inside labelled illustrative Sevika contexts; checked against File 02 §9–§10 and this file's §14.
5. **Mobile behaviour:** layouts verified at small widths; sticky footer intact; no horizontal overflow; Connection's mobile autoplay pattern preserved or consciously redesigned.
6. **Mobile/desktop regression:** each implementation batch QA'd at 390px and desktop widths before deploy, per File 12's future criteria.

---

## 18. Open decisions, assumptions and completion checklist

**Genuinely open decisions for the owner (and only these):**

1. **Sevika Hinglish example placement.** Remain on the homepage Sevika section, or move to a dedicated patient/Sevika page? (Drives whether `/patients` or `/sevika` is built — §6 Phase 2.)
2. **Multilingual scope of future Sevika examples.** Hinglish-only, or additional languages?
3. **Real destinations for role CTAs / get-started / contact.** Confirm actual doctor onboarding/login, hospital/clinic contact process, patient app availability — or explicitly confirm "no destination yet", in which case role CTAs stay informational/honest in-page navigation (never fake capture).
4. **Legal/policy page content.** Supply (or explicitly schedule) real privacy/terms content; approve an accessibility statement's content if desired. Until then, no policy routes are built.

**The official tagline is not listed as open — it is approved ("Care that walks with you.").**

**Assumptions carried in this document:** static hosting with no backend remains the constraint; the GitHub Pages basePath persists until the owner changes hosting; the monochrome palette and English-copy rules stay in force; File 02 remains the capability source of truth.

**Completion checklist:**

- [x] File 02 claims boundaries preserved — no capability, statistic, partner, testimonial, pricing, compliance or integration claim introduced anywhere in this document.
- [x] Official tagline decision incorporated — "Care that walks with you." recorded as owner-approved and canonical (not a candidate, not unresolved), with the logo-asset mismatch deferred to a separate future task.
- [x] Sitemap distinguishes current / proposed / unconfirmed routes — every existing item marked "verified in source"; nothing proposed is claimed to exist.
- [x] All CTAs mapped without invented destinations — complete 18-row matrix in §10; unconfirmed destinations marked and gated on owner decisions.
- [x] Eight known implementation issues consolidated into one prioritised backlog (§16) with evidence, impact, resolution, phase, priority, dependencies, and "NOT IMPLEMENTED IN THIS TASK" status — grouped into batches for future one-pass implementation.
- [x] No code, assets, File 02, File 03, worklog, or product workspace (`/home/z/my-project/`) modified; no live-site content changed by this task.
- [x] Exactly one file created/changed by this task: `docs/04_SITEMAP_AND_NAVIGATION.md`.

---

**End of File 04.**
