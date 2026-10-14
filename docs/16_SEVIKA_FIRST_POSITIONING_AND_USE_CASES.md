# Aturseva — File 16: Sevika-First Positioning ("One Key Point: The AI Seva Character")

**Status:** `PLANNING — NOT IMPLEMENTED`

> **NAME AMENDMENT (2026-10-14, later session):** the owner REJECTED the name "Sevika" ("sevika name nai chalega") and directed a new character-name search with Grok-pattern personality + a 3D element — see `docs/17_AI_CHARACTER_NAMING_AND_DESIGN.md` (100 candidates, top-10, personality blueprint, monochrome orb concept). **This file's POSITIONING stands unchanged**: one key point = the character; queue-number ownership; the "Sevika ka din" spine (§8) is provisionally retitled "[Character] ka din" pending the owner's name pick. All "Sevika" reads below = "the character (name pending)". **RESOLVED (2026-10-14, later session): the owner locked the character name to ATURSEVA itself** (brand = character, Alexa pattern) — the spine is definitively **"Aturseva ka din"** and the execution plan is File 18. This file's positioning §1–§7 and use-case catalogue §4 stand verbatim with the name substituted.
**Created:** 2026-10-14 IST (working session; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `bfab719` (File 15 merge point). Sandbox re-cloned this session; working tree clean.
**Planning dependencies:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (**§4 Sevika truth — the hard boundary of every claim in this file**), `docs/03_BRAND_MISSION_AND_POSITIONING.md` (Sevika role), `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md` (mandatory design baseline — monochrome tokens, Fraunces/Manrope — unchanged by this file), `docs/15_PRODUCT_UI_FIRST_LANDING_REDESIGN_PLAN.md` (design vehicle — this file supplies the narrative spine that File 15's UI demonstration will carry), `docs/13_DEPLOYMENT_AND_HANDOVER_PLAN.md` (§10 decision recording).
**Scope:** a **positioning decision record + Sevika use-case catalogue** — the owner's direction that Aturseva's single key point is **Sevika as the main character**, replacing the multi-feature story (video call, queue, kiosk told as separate heroes). **Nothing in this document modifies any source file. Development has NOT started (owner instruction, 2026-10-14).**
**Owner decision boundaries:** the owner stated this direction in-session (2026-10-14, Hinglish, summarized in §1). This file records and structures that direction; the owner's approval is the *source* of it, not a pending gate on this document. **What remains gated:** the landing narrative rewrite (File 15 batches), any Sevika visual identity/imagery (File 08 §4/§20 gates unchanged), and any future product feature listed in §5 (the "coming" tier — none may be claimed as current).

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-14 | File created: owner direction recorded; use-case catalogue (8 verified / 5 future); narrative spine proposal; advertising implications | Working session, post-File-15 |

---

## 1. Owner direction — verbatim intent (session record)

The owner's message (2026-10-14, translated/structured; original Hinglish preserved in session log):

- Competitors doing online consultation make their key point obvious **within seconds of landing** — the site tells you what the company does.
- Aturseva's patient side has Sevika, QR kiosk, queue — **but the landing must choose ONE key point**, not tell everything.
- "Abhi AI ka boom hai" — the right move is to ride it with the one thing that is genuinely ours: **Sevika and her use cases**.
- The sharpest framing offered by the owner: *"Sevika book kar rahi hai doctor ki appointment, turn aane pe reminder de rahi hai — kyunki **Sevika ke paas apna queue number hai**."* Sevika is inside the system, holds real state, and acts on it.
- Therefore: **Sevika = main character.** Video call, queue, kiosk = supporting features that Sevika *uses*, not separate heroes.
- Advertising becomes easy with one character: one face, one campaign.
- Explicit instruction: **"do not start development"** — first think through Sevika's use cases (what she does, what she could do), then build her as the main character.

**Agent's independent take (recorded for completeness, offered in-session before this file):** agreement, on four grounds — (a) competitor scan: no Indian health platform owns an AI care-companion *character*; the category tells an identical three-bullet story; (b) the queue-number insight distinguishes Sevika from a generic chatbot (state-aware vs FAQ-answering); (c) product verification confirms every "today" use case is real (§4); (d) a character is the only kind of USP that survives ad compression — a feature list can't be remembered in 5 seconds, a name can.

---

## 2. Strategic frame — why one key point wins

| Factor | Multi-feature story (current risk) | Sevika as single key point |
|---|---|---|
| Landing comprehension | 6 sections, 8+ ideas; nothing sticks in 5s | One name, one promise: *"care that walks with you"* made literal |
| Competitive category | Same bullets as Practo/Apollo/1mg/Tata | No incumbent owns an AI seva character — open lane |
| Ad compressibility | Feature lists don't fit a hoarding/notification ad | "Token 12 hai? Sevika ko pata hai." — one line, one character |
| Trust mechanism | Trust asked-for, not shown | Trust shown-through-state: Sevika knows the queue, the dose, the plan — because she's inside the system (not bolted on) |
| AI-boom timing | AI as a buried feature | AI as the face — but honest AI (§3) |

**The one-line hierarchy (proposed wording, subject to owner taste):**

> Aturseva = the platform. **Sevika = the experience.** Queue, booking, reminders, diet, QR kiosk = the things Sevika does *for you*.

Features do not disappear — they demote from "heroes" to "verbs Sevika performs." This is the structural difference from the current page.

---

## 3. The trust boundary (non-negotiable, from File 02 §4)

Sevika is **AI seva, not AI doctor.** Every depiction in every future asset must hold this line:

1. Sevika **conveys** doctor-approved plans; she never creates, changes, or decides medical content. Doses, diet, care instructions — all attributed to the doctor (File 02 §4 wording rules).
2. She is a **supportive assistant** navigating the care journey — never framed as doctor/nurse replacement (File 02 §4.3 hard boundary).
3. Positioning strength (not weakness): *"Doctor ki care plan, Sevika ke haath"* — the doctor's authority is amplified, not competed with. In Indian healthcare, trust flows through the doctor; Sevika is the seva layer that keeps that trust intact between visits.
4. Transparency: she is presented as an AI assistant — never disguised as a human, never invented as a real person (ties to File 08 §5 no-identifiable-person rule).

---

## 4. Use-case catalogue — AAJ (product-verified, claimable now)

All eight verified against the working product code this session (route/UI evidence cited). Wording is **Hinglish-capable in examples only** (File 02 §4.4 exception).

| # | Avatar (working label) | What she does | Product evidence (verified 2026-10-14) | Landing claim shape (honest) |
|---|---|---|---|---|
| 1 | **Reminder wali Sevika** | Today's dose timeline from doctor-approved schedules | `api/dashboard/patient/sevika/today` (doses + adherence + active medicines in one call); `schedules`, `times` routes | "Aaj ki dawai, 9 baje — doctor-approved schedule se" |
| 2 | **Yaad-dilane wali** | Missed/skipped dose catch-up inside a 2h late-take window; Yaad dilaya / Snooze / Le li states | `today` P3 catch-up rail (CATCHUP_WINDOW_MS 2h); `doses/[id]` late-taken + reschedule; UI badges verified | "Chhoot gayi? Sevika 2 ghante tak yaad dilati hai" |
| 3 | **Rx-photo wali** | Patient photographs paper prescription / medicine strip → VLM drafts a medicine list → patient confirms → schedules created | `parse-photo` route (`lib/sevika/rx-parse`, confirm-first safety rail, nothing saved without confirmation) | "Prescription ka photo bhejo — Sevika bana degi aapki dawai list (aap confirm karo)" |
| 4 | **Queue wali** ⭐ | Holds the patient's queue number; notifies place/turn as it approaches | File 02 §4 capability #9 (queue notifications); queue feature in appointments/book/notifications (product pages verified) | **Hero use case:** "Token 12. 3 log bache. 15 minute me turn — clinic nikal jao." |
| 5 | **Booking wali** | Helps with appointment booking and the booking journey | File 02 §4 capability #8; booking flow pages verified | "Doctor ki appointment — Sevika se baat karke" |
| 6 | **Diet wali** | Conveys the latest doctor-approved diet plan | `today` includes `getLatestDietPlan`; `diet` route | "Doctor ne diet batayi — Sevika roz yaad rakhegi" |
| 7 | **Chat wali** | AI-nurse chat: dawai, diet, reminders — kuch bhi poochho | `sevika/chat.tsx` ("Namaste, main Sevika hoon — aapki AI nurse"); chat API | "Sevika se poochhein — hafte me 7 din, din me 24 ghante" *(phrasing: availability claim must match reality before use — see §7 risk R3)* |
| 8 | **Doctor ki Sevika** (side B) | Mirrors adherence back to the prescribing doctor | `api/dashboard/doctor/sevika/adherence` + doctor sevika page | Closes the loop: "Doctor ko bhi dikhti hai aapki regularity — ilaaj behtar" (B2B bridge line) |

⭐ = owner's own framing; the instinct is product-true. **#4 is the campaign lead** (§6) because it is the one use case no chatbot competitor can copy without being inside the queue system.

**Catalogue rule:** this table is the *complete* claimable set. Anything not in this table is not claimable as "today" — no exceptions, per File 02.

---

## 5. Use-case catalogue — AANE WALE DIN (future tier)

Explicitly **not claimable now**; may only appear later with clear "coming" marking, each gated on real product build + File 02 update first. None is committed to a timeline by this file.

| # | Concept | One line | Why it fits the character |
|---|---|---|---|
| F1 | Boli wali Sevika | Voice in Hindi/vernacular | The chat already speaks Hinglish; voice is the natural warmth step |
| F2 | Parivaar wali | Family care coordination ("Papa ki aaj ki dawai") | Elder-care is the emotional core of Indian healthcare decisions |
| F3 | Smart reschedule | Auto-proposes new slot when doctor runs late | State-aware Sevika's logical next act (she already knows the queue) |
| F4 | Report samjhaane wali | Summarizes reports in simple bhasha | Doctor-authored trust + comprehension service |
| F5 | Taiyaari wali | Pre-visit prep guidance (documents, fasting, etc.) | Extends booking support into the waiting gap |

**Governance:** F-tier items require (a) product build, (b) File 02 capability-row addition, (c) owner approval — before any landing mention.

---

## 6. Advertising implications (owner's "easy to advertise" point, structured)

1. **Character campaign pattern:** one face → one recall. The Sevika name + queue-number line compress to a single notification-shaped ad: *"Token 12 hai? Tumhein sirf Sevika bata sakti hai."*
2. **Ad formats unlocked by the catalogue:** reminder-screenshot ads (#1/#2), Rx-photo demo ads (#3), queue-countdown ads (#4), chat-moment ads (#7). Each maps 1:1 to a verified use case — no invented claims needed.
3. **Two-sided story:** #8 gives doctor-side campaigns ("aapke patients ki regularity, aapki screen par") without a second character.
4. **Hinglish register:** ad copy can live in Hinglish (character's authentic voice), while the site remains English (File 02 §4.4 containment rule — ads are a separate channel; still attribute all medical content to doctors).

---

## 7. Risks and guards

| ID | Risk | Guard |
|---|---|---|
| R1 | Sevika drifts into "AI doctor" framing under marketing pressure | §3 boundary is copied into every future asset brief; File 02 §4.3 audit applies to ads too |
| R2 | Character imagery decisions (illustration? photo? abstract?) reopen the File 08 imagery gates | **Unchanged:** any Sevika visual identity work is owner-gated (File 08 §4/§20); the prompts delivered in-session (P1–P5) were exploration only |
| R3 | Availability/quality claims in ad shapes (e.g. "24/7") outrunning product reality | Every §4 landing-claim shape is a *template with a claim-check note*, not approved copy; final wording passes File 02 §4 before use |
| R4 | Feature demotion read as feature deletion (queue/kiosk/video vanish from the story) | They become verbs Sevika performs — the QR kiosk line stays as "clinic check-in, Sevika ke through" in the journey sections |
| R5 | Conflict with File 15 | None by design: File 15 = design vehicle (product-UI demonstration); File 16 = narrative spine (Sevika as the character inside that UI). The File 15 §Sevika-chat moment is *promoted* from one moment to the protagonist across moments |

---

## 8. Proposed landing narrative spine ("Sevika ka din") — outline only

For a future File 15 batch plan (R-series) to consume; **no implementation authorized by this section.**

1. **Hero:** the promise + the character in one glance — Sevika's message bubble holding a queue token ("Token #12 — 15 min"). The 5-second comprehension the owner demanded.
2. **The day:** morning dose reminder → Rx-photo moment → booking chat → queue countdown → clinic QR check-in → evening diet nudge. Each beat = one §4 use case, told as chat/notification UI (File 15's product-UI vehicle).
3. **The boundary, shown honestly:** a quiet "doctor-approved" attribution beat — Sevika conveying the plan, crediting the doctor (§3 made visible, once).
4. **Side B:** one doctor-screen moment (#8) — the loop closes.
5. **Paths/CTA:** patient / doctor / hospital routes unchanged (File 04 truth), now framed as "Sevika ke saath shuru karein."

---

## 9. Non-goals

- No source, style, asset, config or workflow change in this commit (docs-only, zero rendering delta).
- No Sevika visual identity is chosen (illustration vs photo vs abstract = owner + File 08 gates).
- No F-tier feature is promised, dated or designed.
- No ad copy is finalized (claim shapes only; File 02 gate before use).
- File 15 is not superseded — it is completed by this spine.

## 10. Definition of done (for the future implementation batch, not this file)

1. Owner approves the spine (§8) as the File 15 R-series narrative. 2. Landing sections remapped to beats with File 02-verified claims only. 3. Every Sevika line passes the §3 boundary audit. 4. QA: T-UI family (File 15) + monochrome/font gates re-run. 5. Worklog + evidence per convention.
