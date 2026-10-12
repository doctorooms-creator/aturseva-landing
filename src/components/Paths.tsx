"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function PathCta({ role, singular }: { role: string; singular: string }) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = useCallback(() => {
    setToast(`Early access for ${singular}s opens soon — Team Aturseva will reach out.`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3800);
  }, [singular]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-bold text-ivory-50 transition-all hover:-translate-y-0.5 hover:bg-brand-600"
      >
        I&apos;m a {singular}
      </button>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 bottom-6 z-[90] mx-auto max-w-md rounded-2xl border border-brand-300/30 bg-ink-900/95 px-5 py-4 text-center text-sm font-semibold text-ivory-50 shadow-lift backdrop-blur sm:left-1/2 sm:-translate-x-1/2"
        >
          {toast}
        </div>
      )}
    </>
  );
}

const PATHS = [
  {
    role: "Patients",
    singular: "patient",
    accent: "text-brand-600",
    ring: "bg-brand-50 text-brand-600",
    title: "Walk in without the wait",
    body: "Book ahead, watch your token move in real time, and let Sevika remember the follow-ups for you.",
    icon: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z",
  },
  {
    role: "Doctors",
    singular: "doctor",
    accent: "text-ink-700",
    ring: "bg-ivory-100 text-ink-700",
    title: "Keep the day humane",
    body: "A fair, visible queue; schedules ready before you arrive; an assistant that never forgets your patients.",
    icon: "M12 3v18M3 8c3-2 6-2 9 0s6 2 9 0M3 16c3-2 6-2 9 0s6 2 9 0",
  },
  {
    role: "Hospitals",
    singular: "hospital",
    accent: "text-gold-600",
    ring: "bg-gold-100 text-gold-700",
    title: "One calm front desk",
    body: "Online and walk-in patients in one live list — synced across counters, displays, and departments.",
    icon: "M4 21V9l8-5 8 5v12M9 21v-6h6v6M4 21h16",
  },
];

export function Paths() {
  return (
    <section id="paths" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow text-brand-600">Begin</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-5xl">
            Where do you fit <span className="italic text-brand-700">in the journey?</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
            Three paths, one direction — care that moves in step.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PATHS.map((p) => (
            <article
              key={p.role}
              data-reveal
              className="flex flex-col rounded-3xl border border-ink-100/80 bg-white p-7 shadow-soft transition-shadow hover:shadow-lift"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${p.ring}`}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={p.icon} />
                </svg>
              </span>
              <p className={`eyebrow mt-5 ${p.accent}`}>{p.role}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink-950">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">
                {p.body}
              </p>
              <PathCta role={p.role} singular={p.singular} />
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-400" data-reveal>
          Aturseva supports your doctors and hospitals — it never replaces them.
        </p>
      </div>
    </section>
  );
}
