import { Orb } from "../hero/Orb";

/**
 * File 21 §4 — BEAT 4 "BAARI" ⭐ (the queue countdown) — ink-950 stage —
 * THE HERO BEAT of the campaign. Phase 3 build (NEXT_PUBLIC_BEATS_34).
 *
 * Story: the USP beat. The token decrements live as you scroll — the system
 * knows, Aturseva tells. (File 16 #4 ⭐ + the campaign line's home: the hero
 * asked "Meri baari kab hai?" — this beat is the answer.)
 *
 * Two renderings, one markup (progressive enhancement):
 *   • Static strip (default, visible): 4 frames — 12 / 8 / 3 / "Baari!" —
 *     readable without scroll. Serves reduced-motion users, no-JS browsers,
 *     crawlers and the self-contained preview artifact.
 *   • Pinned stage (display:none in CSS): the engine reveals it only for
 *     motion users — panel pins (ScrollTrigger, Antigravity pattern) and
 *     across ~150vh of scroll the token counts #12 → #8 → #3 → 0 (M-P-40,
 *     bidirectional scrub), the waiting-room silhouettes shuffle in three
 *     parallax layers (M-P-41), and at 100% the alert moment fires (M-E-42):
 *     panel flash + "Baari! Ab niklo." slam + orb ALERT hop + core flashing
 *     to YOUR TURN. The unpinned panel is peeled away by the next section
 *     (M-P-43). Desktop pointers also get the I-C-42 cursor counter badge.
 *
 * The token belongs to the patient (the campaign's killer insight): the
 * orb's core mirrors it the whole way — this is the "queue token ownership"
 * moment, shown not described.
 *
 * Honesty rails (File 02 / File 21 §4): the clinic is representative, the
 * silhouettes are anonymous dots — never faces — and the queue is the
 * clinic's own, live in the app; Hinglish is contained to Aturseva's voice.
 */

/* M-P-40 segment stops — shared by markup, engine and the static strip. */
const FRAMES: { big: string; small: string; hot?: boolean }[] = [
  { big: "#12", small: "12 log aage hain" },
  { big: "#8", small: "8 log aage hain" },
  { big: "#3", small: "bas teen aage" },
  { big: "Baari!", small: "Ab niklo — sirf aap", hot: true },
];

