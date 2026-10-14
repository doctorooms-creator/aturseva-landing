import { Orb } from "../hero/Orb";

/**
 * File 21 §2 — BEAT 2 "Rx PHOTO" (the paper→plan moment) — ink-950 stage.
 * Phase 2 build (NEXT_PUBLIC_BEATS_V2, default on).
 *
 * Story: photo in, draft out, confirmation yours — the confirm-first safety
 * rail made visible, our most trust-building beat. (File 16 #3.)
 *
 * Progressive enhancement: markup ships the FINAL composed state — photo
 * laid in, all three rows confirmed, the rail's final line visible — so
 * crawlers / the static preview / reduced-motion users see the beat's
 * conclusion with zero JS. The engine (buildBeat2) resets the rows to
 * DRAFT for motion users, drops the photo card in (M-E-20, bounce settle),
 * runs the orb scan-line (O-20) and slides the DRAFT rows out of the photo
 * (M-E-21) — then the confirm rail (I-H-20) is genuinely theirs to tap.
 *
 * Honesty rails (File 02 / File 21 §2): the photo is a CSS-composed
 * placeholder (scribble lines — no real Rx, no fake patient data) labelled
 * "representative sample"; medicines are name-blocked (A/B/C); Hinglish is
 * contained to Aturseva's rail voice; the cursor label (I-C-21) is
 * desktop-only (hover:none never ships dead zones).
 */

/* M-E-21 — name-blocked draft rows: the VLM output moment. */
const DRAFT_ROWS: { med: string; dose: string }[] = [
  { med: "Medicine A", dose: "1-0-1 · after food · 5 days" },
  { med: "Medicine B", dose: "½-0-½ · before food · 10 days" },
  { med: "Syrup C", dose: "10 ml · night only · 7 days" },
];

/* CSS-composed prescription scribbles (ink-300 strokes on paper-100). */
const SCRIBBLES = [
  "M30 34 q 22 -6 44 0 t 44 0 t 20 0",
  "M30 48 h 52",
  "M30 64 h 250",
  "M30 92 q 12 -4 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0",
  "M30 112 q 12 -4 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0",
  "M30 132 q 12 -4 24 0 t 24 0 t 24 0 t 24 0",
  "M30 152 q 12 -4 24 0 t 24 0 t 24 0",
];

export function BeatRxPhoto() {
  return (
    <section
      id="beat-rx"
      data-beat2
      aria-labelledby="beat-rx-h2"
      className="grain relative scroll-mt-20 overflow-hidden bg-ink-950 py-24 text-ivory-50 sm:py-32"
    >
      {/* Ambient glows — the site's dark-stage grammar (matches hero v2) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[-20%] h-[60vh] w-[60vw] rounded-full bg-brand-600/20 blur-[130px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-gold-500/10 blur-[110px]" />
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="beat-kicker beat-kicker--dark" data-beat-fade>
            Aturseva ka din · 02
          </p>
          <h2
            id="beat-rx-h2"
            className="beat-h2 mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ivory-50 sm:text-5xl"
          >
            <span className="block" data-line>
              Paper in.
            </span>
            <span className="mt-2 block italic text-brand-200" data-line>
              Plan out.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-200 sm:text-lg" data-beat-fade>
            A photo of the prescription becomes a draft medicine list in
            seconds — and nothing becomes a medicine until you confirm it.
            The safety rail, shown not described.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          {/* ── LEFT: the prescription photo (M-E-20, CSS-composed) ── */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0" data-b2-photo-wrap>
            <div className="b2-photo" data-b2-photo>
              <span className="b2-rx-glyph" aria-hidden="true">
                ℞
              </span>
              <svg
                viewBox="0 0 320 170"
                className="b2-scribbles"
                fill="none"
                aria-hidden="true"
              >
                {SCRIBBLES.map((d) => (
                  <path key={d} d={d} className="b2-scribble" />
                ))}
                {/* signature flourish + stamp */}
                <path
                  d="M226 138 q 8 -14 16 0 q 6 10 14 -2 q 8 -10 16 2"
                  className="b2-scribble b2-scribble--sig"
                />
                <circle cx="272" cy="112" r="20" className="b2-stamp" />
                <circle cx="272" cy="112" r="14" className="b2-stamp b2-stamp--in" />
              </svg>
            </div>

            {/* I-C-21 — contextual cursor label (desktop only; the engine
                moves it point-to-point inside this zone, Antigravity
                "Watch case" pattern, our copy). */}
            <span className="b2-cursor" data-b2-cursor aria-hidden="true">
              Chhoo ke dekho
            </span>

            <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-ink-400">
              Prescription photo · representative sample
            </p>
          </div>

          {/* ── RIGHT: the draft list + confirm rail (I-H-20) ── */}
          <div className="glass relative rounded-3xl p-5 sm:p-6" data-beat-fade>
            {/* Orb cameo (O-20) — scan-line sweeps the core while the rows
                generate (engine). */}
            <div
              className="pointer-events-none absolute -top-12 -right-2 z-[2] w-[96px] sm:-right-8 sm:w-[120px]"
              data-b2-orb
              aria-hidden="true"
            >
              <Orb token="3" coreLabel="medicines" size="cameo" />
            </div>

            <div className="mb-4 flex items-center justify-between gap-3 pr-16 sm:pr-20">
              <div className="flex items-center gap-2">
                <span className="orb-dot" aria-hidden="true" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-300">
                  Aturseva · draft list
                </span>
              </div>
              <span className="text-[11px] font-semibold tabular-nums text-ink-400">
                3 medicines
              </span>
            </div>

            {/* M-E-21 — DRAFT rows. Markup ships CONFIRMED (final state);
                 the engine resets to DRAFT for the animated replay. */}
            <ul className="space-y-2.5">
              {DRAFT_ROWS.map((r) => (
                <li key={r.med} className="b2-row is-confirmed" data-b2-row>
                  <div className="b2-row-main">
                    <p className="b2-med">{r.med}</p>
                    <p className="b2-dose">{r.dose}</p>
                  </div>
                  <span className="b2-badge b2-badge--draft" aria-hidden="true">
                    DRAFT
                  </span>
                  <span className="b2-badge b2-badge--done" data-b2-done aria-hidden="true">
                    ✓
                  </span>
                  <button
                    type="button"
                    className="b2-confirm"
                    data-b2-confirm
                    aria-pressed="true"
                  >
                    <span className="b2-c-off">Confirm</span>
                    <span className="b2-c-on">
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
                      Confirmed
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* I-H-20 — the confirm rail: "Aap confirm karo" */}
            <div className="b2-rail mt-5" data-b2-rail>
              <p className="b2-rail-head">
                <strong>Aap confirm karo</strong>
                <span className="text-ink-300"> — tab tak sab sirf DRAFT hai.</span>
              </p>
              {/* Final line — markup visible (final state); the engine hides
                  it until all three rows are confirmed. */}
              <p className="b2-rail-final" data-b2-final>
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 8.5l3.5 3.5 7-8" />
                </svg>
                Sab confirm ✓ — list final. Ab reminders set.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
