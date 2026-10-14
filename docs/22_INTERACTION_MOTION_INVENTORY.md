# Aturseva — File 22: Interaction & Motion Master Inventory

**Status:** `SPEC — SINGLE SOURCE OF TRUTH FOR EVERY ANIMATION/INTERACTION`
**Scope:** (§1) what the references actually do (live-verified), (§2) our complete cursor-following family, (§3) the master table of every element ID from Files 20/21 with trigger/timing/tech/reduced-motion/phase, (§4) implementation utilities, (§5) what we deliberately do NOT adopt, (§6) interaction-budget rules (the restraint law).
**Method note:** Antigravity data below was verified live this session via agent-browser headless Chrome (DOM/computed-style/attribute probes, mouse-move tests, scroll passes, 9296px full journey; 2 reference screenshots saved `qa/ref-antigravity-agentfirst.png`, `qa/ref-antigravity-mid.png`). Stitch facts carried from File 15 §3 live research (prior session).

---

## 1. Reference decode — what the references ACTUALLY do (verified)

### 1.1 Antigravity (antigravity.google — Astro, no GSAP, custom CSS/JS)

| Their element (verified) | How it behaves | Where it lives |
|---|---|---|
| **Contextual cursor-CTA** (`div.custom-cursor`, 4 instances) | A label-badge ("Play intro", "Watch case") that **follows the mouse point-to-point inside a hover zone** (video-wrapper, case-card wrappers). The cursor BECOMES the affordance — Antigravity's signature move | hero video + 3 case cards |
| **Hero particle canvas** (1280×577) + **morphing-particles section** (1268×852) | two particle systems (arrival + mid-page morph moment) — the vision-beats of the vision→utility rhythm | hero + mid-page |
| **Typed rotating headlines** (`span.typed-container`, `data-cursor-persists`) | typewriter effect cycling "Full stack developer → Enterprise developer → Frontend developer" with a **persistent caret** | use-case section |
| **22-icon bouncing grid** (`ul.icon-list` + `div.bouncer`, willChange:transform) | icon tiles bounce/settle as the section enters — a "the tools are alive" moment | agent-first section |
| **Scroll-reactive header** (`header[data-scroll-reactive=true]`) | header restyles (bg/blur/shrink) on scroll | global |
| **Feature explorer** (`grid-container` + `feature-list` + 3 IDE images) | static high-fidelity mockups with entrances — density IS the proof | feature-explorer |
| Section rhythm (9296px): particles hero → video (cursor-CTA) → bouncing icons → feature explorer → typed use-cases → solutions (cursor-CTA ×3) → morphing particles → blogs → download CTA → footer | | |

### 1.2 Stitch (stitch.withgoogle.com — from File 15 §3 live research)

Hero IS the product: real generation input (App/Web toggles, fidelity dropdown, regenerate, send) + **3 suggestion chips** + dot-grid blueprint backdrop. Zero ambiguity in 2 seconds. Interactions are honest controls, not decoration.

### 1.3 LaunchFar (from File 15 §3): 6-card numbered UI-as-content system (01/06…06/06) with status tags.

**The translation law (owner-confirmed intent):** we adopt the *behavior patterns* (cursor-follow CTAs, typed rotation, bouncing grids, pinned scrub, hero-as-controls) — never their palettes/themes (File 05 monochrome stands).

## 2. Our cursor-following family (the "point-to-point" elements the owner asked for)

All desktop-only (touch: no cursor layer at all — `matchMedia('(pointer:fine)')` gate). All are ONE reusable engine, three behaviors:

| ID | Behavior | Where used | Spec |
|---|---|---|---|
| **I-C-01 Contextual label** | label-badge follows cursor inside a zone (lerp 0.18, 8px offset SE of pointer, 60fps rAF) | Beat-2 photo card ("Chhoo ke dekho"), bento cards ("Tap karo"), case-style cards | fades in 0.2s on zone-enter, out on leave; `cursor:none` inside zone (badge IS the cursor); badge = ink-950 @ 90% pill, ivory-100 text, 12px Manrope |
| **I-C-02 Counter badge** | small live-number badge follows cursor within pinned section | Beat-4 queue panel (`#12→#3`) | syncs to scrub value; monospace tabular numerals (no width jitter) |
| **I-C-03 Spotlight** | radial brightening follows cursor on backdrop | hero dot-grid | ~300px radius mask, 0.15s lag, CSS `--mx/--my` custom props — dots ink-800→ink-400 |
| **I-C-04 Magnetic** | element drifts toward cursor within radius, spring-returns | hero primary CTA, paths CTAs, final download-style CTA | ≤10px drift, 80px radius, elastic.out(1,0.4) return 0.5s |
| **I-C-05 Orb listening-tilt** | orb rotates toward cursor | hero orb (O-02) | rotateX/Y ≤8°, 0.6s power2.out |
| **I-C-06 Micro-follow** | 4–6px translate of decorative glyph toward cursor | ghost-CTA arrow; beat-5 sun-dot | linear lerp, cheap transform |

