# Aturseva — File 17: AI Character Naming (100 Candidates) + Personality Blueprint + 3D Element Concept

**Status:** `PLANNING — NOT IMPLEMENTED`
**Created:** 2026-10-14 IST (working session; ISO 8601)
**Source baseline:** repository `doctorooms-creator/aturseva-landing`, branch `main`, commit `0a5af06` (File 16 merge point). Sandbox re-cloned this session; working tree clean.
**Planning dependencies:** `docs/02_PRODUCT_TRUTH_AND_CAPABILITY_MATRIX.md` (§4 — the character's hard boundary: AI seva, not AI doctor), `docs/16_SEVIKA_FIRST_POSITIONING_AND_USE_CASES.md` (**positioning stands; NAME rejected by owner** — see §1), `docs/05_CREATIVE_DIRECTION_AND_DESIGN_SYSTEM.md` (monochrome lock binds the 3D element), `docs/08_VISUAL_ASSET_PLAN.md` (§4/§20 imagery gates — a procedural 3D character does not import photo/mesh assets, so those gates are not triggered; design approval remains the owner's), `docs/14_3D_HERO_AND_IMG2THREEJS_PLAN.md` (ARCHIVED — diya direction rejected; its three.js technical lane notes remain reusable for the orb), `/home/z/my-project/NAMING.md`…`NAMING-5.md` (company-naming lineage — character naming deliberately uses DIFFERENT rules, §2).
**Scope:** a complete naming catalogue (100 candidates, 18 families) for the AI care-companion character currently shipped as "Sevika", plus a Grok-pattern personality blueprint and a monochrome 3D-element concept. **Nothing in this document modifies any source file. Development has NOT started (owner instruction pattern continues).**
**Owner decision boundaries:** the owner rejected the name "Sevika" (2026-10-14, §1) and directed: (a) generate a 100-name list, (b) the character must be a *personality* in the mold of xAI's Grok (a named, memorable bot-character — not a feature label), (c) a 3D element is to be built for the character. The pick itself is the owner's; this file structures the choice. All product-rename work (routes/UI copy currently saying "Sevika" in `/home/z/my-project`) is gated on the pick (§7 process).

**Change log:**
| Date | Change | Author context |
|---|---|---|
| 2026-10-14 | File created: owner rejection of "Sevika" recorded; 100-name catalogue (18 families); Grok-pattern analysis; top-10 shortlist; personality blueprint; monochrome 3D "living state orb" concept | Working session, post-File-16 |
| 2026-10-14 | §4A added: owner's GoI question answered (SAATHI + Setu→Saathi story + backronym; Sanjeevani mythic alternate); GoI playbook decoded; 6 story-first round-2 additions; dual recommendation Baari-vs-Saathi | Working session, later |
| 2026-10-14 | §6A added: owner ENDORSED the Living State Orb concept; single-name advertising principle recorded (two-register note in §4 withdrawn); orb = the character's body, name-agnostic; implementation still gated on name pick | Working session, later |

---

## 1. Owner decision record — "Sevika" rejected

The owner (2026-10-14, session record, Hinglish summarized):

- "Sevika naam nahi chalega" — the name is rejected for the character.
- "Iske liye naya name socho, 100 name ki list banao" — a 100-candidate list is required.
- "Ye AI bot hai… character jaisa Musk ka Grok bot hai vesa" — the character must be a *personality-first named entity* like xAI's **Grok**: short, ownable, culture-rooted, voice-driven — not a descriptive job label ("sevika" = literally "female server", which reads as a role, not a character).
- "Vo ek 3D element banana hai" — the character gets a 3D visual element.

**What this changes and what it does NOT change:**
- File 16's *positioning* — ONE key point, the character, queue-number ownership, "Sevika ka din" spine — **STANDS**. Every "Sevika" in File 16 now reads as "the character (name pending)". The spine §8 is provisionally retitled **"[Character] ka din"**.
- The product app currently ships "Sevika" as the feature name (`src/app/dashboard/patient/sevika/*`, chat greeting "Main Sevika hoon"). Renaming is a coordinated product+landing change, gated on the owner's pick (§7 process).

## 2. Character-naming rules (≠ company-naming rules)

Learned from the NAMING-1…5 lineage (company names needed `.com`/`.in` availability, TM classes, GoI-grade gravitas). A **character name** inside a product needs different filters:

