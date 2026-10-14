import { Orb } from "../hero/Orb";

/**
 * File 21 §1 — BEAT 1 "SUBAH" (the morning dose) — ivory-50 stage.
 * Phase 2 build (NEXT_PUBLIC_BEATS_V2, default on; =0 removes the day-story
 * beats and restores the pre-Phase-2 page instantly).
 *
 * Story: Aturseva's day starts before yours — the dose timeline assembles,
 * the reminder arrives, the day's rhythm is set. (File 16 #1 Reminder +
 * #2 Yaad-dilane wali.)
 *
 * Progressive enhancement (site pattern): this server component ships the
 * FINAL state — timeline complete, reminder bubble visible, adherence chips
 * on their front faces — so crawlers, the static preview artifact and
 * reduced-motion users get the whole beat with zero JS. The shared vanilla
 * engine (aturseva-anim.js buildBeat1) replays the assembly: rows slide in
 * stagger (M-E-11), the reminder bubble pops (M-L-10), the orb cameo
 * ripples (O-10).
 *
 * Honesty rails (File 02): medicine rows are neutral slot labels — a
 * representative schedule, never a real prescription; Hinglish is contained
 * to Aturseva's voice (the bubble); every dose follows "the doctor's
 * prescription", not our advice.
 */

/* I-H-10 — adherence chips: front = the action, back = what the product
   actually records (File 16 #2, honest micro-demo). */
const ADHERENCE_CHIPS: { front: string; back: string }[] = [
  { front: "Le li ✓", back: "Recorded · 9:02" },
  { front: "Yaad dilaya", back: "Reminder logged" },
  { front: "Snooze", back: "Pushed · 10 min" },
];

/* M-E-11 — the 4 time rows. Neutral slot labels (representative schedule). */
const DOSE_ROWS: { time: string; med: string; detail: string; now?: boolean }[] = [
  { time: "09:00", med: "Morning dose", detail: "1 tablet · after breakfast", now: true },
  { time: "14:00", med: "Midday dose", detail: "1 tablet · after lunch" },
  { time: "20:00", med: "Evening dose", detail: "1 tablet · after dinner" },
  { time: "22:30", med: "Night dose", detail: "½ tablet · before sleep" },
];

export function BeatSubah() {
  return (
    <section
      id="beat-subah"
      data-beat1
      aria-labelledby="beat-subah-h2"
      className="relative scroll-mt-20 bg-ivory-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section-entrance grammar (File 21 §global): kicker → headline
            mask-reveal → body fade-up → beat signature moment. */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="beat-kicker" data-beat-fade>
            Aturseva ka din · 01
          </p>
          <h2
            id="beat-subah-h2"
            className="beat-h2 mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl"
          >
            <span className="block" data-line>
              Her day starts
            </span>
            <span className="mt-2 block italic text-brand-700" data-line>
              before yours.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg" data-beat-fade>
            8:04 AM. The dose timeline is already assembled, the first
            reminder is on its way — and every slot follows the
            doctor-approved schedule, not guesswork.
          </p>
        </div>

        {/* ── The dose-timeline card (M-E-10) with orb cameo (O-10) ── */}
        <div className="relative mx-auto mt-16 max-w-2xl" data-beat-fade>
          {/* Orb cameo — floats in the card's top-right corner (the head
              stacks left, so the corner stays clear); idle-breathe, ripples
              when the reminder bubble pops (engine). */}
          <div
            className="pointer-events-none absolute -top-10 right-4 z-[2] w-[88px] sm:-top-14 sm:right-8 sm:w-[112px] lg:-right-2 lg:-top-16 lg:w-[120px]"
            data-b1-orb
            aria-hidden="true"
          >
            <Orb token="9:00" coreLabel="next dose" size="cameo" />
          </div>

          <div
            className="b1-card relative rounded-3xl border border-ink-100 bg-white p-5 pt-6 shadow-soft sm:p-7"
            data-b1-card
          >
            {/* Card head — stacked left so the orb's corner stays clear; the
                one gold-bordered "Doctor-approved schedule" chip (static) */}
            <div className="flex flex-col items-start gap-2.5">
              <p className="font-display text-xl font-semibold text-ink-950">
                Aaj ka schedule
              </p>
              <span className="b1-schedule-chip">Doctor-approved schedule</span>
            </div>

            {/* M-L-10 — the reminder bubble (ships visible; the engine replays
                the pop when the 9:00 row reaches viewport centre) */}
            <div className="b1-bubble mt-5" data-b1-bubble role="note">
              <span className="h2b-avatar" aria-hidden="true" />
              <p>Aaj ki dawai — 9 baje.</p>
            </div>

            {/* M-E-11 — dose timeline rows (slide in, stagger 0.15s) */}
            <ul className="mt-4 space-y-2.5">
              {DOSE_ROWS.map((r) => (
                <li
                  key={r.time}
                  className={`b1-row ${r.now ? "b1-row--now" : ""}`}
                  data-b1-row
                >
                  <span className="b1-time">{r.time}</span>
                  <span className="b1-med">
                    <span className="b1-med-name">{r.med}</span>
                    <span className="b1-med-detail">{r.detail}</span>
                  </span>
                  <span className={`b1-status ${r.now ? "b1-status--now" : ""}`}>
                    {r.now ? "Next" : "Scheduled"}
                  </span>
                </li>
              ))}
            </ul>

            {/* I-H-10 — adherence chips: flip to reveal what the product
                 records (tap anywhere; hover previews on desktop). */}
            <div className="mt-6 border-t border-ink-100 pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                Tap a chip — see what Aturseva records
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {ADHERENCE_CHIPS.map((c) => (
                  <button
                    key={c.front}
                    type="button"
                    className="b1-chip"
                    data-b1-flip
                    aria-pressed="false"
                  >
                    <span className="b1-chip-inner">
                      <span className="b1-chip-face b1-chip-face--front">{c.front}</span>
                      <span className="b1-chip-face b1-chip-face--back">{c.back}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Honesty note — representative schedule (File 02 audit) */}
            <p className="mt-5 text-center text-[11px] font-medium tracking-wide text-ink-400">
              Representative schedule — doses always follow the doctor&apos;s
              prescription.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