**Engine rules:** ONE rAF loop for all cursor behaviors on a page (shared ticker, per-element registration); listeners passive; transform-only (no layout); disabled wholesale under `prefers-reduced-motion` AND on touch AND when tab hidden (visibilitychange).

## 3. Master inventory table (every ID, one place)

Legend — **Phase**: implementation phase (File 19). **RM**: reduced-motion fallback. All GSAP unless noted CSS.

### 3.1 Hero (File 20)
| ID | Element | Interaction | Trigger | Timing | Tech | RM | Phase |
|---|---|---|---|---|---|---|---|
| M-E-01 | dot-grid fade-in | entrance | hero mount | 0.5s | CSS/GSAP | visible | 1 |
| M-E-02 | H1 mask-reveal | entrance | mount +0.1s | 0.6s, stagger 0.12s | GSAP | visible | 1 |
| M-E-03 | one-liner + CTAs fade-up | entrance | mount +0.4s | 0.5s | GSAP | visible | 1 |
| M-E-04 | orb bloom + core type-in | entrance | mount +0.5s | 0.7s back.out(1.4) | R3F/GSAP | static orb | 1 |
| M-E-05 | chat script begin | entrance | +0.4s after M-E-04 | per script | GSAP | completed convo | 1 |
| M-E-06 | chips pop | entrance | script settle | stagger 0.08s | GSAP | visible | 1 |
| O-01…05 | orb states | state machine | see File 20 §3 | see spec | R3F + CSS | static per state | 0/1 |
| I-T-01 | chip tap → canned reply + orb reaction | tap/click/keyboard | user | typing 0.9s, reply 1.4s | React state + GSAP | instant reply | 1 |
| M-P-01 | hero parallax scroll-away | scrub | hero exit 60% | scrub 0.5 | ScrollTrigger | none | 1 |
| I-C-03/04/05/06 | hero cursor layer | cursor | pointer:fine | see §2 | useSpotlight/useMagnetic | off | 1 |

### 3.2 Beat 1 — Subah (File 21)
| ID | Element | Interaction | Trigger | Timing | RM | Phase |
|---|---|---|---|---|---|---|
| M-E-10 | section entrance | scroll-in | 80%/once | 0.6s | visible | 2 |
| M-E-11 | timeline rows slide | scroll-in | follow M-E-10 | stagger 0.15s | composed | 2 |
| M-L-10 | reminder bubble pop | row centered | — | 0.4s back.out(1.7) | visible | 2 |
| I-H-10 | adherence chip flip | hover/tap | user | 0.5s power1.inOut | front face | 2 |
| O-10 | orb cameo breathe/ripple | ambient | — | loop | static | 2 |

### 3.3 Beat 2 — Rx photo (File 21)
| ID | Element | Interaction | Trigger | Timing | RM | Phase |
|---|---|---|---|---|---|---|
| M-E-20 | photo card drop | scroll-in | — | 0.7s bounce.out | composed | 2 |
| M-E-21 | DRAFT rows slide | follow | — | stagger 0.18s | composed | 2 |
| I-H-20 | confirm rail + badge morph | tap | user | 0.3s scale-in | confirmed state | 2 |
| I-C-21 | cursor label over photo | cursor | zone-enter | 0.2s fade | off | 5 |
| O-20 | core scan-line | rows generating | — | 1.2s ×2 | off | 2 |

### 3.4 Beat 3 — Booking (File 21)
| ID | Element | Interaction | Trigger | Timing | RM | Phase |
|---|---|---|---|---|---|---|
| M-E-30 | panel + doctor card entrance | scroll-in | — | 0.6s | composed | 3 |
| I-T-30 | slot chips → booked stamp | tap | user | dots 0.8s, stamp 0.5s back.out(1.8) | booked state | 3 |
| M-L-31 | quiet squares drift | on booked | — | 1.2s | off | 3 |
| O-30 | orb alert-hop | on booked | — | 0.28s+0.2s | flash only | 3 |

### 3.5 Beat 4 — BAARI pinned (File 21)
| ID | Element | Interaction | Trigger | Timing | RM | Phase |
|---|---|---|---|---|---|---|
| M-P-40 | pinned token countdown 12→8→3 | scrub | ~150vh pin | scrub-linked | 4-frame static strip | 3 |
| M-P-41 | waiting-room parallax dots | scrub | same | ±6px, 3 layers | static | 3 |
| M-E-42 | alert moment "Baari! Ab niklo." | 100% progress | — | 0.35s back.out(2) | visible | 3 |
| I-C-42 | cursor counter badge | cursor | within pin | lerp 0.18 | off | 5 |
| M-P-43 | unpin peel-away | scroll | pin end | 0.5s | off | 3 |

