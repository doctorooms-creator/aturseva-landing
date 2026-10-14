# Aturseva — File 19: Phase-Wise Master Implementation Plan

**Status:** `PLAN OF RECORD — EXECUTES PHASE BY PHASE ON OWNER GO`
**Created:** 2026-10-14 IST (working session; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `814b9fc`.
**Companion files (the detailed specs this plan orchestrates):** `docs/20_HERO_AND_ORB_INTERACTION_SPEC.md` (hero/orb element-by-element), `docs/21_DAY_BEATS_MOTION_SPEC.md` (beats 1–6 + bento + paths + footer), `docs/22_INTERACTION_MOTION_INVENTORY.md` (master inventory: every animation/interaction/cursor element with ID, trigger, timing, tech, reduced-motion fallback, phase mapping).
**Planning dependencies:** File 18 (architecture + name lock — this file decomposes its N1–N4 into 8 executable phases), File 15 (reference decode), File 16 (use-case anchors), File 17 §6/§6A (owner-endorsed orb), File 05 (monochrome/tokens), File 07 (M-* motion constraints + B12), File 02 (claims honesty).
**Live research this session (agent-browser, antigravity.google, headless):** verified the interaction inventory the owner asked about — cursor-following contextual CTAs ("Play intro" on hero video; "Watch case" ×3 on case cards), hero particle canvas (1280×577) + morphing-particles section, typed rotating headlines (Full stack→Enterprise→Frontend with persistent caret), 22-icon bouncing grid on section entry, `data-scroll-reactive` header, feature-explorer grid + 3 IDE mockups, no GSAP/no tabs/no carousels (custom CSS/JS). Full decode in File 22 §2.
**Scope:** the master phase plan — order, gates, deliverables, acceptance. **Development NOT started. Each phase begins only on owner go ("phase X shuru karo"), ships on its own acceptance gate, and leaves :3005/:3006 + live green at every step.**

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-14 | File created: 8 phases (0–7) decomposing File 18 N1–N4; gates, deliverables, rollback; references Files 20/21/22 | Working session, post-File-18 |

---

## 1. How to use this plan (owner's operating manual)

- **One phase at a time.** Owner says "phase 0 karo" → agent executes → shows result on :3005/:3006 preview → owner accepts → next phase. Any phase can be paused; every phase ends in a green, deployable state.
- **Every element ID** referenced below (M-E-01, I-C-01, O-01…) is fully specified in File 22's master inventory — nothing is hand-waved.
- **Standing rules in every phase:** monochrome lock (File 05 §4), B12 reduced-motion fallbacks, File 02 claim audit for any new copy, GSAP as the engine, `bun run lint` + tsc clean, dev :3005 + preview :3006 verified, commit → push → Pages deploy → live check at phase end (owner's standing git+live rule).
- **The single-name law:** every shipped string says "Aturseva" (File 18 §1). No abbreviation ever.

## 2. Phase map (8 phases)

```
P0 Foundations ──► P1 Hero ──► P2 Beats 1–2 ──► P3 Beats 3–4 ──► P4 Beats 5–6 + rail
 (primitives)      (Stitch)     (Subah+Rx)      (Booking+Baari)   (Clinic+Boundary)
                                                        │
P6 QA+Perf ◄────────────── P5 Global cursor/micro-interaction polish ◄──┘
      │
P7 Ship (deploy + evidence + docs closure)
```

| Phase | Name | Ships (summary) | Spec refs | Gate to pass |
|---|---|---|---|---|
| **0** | Foundations & primitives | Orb component (5 states, reduced-motion), chat-mock primitives (bubble/chip/typing), dot-grid backdrop, cursor-system engine (custom-cursor + magnetic + spotlight utils), typed-text util | F20 §3–§5, F22 I-C-*, M-O-* | All primitives render on a hidden dev route; reduced-motion static; tsc+lint clean |
| **1** | HERO — "the conversation is the product" | Full hero rebuild: orb+chat replay+3 chips (live tap), cursor-follow elements (spotlight dot-grid, magnetic CTA), entrance choreography, scroll-away | F20 all | 5-second comprehension test on :3006; hero perf ≤ baseline+10%; B12/B15 green |
| **2** | Beat 1 Subah + Beat 2 Rx-photo | Dose-timeline assembly, reminder bubble, adherence chips; photo-drop→DRAFT rows→confirm rail; section entrances | F21 §1–§2 | Both beats green on desktop+390; claim audit pass |
| **3** | Beat 3 Booking + Beat 4 BAARI ⭐ | Slot-chip chat→booked card; **pinned token countdown 12→8→3→alert** + orb mirror | F21 §3–§4 | Pin works both directions; reduced-motion = final state; no CLS |
| **4** | Beat 5 Clinic+shaam + Beat 6 Boundary/doctor + bento rail + paths/footer reframe | QR moment, diet nudge, boundary beat, doctor-screen mirror, 01/06…06/06 rail, "Aturseva ke saath shuru karein" | F21 §5–§9 | Full narrative read-through green; single-name audit |
| **5** | Global interaction polish | Cursor system site-wide: contextual labels on cards ("Chhoo ke dekho"), magnetic CTAs everywhere, hover micro-interactions, typed-rotating word in closing headline, scroll-reactive nav refinement | F22 §5–§7 | Interaction inventory 100% implemented or consciously deferred (list) |
| **6** | QA + performance | T-UI + T-3D + monochrome/font/contrast + mobile 320/390 + axe + perf re-measure vs File 12 §15 (LCP <1s lab, CLS 0, 60fps, gzip budget) | F18 §8 | All green; defects fixed |
| **7** | Ship | Pages deploy, live verification, evidence screenshots, docs closure (Files 05/07/12/13 annotations + worklog) | F18 §11 DoD | Owner accepts live 5-second test |

## 3. Phase detail

### Phase 0 — Foundations & primitives (dev-only, flag-gated)
**Deliverables:** (a) `<Orb/>` component: 5 states (idle breathe / listening tilt / speaking ripples / alert hop / night dim) with exact timings from F20 §3; reduced-motion → static pose per state; (b) chat primitives: `Bubble`, `Chip`, `TypingDots`, `VoiceWave` (ripple); (c) `DotGrid` backdrop (ink-800 dots on ink-950, CSS radial mask); (d) cursor engine: `useCustomCursor` (contextual label that follows the mouse within a zone), `useMagnetic` (element drifts toward cursor within radius, spring return), `useSpotlight` (radial highlight follows cursor); (e) `TypedText` util (rotating words with persistent caret, Antigravity pattern); (f) token audit — zero new colors.
**Files:** `src/components/landing/orb/`, `src/components/landing/chat/`, `src/components/landing/fx/`, `src/hooks/` (cursor/magnetic/spotlight/typed).
**Why first:** every later phase consumes these primitives; nothing user-visible changes yet.

### Phase 1 — HERO (Stitch pattern)
**Deliverables:** hero layout swap (flag-gated `NEXT_PUBLIC_HERO_V2`): left value-prop stack (H1 + plain one-liner + CTA) / right Aturseva-at-work cluster (orb with live `#12` core + glass chat replay + 3 tappable chips with canned product-true replies + orb state changes on tap). Cursor layer: dot-grid spotlight (I-C-03), magnetic primary CTA (I-C-04), orb listening-tilt toward cursor (I-C-05). Entrance choreography M-E-01…06 (F20 §6). Scroll-away M-P-01 (parallax fade, no CLS).
**Gate:** the owner's 5-second test on :3006 + perf budget + B12/B15.

### Phase 2 — Beats 1–2
Beat 1 Subah (ivory): dose timeline rows assemble on entry (M-E-10), reminder bubble pops (M-L-10), adherence chips flip (I-H-10). Beat 2 Rx-photo (ink): photo card drops (M-E-20), VLM DRAFT rows slide (M-E-21), confirm rail highlights (I-H-20). Full specs F21 §1–§2.

### Phase 3 — Beats 3–4
Beat 3 Booking (ivory): chat slot-chips (I-T-30), booked card stamp (M-E-30). Beat 4 BAARI (ink, **the hero beat**): pinned panel + token countdown 12→8→3 tied to scroll progress (M-P-40, Antigravity pin pattern), people-ahead chips, alert moment "Baari! Ab niklo." + orb alert-hop mirror (O-04). Specs F21 §3–§4.

### Phase 4 — Beats 5–6 + rail + paths/footer
Beat 5 Clinic+shaam: QR check-in moment (I-T-50), evening diet nudge card (M-E-50). Beat 6 Boundary+doctor: honest line typographic beat (M-E-60), doctor-screen adherence mirror (M-E-61). Bento rail 01/06…06/06 with status tags (LaunchFar pattern, F21 §8). Paths CTA reframe + footer. Specs F21 §5–§9.

### Phase 5 — Global interaction polish
Site-wide cursor layer: contextual labels on interactive cards (I-C-20 "Chhoo ke dekho" / "Tap karo"), magnetic buttons on all primary CTAs, hover micro-interactions (I-H-* family), typed-rotating word in closing headline (I-T-60: "Aturseva aapke _____ ke saath hai" rotating [dawai, token, diet, doctor]), scroll-reactive nav (existing, refined). Specs F22 §5–§7.

### Phase 6 — QA + performance
Full catalogue F18 §8: T-UI-01…10, T-3D-01…13, B15 font gate, B12, mobile 320/390 overflow, touch ≥44px, axe contrast vs recorded minima, canonical/robots/sitemap intact, console 0. Perf: LCP/CLS/FPS/weight vs File 12 §15 records; orb canvas budget; DPR clamp.

### Phase 7 — Ship
Deploy → live verify (agent-browser full pass + VLM screenshot audit) → evidence qa/ series → docs closure (File 05 §archetypes addendum, File 07 M-* additions, File 12 §16 rows, File 13 §10 item 9 closure) → worklog Task record.

## 4. Rollback & safety
- Every phase ships flag-gated where feasible (`NEXT_PUBLIC_HERO_V2`, `NEXT_PUBLIC_BEATS_V2`) → instant disable = old page back; flags removed at Phase 7.
- Git: one commit per phase (revert = one command); deploy after each phase per standing rule.
- Old narrative components (Hero/Journeys/Connection/ProductReveal/Sevika/Paths) retire at Phase 7 cleanup, not before (bloat-free rollback window).

## 5. Estimate of relative effort (for owner sequencing only, not dates)
P0 ▓▓▓▓ (primitives+orb) · P1 ▓▓▓▓▓ (signature hero) · P2 ▓▓▓ · P3 ▓▓▓▓ (pin) · P4 ▓▓▓ · P5 ▓▓ · P6 ▓▓▓ · P7 ▓▓
