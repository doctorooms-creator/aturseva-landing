import { Logo } from "./Logo";

/**
 * §1 — Cinematic opening: a person, a medical journey, a heartbeat.
 * Dark ink stage, journey-arc SVG with milestones, marching ECG trace.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-svh flex-col overflow-hidden bg-ink-950 text-ivory-50"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-25%] h-[75vh] w-[95vw] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[130px]" />
        <div className="absolute bottom-[-35%] right-[-12%] h-[55vh] w-[55vw] rounded-full bg-gold-500/10 blur-[110px]" />
        <div className="absolute left-[-15%] top-[30%] h-[40vh] w-[40vw] rounded-full bg-brand-800/40 blur-[100px]" />
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        {/* Brand mark */}
        <div data-hero-fade className="mb-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-300/30 bg-ink-900/60 shadow-glow">
            <Logo variant="mark" className="h-7 w-7 text-brand-200" />
          </span>
          <span className="eyebrow text-brand-300">Aturseva · Care in step</span>
        </div>

        <h1 className="max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-ivory-50 sm:text-6xl lg:text-7xl">
          <span data-hero-fade className="block">Healthcare is a journey.</span>
          <span data-hero-fade className="mt-2 block italic text-brand-200">
            No one should walk it alone.
          </span>
        </h1>

        <p data-hero-fade className="mt-6 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
          Aturseva weaves <strong className="font-bold text-ivory-100">patients</strong>,{" "}
          <strong className="font-bold text-ivory-100">doctors</strong>, and{" "}
          <strong className="font-bold text-ivory-100">hospitals</strong> into one
          calm, coordinated experience — from the first booking to the last
          follow-up.
        </p>

        <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#journeys"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-400 px-7 text-sm font-bold text-ink-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-brand-300"
          >
            Begin the journey
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 4v12m0 0l-5-5m5 5l5-5" />
            </svg>
          </a>
          <a
            href="#paths"
            className="inline-flex h-12 items-center rounded-full border border-ivory-50/25 px-7 text-sm font-bold text-ivory-100 transition-colors hover:border-ivory-50/60"
          >
            I&apos;m a patient · doctor · hospital
          </a>
        </div>

        {/* Journey arc — the patient's path, drawn on load */}
        <div data-hero-fade className="mt-14 hidden md:mt-16 md:block">
          <svg
            viewBox="0 0 1120 120"
            className="h-[110px] w-full"
            fill="none"
            aria-hidden="true"
          >
            <path
              id="hero-journey"
              d="M20 88 C 190 88 210 30 380 30 C 550 30 570 88 740 88 C 910 88 930 30 1100 30"
              stroke="url(#heroGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="1120" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9aa0a3" stopOpacity="0.25" />
                <stop offset="0.5" stopColor="#bfc4c6" />
                <stop offset="1" stopColor="#d0d2d4" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {[
              { x: 380, label: "Book" },
              { x: 740, label: "Wait, informed" },
              { x: 1100, label: "Consult" },
            ].map((m) => (
              <g key={m.label} className="hero-milestone" style={{ transformOrigin: `${m.x}px 30px` }}>
                <circle cx={m.x} cy="30" r="5.5" fill="#c9cdd0" />
                <circle cx={m.x} cy="30" r="11" stroke="#bfc4c6" strokeOpacity="0.4" />
                <text
                  x={m.x}
                  y="12"
                  textAnchor="middle"
                  className="fill-ink-300 font-sans text-[10px] font-bold uppercase"
                  style={{ letterSpacing: "0.22em" }}
                >
                  {m.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Heartbeat trace — the quiet pulse under everything */}
      <div className="relative z-[2] mt-auto">
        <svg
          viewBox="0 0 1440 120"
          className="h-16 w-full sm:h-20"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            id="hero-ecg"
            className="animate-ecg-march"
            d="M0 70 H170 L200 70 L216 48 L232 70 H330 L360 70 L378 38 L396 96 L414 22 L432 108 L450 70 H620 L650 70 L666 48 L682 70 H780 L810 70 L828 38 L846 96 L864 22 L882 108 L900 70 H1440"
            stroke="#8b9093"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="180 1300"
          />
        </svg>
        <p className="sr-only">
          A calm heartbeat line — Aturseva keeps the pulse of every journey.
        </p>
      </div>
    </section>
  );
}
