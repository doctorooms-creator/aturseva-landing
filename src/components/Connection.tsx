import { Logo } from "./Logo";

/**
 * §3 — SIGNATURE SCROLL SECTION (desktop: pinned + scrubbed;
 * mobile: choreographed auto-play; reduced-motion: static finale).
 * Three lanes draw apart → converge into the Aturseva hub → one
 * booking travels through doctor + hospital workflows → Sevika
 * stays beside the patient.
 */

const LANES = {
  separate: {
    patient: "M 30,110 C 190,70 380,150 560,110",
    doctor: "M 30,300 C 190,260 380,340 560,300",
    hospital: "M 30,490 C 190,450 380,530 560,490",
  },
  converged: {
    patient: "M 30,110 C 150,110 220,190 380,300",
    doctor: "M 30,300 C 150,300 220,300 380,300",
    hospital: "M 30,490 C 150,490 220,410 380,300",
  },
  unified: "M 380,300 C 560,260 760,340 960,300 C 1030,280 1080,250 1150,215",
};

export function Connection() {
  return (
    <section
      id="connection"
      className="grain relative overflow-hidden bg-ink-950 text-ivory-50"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[30%] top-[20%] h-[50vh] w-[40vw] rounded-full bg-brand-700/25 blur-[120px]" />
        <div className="absolute right-[8%] top-[10%] h-[35vh] w-[30vw] rounded-full bg-gold-500/10 blur-[110px]" />
      </div>

      <div className="conn-stage relative z-[2] flex h-svh max-h-[900px] min-h-[620px] flex-col max-md:h-auto max-md:min-h-0">
        {/* Section heading (a11y) + crossfading captions */}
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28">
          <h2 className="sr-only">How Aturseva connects the three journeys</h2>
          <div className="relative h-14 max-md:h-24 sm:h-16">
            <p className="conn-caption">Today, three journeys move apart…</p>
            <p className="conn-caption">Aturseva joins them into one calm flow.</p>
            <p className="conn-caption">One booking travels — doctor and hospital, instantly in step.</p>
            <p className="conn-caption">And Sevika stays beside the patient.</p>
          </div>
        </div>

        {/* Lanes canvas */}
        <div className="conn-canvas relative min-h-[300px] flex-1 max-md:h-[36vh] max-md:min-h-[210px] max-md:flex-none">
          <svg
            id="conn-svg"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            fill="none"
          >
            <path
              id="lane-patient"
              d={LANES.separate.patient}
              stroke="#9aa0a3"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              id="lane-doctor"
              d={LANES.separate.doctor}
              stroke="#d5d8da"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              id="lane-hospital"
              d={LANES.separate.hospital}
              stroke="#b0b5b8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              id="lane-unified"
              d={LANES.unified}
              stroke="#bfc4c6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Travellers on the separate lanes */}
            <g id="comet-p" opacity="0" transform="translate(30,110)">
              <circle r="10" fill="#9aa0a3" opacity="0.25" />
              <circle r="4.5" fill="#c9cdd0" />
            </g>
            <g id="comet-d" opacity="0" transform="translate(30,300)">
              <circle r="10" fill="#d5d8da" opacity="0.25" />
              <circle r="4.5" fill="#e9ebed" />
            </g>
            <g id="comet-h" opacity="0" transform="translate(30,490)">
              <circle r="10" fill="#b0b5b8" opacity="0.25" />
              <circle r="4.5" fill="#c3c8cb" />
            </g>

            {/* Stations on the unified lane (dot + halo ring) */}
            <circle id="dot-booking" cx="616" cy="295" r="4.5" fill="#c9cdd0" stroke="#c9cdd0" strokeWidth="6" strokeOpacity="0.22" opacity="0" />
            <circle id="dot-doctor" cx="792" cy="311" r="4.5" fill="#e9ebed" stroke="#e9ebed" strokeWidth="6" strokeOpacity="0.22" opacity="0" />
            <circle id="dot-hospital" cx="960" cy="300" r="4.5" fill="#c3c8cb" stroke="#c3c8cb" strokeWidth="6" strokeOpacity="0.22" opacity="0" />
            <circle id="dot-sevika" cx="1150" cy="215" r="4.5" fill="#d0d2d4" stroke="#d0d2d4" strokeWidth="6" strokeOpacity="0.22" opacity="0" />
          </svg>

          {/* Overlay: lane labels + Aturseva hub (absolute, viewBox-aligned) */}
          <div id="conn-overlay" className="pointer-events-none absolute inset-0">
            <p className="conn-label" data-vx="120" data-vy="62">Patient</p>
            <p className="conn-label" data-vx="120" data-vy="252">Doctor</p>
            <p className="conn-label" data-vx="120" data-vy="442">Hospital</p>

            <div className="conn-hub" data-vx="380" data-vy="300">
              <div className="conn-hub-inner relative grid place-items-center">
                <span className="absolute inset-[-6px] rounded-full bg-brand-400/30 blur-xl animate-breathe" />
                <span className="absolute inset-[-10px] rounded-full border border-brand-300/40 animate-pulse-ring" />
                <span className="relative grid h-14 w-14 place-items-center rounded-full border border-brand-300/50 bg-ink-900/90 shadow-glow max-md:h-11 max-md:w-11">
                  <Logo variant="mark" className="h-8 w-8 text-brand-200 max-md:h-6 max-md:w-6" />
                </span>
              </div>
            </div>
          </div>

          {/* Overlay: journey cards (desktop: absolute viewBox-aligned; mobile: static grid) */}
          <div id="conn-cards">
            <div className="conn-card" id="card-booking" data-vx="616" data-vy="295" data-side="up">
              <div className="conn-card-inner rounded-2xl border border-ink-100 bg-ivory-50 p-4 text-ink-900 shadow-lift">
                <p className="eyebrow text-brand-600">Patient · Booking</p>
                <p className="mt-1.5 font-display text-lg font-semibold leading-tight">
                  Appointment confirmed
                </p>
                <p className="mt-1 text-sm text-ink-500">
                  Dr. Mehta · General OPD · 11:30 AM
                </p>
                <p className="mt-2.5 inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-extrabold text-brand-800">
                  Token #14
                </p>
              </div>
            </div>

            <div className="conn-card" id="card-doctor" data-vx="792" data-vy="311" data-side="down">
              <div className="conn-card-inner glass rounded-2xl p-4 shadow-lift">
                <p className="eyebrow text-brand-300">Doctor · Today</p>
                <p className="mt-1.5 font-display text-lg font-semibold leading-tight text-ivory-50">
                  Dr. Mehta&apos;s OPD
                </p>
                <p className="mt-1 text-sm text-ink-200">
                  Token 11 in room · 3 waiting
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/5 rounded-full bg-brand-400" />
                </div>
              </div>
            </div>

            <div className="conn-card" id="card-hospital" data-vx="960" data-vy="300" data-side="up">
              <div className="conn-card-inner glass rounded-2xl p-4 shadow-lift">
                <p className="eyebrow text-gold-400">Hospital · Front desk</p>
                <p className="mt-1.5 font-display text-lg font-semibold leading-tight text-ivory-50">
                  One live queue
                </p>
                <p className="mt-1 text-sm text-ink-200">
                  Online + walk-in, synced across counters
                </p>
                <p className="mt-2 text-xs text-ink-200">
                  Tokens today:{" "}
                  <span id="token-counter" className="font-extrabold text-ivory-50">42</span>
                </p>
              </div>
            </div>

            <div className="conn-card conn-bubble max-w-[240px]" id="sevika-bubble-1" data-vx="880" data-vy="42" data-side="up">
              <div className="conn-card-inner rounded-2xl rounded-bl-md border border-brand-300/30 bg-brand-900/70 p-3.5 text-ivory-50 shadow-lift backdrop-blur">
                <p className="text-sm leading-relaxed">
                  Your token is <strong>#14</strong> — about 20 minutes left.
                </p>
                <span className="approval-chip mt-2.5">
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                  Doctor approved
                </span>
              </div>
            </div>

            <div className="conn-card conn-bubble max-w-[240px]" id="sevika-bubble-2" data-vx="1065" data-vy="148" data-side="up">
              <div className="conn-card-inner rounded-2xl rounded-bl-md border border-gold-300/25 bg-ink-800/70 p-3.5 text-ivory-50 shadow-lift backdrop-blur">
                <p className="text-sm leading-relaxed">
                  Aaj raat 8 baje — first dose, after food.
                </p>
                <span className="approval-chip mt-2.5">
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                  Doctor approved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
