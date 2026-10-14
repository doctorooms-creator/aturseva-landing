# Aturseva — File 18: "The Character IS The Brand" — Integrated Landing Implementation Plan

**Status:** `PLAN OF RECORD — AWAITING OWNER "GO" FOR EXECUTION`
**Created:** 2026-10-14 IST (working session; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `716d2de` (File 17 §6A merge point).
**Planning dependencies:** `docs/15_PRODUCT_UI_FIRST_LANDING_REDESIGN_PLAN.md` (design vehicle — product-UI-first, reference decode §3), `docs/16_SEVIKA_FIRST_POSITIONING_AND_USE_CASES.md` (narrative spine — one key point; use-case catalogue §4 with product evidence), `docs/17_AI_CHARACTER_NAMING_AND_DESIGN.md` (personality blueprint §5; owner-endorsed Living State Orb §6/§6A; single-name rule), `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md` (monochrome lock, tokens, B12), `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (§4 claims boundary — every UI moment must map to a verified capability), `docs/07_MOTION_AND_SCROLL_ANIMATION.md` (M-* constraints), `docs/12_QA_SEO_AND_PERFORMANCE_PLAN.md` (T-* conventions; §15 perf baselines), `docs/14_3D_HERO_AND_IMG2THREEJS_PLAN.md` (ARCHIVED direction; T-3D QA catalogue lane reusable).
**Scope:** the complete, executable implementation plan for the Aturseva landing after the owner locked the character name to **Aturseva** itself. Merges File 15 (vehicle) + File 16 (spine) + File 17 (character/orb) into one build plan. **Development has NOT started — this file is the plan the owner asked for ("ab tm plan design kro"). Execution begins on the owner's explicit go.**
**Owner decision boundaries:** name decision recorded §1. Antigravity/Stitch reference understanding re-confirmed by the owner ("ye yad rakhna antigravity and stich wala samj aya?") — decoded §2 and applied throughout. Product-repo changes (Sevika → Aturseva rename) are planned here as Batch P1 but execute only under the owner's product-side go.

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-14 | File created: name lock (character = Aturseva, Alexa pattern); reference decode applied; hero + 6-beat architecture; orb spec; batches N1–N4 + P1; QA catalogue | Working session, post-File-17 |

---

## 1. Owner decision record — the name is ATURSEVA

The owner (2026-10-14, session record): **"Name atur seva hi rakhte hai"** — the AI character keeps the brand's own name. The bot formerly shipped as "Sevika" is now **Aturseva**.

**What this pattern is (and why it is the strongest possible answer to the two-name problem):**
- This is the **Alexa / Siri pattern**: the assistant carries the company's name. Amazon never needed a second name for Alexa's "body" — and we need zero new names now: **brand = character = campaign = app store listing = notification sender.** File 17 §6A's single-name rule is satisfied at the deepest level — there is literally only ONE name in the system.
- Tagline lock intact: *"Care that walks with you."* — Aturseva (the brand) promised it; Aturseva (the character) now performs it. Name and promise explain each other (the Aarogya-Setu lock, self-granted).
- Campaign line writes itself from File 16's USP: *"Meri baari ka pata sirf Aturseva ko hai."*

**Honest trade-off (recorded, accepted):** Aturseva is 4 syllables (A-tur-se-va) vs the 2–3 syllable ideal of File 17 §2 filter #1 for notification bubbles. Amazon's Alexa (3 syllables) and Apple's Siri (2) show the pattern tolerates length; the brand-unity gain outweighs bubble brevity. Any future shortening (e.g. users coining "Atur") is a natural-language artefact, NOT a brand asset — official materials never abbreviate (single-name rule, File 17 §6A).

**TM/asset note:** no NEW character-name search is required (the name is the existing brand, already selected through the NAMING-1…5 lineage with 🟢 clean flags; attorney confirmation for Class 9/42 was a carried-forward recommendation of the original brand pick and remains the only open diligence item).

**Downstream closures:** File 17 §7 step 1 = DONE (name picked). File 16's provisional "[Character] ka din" = **"Aturseva ka din"** (definitive). File 13 §10 item 8 records the lock. Product rename (Sevika → Aturseva) = Batch P1 (§7).

## 2. Reference decode — what the owner means by "Antigravity and Stitch wala" (confirmed)

From File 15's live research (§3 of that file; re-verified this session's intent):

| Reference | The pattern | What we take | What we DON'T take |
|---|---|---|---|
| **stitch.withgoogle.com** | **The hero IS the product**: the actual generation input box + 3 suggestion chips — zero ambiguity within 2 seconds | Hero = a working-feeling **Aturseva conversation**: the orb + chat thread + 3 tappable suggestion chips ("Meri baari kab hai?" etc.) — canned honest replies, orb reacts (§4.1) | Their dot-grid + blueprint styling (ours: ink-950 stage, ink-800 dot grid, monochrome only) |
| **antigravity.google** | **The agent is the protagonist of the interface**: UI celebrates what the agent is doing (`@` mentions, model selector, worktrees); vision→utility rhythm (brand moment ↔ concrete UI proof) | Every section shows Aturseva **acting** (setting the reminder, parsing the Rx photo, decrementing the queue); sections alternate quiet typographic beats with dense UI-proof beats; pinned panels advance on scroll | Glassmorphism-with-color, radial gradients, particle noise (ours: existing `.glass` white/5+blur on dark — already B-approved) |
| **launchfar.com** | **"UI as content"**: 6-card numbered system (01/06…06/06), each card a simulated product UI with status tags | The 8 use-case catalogue compresses to a **6-card bento** with numbered badges + status tags (`QUEUE LIVE`, `FOLLOW-UP ON`) | Midnight-gold palette, serif/italic-split headline styling |

**The one-line law this plan follows:** *the landing does not DESCRIBE Aturseva — it LETS HER WORK in front of you.* (Stitch's input-box honesty + Antigravity's agent-as-protagonist + LaunchFar's cards-as-product.)

## 3. Design-system compliance (unchanged, binding)

- **Monochrome lock (File 05 §4):** ink/brand/gold(ivory-legacy) grey scales only; orb = graphite `#101113`–`#34383a` body + paper-50 rim; no color, no sepia, no blue.
- **Type:** Fraunces/Manrope + B15 font gate (self-contained fonts, basePath URLs).
- **Motion:** B12 reduced-motion contract (static finale states); GSAP remains the page engine; orb loops are GSAP-driven or CSS (not physics); ScrollTrigger budget re-checked at N3.
- **Honesty (File 02):** every simulated UI moment maps to a §4-verified capability of File 16 (8 use cases, product-evidenced); no real patient data, no fake counts implying live systems; Hinglish contained to character-voice examples only (File 02 §4.4).
- **Identity honesty:** the character is presented as an AI assistant (no human pretense — File 02 §4.3, File 08 §5).

## 4. Landing architecture — "Aturseva ka din" (the page is her workday)

### 4.1 HERO — "the conversation is the product" (Stitch pattern)

Layout (desktop): left = value-prop stack; right = **Aturseva at work**. Mobile: stacked, conversation first.

**Right cluster (the signature element):**
1. **The orb** (owner-endorsed Living State Orb, File 17 §6): graphite body, paper rim-light, **live core showing `#12`** (queue token). Idle = breathing.
2. **The chat thread** (frosted `.glass` panel, monochrome): a short conversation replay:
   - User bubble: "Meri baari kab hai?"
   - **Aturseva**: "Token #12. Teen log bache — taqreeban 15 minute. Clinic nikal jao." *(orb: alert hop + core flashes 12)*
3. **3 suggestion chips** (Stitch pattern): "Aaj ki dawai?" · "Diet plan yaad dilao" · "Prescription ka photo bhejo" — tap → Aturseva replies with the corresponding canned, product-true answer (from File 16 §4 claim shapes; File 02-gated wording). Each tap drives an orb state change (speaking ripples → alert).
4. Subtle caption line: "Aturseva ke saath — care that walks with you." (tagline lock, §1).

**Left stack:** H1 (Fraunces): the one-promise headline; one-line plain statement of what the product is (Antigravity's "state it plainly" law); primary CTA (existing button system, 44px+).

**5-second comprehension test (the owner's original demand):** orb + `#12` + one chip tap = you know exactly what this company does. This is the hero's Definition of Done.

### 4.2 THE DAY — six beats, dark/light alternation preserved (File 05 §5)

Each beat = one pinned or scrolling product-UI moment (File 15 vehicle) + Aturseva acting inside it (Antigravity's agent-as-protagonist). Order = File 16 §8 spine, now definitive:

| # | Beat (section rhythm) | Aturseva's action (UI shown) | Use-case anchor (File 16 §4) |
|---|---|---|---|
| 1 | **Subah** (ivory stage) | Dose timeline assembles; reminder bubble "9 baje — Doctor-approved schedule se"; adherence chips (Le li ✓ / Yaad dilaya) | #1 Reminder + #2 Yaad-dilane wali |
| 2 | **Rx photo** (ink stage) | Photo drops in → VLM draft rows slide out marked DRAFT → "Confirm karo" button (confirm-first rail made visible) | #3 Rx-photo wali |
| 3 | **Booking** (ivory stage) | Chat: doctor selection → slot chips → booked card — "Aturseva ne book kar diya" | #5 Booking wali |
| 4 | **Baari** (ink stage) — **the hero beat** | Pinned panel (Antigravity pin pattern): token number decrements 12→8→3 with people-ahead chips; then the alert: "Baari! Ab niklo." Orb-side: alert hop state mirrors it | #4 Queue wali ⭐ |
| 5 | **Clinic + shaam** (ivory stage) | QR check-in moment (kiosk capability as journey step, not hero) → evening diet nudge card, "Doctor ne diet batayi — Aturseva roz yaad rakhegi" | #6 Diet + queue/kiosk-as-verbs |
| 6 | **Boundary + Side B** (ink stage) | The honest beat: "Dose doctor badalega. Main yaad rakhungi." — then the doctor's screen mirroring adherence (loop closes) | §3 trust boundary + #8 Doctor ki |

### 4.3 PATHS / CTA (unchanged truth, reframed)

File 04 routes intact; CTA framing: **"Aturseva ke saath shuru karein"** (patient / doctor / hospital cards unchanged in function).

### 4.4 BENTO (LaunchFar pattern) — folded into the day

The 6-card numbered bento (01/06…06/06 with status tags) from File 15 §5 folds into beats 1–6 as their compact summary rail (one card per beat, numbered) — avoiding a separate seventh section and preserving the page's tight rhythm.

## 5. The orb — final spec (owner-endorsed; File 17 §6 carried forward)

- **Form:** faceless monochrome orb; graphite body (`ink-900`–`ink-600` gradient in greys), paper-50 rim light; core = live state display (token number / dose countdown / pulse line).
- **States:** idle breathe (scale 1.00→1.03, 4s) · listening tilt + rim brighten · speaking concentric ripples · **alert hop + core flash** · night dim (40%, 8s breathe) — all GSAP/CSS keyframes, reduced-motion → static finale pose per state.
- **Placement:** hero (primary, ~320–420px render size), chat launcher avatar (48px), notification toasts (32px), loading states (24px shimmer).
- **Tech lane:** three.js via R3F, single canvas in hero only; orb instances elsewhere = CSS/SVG derived from the same token values (no extra WebGL contexts); DPR-clamped; `prefers-reduced-motion` honored at the rAF level. T-3D QA catalogue from File 14's reusable lane.
- **File 08 gates:** procedural/code-only — no photo/mesh asset enters the repo; imagery gates not triggered. Design = owner-endorsed (File 17 §6A).

## 6. Voice & copy system (the character now named)

- Register: warm-witty Hinglish (File 17 §5), contained to character lines; page prose stays English (File 02 §4.4).
- Greeting (hero chat + product chat, replacing "Main Sevika hoon"): **"Namaste! Main Aturseva hoon. Dawai, token, diet — poochho."**
- Boundary lines (binding, §3): "Ye doctor ne bataya hai. Main bas pahuncha rahi hoon." / "Main nurse hoon, bhagwan nahi — dose doctor badalega, main yaad rakhungi."
- All copy passes the File 02 §4 wording audit before ship; no availability claims beyond verified reality.

## 7. Implementation batches (execution begins on owner "GO")

| Batch | Scope | Repo | Gate |
|---|---|---|---|
| **N1 — Orb + Hero** | orb component (flag-gated), hero conversation cluster (chat replay + chips + orb states), dot-grid backdrop, headline restack | landing | Owner go (this file's approval) |
| **N2 — Day beats** | 6 beats + bento rail + boundary beat + CTA reframe; pinned queue panel; GSAP choreography per File 07/B12 | landing | N1 accepted on :3005/:3006 |
| **N3 — QA + perf** | T-UI (File 15) + T-3D (File 14 lane) + monochrome/font/contrast gates + perf re-measure vs File 12 §15 (LCP < 1s lab, CLS 0, 60fps) + mobile 320/390 + axe | landing | All green |
| **N4 — Ship** | build, deploy Pages, live verification, evidence, worklog | landing | N3 green |
| **P1 — Product rename** | Sevika → Aturseva across product: routes (`dashboard/*/sevika/*` → `aturseva/*` with redirects), chat copy, page titles, doctor-side adherence page, notification sender label | product (`/home/z/my-project`) | **Separate owner go for product repo** |

**Ordering note:** N1–N4 can proceed before P1 (the landing speaks of "Aturseva" as brand+character already — true at brand level today; the product's internal "Sevika" label is invisible to the landing). P1 timing is the owner's call; recommend before public campaign, not before landing ship.

## 8. QA catalogue (N3 execution sheet)

T-UI-01…10 (File 15 §QA) + T-3D-01…13 (File 14 reusable lane: canvas budget, reduced-motion, DPR, context count) + re-runs: B15 font gate, B12 reduced-motion, B18 shell, mobile 320/390 overflow, touch targets ≥44px, axe contrast (no new pairs below recorded minima without §23 Q1 disposition), canonical/robots/sitemap intact, console/page-error zero. Evidence per convention (qa/ series screenshots).

## 9. Risks

| ID | Risk | Guard |
|---|---|---|
| R1 | Hero interactive demo read as "real Aturseva answering" (over-promise) | Chips clearly replay canned product-true answers; no free-text input on landing (that's the app's job) — stitches honesty |
| R2 | Orb + chat cluster pushes hero weight/CLS | LCP element = text stack (orb lazy-mounts after first paint); CLS budget 0; File 12 §15 re-measured at N3 |
| R3 | Name length in small bubbles (4 syllables) | Accepted trade-off §1; bubbles use icon+name; no abbreviation ever (single-name rule) |
| R4 | Product/landing name mismatch window (landing says Aturseva, product chat says Sevika) | Mismatch is internal-label only; P1 scheduled before any campaign; disclosure recorded here |
| R5 | Beat density → page bloat vs File 12 budgets | Bento rail doubles as summary (no 7th section); images remain zero (all UI is code); gzip budget re-checked at N3 |

## 10. Non-goals (this file)

- No source/style/asset/config change in this commit (docs-only, zero rendering delta).
- No product-repo modification (P1 is planned, not executed).
- No free-text chatbot on the landing (app owns real conversation).
- No new photography/imagery (File 08 gates unchanged; orb is code-only).

## 11. Definition of done (whole program)

1. N1–N4 shipped: landing = hero conversation + 6 beats + bento rail, orb live in monochrome, all QA gates green, deployed + live-verified. 2. P1 shipped: product says Aturseva everywhere (redirects green, chat greeting updated). 3. Docs closed: File 02 §4 rows renamed, File 16 spine retitled, File 13 §10 items closed with dates. 4. Worklog + evidence complete. 5. Owner accepts the 5-second comprehension test on live.
