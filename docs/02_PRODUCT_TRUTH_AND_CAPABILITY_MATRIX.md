# Aturseva — File 02: Product Truth & Capability Matrix

**Document type:** Factual product-reference for all future Aturseva marketing-site design and development.
**Status:** Confirmed by the product owner on 2026-10-12.
**Companion to:** File 01 (`01_PROJECT_BRIEF_AND_BOUNDARIES.md` — see §13 for its current status).
**Rule for every later prompt:** before any copy, visual, or feature claim is written, check this document first. If a capability is not listed here as working, do not present it as working.

---

## 1. Purpose and how to use this file

- Distinguish **real, working product capabilities** from **illustrative website visuals**.
- Prevent invented claims, invented numbers, and feature drift between prompts.
- Keep product descriptions consistent across all future pages and components.

Three kinds of information are kept deliberately separate in this file:

| Kind | Where | Example |
|---|---|---|
| Facts (what the product does) | §2–§7, §8 matrix | "Patients can book appointments." |
| Marketing presentation guidance | §8 column 4, §9.1 | "Show booking as a representative UI mock." |
| Boundaries and wording cautions | §8 column 5, §9.2, §10, §11 | "Never promise zero waiting." |

---

## 2. Authoritative product status

The product owner has confirmed that the capabilities described in this file are **built and working product capabilities** — not roadmap items.

Consequences for all marketing work:

- Never label these capabilities "coming soon", "planned", "concept", "in development", or "not yet available".
- Never soften them into speculation ("Aturseva could one day…").

**Honesty nuance (keep):** this confirmation comes from the product owner. The author of marketing material has not independently QA-tested every feature, and must not claim to have done so. This document is a **product-truth reference, not a technical QA report**. Marketing copy should therefore describe capabilities plainly ("patients can…") without asserting third-party verification.

---

## 3. Working capabilities — patient mobile app

All of the following are working in the patient app:

1. **Discover** doctors and hospitals.
2. **Choose** a hospital/department and select a doctor.
3. **Book** appointments.
4. **Track the live queue** — queue progress, token position/status, and countdown/estimated-wait information **where the app displays it**.
5. **Attend video consultations** — the doctor initiates the video call.
6. **Access digital medical reports and records** through the patient workflow.
7. **Register as a walk-in** by scanning a hospital QR code, selecting department/doctor, registering, and joining the queue.
8. **Register manually/assisted** when a walk-in patient does not have a smartphone (front-desk supported).
9. **Receive relevant appointment and queue updates** through the product's patient workflow.

---

## 4. Working capabilities — Sevika (patient-care assistant)

Sevika is an **existing, working part of the patient app**.

### 4.1 Positioning (mandatory framing)

- Sevika is a **supportive assistant that helps patients navigate their care journey**.
- Sevika is **not** a doctor or nurse replacement, and must never be framed as one.
- Preferred wording patterns: "doctor-approved reminders", "supports the care plan set by your doctor", "helps you stay in step with your care".
- Reminders are **never independent medical decisions** — they follow doctor-approved schedules.

### 4.2 Working capabilities

- Help with **appointment booking** and the booking journey.
- **Notify patients about their place/turn in the queue**.
- Send **medication reminders based on doctor-approved schedules**.
- Support **doctor-approved diet/care instructions**.
- Send **follow-up reminders**.
- **Support or initiate the next appointment booking when authorised** by the patient/workflow.
- Use **relevant patient-record or care-plan context only where access is authorised**.

### 4.3 Hard boundaries for Sevika depictions

Sevika must never be shown or described as:

- Independently **diagnosing** anything.
- **Prescribing** medication or treatment.
- **Changing medication doses** or overriding a doctor's instructions.
- Making autonomous medical decisions of any kind.

### 4.4 Language policy (site-wide)

| Surface | Language |
|---|---|
| All public marketing copy: navigation, headings, buttons, feature descriptions, explanatory text | Professional, natural **English** |
| Sevika conversation **examples** | **Hinglish allowed** — only when intentionally demonstrating a multilingual patient experience |

