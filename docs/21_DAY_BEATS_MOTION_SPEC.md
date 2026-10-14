# Aturseva — File 21: Day Beats & Sections — Detailed Motion/Interaction Spec

**Status:** `SPEC — EXECUTES IN PHASES 2–4 (File 19)`
**Scope:** element-by-element spec for beats 1–6, bento rail, paths/CTA, footer. Narrative = File 18 §4.2 ("Aturseva ka din"); section rhythm preserves File 05 §5 dark/light alternation. Every ID is referenced by File 19 phases and the File 22 master inventory.
**Compliance:** monochrome only; GSAP + ScrollTrigger; B12 reduced-motion (every beat has a static finale); File 02 claim audit per beat; Hinglish contained to Aturseva's voice lines; ≥44px targets; long lists max-h-96 + custom scrollbar (UI rules).

---

## Beat 1 — SUBAH (the morning dose) — ivory-50 stage

**Story:** Aturseva's day starts before yours — the dose timeline assembles, the reminder arrives, the day's rhythm is set. (File 16 #1 Reminder + #2 Yaad-dilane wali.)

| ID | Element | Spec |
|---|---|---|
| M-E-10 | Section entrance | Split headline mask-reveal (existing pattern); dose-timeline card fades up (0.6s, power2.out) |
| M-E-11 | Dose timeline assembly | 4 time-row chips (9:00 / 14:00 / 20:00 / 22:30) slide in stagger 0.15s from left, each with medicine name + "Doctor-approved schedule" chip (gold-400 border, static) |
| M-L-10 | Reminder bubble pop | Aturseva bubble: "Aaj ki dawai — 9 baje" pops (scale 0.8→1, back.out(1.7), 0.4s) when row enters center viewport |
| I-H-10 | Adherence chip flip | On hover/tap, "Le li ✓ / Yaad dilaya / Snooze" chips flip Y-axis (0.5s, power1.inOut) showing the state the product actually records — honest micro-demo of File 16 #2 |
| O-10 | Orb cameo (small, 120px) | floats top-right of card, idle-breathe; ripples when bubble pops |

**Reduced-motion:** full timeline rendered complete, bubble visible, chips static (front face).

## Beat 2 — Rx PHOTO (the paper→plan moment) — ink-950 stage

**Story:** Photo in, draft out, confirmation yours. The confirm-first safety rail made visible — our most trust-building beat. (File 16 #3.)

| ID | Element | Spec |
|---|---|---|
| M-E-20 | Photo card drop | A prescription-photo card (CSS-composed placeholder: paper-100 card with ink-300 scribble lines — NO real Rx image, no fake patient data) drops in from -40px with 4° rotate settle (0.7s, bounce.out) |
| M-E-21 | DRAFT rows slide | 3 medicine rows slide out right of photo (stagger 0.18s), each tagged `DRAFT` (ink-200 badge, uppercase 10px) — the VLM output moment |
| I-H-20 | Confirm rail | "Aap confirm karo" rail: each row has confirm/toggle (≥44px); on confirm, DRAFT badge morphs to ✓ (0.3s, scale-in) — the safety rail demonstrated, not described |
| I-C-21 | Cursor: "Chhoo ke dekho" label | contextual cursor label follows mouse over the photo card (desktop) — Antigravity "Watch case" pattern, our copy |
| O-20 | Orb cameo | scan-line sweeps core while rows generate (1.2s, 2 passes) |

**Reduced-motion:** final composed state (photo + rows + rail, all confirmed).

## Beat 3 — BOOKING (chat se appointment) — ivory-100 stage

**Story:** "Aturseva ne book kar di." The chat books what the hero promised. (File 16 #5.)

| ID | Element | Spec |
|---|---|---|
| M-E-30 | Chat panel entrance | panel fades up; doctor card (name-blocked: "Dr. S., MD—Internal Medicine" style, no identifiable real doctor) slides in |
| I-T-30 | Slot chips | 3 slot chips (Mon 10:30 / Tue 18:00 / Wed 09:15); tap → chip selected (brand-400 border) → typing dots (0.8s) → booked card stamps in (scale 0.9→1 + rotate -2°→0, 0.5s, back.out(1.8)) with "Booked ✓" + "Aturseva yaad dilayegi" sub-line |
| M-L-31 | Booked card confetti-quiet | 6 tiny ink-200 squares drift up-fade (1.2s, staggered) — monochrome celebration, NOT confetti-noise |
| O-30 | Orb cameo | alert-hop on "Booked ✓" |

**Reduced-motion:** completed booking state (booked card visible, chips static).

## Beat 4 — BAARI ⭐ (the queue countdown) — ink-950 stage — THE HERO BEAT

**Story:** The USP beat. Token decrements live as you scroll — the system knows, Aturseva tells. (File 16 #4 ⭐ + the campaign line's home.)

| ID | Element | Spec |
|---|---|---|
| M-P-40 | **Pinned queue panel** | Panel pins (ScrollTrigger pin, Antigravity pattern); across ~150vh of scroll: token `#12 → #8 → #3`, people-ahead chips decrement in sync, a progress rail fills (ink-700→ink-200). Scrub-linked, bidirectional |
| M-P-41 | Waiting-room micro-scene | silhouette chips (anonymous dots, never faces) shuffle as tokens pass (parallax 3 layers, ±6px, scrub) |
| M-E-42 | The alert moment | at 100% progress: panel flashes ink-800, Aturseva bubble slams in: "Baari! Ab niklo." (scale 0.7→1, 0.35s, back.out(2)) + orb ALERT hop + core flashes `#3`→`YOUR TURN` (0.9s) |
| I-C-42 | Cursor: countdown follows | desktop: small `#12→#3` counter badge follows cursor within the pinned section (I-C family) — the "point-to-point" cursor element the owner asked for |
| M-P-43 | Unpin + handoff | panel unpins, next beat peels it away (y -60px, opacity 0, 0.5s) |

**Reduced-motion:** pinned panel replaced by a 4-frame static strip (12 / 8 / 3 / "Baari!") readable without scroll.

## Beat 5 — CLINIC + SHAAM (check-in, then the evening nudge) — ivory-50 stage

**Story:** QR check-in at the kiosk (queue/kiosk as verbs Aturseva performs — File 16 R4), then dusk, then the diet nudge. (File 16 #6 + kiosk capability.)

| ID | Element | Spec |
|---|---|---|
| I-T-50 | QR check-in moment | A kiosk-card with an abstract QR glyph (ink-950 squares — decorative, never a scannable real code); tap "Check-in" → status flips `WAITING → CHECKED IN` (flip animation as I-H-10), token line updates |
| M-E-50 | Day→dusk transition | section background shifts ivory-50→ivory-100 via a CSS gradient scroll-scrub (subtle, 0.2 L* shift only — monochrome-safe); sun-position indicator dot arcs across a thin horizon line (scrub-linked) |
| M-E-51 | Evening diet nudge | Aturseva bubble slides: "Doctor ne diet batayi — shaam 7 baje, yaad rakha." + diet card (name-blocked foods, check rows) |
| O-50 | Orb cameo | Night-state onset (dim 40%, 8s breathe) as dusk completes — the orb's day ends with yours |

## Beat 6 — BOUNDARY + DOCTOR-SIDE (the honest close) — ink-950 stage

**Story:** The trust beat, shown not claimed. Then the loop closes on the doctor's screen. (File 16 §3 + #8.)

| ID | Element | Spec |
|---|---|---|
| M-E-60 | The boundary line | Large Fraunces typographic beat, word-by-word fade: "Dose doctor badalega. Main yaad rakhungi." (stagger 0.25s/word, 0.8s each — the slowest, most deliberate moment on the page) |
| M-E-61 | Doctor-screen mirror | A doctor-dashboard mini-mock (adherence ring animating 0→72%, "reported regularity" — labelled `representative`, never real data) slides up; one line: "Doctor ko bhi dikhti hai aapki regularity — ilaaj behtar" |
| I-H-61 | Adherence ring hover | hover/tap → ring segments highlight with day labels (7 day-chips) |

## Bento rail — "01/06…06/06" (LaunchFar pattern, folded)

**Placement:** summary rail after Beat 6 (or sticky-right on desktop xl+ — decided at Phase 4 build, NOT a 7th section).
**Spec:** 6 compact cards (numbered 01/06…06/06), each = one beat's icon + 2-word title + status tag (`REMINDER ON`, `RX→DRAFT`, `BOOKED`, `QUEUE LIVE`, `DIET ON`, `LOOP CLOSED` — monochrome badges). Cards link-smooth-scroll to their beat (I-T-70). Hover: raise -2px + border→ink-200 (0.2s). The `QUEUE LIVE` card carries a live mini-token that syncs with beat 4's final state — the page remembering its own story.

## Paths / CTA section — reframe (File 04 truth unchanged)

Existing patient/doctor/hospital cards; heading becomes "Aturseva ke saath shuru karein"; primary CTA magnetic (I-C-04 pattern from hero). Card hovers: existing lift + border-brighten (consistent with current Paths.tsx behavior — preserved).

## Footer

Existing quiet close (File 08: "grounding, not persuasion" — no imagery). One addition: the orb, 24px, night-state, beside the wordmark — the day ends; she's still on. Static (no loop in footer; reduced-motion by default).

## Global section-entrance grammar (all beats)

Every beat follows the same reveal grammar for coherence: (1) kicker chip fade (0.3s) → (2) headline mask-reveal (0.5s) → (3) body/UI element fade-up (0.6s, power2.out) → (4) beat-specific signature moment (the IDs above). ScrollTrigger: enter 80%/exit 20%, `once: true` except beat-4 (bidirectional scrub for the pin). Reduced-motion: all content visible immediately, pins → static strips.