| # | Filter | Why |
|---|---|---|
| 1 | **2–3 syllables** — notification-bubble friendly | The name appears in tiny toast bubbles ("___: Token 12 hai") |
| 2 | **Verb-able / phrase-able** (the Grok test) | "Grok it" works; "___ ko poochho" / "meri ___ hai" must work |
| 3 | **Culture-rooted, not invented-from-nothing** | Grok = Heinlein's "deeply understand". Indian root = instant soul |
| 4 | **No human pretense** (File 02 §4.3 + honesty) | Not "Didi"/"Behen"/a common human name that implies a real person |
| 5 | **No deity** | Hanuman/Dhanvantari/Lakshmi for a commercial bot = backlash risk |
| 6 | **No doctor-coding** | Jivaka/Atreya = physician lineage; our boundary is AI seva (File 02 §4) |
| 7 | **3D-mascot synergy** — the name shapes the form | "Bulbul" begs a round bird; "Baari" begs a token-orb |
| 8 | **Quick-conflict scan only** (🟢/🟡 flags) | Full TM check AFTER the owner shortlists (Class 9/42) |

## 3. The 100-name catalogue (18 families)

Flags: ⭐ = shortlist-grade • 🟡 = conflict/sensitivity flag • 🟢 = quick-scan clean.

### A. Brand-DNA coinages (AturSeva khoon) — 5
| # | Naam | Story (1-line) |
|---|---|---|
| 1 | **Atu** ⭐ | atura (patient) root — brand ka apna Pikachu; "Main Atu hoon" |
| 2 | **Aturi** | Atu + -i; feminine coined, zero dictionary |
| 3 | **Turu** | AturSeva contraction; playful invented |
| 4 | **Sevat** | seva + atur blend |
| 5 | **Arvi** 🟡 | atur-root but arbi-sabzi comedy echo |

### B. Companion roots — 7
| # | Naam | Story |
|---|---|---|
| 6 | **Sakhi** | Radha ki sakhis = seva-energy; feminine saathi |
| 7 | **Sakha** | masculine companion |
| 8 | **Sang** | "with" + steady-as-stone double meaning |
| 9 | **Saath** | the tagline word itself — "Main Saath hoon" |
| 10 | **Anvaya** | connection/thread; premium sound |
| 11 | **Bandhu** | kin-ally (NAMING-5 A1 family) |
| 12 | **Nidhi** | treasure-keeper — your health khazana |

### C. Light & warmth — 6
| # | Naam | Story |
|---|---|---|
| 13 | **Noor** ⭐ | light-in-the-dark of illness; 4 letters, pan-India warmth |
| 14 | **Mehr** | Persian grace/kindness; solar |
| 15 | **Shama** | lamp-flame; parwana poetry |
| 16 | **Zia** | light-splendor; coined feel |
| 17 | **Ushas** 🟡 | Vedic dawn — morning-dose vibe; minor-deity flag |
| 18 | **Tej** | radiance/energy; 3 letters, punchy |

### D. Night-watch — 4
| # | Naam | Story |
|---|---|---|
| 19 | **Nisha** | night; after-hours care soul |
| 20 | **Indu** | Sanskrit moon; soft |
| 21 | **Chandni** | moonlight companion |
| 22 | **Ratrani** | night-blooming jasmine — fragrance when it's darkest |

### E. The talking one (voice/birds) — 6
| # | Naam | Story |
|---|---|---|
| 23 | **Bulbul** ⭐ | nightingale — song in the dark; round = 3D-cute |
| 24 | **Koyal** | the dawn-voice you trust |
| 25 | **Maina** | chatty myna; Braj endearment |
| 26 | **Dhwani** | echo/sound |
| 27 | **Swara** | musical note — her voice |
| 28 | **Vaani** 🟡 | speech; product-conflict scan needed |

### F. Memory & timing (her job) — 7
| # | Naam | Story |
|---|---|---|
| 29 | **Yaad** ⭐ | memory itself; self-punning — "Yaad? Haan, Yaad hai" |
| 30 | **Smriti** | memory, classical |
| 31 | **Bela** ⭐ | hour/time-of-day + night-jasmine DOUBLE meaning |
| 32 | **Muhurat** | the auspicious-moment teller |
| 33 | **Kshan** | instant — in-a-kshan response |
| 34 | **Taal** | rhythm/coordination — she keeps your day's taal |
| 35 | **Pal** | the moment; every-pal presence |

