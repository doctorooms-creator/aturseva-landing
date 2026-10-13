# Aturseva — File 15: Product-UI-First Landing Redesign ("The Page Is The Demo")

**Status:** `PLANNING — NOT IMPLEMENTED`
**Created:** 2026-10-14 IST (working session; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `9f8c21c` (File 14 merge point). Live site verified 200 with canonical tagline this session.
**Planning dependencies:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (claims policy — all simulated UI must reflect real capability), `docs/03_BRAND_MISSION_AND_POSITIONING.md` (Sevika role), `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md` (**mandatory design baseline — graphite/paper tokens, Fraunces/Manrope, monochrome constraint — unchanged by this file**), `docs/06_HOMEPAGE_STORYBOARD.md` (frame IDs), `docs/07_MOTION_AND_SCROLL_ANIMATION.md` (M-* motion constraints, B12), `docs/08_VISUAL_ASSET_PLAN.md` (§9 route matrix; Route 4 archived this session), `docs/12_QA_SEO_AND_PERFORMANCE_PLAN.md` (T-* conventions, §15 measured baseline), `docs/13_DEPLOYMENT_AND_HANDOVER_PLAN.md` (§10 decision recording), `docs/14_3D_HERO_AND_IMG2THREEJS_PLAN.md` (**ARCHIVED this session — superseded by this file**).
**Scope:** a complete redesign plan for the landing page's **communication strategy** — moving from abstract narrative typography to **product-UI-first demonstration**, following the pattern verified live this session on launchfar.com, antigravity.google and stitch.withgoogle.com. **Nothing in this document modifies any source file. Development has NOT started (owner instruction, 2026-10-14).**
**Owner decision boundaries:** the owner rejected the File 14 diya-3D direction (recorded §1) and demanded a solid, instantly-communicative landing ("website pe jate hi pta chal jata hai ki company kya krti hai animations and ui ke through"), citing the three references. This file is the response. Full implementation remains gated on the owner approving this direction + the batch plan (§12); **no code is written by this document.**

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-14 | Initial creation; 14 sections; three reference sites deep-scrolled and VLM-analyzed; product UI grounded against real QA screenshots; File 14 archived | File 15 planning task |

---

## 1. Owner decision record (File 13 §10 convention)

1. **2026-10-14:** *"Look ye diya wala mujhe sahi nai laga... ye aek real product ke liye landing page design ho rha hai... antigravity dekho ya such dekho website pe jate hi pta chal jata hai ki company kta krti hai animations and ui ke through... landing page scroll krke dekho https://launchfar.com/ dekho deep down jao and kuch solid krna hoga do not start development"* —
   (a) **File 14's 3D diya hero direction is REJECTED** by the owner (decorative metaphor ≠ product communication);
   (b) the landing must **instantly communicate what the company does, through UI and animation** (Antigravity/Stitch/LaunchFar cited);
   (c) launchfar.com was studied deep-scrolled (8 viewport screenshots, full 6880 px journey);
   (d) **a solid plan is required — development must NOT start.**

**Resulting state:** File 14 → `ARCHIVED — OWNER REJECTED DIRECTION`; img2threejs skill retained as an available (currently unused) tool; this file is the new plan of record for the landing's communication redesign.

## 2. Reference research — what was actually verified (2026-10-14)

Live deep-scroll with agent-browser (1440×900) + VLM analysis; evidence screenshots in `/home/z/research-inspiration/` (session artifacts, not committed):

| Site | Verified finding (from actual scroll journey) |
|---|---|
| **launchfar.com** (6880 px, 8 viewports) | Hero = particle-head metaphor + serif/italic-split headline; then **"UI as content"**: memory ticker pills, mentor chat window with technical Q&A + roadmap-update toast, numbered 01/02/03 process rail, course cards with metadata chips, then a **6-card numbered system (01/06…06/06)** each card being a **simulated product UI** (chat with ONLINE status, kanban roadmap with TO DO/IN PROGRESS/DONE, live code editor with terminal output, flashcards with wrong-4-days-ago counter, curated feed, community board). Borders-over-shadows wireframe aesthetic; one accent color; final CTA "Stop watching tutorials. Launch far." |
| **antigravity.google** (10009 px) | Hero = particle field + one-line value prop; then immediate high-fidelity **IDE mockups**: agent input with `@` mentions and `/` actions, model selector showing real model names, worktree/Git menus, toolbelt icon rail; vision→utility rhythm alternating abstract brand moments with concrete UI proof; glassmorphism + radial gradients. |
| **stitch.withgoogle.com** | **The hero IS the product**: the actual generation input box (App/Web toggles, fidelity dropdown, regenerate, send) + 3 suggestion chips, on a dot-grid blueprint background. Zero ambiguity about what the product does within 2 seconds. |

**Common pattern (the "solid" thing):** none of these pages rely on abstract metaphors alone — they **show the product's real interface as the primary content**, simulated with enough fidelity that the visitor understands the product's mechanics by scrolling. Every claim is proven by a UI fragment.

**Product grounding (our side):** real product QA screenshots VLM-analyzed (`qa-p1-obg-wizard.png` — 8-step prescription stepper with English+Hindi complaint chips; `qa-pack-05-medicines.png` — medicine card grid with dosage/frequency chips; `qa-p4d-1-form-filled.png` — booking modal with ₹ consultation fee). The simulated UI we will build is **derived from these real screens** — honest by construction (File 02 claims policy).

## 3. Honest diagnosis — why the current page fails the owner's test

The live page is a polished narrative-typography piece (verified: B15 fonts, 38 ScrollTriggers, all batches green). But its content vocabulary is **abstract**: promise headline, ECG line, connection lanes, journey cards, token table, stats. A first-time visitor learns the *feeling* ("calm, trustworthy care") but **not the *fact***: that Doctorooms/Aturseva is software a doctor runs their clinic on — prescriptions in a guided 8-step wizard, a live patient queue, lab reports, billing, an AI companion that follows up. The tagline is narrated but never *demonstrated*. That is precisely the gap the owner identified against the three references.

## 4. Core concept — "The page is the demo"

One sentence: **the landing page becomes a scroll-driven demonstration of the product itself** — every section pairs one claim with one simulated product-UI moment, in the existing monochrome graphite/paper design system. The visitor should be able to say, after one scroll: *"this is software for doctors — it writes prescriptions, runs the queue, follows up with patients, prints everything."*

Design law (unchanged): File 05 monochrome system, Fraunces + Manrope, existing tokens, B12 reduced-motion contract, honest copy. The references' *structure* is adopted; their *palettes and type* are not (LaunchFar midnight-gold and Antigravity glassmorphism stay out; our graphite/paper already plays the same "one dark stage + one light stage + restraint" game).

## 5. Section-by-section redesign map (frame IDs per File 06)

| # | Section (existing frame) | Becomes | Simulated product-UI moment (all derived from real product screens) |
|---|---|---|---|
| 1 | **Hero (H)** | Value-prop headline + **"prescription being written"** signature visual | A graphite prescription card assembles itself in sync with the headline: complaint chips appear (bilingual, e.g. "Irregular periods · गर्भावस्था" only if truthful to sample data), the 8-step stepper advances Complaints→Vitals→Medicines, medicine rows slide in with dosage chips. Optional Antigravity-style **Canvas-2D particle field** behind (monochrome, ~2 KB code, DPR-clamped — no 3D dependency). One-line subhead states plainly what the product is. |
| 2 | **Narrative → Product moment 1 (J/P)** | "Write the prescription, not the paperwork" | Full 8-step stepper mockup animating step-to-step (pin the panel while steps advance on scroll — Antigravity's pinned-video pattern); chips, autocomplete-style medicine row with frequency chips. |
| 3 | **Connection (C)** | "The queue that runs itself" | **Live token queue simulation**: token cards (A-17 Priya · Waiting → In consult → Done), status pills flipping, a timestamp ticking, the "now serving" counter incrementing. The calm-queue story told in UI instead of lanes. |
| 4 | **Journeys (R)** | "Sevika walks with every patient" — **the tagline, demonstrated** | A phone-frame chat: patient message in, Sevika reply out, an adherence nudge card ("Medicine reminder · 8:00 PM"), a gentle follow-up ("Aap theek hain?"). Typewriter/stagger reveal. This is the emotional core — the one place a human voice appears. |
| 5 | **ProductReveal (S)** | "Six surfaces, one clinic" — LaunchFar's 6-card numbered system | Bento grid, cards **01/06…06/06**: Prescription wizard · Live queue · Labs & reports · Billing & print · Sevika follow-ups · Specialty packs (28). Each card = mini simulated UI with a status tag (`QUEUE LIVE`, `FOLLOW-UP ON`, `PACK 28`) — the "ALWAYS ON" pattern translated to our truth. |
| 6 | **Print moment (new, small)** | "Paper when you need it" | Rx paper preview (print-view mockup, monochrome) sliding out of the wizard card. |
| 7 | **Proof/Footer (F)** | Existing quiet close + honest stats | Unchanged in spirit; stats already honest (File 11 Batch 1). |

## 6. Animation choreography (File 07 M-* extension, B12-safe)

1. **Pinned stepper advance** (section 2): panel pins, steps advance on scroll position — the "vision→utility" rhythm from Antigravity. Reduced-motion: final state, static.
2. **Status-flip ticker** (section 3): GSAP timeline flips 3 statuses + increments the counter once per scroll-through. Reduced-motion: final calm state.
3. **Chat stagger + typewriter** (section 4): bubbles stagger-in; Sevika's line types out once. Reduced-motion: full conversation visible, static.
4. **Bento stagger** (section 5): 6 cards stagger 80 ms apart (LaunchFar pattern). Reduced-motion: all visible.
5. **Hero assembly** (section 1): chips/rows sync with existing headline reveal — extends the current timeline; single-boot guard intact.
6. All 38 existing ScrollTriggers preserved or consciously migrated; T-MOT-05 single-boot remains the regression gate.

## 7. Honesty rules for simulated UI (File 02 binding)

- Every simulated fragment reflects a **real, shipping capability** (grounded against product QA screenshots — §2).
- Bilingual sample data allowed (the product is English+Hindi); **no fabricated patient names beyond generic sample names**, no fake stats, no invented integrations.
- The mockups are *simulations* (not screenshots): this is standard marketing practice and matches the references; nothing claims "live data" — status tags say what the *product* does (`QUEUE LIVE` describes the product feature, not our page).
- Patient Sevika conversation: pre-written sample dialogue consistent with product copy conventions (File 03 tone-of-voice; Hinglish contained per Sevika brand rules).

## 8. What is NOT adopted from the references

LaunchFar's gold accent + script italic (our accent stays graphite/ivory; Fraunces italic already provides the "human" voice) · Antigravity's glassmorphism/radial gradients (flat paper/graphite surfaces stay) · Stitch's interactive input hero (no live generation to embed — the prescription assembly is our equivalent) · particle 3D head (File 14 archived; Canvas-2D field is the only optional particle accent) · any hero video (Route 3 still owner-gated, untouched).

## 9. Architecture & performance guardrails

- **Zero new dependencies** for the core: simulated UI = HTML/CSS (existing tokens) + GSAP (already shipped). Particle field (optional) = plain Canvas 2D, no library, DPR-clamped, paused offscreen/hidden — governed by the File 14 §12 budget rules where applicable.
- LCP element remains the h1 (simulations mount as static DOM, no images, no fonts added). CLS 0.0 (fixed-height mockup boxes). Page-weight target: ≤ +25 KB gz vs the 321 KB baseline; hard review at +40 KB.
- Static-export + basePath compatibility unchanged (pure client DOM/CSS/GSAP). B15 font gate regression stays in every batch's QA.

## 10. QA additions (File 12 conventions — T-UI-* family reserved)

T-UI-01 simulated-UI truthfulness review (each mockup vs its grounding screenshot, VLM 4/4) · T-UI-02 reduced-motion static finale across all new sections · T-UI-03 hero assembly does not touch LCP/CLS budgets · T-UI-04 pinned-stepper scroll math correct at 1440/390 + no horizontal overflow · T-UI-05 status-flip/chat timelines fire once per pass (no re-trigger thrash) · T-UI-06 console/page errors 0 across desktop/mobile · T-UI-07 single-boot guard intact (T-MOT-05) · T-UI-08 monochrome-token sweep on all new components (zero raw hex — B9 doctrine) · T-UI-09 mobile 390: every mockup legible, no overflow · T-UI-10 live Pages parity post-deploy.

## 11. Batching (each: commit → push → Actions → live verify — the owner's standing rule)

| Batch | Content | Site-visible |
|---|---|---|
| **R1 — Hero + section 2** | Hero prescription-assembly visual + pinned 8-step stepper section (+ optional particle field, decided in-batch by budget) | Yes (first visible slice) |
| **R2 — Queue + Sevika** | Status-flip queue simulation + Sevika chat moment | Yes |
| **R3 — Bento six + print + close** | 01/06…06/06 grid, Rx paper moment, stats/footer alignment | Yes |
| **R4 — Narrative reconciliation** | Retire/merge superseded abstract sections; final scroll-story pass; copy tightening | Yes |
| **R5 — QA-evidence + measured record** | Full T-UI-* + regression suite, VLM truthfulness pass, File 12 §15-style measured addendum | No (evidence) |

Order rationale: the earliest batches deliver the owner's core demand (instant comprehension) first; R4 only after the new vocabulary proves out. **Owner approval of this plan (§12) is the gate before R1 starts.**

## 12. Open owner decisions

1. **Approve this direction** ("the page is the demo") → unlocks Batch R1.
2. Hero particle field: **yes/no** (default: no — pure typographic+UI hero; field is opt-in accent).
3. Sevika chat Hinglish level (default: light, matching File 03 Sevika voice).
4. Whether File 06/07 storyboard docs get full reconciliation rewrites (default: labeled addenda, as established).

## 13. Risks

| Risk | Mitigation |
|---|---|
| Mockups drift from real product UI | T-UI-01 grounding review per mockup; screenshots archived as reference |
| Page weight creep from many mockup components | §9 budget gates per batch; bento cards share one component system |
| Animation complexity vs B12 | Every choreography has a static final state; T-UI-02 |
| Narrative voice lost (page becomes a feature list) | Sevika section carries the emotional arc; R4 reconciliation pass; File 03 narrative arc remains the spine |
| Reduced-motion/mobile fidelity | Existing gates (B12, 390 px) in every batch |

## 14. Definition of done

All batches R1–R5 executed with the standing cadence; T-UI-01…10 + all standing regressions green (B15, B12, T-MOT-05, mobile, console, perf budget §9); a first-time-visitor test (VLM as cold reader: "what does this company do?" — must answer correctly from hero + one scroll); measured perf record appended; owner sign-off recorded per File 13 §10.

---
*Planning artifact only. No source modified. Development starts only on the owner's approval of this direction (§12).*
