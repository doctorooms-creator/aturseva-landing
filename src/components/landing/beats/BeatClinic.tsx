import { Orb } from "../hero/Orb";

/**
 * File 21 §5 — BEAT 5 "CLINIC + SHAAM" (check-in, then the evening nudge)
 * — ivory-50 stage. Phase 4 build (NEXT_PUBLIC_BEATS_56, default on; =0
 * removes beats 5–6 and restores the pre-Phase-4 page instantly).
 *
 * Story: QR check-in at the kiosk (queue/kiosk as verbs Aturseva performs —
 * File 16 R4), then dusk, then the diet nudge. (File 16 #6 + kiosk
 * capability.)
 *
 * Progressive enhancement (site pattern): this server component ships the
 * FINAL state — status CHECKED IN, the dusk gradient complete, the sun at
 * its evening position, the orb already in its night state — so crawlers,
 * the static preview artifact and reduced-motion users get the beat's
 * conclusion with zero JS. The shared vanilla engine (buildBeat5) replays
 * it for motion users: the kiosk assembles, the status resets to WAITING,
 * the day scrubs toward dusk (M-E-50) and the orb dims as the day ends
 * (O-50) — then the check-in is genuinely theirs to tap (I-T-50).
 *
 * Honesty rails (File 02 / File 21 §5): the QR glyph is an abstract
 * decorative pattern — never a scannable real code; the diet card rows are
 * name-blocked (Food A/B/C) and always attributed to the doctor's plan;
 * Hinglish is contained to Aturseva's voice and card titles.
 */

/* I-T-50 — the check-in's two states. The markup ships the final line;
   the engine resets it to the initial one for the replay. */
const TOKENLINE_INITIAL = "QR check-in — ek tap ka kaam.";
const TOKENLINE_FINAL = "Check-in ho gaya — Dr. S. ki live list par aa gaye.";

/* M-E-51 — the diet card rows (name-blocked foods, File 21 §5). Two
   logged reminders + one doctor-flagged avoid — the honest shape of a
   diet follow-up, not a food-intensity tracker. */
const DIET_ROWS: {
  name: string;
  detail: string;
  chip: string;
  avoid?: boolean;
}[] = [
  {
    name: "Food A — kam namak",
    detail: "home-cooked · doctor's list",
    chip: "Logged · 7:02 PM",
  },
  {
    name: "Food B — fresh sabzi",
    detail: "evening slot · doctor's list",
    chip: "Logged · 7:05 PM",
  },
  {
    name: "Food C — bahar ka khana",
    detail: "avoid · doctor's note",
    chip: "Avoid · flagged",
    avoid: true,
  },
];

/* The abstract QR glyph — ink-950 modules on paper-50, decorative only
   (aria-hidden; the caption says the real code lives on the kiosk). */
const QR_MODULES: [number, number][] = [
  [26, 6], [34, 8], [42, 6], [50, 10], [58, 6], [66, 8], [74, 12],
  [26, 26], [38, 26], [50, 26], [62, 26], [74, 26],
  [30, 34], [42, 34], [54, 34], [70, 34], [84, 34],
  [26, 42], [46, 42], [58, 42], [78, 42], [90, 42],
  [34, 50], [50, 50], [66, 50], [82, 50],
  [26, 58], [40, 58], [54, 58], [74, 58], [88, 58],
  [30, 66], [44, 66], [62, 66], [78, 66],
  [26, 74], [38, 74], [56, 74], [70, 74], [86, 74],
  [26, 82], [40, 82], [54, 82], [66, 82],
  [30, 90], [46, 90], [60, 90], [74, 90], [88, 90],
];

/* QR finder patterns (top-left / top-right / bottom-left). */
const QR_FINDERS: [number, number][] = [
  [6, 6],
  [80, 6],
  [6, 80],
];