### G. Thread & bridge — 5
| # | Naam | Story |
|---|---|---|
| 36 | **Dor** ⭐ | the thread that connects patient↔doctor; 3 letters |
| 37 | **Dhaaga** | warm desi thread |
| 38 | **Silsila** | the chain/sequence of care |
| 39 | **Kram** | order/sequence; Sanskrit crisp |
| 40 | **Setu** 🟡 | bridge; fintech setu.dev adjacency |

### H. Trust & patience — 6
| # | Naam | Story |
|---|---|---|
| 41 | **Bharosa** | trust itself |
| 42 | **Vishwas** | faith |
| 43 | **Dhairya** | patience — the queue virtue |
| 44 | **Aashray** | refuge/shelter |
| 45 | **Thambi** | southern endearing helper |
| 46 | **Nambu** 🟡 | Tamil "to trust"; regional depth |

### I. Compassion (Sanskrit/Pali) — 7
| # | Naam | Story |
|---|---|---|
| 47 | **Karuna** | compassion |
| 48 | **Metta** 🟡 | Pali loving-kindness; Meta visual adjacency |
| 49 | **Mudita** ⭐ | joy-in-your-wellbeing; rare jewel |
| 50 | **Sneha** | affection (+Ayurvedic oleation double) |
| 51 | **Mamta** | maternal love |
| 52 | **Daya** 🟡 | mercy; "Daya" CID-meme risk |
| 53 | **Kripa** | grace |

### J. Awareness (state-knowing) — 5
| # | Naam | Story |
|---|---|---|
| 54 | **Pragya** | awareness/wisdom — she KNOWS |
| 55 | **Chetana** | consciousness; the awake one |
| 56 | **Ila** | Vedic speech-root; 3 letters |
| 57 | **Ritam** | Vedic order/truth — doses ka ritam |
| 58 | **Drishti** 🟡 | vision; existing apps |

### K. Night-blooms & home-plants — 5
| # | Naam | Story |
|---|---|---|
| 59 | **Mogra** | jasmine — temple-mala, every Indian home |
| 60 | **Kumud** | night-lotus; calm elegance |
| 61 | **Tulsi** 🟡 | the household healer plant; religious weight |
| 62 | **Champa** | fragrant bloom |
| 63 | **Juhi** | jasmine, soft |

### L. Modern coinages & Hindi-soul words — 12
| # | Naam | Story |
|---|---|---|
| 64 | **Nurav** | nurse+av coinage |
| 65 | **Ovi** | Marathi lullaby; bot-cute sound |
| 66 | **Nuri** | "my light"; 3D-mascot sound |
| 67 | **Taar** | telegram-wire retro — she sends the taar |
| 68 | **Rimjhim** | drizzle — the notification-patter |
| 69 | **Gungun** | soft humming; lullaby-energy |
| 70 | **Boond** ⭐ | ONE precise drop — the dose metaphor |
| 71 | **Aanchal** | the sheltering drape |
| 72 | **Zara** ⭐ | "just a moment / gently" — the attention word |
| 73 | **Chhaya** | shade; the companion that stays |
| 74 | **Alav** | little hearth-flame |
| 75 | **Saanjh** | evening; day-in-day-out presence |

### M. Queue & message (her superpower) — 6
| # | Naam | Story |
|---|---|---|
| 76 | **Baari** ⭐⭐ | "MY TURN" — the queue word itself; the owner's insight in one name |
| 77 | **Dastak** ⭐ | the gentle knock — reminders personified |
| 78 | **Paigaam** | the message/missive; courier warmth |
| 79 | **Isaara** | the gentle signal before your turn |
| 80 | **Tikaat** | ticket, colloquial |
| 81 | **Khat** | the old letter — "khat aaya hai" |

### N. Nurse-figures & caretaker lore — 5
| # | Naam | Story |
|---|---|---|
| 82 | **Dhaatri** ⭐ | Sanskrit nurse/nurturer — the literal role, rare |
| 83 | **Jivika** | life-keeper (Jivaka lineage, NAMING.md) |
| 84 | **Anusuya** 🟡 | devoted-service icon; religious-lite |
| 85 | **Shabari** 🟡 | seva-devotion; caste-story sensitivity |
| 86 | **Chirag** 🟡 | kept-burning lamp; diya-proximity |