### 3.6 Beat 5 — Clinic+shaam (File 21)
| ID | Element | Interaction | Trigger | Timing | RM | Phase |
|---|---|---|---|---|---|---|
| I-T-50 | QR check-in flip | tap | user | flip 0.5s | checked-in state | 4 |
| M-E-50 | dusk gradient + sun arc | scrub | section traverse | scrub | static dusk | 4 |
| M-E-51 | diet nudge slide | scroll-in | — | 0.6s | visible | 4 |
| O-50 | orb night-onset | dusk complete | — | 8s loop dim | static dim | 4 |

### 3.7 Beat 6 — Boundary + doctor (File 21)
| ID | Element | Interaction | Trigger | Timing | RM | Phase |
|---|---|---|---|---|---|---|
| M-E-60 | word-by-word boundary line | scroll-in | — | 0.25s/word stagger | visible | 4 |
| M-E-61 | doctor-screen mirror | scroll-in | — | ring 0→72% 1.2s | final ring | 4 |
| I-H-61 | adherence ring hover | hover/tap | user | segment highlight | off | 4 |

### 3.8 Bento + paths + footer (File 21)
| ID | Element | Interaction | Trigger | Timing | RM | Phase |
|---|---|---|---|---|---|---|
| I-T-70 | bento cards → smooth-scroll to beat | tap | user | 0.8s smooth | jump-scroll | 4 |
| I-H-70 | bento hover raise + border | hover | user | 0.2s | static | 4 |
| M-L-70 | `QUEUE LIVE` mini-token sync | beat-4 state | internal | — | static | 4 |
| I-C-04b | magnetic CTAs (paths/final) | cursor | pointer:fine | §2 spec | off | 5 |
| I-T-60 | typed rotating word in closing line | loop | section visible | 2.4s/word cycle | static full sentence | 5 |
| O-80 | footer orb night-static | ambient | — | static | static | 4 |
| N-01 | scroll-reactive nav (existing, refine) | scroll | — | existing | existing | 5 |

## 4. Implementation utilities (Phase 0 deliverables)

- `useCustomCursor(zoneRef, {label})` — I-C-01/02: badge mount, rAF lerp, zone enter/leave, `pointer:fine` + RM gates
- `useMagnetic(elRef, {radius:80, drift:10})` — I-C-04 family
- `useSpotlight(elRef, {radius:300})` — I-C-03: CSS custom props + mask
- `useTypedText(words, {cycle:2400, caret:true})` — I-T-60 + typed moments (Antigravity `data-cursor-persists` behavior: caret persists after word completes)
- `<Orb size variant state/>` — R3F hero + CSS/SVG derivatives; state machine hook `useOrbState()`
- `<ChatReplay script/>` + `<Chip/>` primitives — hero + beat-3 reuse
- ONE shared rAF ticker (`src/lib/fx/ticker.ts`) for all cursor behaviors; GSAP ticker for scroll/entrances
- All utilities ship with stories-free dev harness on a flag-gated route (Phase 0 gate)

## 5. Deliberately NOT adopted (recorded restraint)

| Reference behavior | Why rejected |
|---|---|
| Antigravity glassmorphism-with-color, radial color gradients | File 05 monochrome lock (our `.glass` white/5 stays) |
| Particle field ×2 | one hero-adjacent moment only (dot-grid + orb suffice; budget discipline — R5) |
| "Play intro" actual video | no media assets (File 08); our replay is code |
| Typed text EVERYWHERE (Antigravity uses it in 6+ spots) | one closing-line rotation only — novelty preserved |
| Cursor label on every card | 3 zones max (photo card, bento, pinned beat) — cursor noise is real UX debt |
| Bouncing 22-icon grid | our icon moments are state-driven (orb cameos), not size-driven |

## 6. Interaction-budget rules (the restraint law)

1. **One signature cursor behavior per viewport**: never two cursor-follow elements active in the same scroll frame (spotlight and label may coexist ONLY in hero — label there is chip-focused, tested at Phase 5).
2. **Sum of loops ≤ 4 concurrent rAF targets** (orb breathe + 1 ripple + spotlight + ticker overhead) — enforced by the shared ticker's registration count, logged in dev.
3. **Every interaction has a job**: if it doesn't inform, confirm, or advance the story, it's cut at Phase 5 review.
4. **Mobile parity law**: every cursor behavior has a tap-equivalent (spotlight→static grid, label→first-tap hint toast, magnetic→plain press); mobile never ships dead zones.
5. **B12 is absolute**: the inventory's RM column is a contract, not a suggestion — QA verifies each row (Phase 6 sheet).
