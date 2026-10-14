# Aturseva — File 20: Hero & Orb — Detailed Interaction/Motion Spec

**Status:** `SPEC — EXECUTES IN PHASES 0–1 (File 19)`
**Scope:** every hero element: what it is, where it sits, every animation/interaction/cursor behavior, with timings, easings, triggers, tech, and reduced-motion fallback. Element IDs are stable and referenced by File 19 phases and File 22 inventory.
**Compliance:** monochrome tokens only (File 05 §4); GSAP engine; B12 reduced-motion contract; File 02 claim-gated copy; 44px+ touch targets; LCP element = the H1 text stack (orb lazy-mounts after first paint — never the LCP).

---

## 1. Layout map (where everything sits)

```
┌──────────────────────────────────────────────────────────────────┐
│ NAV (existing, scroll-reactive N-01)                              │
├──────────────────────────────────┬───────────────────────────────┤
│ LEFT 55% (desktop) / top (mob)   │ RIGHT 45% (desktop) / below   │
│                                  │                               │
│ [H1] Fraunces, 2-line promise    │  ┌─────────────────────┐      │
│ [plain one-liner] Manrope        │  │  ORB (O-01)         │      │
│      "the AI care assistant      │  │  live core: #12     │      │
│       that walks with you"       │  │  (token)            │      │
│ [CTA primary] (I-C-04 magnetic)  │  └─────────────────────┘      │
│ [CTA ghost] "Watch her work ↓"   │  ┌─────────────────────┐      │
│                                  │  │ CHAT REPLAY (glass) │      │
│ dot-grid backdrop (I-C-03        │  │ user: "Meri baari   │      │
│ spotlight) spans full hero       │  │  kab hai?"          │      │
│                                  │  │ Aturseva: reply     │      │
│                                  │  └─────────────────────┘      │
│                                  │  [chip][chip][chip] (I-T-01)  │
│                                  │  caption: tagline lock line   │
└──────────────────────────────────┴───────────────────────────────┘
```
Mobile (≤767): stack = orb (smaller, 200px) → chat → chips → H1 → CTAs. (Conversation-first per File 18 §4.1.)

## 2. Element registry (hero)

| ID | Element | Section slot | Type |
|---|---|---|---|
| H-01 | H1 headline (Fraunces, ink-950→ivory fade text on dark) | left | entrance |
| H-02 | Plain one-liner (Manrope, ivory-200) | left | entrance |
| H-03 | Primary CTA "Aturseva ke saath shuru karein" | left | magnetic + press |
| H-04 | Ghost CTA "Watch her work" → smooth-scrolls to Beat 1 | left | hover + click |
| H-05 | Dot-grid backdrop (ink-800 dots on ink-950, CSS) | full hero | cursor spotlight |
| O-01 | **The Orb** (owner-endorsed) | right-top | state machine |
| C-01 | Chat replay panel (glass, frosted) | right-middle | scroll/tap-driven replay |
| C-02 | Suggestion chips ×3 | right-bottom | tap interactions |
| C-03 | Caption line (tagline lock) | right-bottom | entrance |

## 3. The Orb (O-01) — complete state machine

**Form (static spec):** sphere, graphite gradient (ink-900 `#101113` body → ink-600 `#34383a` bottom), paper-50 rim-light (top-left, 40% arc), soft ground shadow (ink-950 @ 20%, blurred ellipse). **Core:** inner disc (ink-950 @ 85%) displaying live state — default = queue token `#12` (Manrope 600, ivory-100). Size: 380px desktop hero / 200px mobile / 48px chat-launcher derivative / 32px toast derivative.
**Tech:** three.js (R3F) single canvas, hero only; DPR-clamped ≤2; idle loops may be CSS-keyframe-driven on a DOM overlay (core number) + WebGL body — decided at Phase 0 whichever is cheaper; derivatives (launcher/toast) = pure CSS/SVG, never extra WebGL contexts.

| State | ID | Trigger | Motion spec (GSAP/CSS) | Reduced-motion |
|---|---|---|---|---|
| Idle-breathe | O-01 | hero visible, no interaction | scale 1.00→1.03 (4s, sine.inOut, yoyo); rim-light opacity 0.9→1.0 same clock; core token counter slow-pulse (opacity 0.85→1.0, 4s) | static scale 1.0, core opacity 1 |
| Listening | O-02 | cursor within hero bounds (desktop) | tilt toward cursor: rotateX/Y ≤8° (0.6s, power2.out, quaternion lerp); rim brighten +15% | disabled (no cursor on touch) |
| Speaking | O-03 | Aturseva reply typing in chat | concentric ripple rings from orb (3 rings, 1.2s stagger 0.15s, ink-200 @ 30%→0%, scale 1→1.6) | rings replaced by static glow on chat panel |
| Alert (baari) | O-04 | chip tap "Meri baari kab hai?" / beat-4 mirror | single hop: y -24px (0.28s, back.out(2)) + fall with squash-stretch (scaleY 0.92→1, 0.2s); core flashes token: opacity 1→0.2→1 (2 blinks, 0.9s total) | core flash only (opacity), no movement |
| Night | O-05 | hero out of viewport >30s (idle visitor tab) or system `prefers-color-scheme: dark` ambient cue | luminance 40%, breathe period 8s | static dim |