### O. Guardian-sentinel — 4
| # | Naam | Story |
|---|---|---|
| 87 | **Jaag** | awake/watchful — "jaagti rahe" |
| 88 | **Palak** | eyelid — "palak jhapakte hi" presence |
| 89 | **Netra** | the watchful eye |
| 90 | **Prahari** | sentinel; slightly guard-coded |

### P. Playful desi-mascot lane — 5
| # | Naam | Story |
|---|---|---|
| 91 | **Golu** | the round smile-machine |
| 92 | **Laddu** | round-sweet; desi WALL-E energy |
| 93 | **Pillu** | pill + endearment pun — dawai-bot comedy |
| 94 | **Mitthu** 🟡 | household parrot name; repeater implication |
| 95 | **Bholu** | the sweet simple one |

### Q. Dawn & daily-cycle — 3
| # | Naam | Story |
|---|---|---|
| 96 | **Bhor** | dawn — the daily arrival |
| 97 | **Savera** | the morning; "savere savere" care |
| 98 | **Rosh** | roshni-root; coined minimal |

### R. Hope & calm — 2
| # | Naam | Story |
|---|---|---|
| 99 | **Aasha** | hope; universal |
| 100 | **Shanti** | peace — the calm itself |

## 4. The Grok-pattern analysis → top-10 shortlist

Grok's naming DNA: (a) **verb-able** ("grok it"), (b) **culture-rooted** (Heinlein), (c) **short**, (d) **personality-first**, (e) **zero human pretense**. Scoring all 100 on this lens:

| Rank | Naam | Grok-lens verdict |
|---|---|---|
| 1 | **Baari** | Queue-native verb-noun ("baari aa gayi"); the owner's own insight ("ke paas queue number hai") becomes a NAME; ad line writes itself: "Meri baari ka pata sirf Baari ko hai." 🟢 |
| 2 | **Yaad** | Reminder-native, self-punning ("Yaad? — Yaad hai."); verb-able ("yaad rakhna"); 4 letters 🟢 |
| 3 | **Dastak** | The knock = the notification personified; warm, unique for a bot 🟢 |
| 4 | **Bulbul** | Talking companion, nightingale-in-the-dark; most 3D-mascot-ready form 🟢 |
| 5 | **Dor** | Patient↔doctor thread; minimal, monochrome-poetic; "Dor se jude raho" 🟢 |
| 6 | **Noor** | Light-in-illness; 4 letters; pan-India emotional range 🟡 (common word, several products) |
| 7 | **Atu** | Brand-DNA mascot (AturSeva → Atu); 3 letters; ownable like Pikachu 🟢 |
| 8 | **Zara** | The gentleness word — "zara suno"; chatty-Hinglish personality match 🟡 (common human name — File 02 human-pretense check needed) |
| 9 | **Mudita** | Joy-in-your-wellbeing; rare, premium, boundary-safe 🟢 |
| 10 | **Boond** | The precise drop = the dose; "ek boond" is dawa-idiom in every Indian home 🟢 |

**Agent's single recommendation if forced to one:** **Baari** — because it is the only name that encodes the USP (queue-state ownership) *and* passes every Grok filter *and* is honest (a turn/number, not a person, not a healer). ~~Runner-up register note: Baari (the assistant) can coexist with a warm *app-level* word like Noor if the owner wants two registers later.~~ **WITHDRAWN by owner feedback (2026-10-14, later session): advertising with two names would be a mistake — ONE name everywhere (character = voice = campaign face). See §6A.**

## 4A. Round-2 addendum — the GoI lens (owner question, later session 2026-10-14)

The owner asked: *"agar ye bot Indian government launch karti to kya naam rakhti, aur uske peeche ki story kya hoti?"* — a story-first naming lens, recorded here.

**GoI naming playbook (decoded from real precedents):** (a) naam hi kaam ho — Aarogya **Setu** = bridge to health; (b) backronym + warm word — **UMANG** = Unified Mobile Application for New-age Governance, **NITI** Aayog; (c) myth when trust is needed — **Bhashini** (AI language mission), e-Sanjeevani; (d) helpline = warm word — **KIRAN** mental-health helpline; (e) Mitra/Saathi lineage — e-Mitra (Rajasthan), Ayushman Mitra (PM-JAY help-desk role); (f) feminine-warm AI names — Bhashini is GoI's flagship AI-naming precedent.

