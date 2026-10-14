import { Orb } from "../hero/Orb";

/**
 * File 21 §3 — BEAT 3 "BOOKING" (chat se appointment) — ivory-100 stage.
 * Phase 3 build (NEXT_PUBLIC_BEATS_34, default on; =0 removes beats 3–4
 * and restores the pre-Phase-3 page instantly).
 *
 * Story: "Aturseva ne book kar di." The chat books what the hero promised.
 * (File 16 #5.) The whole appointment happens inside one conversation —
 * no forms, no phone calls, no waiting on hold.
 *
 * Progressive enhancement (site pattern): this server component ships the
 * FINAL state — a slot selected, the booked ticket visible — so crawlers,
 * the static preview artifact and reduced-motion users get the beat's
 * conclusion with zero JS. The shared vanilla engine (buildBeat3) replays
 * it for motion users: doctor card slides in (M-E-30), the conversation
 * assembles, the chips reset to unselected — then the booking is genuinely
 * theirs to tap (I-T-30): chip selected → typing dots 0.8s → the ticket
 * stamps in (back.out(1.8)) with quiet confetti (M-L-31) and the orb's
 * alert-hop (O-30).
 *
 * Honesty rails (File 02 / File 21 §3): the doctor is name-blocked
 * ("Dr. S., MD — Internal Medicine" — never an identifiable real doctor);
 * the ₹400 fee is representative; Hinglish is contained to the
 * conversation's voices; real slots always come from the doctor's own
 * calendar — the note under the card says so.
 */

/* I-T-30 — the three open slots. data-b3-line is what the booked ticket
   shows; the engine also mirrors the chosen time into the orb's core. */
const SLOTS: { day: string; time: string; line: string }[] = [
  { day: "Mon", time: "10:30", line: "Mon · 10:30 — home visit, Dr. S." },
  { day: "Tue", time: "18:00", line: "Tue · 18:00 — home visit, Dr. S." },
  { day: "Wed", time: "09:15", line: "Wed · 09:15 — home visit, Dr. S." },
];

export function BeatBooking() {
  return (
    <section
      id="beat-booking"
      data-beat3
      aria-labelledby="beat-booking-h2"
      className="relative scroll-mt-20 bg-ivory-100 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section-entrance grammar (File 21 §global): kicker → headline
            mask-reveal → body fade-up → beat signature moment. */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="beat-kicker" data-beat-fade>
            Aturseva ka din · 03
          </p>
          <h2
            id="beat-booking-h2"
            className="beat-h2 mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl"
          >
            <span className="block" data-line>
              You chat.
            </span>
            <span className="mt-2 block italic text-brand-700" data-line>
              She books.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg" data-beat-fade>
            The appointment happens inside the conversation. Aturseva reads
            the doctor&apos;s open slots, lays them out as chips, and books
            the one you tap — reminder included, before you even close the
            app.
          </p>
        </div>

        {/* ── The booking chat panel (M-E-30) with orb cameo (O-30) ── */}
        <div className="relative mx-auto mt-16 max-w-2xl" data-beat-fade>
          {/* Orb cameo — floats in the panel's top-right corner (head stacks
              left so the corner stays clear). Core mirrors the live state:
              "3 · open slots" until a chip is tapped, then the booked time. */}
          <div
            className="pointer-events-none absolute -top-10 right-4 z-[2] w-[88px] sm:-top-14 sm:right-8 sm:w-[112px] lg:-right-2 lg:-top-16 lg:w-[120px]"
            data-b3-orb
            aria-hidden="true"
          >
            <Orb token="10:30" coreLabel="booked slot" size="cameo" />
          </div>

          <div
            className="b3-panel relative rounded-3xl border border-ink-100 bg-white p-5 pt-6 shadow-soft sm:p-7"
            data-b3-card
          >
            {/* Panel head — stacks left, orb owns the top-right corner */}
            <div className="flex flex-col items-start gap-2.5 pr-20 sm:pr-24">
              <div className="flex items-center gap-2">
                <span className="orb-dot" aria-hidden="true" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-500">
                  Aturseva · booking
                </span>
              </div>
              <p className="font-display text-xl font-semibold text-ink-950">
                Ek chat mein — ho gaya.
              </p>
            </div>

            {/* M-E-30 — the doctor card (name-blocked, slides in first) */}
            <div className="b3-doc mt-5" data-b3-doc>
              <span className="b3-doc-avatar" aria-hidden="true">
                S.
              </span>
              <div className="b3-doc-info">
                <p className="b3-doc-name">Dr. S., MD — Internal Medicine</p>
                <p className="b3-doc-detail">Home visit · 30 min · ₹400 consultation</p>
              </div>
              <span className="b3-doc-badge" aria-hidden="true">
                name withheld
              </span>
            </div>

            {/* The conversation thread (b3 grammar = h2b, light-stage) */}
            <div className="b3-thread mt-4" data-b3-thread>
              <div className="b3-b b3-b--user" data-b3-user>
                <p>Dr. S. se milna hai — ghar par.</p>
              </div>
              <div className="b3-b b3-b--bot" data-b3-bot>
                <span className="h2b-avatar" aria-hidden="true" />
                <p>Theek hai. Yeh slots khuli hain — chuno:</p>
              </div>

              {/* I-T-30 — slot chips (≥44px; markup ships the first slot
                  selected; the engine resets to unselected for the replay). */}
              <div className="b3-slots" role="group" aria-label="Open slots — choose one">
                {SLOTS.map((s, i) => (
                  <button
                    key={s.day + s.time}
                    type="button"
                    className="b3-slot"
                    data-b3-slot
                    data-b3-time={s.time}
                    data-b3-line={s.line}
                    aria-pressed={i === 0 ? "true" : "false"}
                  >
                    <span className="b3-slot-day">{s.day}</span>
                    <span className="b3-slot-time">{s.time}</span>
                  </button>
                ))}
              </div>

              {/* Typing dots — shown by the engine for the 0.8s between
                  chip tap and the booked ticket (never under reduced-motion). */}
              <div className="b3-b b3-b--bot b3-typing" data-b3-typing aria-hidden="true">
                <span className="h2b-avatar" aria-hidden="true" />
                <span className="h2b-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>

            {/* The booked ticket — stamps in on booking (I-T-30 finale).
                 Markup ships it visible (final state); the engine hides it
                 for the replay. role=status so taps are announced. */}
            <div className="b3-booked mt-5" data-b3-booked role="status">
              {/* M-L-31 — quiet confetti: 6 tiny ink squares, engine-driven */}
              <span className="b3-conf" aria-hidden="true" />
              <span className="b3-conf" aria-hidden="true" />
              <span className="b3-conf" aria-hidden="true" />
              <span className="b3-conf" aria-hidden="true" />
              <span className="b3-conf" aria-hidden="true" />
              <span className="b3-conf" aria-hidden="true" />

              <div className="b3-booked-main">
                <span className="b3-booked-check" aria-hidden="true">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 8.5l3.5 3.5 7-8" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="b3-booked-title">Booked</p>
                  <p className="b3-booked-slot" data-b3-slotline>
                    Mon · 10:30 — home visit, Dr. S.
                  </p>
                </div>
              </div>
              <p className="b3-booked-sub">Aturseva yaad dilayegi.</p>
            </div>

            {/* Honesty note — representative example (File 02 audit) */}
            <p className="mt-5 border-t border-ink-100 pt-4 text-center text-[11px] font-medium tracking-wide text-ink-400">
              Representative example — doctor name-blocked; real slots always
              come from the doctor&apos;s own calendar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