export function BeatBaari() {
  return (
    <section
      id="beat-baari"
      data-beat4
      aria-labelledby="beat-baari-h2"
      className="grain relative scroll-mt-20 overflow-hidden bg-ink-950 text-ivory-50"
    >
      {/* Ambient glows — the site's dark-stage grammar (matches beat 2) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-15%] top-[-20%] h-[60vh] w-[60vw] rounded-full bg-brand-600/20 blur-[130px]" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-gold-500/10 blur-[110px]" />
      </div>

      {/* ── Header (shared by both renderings; entrance grammar) ── */}
      <div className="relative z-[2] mx-auto max-w-3xl px-5 pt-24 text-center sm:px-8 sm:pt-32">
        <p className="beat-kicker beat-kicker--dark" data-beat-fade>
          Aturseva ka din · 04
        </p>
        <h2
          id="beat-baari-h2"
          className="beat-h2 mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ivory-50 sm:text-5xl"
        >
          <span className="block" data-line>
            Twelve ahead.
          </span>
          <span className="mt-2 block italic text-brand-200" data-line>
            Then you.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg" data-beat-fade>
          The clinic&apos;s queue, live in your hand. Aturseva holds your
          token and counts it down — twelve, eight, three — until the only
          thing left to say is: <em className="font-display italic text-ivory-100">baari</em>.
        </p>
      </div>

      {/* ── STATIC STRIP (reduced-motion / no-JS / crawlers) ───────────
           Default-rendered 4-frame countdown. The engine swaps this out for
           the pinned stage when motion is allowed (gsap.set display, which
           auto-reverts if the preference flips back while mounted). */}
      <div className="relative z-[2] mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-16" data-b4-static>
        <ol className="b4-frames" aria-label="The queue counts down">
          {FRAMES.map((f) => (
            <li key={f.big} className={`b4-frame ${f.hot ? "b4-frame--hot" : ""}`}>
              <p className="b4-frame-big">{f.big}</p>
              <p className="b4-frame-small">{f.small}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-xl text-center text-[11px] font-medium tracking-wide text-ink-400">
          Representative queue — the real token runs on the clinic&apos;s own
          queue, live in the app.
        </p>
      </div>

      {/* ── PINNED STAGE (motion users only; engine reveals + pins) ────
           CSS keeps it display:none; the engine sets display, pins it for
           ~150vh and scrubs the countdown. Unpins into the peel (M-P-43). */}
      <div className="b4-stage" data-b4-pin>
        <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl items-center justify-center px-5 py-16 sm:px-8">
          <div
            className="b4-panel glass relative w-full max-w-2xl rounded-3xl p-5 sm:p-8"
            data-b4-panel
          >
            {/* I-C-42 — cursor counter badge: follows the pointer within the
                pinned stage, syncs to the scrub value (desktop only; the
                engine wires enter/leave + quickTo — touch never sees it). */}
            <span className="b4-cursor" data-b4-cursor aria-hidden="true">
              <span className="b4-cursor-num" data-b4-cursor-num>
                #12
              </span>
              <span className="b4-cursor-label" data-b4-cursor-label>
                aap ka token
              </span>
            </span>

            {/* Panel head */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="orb-dot" aria-hidden="true" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-300">
                  Aturseva · live queue
                </span>
              </div>
              <span className="text-[11px] font-semibold tracking-wide text-ink-400">
                Clinic queue · representative
              </span>
            </div>

            {/* The token card — orb mirrors the live token beside the big
                number (M-P-40). Markup ships segment 0; the engine drives. */}
            <div className="b4-tokenrow">
              <div className="w-[120px] shrink-0 sm:w-[140px]" data-b4-orb>
                <Orb token="#12" coreLabel="aap ka token" size="mini" className="b4-orb" />
              </div>
              <div className="min-w-0">
                <p className="b4-nowlabel">Abhi token</p>
                <p className="b4-token" data-b4-token>
                  #12
                </p>
                <p className="b4-ahead">
                  <span className="b4-aheadnum" data-b4-aheadnum>
                    12
                  </span>{" "}
                  <span data-b4-aheadtext>log aage hain</span>
                </p>
              </div>
            </div>

            {/* M-P-41 — waiting-room micro-scene: anonymous silhouette dots
                 (never faces) in three parallax layers; the engine shuffles
                 them ±6px with the scrub and dims them as tokens pass. The
                 13th dot — "you" — joins at the alert. */}
            <div className="b4-waiting mt-6" data-b4-waiting aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className={`b4-wdot b4-wdot--${i < 4 ? "front" : i < 8 ? "mid" : "back"}`}
                  data-b4-dot
                />
              ))}
              <span className="b4-wdot b4-wdot--you" data-b4-you />
              <p className="b4-waiting-note">Waiting room — anonymous</p>
            </div>

            {/* M-P-40 — the progress rail (fills ink-700 → ink-200 across the
                scrub; tick labels mark the three segment stops + the call). */}
            <div className="b4-rail mt-6" aria-hidden="true">
              <div className="b4-rail-track">
                <div className="b4-rail-fill" data-b4-railfill />
              </div>
              <div className="b4-rail-ticks">
                <span>#12</span>
                <span>#8</span>
                <span>#3</span>
                <span className="b4-rail-end">Baari!</span>
              </div>
            </div>

            {/* M-E-42 — the alert bubble: slams in at 100% ("Baari! Ab
                 niklo."), reverts when scrubbed back. Markup ships it in the
                 pre-alert state; the engine owns visibility. */}
            <div className="b4-bubble" data-b4-bubble role="status">
              <span className="h2b-avatar" aria-hidden="true" />
              <p>
                <strong>Baari!</strong> Ab niklo.
              </p>
            </div>

            <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-ink-400">
              Scroll — the queue moves with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