**The GoI answer: SAATHI (साथी)** — full branding "Aarogya Saathi / AI SAATHI", with the press-note story: *2020 — Aarogya Setu built the bridge (setu) between citizen and health system. Five years later — the AI era — the bridge exists (UPI, Digital India, e-Sanjeevani); what is needed now is the one who walks it WITH you: token-holder, reminder-giver, clinic-companion. "Setu ne jod diya tha. Saathi ab saath dega."* Backronym: **AI SAATHI** — *Smart AI Assistant for Treatment, Health & Inclusion*. Passes every GoI filter: gender-neutral, pan-India comprehensible, no deity, no doctor-claim (companion, not vaidya — matches our File 02 §4 boundary).

**Mythic runner-up: Sanjeevani** — Hanuman's story (couldn't identify the herb among thousands on Dronagiri, so lifted the ENTIRE mountain; mapping: "when reaching the cure is hard, bring the whole system home — token, dose, diet, doctor in the phone"). Rejected for GoI-real use: e-Sanjeevani (GoI telemedicine) already exists, and Sanjeevani = the medicine itself → doctor-coded (conflicts with our AI-seva boundary).

**What the lens teaches this naming exercise:** the owner's repeated "story kya hoti" questions signal **story-first** weighing (GoI lens) in addition to the personality-first Grok lens of §4. Key discovery: **Saathi = the Hindi translation of Aturseva's canonical tagline "Care that walks with you."** — name and tagline explain each other (the same lock Aarogya Setu used: naam hi kaam).

**Round-2 additions (story-first, appended to the §3 catalogue):**
| Naam | Story (1-line) | Flag |
|---|---|---|
| **Saathi** ⭐ | Setu→Saathi arc + tagline-lock; gender-neutral companion | 🟡 common word (several brands); fine for in-app character, attorney check if campaign face |
| **Kiran** | Govt mental-health helpline warmth precedent — "ghatan me ek kiran" | 🟢 |
| **Madad** | MEA portal lineage — "madad ab pocket me" | 🟢 |
| **Sampark** | Govt outreach-portal lineage — connection/touch | 🟢 |
| **Jagriti** | awakening — morning-dose energy | 🟢 |
| **Sanjeevani** | Hanuman's whole-mountain story | 🟡 e-Sanjeevani conflict + doctor-coded |
| ~~Sevini / Arogyini~~ | Bhashini-pattern feminine agentive coinages — phonetically awkward; skipped with reason | — |

**Updated dual recommendation:** the race is now **Baari (USP-first: queue ownership, private-brand ad energy) vs Saathi (story-first: tagline-locked, trust energy)**. Baari wins the ad; Saathi wins the trust. The pick remains owner-gated. Claim-gate reminder (R3): any GoI-style availability claim ("har pal", "24 ghante") in borrowed press-note phrasing must pass File 02 §4 reality before use.

## 5. Personality blueprint (Grok-pattern, Aturseva-soul)

| Pillar | Grok does | Our character does |
|---|---|---|
| Voice | Neutral-witty, provocative | **Warm-witty, Hinglish-first** — "Token 12 hai. 15 minute. Ab niklo." |
| Edge | Rebels against norms | **Rebels against tadna/tension** — anti-anxiety humor: "Line me baithe ho? Main hoon. Chill." |
| Confidence | First-person strong | State-aware confidence: "Mujhe pata hai — teri baari 3 log baad hai" |
| Limits | Openly scorns rules | **Openly honors limits**: "Main nurse hoon, bhagwan nahi. Dose doctor badalega, main yaad rakhungi." |
| Loyalty | To truth | **To your plan** — doctor-approved attribution on every medical line (File 02 §4) |

**Signature lines (draft, File 02-gated before use):**
- Greeting: "Namaste! Main ___ hoon. Dawai, token, diet — poochho."
- Queue: "Baari #12. Teen log bache. Chappal pakad lo." *(name-dependent)*
- Missed dose: "Chhoot gayi? Koi baat nahi — 2 ghante ka window hai. Le lo."
- Boundary: "Ye doctor ne bataya hai. Main bas pahuncha rahi hoon."
- Night: "Sona. Main jaag rahi hoon."

**Identity honesty rule (binding):** the character is always presented as AI — no human disguise, no invented biography, no real-person implication (File 08 §5 + File 02 §4.3).

