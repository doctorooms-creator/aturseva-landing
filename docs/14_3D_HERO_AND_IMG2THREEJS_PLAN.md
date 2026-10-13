# Aturseva — File 14: 3D Hero (Procedural Diya) & img2threejs Usage Plan

**Status:** `ARCHIVED — OWNER REJECTED DIRECTION (2026-10-14)` *(superseded by `docs/15_PRODUCT_UI_FIRST_LANDING_REDESIGN_PLAN.md`; kept as a complete, reusable reference for any future 3D-object work — the skill probe, token-compliance and fallback-ladder sections remain valid technique)*
**Created:** 2026-10-14 IST (2026-10-13 19:08 UTC working session; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `3118652` (QA-evidence pass merge point). Live site verified HTTP 200 this session with canonical tagline title and `sitemap.xml` 200.
**Planning dependencies:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (claims policy — "built in code" honesty cue basis), `docs/03_BRAND_MISSION_AND_POSITIONING.md` (diya/light brand metaphor), `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md` (**mandatory design baseline — monochrome graphite/paper token system; §4.2 diagram micro-palette precedent**), `docs/06_HOMEPAGE_STORYBOARD.md` (hero frame H), `docs/07_MOTION_AND_SCROLL_ANIMATION.md` (M-* IDs, B12 reduced-motion contract), `docs/08_VISUAL_ASSET_PLAN.md` (§9 hero media route matrix — this file adds Route 4; §12 imagery rules), `docs/11_COMPREHENSIVE_IMPLEMENTATION_PLAN.md` (batch model precedent), `docs/12_QA_SEO_AND_PERFORMANCE_PLAN.md` (T-* test-ID convention; §15 measured baseline), `docs/13_DEPLOYMENT_AND_HANDOVER_PLAN.md` (§10 owner-decision recording rule).
**Scope:** a complete, decision-ready plan for adding a **code-only, procedurally generated 3D diya** to the hero section using the external agent skill **img2threejs**, including pipeline usage, integration architecture, token compliance, motion design, fallback ladder, performance budget, QA catalogue, implementation batches with owner gates, and rollback. **Nothing in this document installs the skill, generates the model, or modifies any source file. Development has NOT started (owner instruction, 2026-10-13).**
**Owner decision boundaries:** the owner approved **Option A** (monochrome 3D diya hero element) and requested this detailed plan, including inspiration from Google Stitch / Google Antigravity landing pages. This document records that approval **for planning and implementation preparation only**; default-enablement on the live site remains an explicit owner gate (Batch C, §14). The tagline, logo asset, copy, and all other Files 02–13 decisions are untouched.

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-14 | Initial creation; 18 sections; skill probe verified; inspiration facts verified by fetch; Route 4 recorded in File 08 §9 | File 14 planning task (owner-approved) |

---

## 1. Owner decision record

Per File 13 §10's recording rule ("an owner decision becomes real when stated by the owner in the task conversation and then recorded with its date/scope"), this session's statements:

1. **2026-10-13 (research turn):** *"Plz check ki ye skill ka tm use kr page do not start development https://github.com/img2threejs/img2threejs"* — research the skill, do not develop. **Executed as research only** (README, SKILL.md, npm registry, sandbox probe — all read-only; evidence in §4).
2. **2026-10-14 (this turn):** *"Look aek kam krte hai make a detailed plan hm kese use krne wale hai tm khud inspuration le sakte ho dure projects se jo big companies hai Jese stich ya antigravity samj aya ? Option A bhi Acha hai"* — (a) make a detailed usage plan; (b) inspiration from big-company landing pages (Google Stitch, Google Antigravity) is authorized; (c) **Option A approved** (monochrome 3D diya in hero, from the three options presented: A hero diya / B ProductReveal accent / C product-app element).

**Scope of the approval:** planning + implementation preparation. **Not covered (still gated):** default-on enablement of the 3D hero (Batch C, §14), any change beyond the hero section, the File 08 §9 route-2/3 media decisions (imagery/film remain untouched and independently owner-gated).

## 2. Inspiration analysis — verified external patterns

Facts below were fetched live on 2026-10-13 (titles/descriptions only — deeper technique claims are deliberately avoided; only design-intent patterns are adopted, never code, assets, or copy):

| Site | Verified fact (fetch evidence) | Pattern we adopt | Pattern we reject |
|---|---|---|---|
| **Google Antigravity** (`antigravity.google`) | Title "Google Antigravity"; description "Experience liftoff with the next-gen agent platform" | **One signature motif that carries product meaning** (their launch/agent motif ↔ our diya = "quiet light that walks with you"); **scroll-driven cinematic restraint** (motion serves narrative, never spectacle); performance discipline on a heavy-story page | Their dark theme and typography (Aturseva stays graphite/paper per File 05); any hero video |
| **Google Stitch** (`stitch.withgoogle.com`) | Title "Stitch - Design with AI"; description "Stitch generates UIs for mobile and web applications, making design ideation fast and easy." | **Product-truth-first hero** — the hero shows the real generative output, not a mock. Our equivalent: the diya *is* generated code; a small honest caption (§3.3) states it — perfectly aligned with File 02's claims policy and the site's evidence-honesty doctrine | Their interactive demo embedding (we have no interactive product demo to embed) |

**Net design posture:** Antigravity's cinematic restraint + Stitch's truth-first presentation, expressed through Aturseva's existing monochrome token system. The 3D element must feel like it *grew out of* File 05's design system, not like a library demo was bolted on.

## 3. Concept — the monochrome procedural diya

### 3.1 Why the diya

The diya is already the Aturseva brand symbol (product repo has two owner-approved brand concept PNGs featuring it — §6) and maps directly onto the brand metaphor: a small flame that accompanies you in the dark — "Care that walks with you." The hero currently carries the promise through typography + ECG arc (verified complete, File 06 §6). The diya adds a **warm, tangible focal object** without people imagery (which remains owner-gated per File 08 §4) and without any downloaded asset (the model is code).

### 3.2 Visual treatment (monochrome, token-driven)

- **Bowl:** graphite-700/800 surfaces, a single paper-toned rim highlight (light catching ceramic) — the "dark stage, quiet light" treatment already used by the site's dark-stage sections.
- **Flame:** monochrome warm treatment — ivory-white core fading through graphite-200 halo. **No orange.** A monochrome flame is distinctive, on-policy (File 05 monochrome constraint), and reads as "quiet light," not "fire."
- **Grounding:** a soft radial pool of light under the bowl (graphite-600 → transparent), echoing the existing ECG line weight.
- **All colors derived at runtime from the design tokens** (§9) — zero hex literals in generated code (extends the B9 tokenization doctrine).

### 3.3 Honesty cue (Stitch-derived)

A small, quiet caption near the diya (final wording in Batch D): *"Built in code — no image files."* This is a trust signal consistent with File 02 §claims (never imply assets/renders we don't have) and mirrors Stitch's show-the-real-thing posture. It is also literally true: the diya is a generated TypeScript factory.

## 4. img2threejs — verified facts & sandbox probe record

### 4.1 What the skill is (verified from README/SKILL.md at repo `main`, fetched 2026-10-13)

- Turns **one reference image** of an object/character into a **code-only procedural Three.js model** — a `THREE.Group` factory in TypeScript built from primitives, procedural shaders and generated geometry. Explicitly **not** photogrammetry, mesh extraction, or art packs.
- **Staged pipeline with quality gates:** intake validation → detail inventory → quality contract → spec → build passes (`blockout → structural → form → material → surface → lighting → interaction → optimization`) → per-pass **render-vs-reference vision review** with self-correction loops.
- **State/resume:** `forge/state.py` records an evidence-backed checklist; `forge/next.py --state <file>` reports the exact next command and must be run at every start/resume/correction (hard stops must be obeyed).
- **License:** Apache-2.0 (repo + npm). Generated output code is ours to use; no attribution obligation (a courtesy credit in repo docs is planned, not on the page).
- **Versioning:** skill `v2.0.0`; npm `img2threejs@0.1.1` is only the host **installer CLI** (auto-detects Claude Code / Codex / OpenCode / Hermes — **not** this host). The documented **manual alternative** (`git clone` of a pinned release + follow SKILL.md) is the route we use — it is explicitly supported ("choose this or the CLI, not both at the same skill path").

### 4.2 Sandbox compatibility — PROBED and PASSING (2026-10-13)

| Requirement | Skill needs | This sandbox | Result |
|---|---|---|---|
| Node.js | ≥ 18 | v24.21.0 | ✅ |
| Python | ≥ 3.10 (stdlib only) | 3.12.15 | ✅ |
| Git | required | 2.47.3 | ✅ |
| Agent vision | host-provided | VLM skill | ✅ (mapped in §5) |
| Agent browser | host-provided | agent-browser CLI | ✅ (mapped in §5) |

**Probe executed (read-only, no site change):** `git clone --depth 1` → 7.3 MB working tree; `python3 forge/next.py --help` → prints usage (positional `spec`, `--state`); `python3 forge/state.py --help` → prints usage (`init|status|mark`). Stage layout confirmed: `forge/stage1_intake … stage5_rig` + `grimoire/` (intake/build/review/character/readiness/feedback). **The manual route runs in this sandbox.** Probe clone discarded after the session (Batch A re-installs pinned).

## 5. Host-tool mapping (agent-agnostic contract → this host)

The skill is agent-agnostic: wherever it says "agent vision" / "agent browser tool", the host's equivalent is used. Our mapping (recorded so every batch follows it without re-derivation):

| Skill's term | This host's tool | Notes |
|---|---|---|
| Agent vision (image reading, render-vs-reference judgement) | **VLM skill** (z-ai-web-dev-sdk, backend-only) | Per-pass review verdicts; never client-side |
| Agent browser tool (rendering the model, screenshots) | **agent-browser CLI** | Test harness page renders the current factory pass; screenshots to `qa/` |
| Host CLI | **Bash tool** | All `forge/*` commands |
| Skill installation | manual `git clone` of release tag to `/home/z/skills/img2threejs` | Pinned SHA recorded in worklog; never committed into the landing repo (7.3 MB vendoring rejected) |

## 6. Reference asset & provenance

| Candidate | Path (product repo, read-only) | Size | Role |
|---|---|---|---|
| `aturseva-icon-diya-clean.png` | `/home/z/my-project/public/brand/` | 54,454 B | **Primary reference** (clean icon form) |
| `aturseva-concept2-diyapulse.png` | `/home/z/my-project/public/brand/` | 51,191 B | Secondary reference (composition/glow intent only) |

- **Provenance:** both are the owner's own brand assets (created in this project's branding phase) — no third-party rights issue in using them as reconstruction references.
- **Output relationship:** the pipeline produces **code**; no bitmap is copied, embedded, or shipped. The landing repo gains exactly one new source file family (§8) plus QA evidence.
- **Product-repo boundary:** the product repo is never modified; the reference PNG is read once per pipeline run (copying it into the skill work dir is a read-only-filesystem-safe workflow).

## 7. Pipeline usage — the Batch A procedure (exact commands)

Run from the skill checkout unless noted. `<WORK>` = `/home/z/skills/img2threejs-work` (outside the landing repo; contents evidence-curated into `qa/` afterwards).

1. **Install (pinned):**
   `git clone --branch v2.0.0 https://github.com/img2threejs/img2threejs.git /home/z/skills/img2threejs`
   Record `git rev-parse HEAD` in the worklog. If `v2.0.0` tag fetch fails, fall back to `main` and record the SHA (the CLI pins `v2.0.0` by default; either is license-safe).
2. **Prepare reference:** copy the primary PNG into `<WORK>` (read-only use of the product asset).
3. **Init state:**
   `python3 forge/state.py init --reference <WORK>/aturseva-icon-diya-clean.png --profile generic --spec <WORK>/object-sculpt-spec.json`
   (`generic` profile — the diya is an object, not a character; no domain plugins are installed or needed.)
4. **Run the loop — at every start, resume and correction iteration:**
   `python3 forge/next.py --state <WORK>/.img2threejs/state.json`
   Obey hard stops; never continue from memory (SKILL.md core promise).
5. **Each build pass:** write/extend the generated factory TypeScript → render it in a **test harness page** (a static HTML importing `three` from a local node_modules + the current factory, orbitable for inspection) via agent-browser → **VLM compare** screenshot vs the reference → record verdict (pass/defect list) → feed corrections back into the loop.
6. **Gates:** the skill's own quality gates (detail inventory completeness, per-pass thresholds) must pass before the final pass. Additionally our gate: the **final render must read as a diya at 390 px width** (mobile legibility) before acceptance.
7. **Deliverable:** `src/components/three/generated/createAtursevaDiyaModel.ts` — the final factory, hand-reviewed, token-adapted (§9), committed with curated `qa/` evidence (per-pass reference/render pairs + final mobile render).
8. **Skipped stages (with rationale, recorded in the worklog):** `stage5_rig` (the hero diya is decorative — no rig/animation sockets needed; GSAP drives camera/tilt externally, the flame is an internal shader — §10).

**Batch A exit criteria:** final-pass review PASS; factory compiles under `tsc --noEmit`; monochrome VLM check 4/4; **zero changes to any existing site source** (the factory file is new, unreferenced code at this point).

## 8. Integration architecture (Next.js App Router + static export)

### 8.1 Component & chunking

```
src/components/three/
  generated/createAtursevaDiyaModel.ts   ← skill output (Batch A)
  DiyaScene.tsx                          ← mount/teardown, token colors, fallbacks (Batch B)
  diya-poster.tsx (or inline in Hero)    ← SSG inline SVG poster (Batch B)
```

- **`DiyaScene.tsx`** is a client component imported **only** via `next/dynamic(..., { ssr: false })` from the hero — keeping `three` out of the server bundle and out of the initial JS graph.
- **`three` loads lazily inside the mount effect** (`await import('three')`), producing a separate chunk fetched **after** the `load` event (§12 LCP rule).
- No OrbitControls/examples imports → smaller chunk; single WebGLRenderer, one scene, one rAF loop.
- Static-export compatible (client-only) — `fix-pages-fonts` flow untouched; B15 pattern unaffected.

### 8.2 Mount sequence (progressive enhancement)

1. **First paint (SSG):** inline **SVG poster** of the diya (≈1–2 KB, token-colored, `role="img"` + aria-label) — instant, printable, and the universal fallback.
2. **After `window` `load` + `requestIdleCallback`:** import the `three` chunk, build the scene from the poster's box, render one frame, cross-fade poster → canvas (300 ms, opacity only — same box, so **CLS stays 0.0**).
3. **Reduced-motion / no-WebGL / chunk-failure / low-FPS:** ladder in §11 (the poster is never removed from the DOM).

## 9. Design-token & monochrome compliance

- **All material colors are derived at runtime** from the design tokens: read the CSS custom properties (graphite/paper/ivory scale) via `getComputedStyle(document.documentElement)` once at mount → build `THREE.Color` values → pass into the factory's material parameters. **Zero hex literals in shipped code** (the generated factory is refactored to accept a `MaterialPalette` argument; the literal defaults from the skill are stripped in review).
- **Token map (planned, final values in Batch B):** bowl body graphite-700/800 · bowl rim paper · flame core ivory · flame halo graphite-200 · light pool graphite-600 · stems/lines graphite-500 — consistent with the B9 `diagram-*` scale precedent (File 05 §4.2 addendum).
- **Verification:** T-3D-06 asserts computed material colors match the token registry (and a VLM 4/4 monochrome-harmony review).

## 10. Motion choreography & B12 reduced-motion

- **Ignition:** flame lights (shader amplitude ramp) synchronized with the existing hero-headline reveal in the current GSAP timeline — one new tween, no timeline rewrite.
- **Scroll:** ~2 new ScrollTriggers — subtle camera orbit (±15°) + diya tilt parallax across the hero scroll band. This is the Antigravity-derived "cinematic restraint": motion serves the promise, never spectacle. The existing 38 ScrollTriggers and the single-boot guard (`__atursevaAnimBooted`) are untouched (T-MOT-05 regression).
- **Flame flicker:** procedural noise shader (time uniform) — small, quiet, never lurid.
- **Reduced-motion (B12):** no flicker, no orbit; the canvas renders **one static final frame**; the poster persists underneath. The page's existing reduced-motion finale behaviour is unchanged.

## 11. Fallback & accessibility ladder

| Level | Condition | Experience |
|---|---|---|
| 1 | WebGL + motion allowed | Full 3D diya, ignition + scroll choreography |
| 2 | `prefers-reduced-motion` | 3D static frame (one render), poster underneath |
| 3 | Low FPS (3 consecutive frames > 10 ms on mobile) | Auto-downgrade: DPR → 1, flame shader off → static emissive |
| 4 | No WebGL context / `three` chunk fails | GSAP-animated SVG poster (gentle glow pulse) |
| 5 | No JS | Static SSG SVG poster |

**A11y:** canvas `aria-hidden="true"`; poster carries `role="img"` + `aria-label` ("A diya lamp — a quiet flame"); the honesty caption is real text (not baked into canvas); no interactive element depends on the canvas; keyboard flow unchanged.

## 12. Performance budget & protection rules

Baseline (measured, File 12 §15 addendum): **LCP 316 ms desktop / 172 ms mobile, CLS 0.0, 321 KB gz total, 60 fps scroll, worst click 48 ms.** These are the numbers the 3D hero must not regress.

| Rule | Value / mechanism | Test |
|---|---|---|
| LCP element stays the h1 | Canvas mounts strictly after `load` + idle; poster is an inline SVG (not a fetch) | T-3D-01, T-3D-03 |
| `three` chunk lazy | Dynamic import inside mount effect; not in initial waterfall | T-3D-02 |
| Chunk-size gate | `three` chunk ≤ ~150 KB gz expected; **abort to Level-4 fallback if > 200 KB gz** | T-3D-02 |
| CLS 0.0 | Poster and canvas occupy the exact same box; cross-fade = opacity only | T-3D-04 |
| Frame budget | ≤ 4 ms/frame desktop; DPR clamp `min(devicePixelRatio, 2)`; rAF paused on `document.hidden` **and** hero-out-of-viewport (IntersectionObserver, threshold 0) | T-3D-05, T-3D-12 |
| Total weight | On-load unchanged (lazy); post-interaction ≤ 480 KB gz total | T-3D-02 |
| Mobile | 390 px no overflow; diya legible; auto-downgrade ladder armed | T-3D-10 |

## 13. QA plan — T-3D-* test catalogue (File 12 conventions)

New test family `T-3D-*` (execution records land in File 12 §16-style addenda + `qa/` evidence; IDs reserved now):

| ID | Assertion |
|---|---|
| T-3D-01 | LCP unchanged vs §15 baseline (±10%) with 3D enabled (PerformanceObserver, live) |
| T-3D-02 | `three` chunk absent from initial waterfall; fetched on mount; ≤ 200 KB gz |
| T-3D-03 | Canvas mounts only after `load` event (never blocks first paint) |
| T-3D-04 | CLS 0.0 through poster→canvas cross-fade |
| T-3D-05 | 60 fps scroll maintained (desktop 1440 + Galaxy S25 emulation) |
| T-3D-06 | Monochrome token compliance: runtime material colors == token registry; VLM 4/4 |
| T-3D-07 | Reduced-motion: static finale, no flicker/orbit (B12 regression) |
| T-3D-08 | No-WebGL (context stub) → Level-4 SVG poster; zero errors |
| T-3D-09 | B15 font-gate regression: 3 basePath font URLs 200; `document.fonts` loaded; h1 = Fraunces |
| T-3D-10 | Mobile 390: overflowX 0; touch targets unchanged; diya legible |
| T-3D-11 | Console + page errors 0 (desktop + mobile, across ladder levels 1/2/4) |
| T-3D-12 | rAF loop pauses when hero offscreen / tab hidden (probe counter) |
| T-3D-13 | Static-export parity: identical behaviour on the live Pages deploy |

## 14. Implementation batches & owner gates

| Batch | Content | Site-visible change | Owner gate |
|---|---|---|---|
| **A — Skill run** | Install pinned skill; intake → passes → gates on the diya reference; ship `createAtursevaDiyaModel.ts` + evidence | **None** (new unreferenced file only) | No |
| **B — Integration behind flag** | `DiyaScene` + poster + fallback ladder + lazy chunk; enabled **only** via `?diya=1` query param | None by default (flag-gated) | No |
| **C — Default enable** | Flip default on; full T-3D-* sweep + regressions; measured perf addendum (File 12 §15 style); live verify | **Yes** | **YES — owner reviews the live flag URL / preview :3006 and explicitly approves** |
| **D — Polish** | Flame tuning, scroll choreography refinement, caption wording; owner-feedback driven | Yes (refinement) | No (post-C tuning) |

Every batch follows the standing cadence: **commit → push → GitHub Actions deploy → live verification** (owner's git+live rule). Rollback at any point: §16.

## 15. Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Skill pipeline behaves differently in this host than its gates assume | Low (probe passed) | Batch A slip | Batch A is dev-only, no site exposure; worst case = hand-built procedural diya (same integration contract) |
| 2 | `three` chunk exceeds 200 KB gz | Low | Perf budget | Hard abort gate → Level-4 SVG fallback (poster + GSAP) — still a visual upgrade, still zero-risk |
| 3 | Low-end GPU jank | Medium | Mobile fps | Auto-downgrade ladder (§11); DPR clamp; VLM/mobile QA before Batch C |
| 4 | WebGL unavailable (~2–4% users) | Certain (minor share) | Fallback path | Level-4/5 poster fallbacks are first-class, tested (T-3D-08) |
| 5 | LCP/CLS regression | Medium | Release gate | Mount-after-load rule + PerformanceObserver asserts (T-3D-01/03/04); Batch C blocked on green |
| 6 | Monochrome drift (generated colors off-policy) | Medium | Brand consistency | Runtime token palette (§9) + VLM 4/4 gate |
| 7 | Hydration mismatch (SSR/client divergence) | Low | Console errors | `ssr: false` dynamic import; poster is SSG-stable |
| 8 | Scope creep beyond hero | Medium | Plan integrity | §17 non-goals; owner approval covers hero only |
| 9 | Sandbox wipes lose the skill checkout | Certain (recurring) | Rework | Skill re-install is one pinned clone (§7.1); work products live in the repo |
| 10 | Static-export/Pages incompatibility | Low | Deploy | Client-only component; verified by T-3D-13 on live |

## 16. Rollback

- **Batch B/C rollback (instant):** default-off = one-line flag revert; the poster remains (it is additive and harmless). Standard `git revert` semantics per File 13 §11.
- **Full removal:** revert the integration commit(s); the generated factory file may stay (dead code) or be reverted with them — decision recorded at revert time.
- **Never required:** touching the tagline, copy, ECG diagram, or any pre-existing hero element (the 3D layer is strictly additive).

## 17. Non-goals & open questions

**Non-goals:** no 3D beyond the hero; no OrbitControls/user-orbit interaction; no GLB/export targets; no audio; no new routes; no analytics (separately owner-gated per File 12 §16); no cron/scheduled/background automation (standing owner prohibition); no modification of the product repo (read-only reference use); no reopening of any Files 02–13 decision.

**Open questions (owner, non-blocking for Batches A/B):**
1. Batch C enablement sign-off (after owner sees the live flag URL / preview).
2. Honesty-caption wording preference (Batch D): e.g. *"Built in code — no image files."* vs none.
3. Whether a courtesy credit to img2threejs should appear in the repo README (default: yes, one line).

## 18. Definition of done (this plan's implementation)

1. Batches A–C executed per §14 with the standing commit→push→deploy→live-verify cadence;
2. All T-3D-01…13 PASS with evidence in `qa/` + File 12-style addendum;
3. Regressions green: B15 font gate, B12 reduced-motion, T-MOT-05 single-boot, mobile 390, console 0;
4. Measured perf record appended (LCP/CLS/fps/weight vs §15 baseline);
5. Owner enablement decision recorded per File 13 §10;
6. Worklog records for every batch; live site verified post-deploy.

---
*Planning artifact only. No skill installation, model generation, or source modification occurred. Development starts only when the owner says so.*