The Hinglish exception is **contained to the example itself**. Incidental Hinglish in examples must never leak into making the rest of the site bilingual.

---

## 5. Working capabilities — doctor workflows

- Doctor **account access, plan selection, and payment/login flow**.
- Doctor **schedule/availability management**.
- **Unified/merged queue** for in-person and video consultations.
- **View patients in queue** with relevant patient context/records available through the system.
- **Mark a patient as visited** and work through the consultation queue.
- **Priority handling where supported by the workflow**.
- **Manage follow-ups** and coordinate with the connected care workflow.
- **Assistant/AI capabilities already included in the working product** — described at a high level only.

**Explicitly out of scope unless the owner supplies them later:** plan names, pricing, trial durations, revenue outcomes, clinical accuracy percentages, named customers. Do not invent any of these.

---

## 6. Working capabilities — hospital & clinic management software

Existing hospital/provider software with interconnected roles:

- **Reception/front-desk** workflow — including QR-based walk-in registration and assisted/manual registration.
- **Assistant-doctor** workflow.
- **Doctor** workflow.
- **Hospital/clinic administrator** workflow.
- **Pharmacy** workflow.
- **Laboratory** workflow.
- **Connected workflows between these roles** where enabled by the product.
- **Shared queue/appointment operations** for online and walk-in patients.
- **Operational visibility** through the existing management software.
- **Existing AI capabilities** as product functionality — high-level description only unless a specific, confirmed behaviour is documented.

**Framing rule:** Aturseva **supports and connects** the work of clinicians, receptionists, pharmacy and laboratory staff. It never replaces them.

---

## 7. The connected care journey (as supported by the product)

1. Patient **discovers** a provider and selects a department/doctor.
2. Appointment is **booked**, or a walk-in patient **registers** by QR/assisted registration.
3. Patient **enters the relevant queue**.
4. **Queue status/turn updates** help the patient understand when to attend.
5. Doctor **conducts the consultation** — including video consultation when used.
6. **Records/reports remain accessible** through the patient workflow.
7. **Sevika supports** doctor-approved reminders and follow-up.
8. Patient can **continue the journey** with an authorised follow-up/next appointment.

The experience connects **patient-facing app workflows with provider/hospital operations**. Do not imply that every external hospital system, third-party laboratory, pharmacy, wearable, insurer, or government system is automatically integrated unless explicitly confirmed.

---

## 8. Capability matrix

Legend for column 4 — "Representation":
- **RI** = Representative illustration (mock UI/data; must be labelled e.g. "Representative preview"; must not look like a live screenshot or live data feed).
- **NF** = Narrative/flow graphic (explains the workflow; no data shown).
- **C** = Plain factual claim (safe to state in copy).

