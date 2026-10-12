/**
 * §2 — Three journeys that rarely happen in step: patient, doctor, hospital.
 * Each card carries its own broken lane (a gap = the missing connection).
 */
const JOURNEYS = [
  {
    id: "patient",
    role: "Patient",
    tint: "text-brand-600",
    lane: (
      <>
        <path className="journey-lane" d="M6 34 C 46 8 78 8 108 34" stroke="#1f8f7b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path className="journey-lane" d="M152 34 C 192 60 224 60 254 34" stroke="#1f8f7b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </>
    ),
    title: "The long wait",
    body: "Books an appointment, then waits — away from work and family, never quite sure when the turn will come.",
    chips: ["Unclear token status", "Hours in waiting rooms", "Forgotten follow-ups"],
  },
  {
    id: "doctor",
    role: "Doctor",
    tint: "text-ink-700",
    lane: (
      <>
        <path className="journey-lane" d="M6 34 C 46 60 78 60 108 34" stroke="#2e6b60" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path className="journey-lane" d="M152 34 C 192 8 224 8 254 34" stroke="#2e6b60" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </>
    ),
    title: "The full day",
    body: "A packed OPD, a queue to keep fair, notes to write — and every patient's next visit to remember.",
    chips: ["Back-to-back slots", "Manual queue calls", "Follow-up blind spots"],
  },
  {
    id: "hospital",
    role: "Hospital",
    tint: "text-gold-600",
    lane: (
      <>
        <path className="journey-lane" d="M6 34 C 46 8 78 8 108 34" stroke="#c99a3f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path className="journey-lane" d="M152 34 C 192 60 224 60 254 34" stroke="#c99a3f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </>
    ),
    title: "The busy desk",
    body: "The front desk juggles calls, walk-ins, and tokens while every counter asks for the same information again.",
    chips: ["Phone-only booking", "Paper tokens", "Fragmented view"],
  },
];

export function Journeys() {
  return (
    <section id="journeys" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow text-brand-600">The problem today</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-5xl">
            Three journeys. <span className="italic text-brand-700">Rarely in step.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
            Every clinic day, three separate journeys unfold around the same
            appointment — each running on its own, each carrying its own weight.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {JOURNEYS.map((j) => (
            <article
              key={j.id}
              data-reveal
              className="group relative overflow-hidden rounded-3xl border border-ink-100/80 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-7"
            >
              <div className="flex items-center justify-between">
                <p className={`eyebrow ${j.tint}`}>{j.role}</p>
                <svg viewBox="0 0 260 68" className="h-[44px] w-[180px]" aria-hidden="true">
                  {j.lane}
                </svg>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink-950">
                {j.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{j.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {j.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-ink-100 bg-ivory-100 px-3 py-1 text-xs font-semibold text-ink-500"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-300">
                …a journey with a gap in the middle
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-center" data-reveal>
          <p className="font-display text-xl italic text-ink-700 sm:text-2xl">
            What if these journeys spoke to each other?
          </p>
          <a
            href="#connection"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-all hover:-translate-y-1 hover:border-brand-400 hover:text-brand-600"
            aria-label="Scroll to see how the journeys connect"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 4v12m0 0l-5-5m5 5l5-5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