## 6. The 3D element — "Living State Orb" concept (monochrome)

**Form:** a floating, softly rounded **orb** (graphite `#101113`–`#34383a` body, paper-50 rim light) — deliberately **faceless** (avoids uncanny valley + the no-fake-human rule) — with a **live core** that displays the character's *state* instead of a face: the queue token number, the next-dose countdown, a pulse line.

**Why an orb, not a humanoid:** (a) File 05 monochrome minimalism; (b) File 08 identity rules; (c) the strongest name candidates (Baari/Boond/Noor/Dor) all map naturally to a round/point form; (d) Grok itself ships abstract geometry, not a human replica.

**Motion states (idle/interactive):**
| State | Motion | Meaning |
|---|---|---|
| Idle | slow breathe (scale 1.00→1.03, 4s loop) | alive, calm |
| Listening | tilt toward cursor/input + rim brighten | attentive |
| Speaking | concentric ripple rings | her voice |
| Alert (baari!) | single hop + core flashes token number | the turn moment |
| Night | dim to 40% luminance, slower breathe | quiet watch |

**Integration lanes:** hero (single orb + token in core = the 5-second comprehension the owner demanded), chat launcher, notification toasts, loading states. **Tech lane:** three.js (R3F) — File 14's archived plan retains the reusable technical lane notes; img2threejs skill remains available if a richer form is chosen later. **File 08 gates:** a procedural 3D element is code-only (no photo/mesh asset enters the repo) — the §4 imagery gates are NOT triggered; the *design* approval remains the owner's.

**B12/Motion compliance:** all loops respect reduced-motion (static finale state); GSAP remains the page-level engine; the orb renders inside the existing canvas budget (File 12 §15 baselines re-measured at integration time).

## 6A. Owner endorsement of the 3D element + the single-name principle (2026-10-14, later session)

The owner reviewed §6 and endorsed the "Living State Orb" direction, quoting its core properties back (faceless monochrome form; live state in the core — queue token / dose countdown; five motion states; hero placement giving 5-second comprehension). Recorded endorsement, with the owner's own strategic reason:

> Advertising with **two names would be an issue** ("2 name se advertising krna" = problem). The orb avoids this structurally: **the 3D element is the character's BODY, not a second brand asset needing its own name.** One name → one form → one voice → one campaign. The orb is also name-agnostic — whichever name the owner picks (Baari / Saathi / other), the visual identity does not change; only the voice and the ad lines do.

**Binding principles from this feedback (effective immediately for all future work):**
1. **Single-name rule:** exactly one character name across product, landing, ads, app store, notifications. No dual-register naming (the withdrawn §4 note is the only casualty; its plan is dead).
2. **The orb is the character's body:** any 3D work builds THE character's form, never a separate mascot.
3. **Live-state principle (owner-quoted):** 3D must never be mere decoration — the core shows real state (token/countdown); this is the difference between a widget and a wallpaper.

**Gate unchanged:** the implementation batch still waits on the name pick (§7 step 1). The orb concept itself is now owner-endorsed and no longer needs a separate direction approval.

## 7. Process after the owner picks (gated — not started)

1. Owner selects 1 name (or asks for a focused round-2 on any family).
2. TM quick-check Class 9/42 + app-store collision scan on the finalist(s).
3. File 02 §4 rewrite (Sevika rows → new name; capability claims unchanged), File 16 amendment (spine retitled), File 13 §10 item 7 closes.
4. Product rename plan (`/home/z/my-project`: routes, chat copy, page titles) + landing integration plan (File 15 R-series narrative consumes the new name).
5. 3D orb implementation batch (hero + chat launcher) with T-3D QA catalogue from File 14's reusable lane.
6. Deploy + worklog per standing rules.

## 8. Non-goals

- No name is chosen by this document (owner's call).
- No product or landing source is modified.
- No 3D asset is generated or committed.
- The "Sevika" name is not erased from historical docs (decision trail preserved; File 16 carries the amendment note only).

## 9. Definition of done (future implementation batch)

1. Owner's pick recorded in File 13 §10 + File 02 updated. 2. Product rename complete and verified. 3. Landing narrative (File 15 R-series) tells "[Name] ka din" with File 02-verified claims. 4. Orb shipped in monochrome with reduced-motion path. 5. QA: T-UI + T-3D + font/monochrome gates green. 6. Worklog + evidence per convention.