| # | Capability area | Working capability — what the product does | Primary user(s) | Marketing-site representation (allowed) | Boundaries / wording cautions |
|---|---|---|---|---|---|
| 1 | Discovery & booking | Discover doctors/hospitals; choose hospital/department; select doctor; book appointments | Patient | RI patient booking flow; NF journey lane; C "book appointments with doctors and hospitals" | No fake real-world hospital/doctor names; no claims about number of doctors/hospitals listed |
| 2 | QR / assisted walk-in registration | Walk-in scans hospital QR → selects department/doctor → registers → joins queue; assisted/manual registration for patients without smartphones | Walk-in patient; reception/front-desk | NF QR moment in journey graphics; RI reception scenario | Assisted registration is human-supported by front-desk staff — do not imply phoneless patients are handled without staff; QR flow applies at hospitals using Aturseva reception software |
| 3 | Unified queue & turn updates | Live queue progress, token position/status, countdown/estimated wait **where the app displays it**; shared queue for online + walk-in patients | Patient; doctor; reception | RI queue card with token + status (label "Representative preview"); C "see live queue status and your token position" | Never promise exact wait times, "zero waiting", or priority; estimates are informational and shown where the app displays them |
| 4 | Video consultation | Patient attends video consultation; **doctor initiates** the call | Patient; doctor | RI video window in product mock; NF connected-consultation moment | Doctor-initiated — do not imply patients can cold-call doctors anytime; do not position for emergencies/urgent care |
| 5 | Digital reports & records | Patients access digital medical reports/records; doctors view patient context/records available through the system | Patient; doctor | RI reports list (labelled); C "access your reports and records in one place" | Only records available through the system and authorised for access — no universal hospital-records or lifetime-records claims |
| 6 | Doctor scheduling & queue workflow | Schedule/availability management; unified in-person + video queue; view patients in queue with available context; mark visited; priority handling where supported; follow-up coordination | Doctor; assistant-doctor | RI doctor day-view mock (labelled); C capability statements | "Priority handling where supported" — never imply guaranteed queue-jumping; no clinical-decision claims |
| 7 | Hospital/clinic management roles | Reception (QR + assisted registration), assistant-doctor, doctor, administrator, pharmacy, laboratory workflows; connected role workflows where enabled; operational visibility | Hospital/clinic staff (multiple roles) | NF role-based workflow graphics; RI hospital operations view | Product supports staff — never replaces clinicians, receptionists, pharmacy or lab staff; no claim that every role is integrated at every hospital |
| 8 | Sevika — booking support | Helps with appointment booking and the booking journey | Patient (Sevika in patient app) | RI Sevika chat example (Hinglish allowed per §4.4) | Supportive assistant, not doctor/nurse replacement; example contained, rest of site stays English |
| 9 | Sevika — queue notifications | Notifies patients about their place/turn in the queue | Patient | RI notification bubble in Sevika thread | Notifications reflect queue state — no zero-wait or priority promises |
| 10 | Doctor-approved medication reminders | Reminders based on doctor-approved schedules | Patient (Sevika); schedule set/approved by doctor | RI reminder thread with "Doctor-approved" attribution; C "doctor-approved reminders" | Wording must attribute to doctor approval — "supports the care plan set by your doctor"; never "AI decides your medicines"; Sevika never changes doses |
| 11 | Approved care/diet instructions | Supports doctor-approved diet/care instructions | Patient; doctor approves the plan | RI care-instruction card attributed to the doctor's plan | Instructions originate from the doctor's plan — Sevika conveys them, does not create them |
| 12 | Follow-ups & authorised rebooking | Follow-up reminders; supports/initiates next appointment booking when authorised by patient/workflow | Patient; doctor (coordinated follow-ups) | RI follow-up bubble + rebooking prompt; C "authorised follow-up booking" | "When authorised" — no autonomous booking/spam implications; follow-ups coordinate with the doctor's workflow |
| 13 | Doctor plans / payment / login | Doctor account access, plan selection, payment/login flow | Doctor | C at most ("choose a plan that fits your practice"); pathway CTA | **No plan names, pricing, trials, durations, revenue or adoption claims** — out of scope until the owner supplies them |
| 14 | Existing AI capabilities | Assistant/AI capabilities already included in the working product (incl. Sevika's assistance) | Patient; doctor; hospital staff (role-dependent) | High-level statements only: "AI-powered assistance that supports care coordination" | **High level only** — no AI diagnoses, no clinical recommendations, no accuracy percentages, no autonomous medical decisions, no unconfirmed outcomes |

---

## 9. Claims policy

### 9.1 Allowed

- Explain the working capabilities listed in §3–§8.
- Explain that Aturseva **supports and connects** patients, doctors, and hospitals.
- Describe the app and provider software as **one connected healthcare journey**.
- Describe Sevika as **supportive and doctor-guided**.
- Use **clearly labelled representative UI** (e.g. "Representative preview") to make a workflow understandable. A visual may explain a workflow, but must not be presented as a live screenshot or live data feed unless it really is one.

### 9.2 Not allowed without new, explicit evidence from the owner

- **Invented numbers:** patients served, doctors onboarded, hospitals, savings, queue-time reductions, retention, accuracy, or success rates.
- **Unverified social proof:** partner/customer logos, testimonials, awards, accreditations, regulatory claims, certifications.
- **Outcome guarantees:** guaranteed diagnosis, cure, outcomes, zero waiting, or medical decisions made autonomously by AI.
- **Replacement claims:** that the product replaces doctors, nurses, receptionists, hospitals, pharmacies, or labs.
- **Compliance claims:** HIPAA certification/compliance or any other compliance status — unless the owner verifies the exact status and scope.
- **Universal integration claims:** that every third-party system (labs, pharmacies, wearables, insurers, government systems) is integrated.
- **Invented commercial terms:** pricing, plans, trials, or launch availability.

---

## 10. Strategic positioning to preserve

Aturseva is a **helping hand, not a competitor** to doctors or hospitals. The shared purpose is better coordinated care and a better experience for the patient. The patient journey is the entry point; doctors and hospitals are collaborators in that same journey.

Philosophy to keep in view in every design decision:

- Human-first, technology-powered.
- Care and coordination, not replacement.
- Support the patient before, during, and after a visit.
- Show how workflows connect instead of presenting unrelated feature tiles.
- The product exists and is working; the website's job is to explain it clearly and credibly.

---

## 11. Website communication constraints (confirmed)

These are **confirmed creative constraints** for all future marketing design:

1. **Public-facing marketing copy:** natural, polished English.
2. **Sevika examples:** may use Hinglish when intentionally demonstrating multilingual patient interaction — keep this exception contained to the example itself.
3. **Brand palette:** **monochrome — black, white, and grey only.** The current implementation's teal/green/gold/ivory colour system is **not an approved direction** and must not be carried forward into future design work. (Exact HEX tokens belong in the later design-system file, not this capability document.)
4. **Visual approach:** human-first cinematic healthcare moments paired with **monochrome motion graphics** that explain connected workflows.
5. **No unsupported medical promises, fake stats, fake testimonials, or invented integrations.**
6. **Homepage narrative order:** first establish the human healthcare journey → then explain connections → then reveal representative product interfaces → then show Sevika's role → then the pathways for patients, doctors, and hospitals.

---

## 12. Relationship to the current live implementation (v1)

The live v1 landing page predates the constraints confirmed in this file. For future prompts:

| Aspect of live v1 | Alignment with this file |
|---|---|
| English marketing copy throughout | ✅ Aligned (§11.1) |
| "Representative preview" labelling on product mock | ✅ Aligned (§9.1) |
| Sevika reminders framed as "doctor-approved" | ✅ Aligned (§4.1) |
| Homepage narrative order (journey → connection → product → Sevika → pathways) | ✅ Aligned (§11.6) |
| **Teal/green/gold/ivory palette** | ❌ **Deviation** — monochrome is the approved direction (§11.3); a future design pass must supersede the current palette |
| Hinglish in Sevika examples | Optional, not yet present — allowed per §4.4 when demonstrating multilingual experience |

This file does **not** trigger an immediate redesign of the live page; it records what the approved direction is, so the next design/implementation prompt can execute it correctly.

---

## 13. Relationship to File 01 and document status

- This file continues the one-file-at-a-time Aturseva workflow and inherits the project boundaries established in **File 01 — `01_PROJECT_BRIEF_AND_BOUNDARIES.md`**.
- **Workspace status note (2026-10-12):** the sandbox was reset after File 01 was written; the File 01 document itself was lost and only its source prompt survives at `/home/z/my-project/upload/01_PROJECT_BRIEF_AND_BOUNDARIES_PROMPT_ZAI.md` (read-only). Key boundary facts are therefore restated here in minimal form: the landing workspace is `/home/z/landing-v2/`, fully isolated from the product repo `/home/z/my-project/`; the approved logo lives at `public/assets/logo-primary.svg` (never modify the original); no backend/API integration; honest copy only; the live public URL is https://doctorooms-creator.github.io/aturseva-landing/ with source on GitHub (`doctorooms-creator/aturseva-landing`, branch `main`).
- General project-boundary detail beyond these references should be re-derived from the File 01 prompt if a future task needs it.

**End of File 02.**
