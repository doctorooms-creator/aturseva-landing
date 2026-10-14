import type { ReactNode } from "react";

/**
 * File 21 §6 + §8 — BEAT 6 "BOUNDARY + DOCTOR-SIDE" (the honest close)
 * — ink-950 stage, with the "01/06…06/06" day rail folded in at the
 * section's foot (LaunchFar pattern — deliberately NOT a 7th section).
 * Phase 4 build (NEXT_PUBLIC_BEATS_56, default on).
 *
 * Story: the trust beat, shown not claimed. Then the loop closes on the
 * doctor's screen. (File 16 §3 + #8.)
 *
 * Progressive enhancement (site pattern): this server component ships the
 * FINAL state — the boundary line fully readable, the adherence ring drawn
 * at 72%, the rail's QUEUE LIVE token at its "aap ki baari" conclusion —
 * so crawlers, the static preview artifact and reduced-motion users get
 * the whole close with zero JS. The shared vanilla engine (buildBeat6)
 * replays it for motion users: the boundary words fade in one deliberate
 * word at a time (M-E-60 — the slowest moment on the page), the ring draws
 * 0→72% with a counting centre (M-E-61), and the rail cards stagger in.
 *
 * Honesty rails (File 02 / File 21 §6): the doctor is name-blocked; the
 * dashboard is labelled `representative`, never real data; the boundary
 * line is Aturseva's own scope statement — reminders and reporting, with
 * every medical decision left with the doctor.
 */

/* The 7 day-chips (I-H-61) — 5 taken, 2 missed ≈ the 72% ring. */
const DAYS: { label: string; full: string; taken: boolean }[] = [
  { label: "M", full: "Monday", taken: true },
  { label: "T", full: "Tuesday", taken: true },
  { label: "W", full: "Wednesday", taken: true },
  { label: "T", full: "Thursday", taken: true },
  { label: "F", full: "Friday", taken: true },
  { label: "S", full: "Saturday", taken: false },
  { label: "S", full: "Sunday", taken: false },
];