**Core content rules:** core shows ONE state at a time: `#12` token (default) → countdown `15:00` (during baari reply) → pulse-line (during health/diet reply) → check-mark (after confirm). No faces, no emoji — the orb never pretends to be human (File 17 §6 identity rule).

## 4. Chat replay (C-01) — scripted conversation

**Panel:** frosted `.glass` (existing tokens), rounded-3xl, width ~400px desktop / 100% mobile, max-height with internal scroll (custom scrollbar per UI rules).
**Script (File 02-audited copy, Hinglish contained to character voice):**
1. User bubble slides in: "Meri baari kab hai?" (entrance +0.4s after hero load)
2. TypingDots (3 dots, 0.9s) — orb enters Speaking (O-03)
3. Aturseva bubble: "Token #12. Teen log bache — taqreeban 15 minute. Clinic nikal jao." (typing reveal 1.4s) — orb → Alert micro-state at "#12" mention
4. Chat settles; caption fades in: "Aturseva ke saath — care that walks with you."

**Interaction:** panel is replayable via a subtle "↺ phir se dekhein" affordance (appears after script completes, ≥44px). No free-text input on the landing (File 18 R1 honesty guard — the app owns real conversation).

## 5. Suggestion chips (C-02 ×3) — the Stitch pattern

| Chip label | Canned reply (product-true, File 16 §4 anchors) | Orb reaction | Core state |
|---|---|---|---|
| "Aaj ki dawai?" | "9 baje — doctor-approved schedule se. Le li? ✓" | Speaking → idle | dose countdown `09:00` |
| "Diet plan yaad dilao" | "Doctor ne diet batayi hai — shaam 7 baje yaad dungi." | Speaking | pulse-line |
| "Prescription ka photo bhejo" | "Photo bhejo — main DRAFT list banaungi, aap confirm karo." | Speaking + listening tilt | scan-line sweep |

**Chip micro-interactions:** idle = ink-800 pill, ivory-200 text, 1px ink-700 border; hover = border→ink-200, slight raise (-2px, 0.2s), cursor→pointer; active/pressed = scale 0.97; selected = brand-400 border + check glyph; disabled during reply = opacity 50%. Touch targets ≥44px height. Keyboard: chips are real `<button>`s, focus-visible ring (gold-400, 2px offset 2px — existing focus token).

## 6. Entrance choreography (M-E-01…06) — load sequence

GSAP timeline, `gsap.timeline({defaults:{ease:'power2.out'}})` on hero mount (post-LCP):
1. M-E-01 dot-grid backdrop fades 0→1 (0.5s) + spotlight armed
2. M-E-02 H1 lines mask-reveal upward (stagger 0.12s, 0.6s, y 24→0)
3. M-E-03 one-liner + CTAs fade-up (stagger 0.1s, 0.5s)
4. M-E-04 orb scales 0.6→1 with rim-light bloom (0.7s, back.out(1.4)) + core `#12` types in (0.3s)
5. M-E-05 chat replay script begins (+0.4s)
6. M-E-06 chips pop in sequence (stagger 0.08s, scale 0.8→1, back.out(2))
Total ≤ 2.2s to fully composed. **Reduced-motion:** everything renders in final state instantly; chat script shows completed conversation.

## 7. Cursor layer (desktop only, touch = disabled)

| ID | Element | Behavior | Tech |
|---|---|---|---|
| I-C-03 | Dot-grid spotlight | radial mask (~300px) brightening dots around cursor (ink-800→ink-400 within radius), 0.15s lag easing | `useSpotlight`: rAF, CSS custom props `--mx/--my`, mask-image |
| I-C-04 | Primary CTA magnetic | button drifts toward cursor ≤10px within 80px radius, spring-return (elastic.out(1,0.4), 0.5s) on leave | `useMagnetic` |
| I-C-05 | Orb listening-tilt | see O-02 | R3F lookAt lerp |
| I-C-06 | Ghost CTA arrow | ↓ arrow translates 4px down-loop on hover (0.8s sine yoyo) | CSS keyframe |

## 8. Scroll-away behavior (M-P-01)

Hero content parallaxes: left stack y -8%, right cluster y +6%, orb scale 1→0.85, all opacity→0 across 60% of hero exit (ScrollTrigger, scrub 0.5). No layout shift (transforms only). Reduced-motion: hero simply scrolls away (no parallax).

## 9. Acceptance (Phase 1 gate)
1. 5-second comprehension (owner test on :3006): orb + `#12` + one chip tap → "company kya karti hai" is answerable. 2. B12: full static finale under reduced-motion. 3. B15 font gate green. 4. LCP = H1 text (≤ baseline+10%), CLS 0, hero interactions 60fps. 5. Claim audit: every canned reply maps to File 16 §4 anchor. 6. Keyboard: full chat replay + chips operable by keyboard alone.
