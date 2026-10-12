/**
 * §5 — Sevika: continuous, doctor-approved care after the visit.
 * Philosophy: "Aturseva ne hamara saath diya." — support, never substitute.
 */
const THREAD = [
  {
    time: "08:00",
    title: "The day begins",
    body: "Good morning, Ramesh. Aapki appointment aaj 11:30 baje hai — Dr. Mehta, OPD 2.",
  },
  {
    time: "11:15",
    title: "The wait, eased",
    body: "Token #14 — about 20 minutes left. Aap time nikal sakte hain, main bata dungi.",
  },
  {
    time: "14:10",
    title: "After the consult",
    body: "Prescription ready hai — 3 dawaiyan, first dose aaj raat 8 baje, khaana ke baad.",
  },
  {
    time: "20:00",
    title: "The gentle nudge",
    body: "Time for your first dose — 1 tablet, after food. Dr. Mehta ki aur se wish you good health.",
  },
  {
    time: "+3 days",
    title: "The follow-up",
    body: "How are you feeling today? Aapka jawab Dr. Mehta tak pahunch jayega.",
  },
];

export function Sevika() {
  return (
    <section id="sevika" className="grain relative overflow-hidden bg-ink-950 py-24 text-ivory-50 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-20%] h-[60vh] w-[50vw] rounded-full bg-brand-700/25 blur-[130px]" />
        <div className="absolute left-[-15%] bottom-[-30%] h-[45vh] w-[45vw] rounded-full bg-gold-500/10 blur-[110px]" />
      </div>

      <div className="relative z-[2] mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-gold-400" data-reveal>Continuous care</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ivory-50 sm:text-5xl" data-reveal>
            Sevika stays,{" "}
            <span className="italic text-brand-200">long after the visit ends.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg" data-reveal>
            Sevika is Aturseva&apos;s caring assistant. She carries reminders,
            queue updates, and follow-up nudges to the patient — each one{" "}
            <strong className="font-bold text-ivory-100">
              approved by the doctor first
            </strong>
            . Support, never a substitute.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Doctor-approved before anything goes out",
              "Gentle, plain-language reminders",
              "Follow-up check-ins that close the loop",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-ivory-100/90 sm:text-base" data-reveal>
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-300">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          <blockquote className="mt-10 border-l-2 border-gold-400/60 pl-6" data-reveal>
            <p className="font-display text-2xl italic leading-snug text-brand-100 sm:text-3xl">
              “Aturseva ne hamara saath diya.”
            </p>
            <p className="mt-2 text-sm text-ink-300">— the promise we build by</p>
          </blockquote>
        </div>

        {/* Message thread */}
        <div className="sevika-thread relative" data-reveal>
          <span className="sevika-line absolute bottom-2 left-[27px] top-2 w-px bg-gradient-to-b from-brand-400/70 via-brand-500/40 to-gold-400/50" aria-hidden="true" />
          <ol className="relative space-y-5">
            {THREAD.map((m) => (
              <li key={m.time} className="sevika-msg flex gap-4">
                <span className="relative z-[2] grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-300/40 bg-ink-900 text-[10px] font-extrabold text-brand-200">
                  {m.time === "+3 days" ? "+3d" : m.time.replace(":00", "")}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-300">
                    {m.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ivory-100/90 sm:text-[15px]">
                    {m.body}
                  </p>
                  <span className="approval-chip mt-2.5">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8.5l3.5 3.5L13 5" />
                    </svg>
                    Doctor approved
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