export function BeatClinic() {
  return (
    <section
      id="beat-clinic"
      data-beat5
      aria-labelledby="beat-clinic-h2"
      className="relative scroll-mt-20 overflow-hidden bg-ivory-50 py-24 sm:py-32"
    >
      {/* M-E-50 — the dusk overlay: markup ships it complete (final state);
          the engine fades it in with the scroll scrub. A pure ivory
          gradient — ~0.2 L* shift, monochrome-safe. */}
      <div className="b5-dusk" data-b5-dusk aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section-entrance grammar (File 21 §global): kicker → headline
            mask-reveal → body fade-up → beat signature moment. */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="beat-kicker" data-beat-fade>
            Aturseva ka din · 05
          </p>
          <h2
            id="beat-clinic-h2"
            className="beat-h2 mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl"
          >
            <span className="block" data-line>
              You walk in.
            </span>
            <span className="mt-2 block italic text-brand-700" data-line>
              She checks you in.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg" data-beat-fade>
            The QR on the kiosk screen knows you&apos;ve arrived — check-in is
            one tap, and the doctor&apos;s live list updates itself. By
            evening, the diet the doctor set is already on Aturseva&apos;s
            reminder list.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ── The kiosk card (I-T-50) ── */}
          <div className="mx-auto w-full max-w-xl lg:mx-0" data-b5-kiosk>
            <div className="b5-kiosk relative rounded-3xl border border-ink-100 bg-white p-5 pt-6 shadow-soft sm:p-7">
              <div className="flex flex-col items-start gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="orb-dot" aria-hidden="true" />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-500">
                    Aturseva · clinic kiosk
                  </span>
                </div>
                <p className="font-display text-xl font-semibold text-ink-950">
                  Bina form. Bina pen.
                </p>
              </div>

              {/* The kiosk screen — dark bezel, the QR card pops inside it.
                  The scan line sweeps when Check-in is tapped (motion only). */}
              <div className="b5-screen mt-5" data-b5-screen>
                <div className="b5-qrcard" data-b5-qrcard>
                  <svg
                    viewBox="0 0 100 100"
                    className="b5-qr-svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {QR_FINDERS.map(([x, y]) => (
                      <g key={`f-${x}-${y}`}>
                        <rect x={x} y={y} width="14" height="14" className="b5-qr-mod" />
                        <rect x={x + 3} y={y + 3} width="8" height="8" className="b5-qr-hole" />
                        <rect x={x + 5} y={y + 5} width="4" height="4" className="b5-qr-mod" />
                      </g>
                    ))}
                    {QR_MODULES.map(([x, y]) => (
                      <rect
                        key={`m-${x}-${y}`}
                        x={x}
                        y={y}
                        width="4"
                        height="4"
                        className="b5-qr-mod"
                      />
                    ))}
                  </svg>
                  <span className="b5-scan" data-b5-scan aria-hidden="true" />
                </div>
                <p className="b5-qr-cap">Aap ka QR — kiosk screen par</p>
              </div>

              {/* I-T-50 — status flip (WAITING → CHECKED IN) + the
                  check-in button. Markup ships the checked-in final state
                  (is-in + pressed + final line) so RM / no-JS / crawlers
                  see one coherent conclusion; the engine resets all three
                  to WAITING for the motion replay. */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="b5-status is-in" data-b5-status role="status">
                  <span className="b5-status-inner">
                    <span className="b5-status-face b5-status-face--front">
                      <span className="b5-status-dot" aria-hidden="true" />
                      Waiting · token #12
                    </span>
                    <span className="b5-status-face b5-status-face--back">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2.5 8.5l3.5 3.5 7-8" />
                      </svg>
                      Checked in · 12:40 PM
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  className="b5-checkin"
                  data-b5-checkin
                  aria-pressed="true"
                >
                  <span className="b5-c-off">Check-in karo</span>
                  <span className="b5-c-on">Checked in ✓</span>
                </button>
              </div>
              <p className="b5-tokenline mt-3.5" data-b5-tokenline>
                {TOKENLINE_FINAL}
              </p>

              {/* Honesty note — decorative QR (File 02 audit) */}
              <p className="mt-5 border-t border-ink-100 pt-4 text-center text-[11px] font-medium tracking-wide text-ink-400">
                Illustrative QR — the real code appears on the kiosk screen.
              </p>
            </div>
          </div>

          {/* ── The dusk column: horizon scrub (M-E-50) + diet nudge
                (M-E-51) + the orb's day ending (O-50) ── */}
          <div className="mx-auto flex w-full max-w-xl flex-col lg:mx-0">
            {/* The horizon — a thin line, a dashed arc, and the sun dot
                that arcs across it with the scroll. Markup ships the
                evening position (final state). */}
            <div className="b5-horizonrow" data-b5-horizon>
              <svg viewBox="0 0 600 140" className="b5-horizon" aria-hidden="true">
                <line x1="24" y1="110" x2="576" y2="110" className="b5-hline" />
                <path d="M 60,110 Q 300,-8 540,110" data-b5-arc className="b5-arc" />
                <circle data-b5-sun cx="540" cy="110" r="7" className="b5-sun" opacity="0.3" />
                <text x="60" y="130" textAnchor="middle" className="b5-htime">
                  12:40 PM
                </text>
                <text x="540" y="130" textAnchor="middle" className="b5-htime">
                  7:00 PM
                </text>
              </svg>
              {/* O-50 — the orb cameo ends its day with yours: idle through
                  the visit, night-dimmed as the dusk completes. Markup
                  ships the night state (final). */}
              <div
                className="pointer-events-none flex w-[76px] flex-none sm:w-[92px]"
                data-b5-orb
                aria-hidden="true"
              >
                <Orb token="7:00" coreLabel="diet nudge" size="cameo" className="orb--night" />
              </div>
            </div>

            {/* M-E-51 — the evening diet nudge card */}
            <div className="b5-diet relative mt-6 rounded-3xl border border-ink-100 bg-white p-5 pt-6 shadow-soft sm:p-6" data-b5-diet>
              <div className="flex flex-col items-start gap-2.5">
                <p className="font-display text-xl font-semibold text-ink-950">
                  Shaam ki diet · 7:00 PM
                </p>
                <span className="b1-schedule-chip">Doctor-set plan</span>
              </div>

              {/* The nudge bubble (Aturseva's voice, b1 light-stage grammar) */}
              <div className="b1-bubble mt-5" data-b5-bubble role="note">
                <span className="h2b-avatar" aria-hidden="true" />
                <p>Doctor ne diet batayi — shaam 7 baje, yaad rakha.</p>
              </div>

              {/* The diet rows — name-blocked foods, check rows */}
              <ul className="mt-4 space-y-2.5">
                {DIET_ROWS.map((r) => (
                  <li
                    key={r.name}
                    className={`b5-row ${r.avoid ? "b5-row--avoid" : ""}`}
                    data-b5-row
                  >
                    <span
                      className={`b5-check ${r.avoid ? "b5-check--avoid" : ""}`}
                      aria-hidden="true"
                    >
                      {r.avoid ? (
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M4 4l8 8M12 4l-8 8" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M2.5 8.5l3.5 3.5 7-8" />
                        </svg>
                      )}
                    </span>
                    <span className="b5-food">
                      <span className="b5-food-name">{r.name}</span>
                      <span className="b5-food-detail">{r.detail}</span>
                    </span>
                    <span className={`b5-row-chip ${r.avoid ? "b5-row-chip--avoid" : ""}`}>
                      {r.chip}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Honesty note — representative card (File 02 audit) */}
              <p className="mt-5 text-center text-[11px] font-medium tracking-wide text-ink-400">
                Representative diet card — the plan always comes from the
                doctor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