/* ── The adherence ring geometry (7 segments around r=76, viewBox 200) ── */
function polar(deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [100 + 76 * Math.cos(rad), 100 + 76 * Math.sin(rad)];
}
function segPath(i: number): string {
  const seg = 360 / DAYS.length;
  const a0 = -90 + i * seg + 4;
  const a1 = -90 + (i + 1) * seg - 4;
  const [x0, y0] = polar(a0);
  const [x1, y1] = polar(a1);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A 76 76 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/* ── The day rail (File 21 §8) — one card per beat, status tags,
     smooth-scroll links (I-T-70). The QUEUE LIVE card carries the live
     mini-token that mirrors beat 4's state (the page remembering its own
     story — markup ships the final "aap ki baari" state). */
const RAIL: {
  n: string;
  title: string;
  tag: string;
  href: string;
  live?: boolean;
  icon: ReactNode;
}[] = [
  {
    n: "01/06",
    title: "Dose reminder",
    tag: "Reminder on",
    href: "#beat-subah",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
  {
    n: "02/06",
    title: "Rx to plan",
    tag: "Rx → draft",
    href: "#beat-rx",
    icon: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 13l2 2 4-4" />
      </>
    ),
  },
  {
    n: "03/06",
    title: "Chat booking",
    tag: "Booked",
    href: "#beat-booking",
    icon: (
      <>
        <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2z" />
        <path d="M9 9l2 2 4-4" />
      </>
    ),
  },
  {
    n: "04/06",
    title: "Queue baari",
    tag: "Queue live",
    href: "#beat-baari",
    live: true,
    icon: (
      <>
        <path d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6z" />
        <circle cx="12" cy="12" r="1.6" />
      </>
    ),
  },
  {
    n: "05/06",
    title: "Clinic shaam",
    tag: "Diet on",
    href: "#beat-clinic",
    icon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />,
  },
  {
    n: "06/06",
    title: "Doctor loop",
    tag: "Loop closed",
    href: "#beat-boundary",
    icon: (
      <>
        <path d="M4 12a8 8 0 0 1 14-5.3" />
        <path d="M20 12a8 8 0 0 1-14 5.3" />
        <path d="M18 3v4h-4" />
        <path d="M6 21v-4h4" />
      </>
    ),
  },
];

export function BeatBoundary() {
  return (
    <section
      id="beat-boundary"
      data-beat6
      aria-labelledby="beat-boundary-h2"
      className="relative scroll-mt-20 bg-ink-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── M-E-60 — THE BOUNDARY LINE. The h2 itself is the moment: a
            large Fraunces beat fading in word by word (0.8s each, 0.25s
            stagger — the slowest, most deliberate reveal on the page).
            Not the standard mask grammar: plain words, plain fades. */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="beat-kicker beat-kicker--dark" data-beat-fade>
            Aturseva ka din · 06
          </p>
          <h2
            id="beat-boundary-h2"
            className="mt-8 font-display text-4xl font-semibold leading-[1.14] tracking-tight text-ivory-50 sm:text-5xl lg:text-6xl"
          >
            <span className="block" data-b6-bw>
              Dose doctor badalega.
            </span>
            <span className="mt-3 block italic text-brand-300" data-b6-bw>
              Main yaad rakhungi.
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg" data-beat-fade>
            The honest boundary, shown not claimed: Aturseva reminds,
            tracks, and reports — the doctor decides. And the loop closes
            on the doctor&apos;s screen.
          </p>
        </div>

        {/* ── M-E-61 — the doctor-screen mirror (glass on ink-950) ── */}
        <div className="mx-auto mt-16 max-w-2xl" data-beat-fade>
          <div className="glass b6-doc relative rounded-3xl p-5 pt-6 sm:p-7" data-b6-doc>
            {/* Panel head — name-blocked + representative-labelled */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="orb-dot" aria-hidden="true" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-300">
                  Dr. S. · patient view
                </span>
              </div>
              <span className="b6-rep">representative</span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-9">
              {/* The adherence ring — 7 day-segments, 5 filled ≈ 72%.
                  Markup ships it drawn (final state); the engine replays
                  the draw with the counting centre. */}
              <div className="b6-ringwrap" aria-hidden="true">
                <div className="b6-ring">
                  <svg viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="76" className="b6-track" />
                    {DAYS.map((d, i) => (
                      <path
                        key={`seg-${i}`}
                        d={segPath(i)}
                        className={`b6-seg ${d.taken ? "b6-seg--on" : "b6-seg--off"}`}
                      />
                    ))}
                  </svg>
                </div>
                <div className="b6-center">
                  <p className="b6-pctline">
                    <span className="b6-pct" data-b6-pct>
                      72
                    </span>
                    <span className="b6-pct-sign">%</span>
                  </p>
                  <p className="b6-center-label">reported regularity</p>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="b6-days-line">
                  Doctor ko bhi dikhti hai aapki regularity — ilaaj behtar.
                </p>
                <p className="mt-2 text-[12px] font-medium text-ink-400">
                  5 of 7 days · weekly report
                </p>

                {/* I-H-61 — the 7 day-chips: hover/tap one and its ring
                    segment highlights (engine wires the pairing). */}
                <div className="mt-5" role="group" aria-label="Adherence by day">
                  <div className="b6-days">
                    {DAYS.map((d, i) => (
                      <button
                        key={`${d.full}-${i}`}
                        type="button"
                        className={`b6-day ${d.taken ? "b6-day--on" : ""}`}
                        data-b6-day={i}
                        aria-label={`${d.full} — ${d.taken ? "dose logged" : "not logged"}`}
                      >
                        {d.label}
                        <span className="b6-day-dot" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Honesty note — representative data (File 02 audit) */}
            <p className="mt-6 border-t border-white/10 pt-4 text-center text-[11px] font-medium tracking-wide text-ink-500">
              Representative dashboard — never real patient records.
            </p>
          </div>
        </div>

        {/* ── The day rail (File 21 §8) — the day in six beats, folded
            into this section's foot. Cards smooth-scroll to their beat;
            the QUEUE LIVE card mirrors beat 4's live token. */}
        <div className="mt-20 border-t border-white/10 pt-10" data-b6-rail>
          <div className="flex flex-wrap items-baseline justify-between gap-3" data-beat-fade>
            <p className="eyebrow text-ink-300">Aturseva ka din — 6 beats</p>
            <p className="text-[11px] font-medium tracking-wide text-ink-500">
              Tap a card — us pal par wapas
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {RAIL.map((c) => (
              <a key={c.n} href={c.href} className="rail-card">
                <span className="rail-num">{c.n}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="rail-ic"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {c.icon}
                </svg>
                <span className="rail-title">{c.title}</span>
                {c.live ? (
                  <span className="rail-live">
                    <span className="rail-live-dot" aria-hidden="true" />
                    <span data-rail-token>0 · aap ki baari</span>
                  </span>
                ) : (
                  <span className="rail-tag">{c.tag}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
