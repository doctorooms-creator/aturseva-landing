/**
 * §4 — The reveal: a representative preview of the Aturseva workspace.
 * Honest by design — sample data, clearly labelled, no claims.
 */
const SCHEDULE = [
  { time: "11:00", name: "Ramesh S.", token: "#11", state: "In consult" },
  { time: "11:30", name: "Priya D.", token: "#12", state: "Waiting" },
  { time: "12:00", name: "Arun M.", token: "#13", state: "Waiting" },
];

const QUEUE = [
  { token: "#11", name: "Ramesh S.", state: "In consult", active: true },
  { token: "#12", name: "Priya D.", state: "Next up", active: false },
  { token: "#13", name: "Arun M.", state: "3 ahead", active: false },
  { token: "#14", name: "You", state: "4 ahead", active: false },
];

export function ProductReveal() {
  return (
    <section id="platform" className="relative bg-ivory-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow text-brand-600">The platform</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-5xl">
            One workspace. <span className="italic text-brand-700">Every side of care.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
            The same appointment, living calmly in three places at once — the
            patient&apos;s phone, the doctor&apos;s day, and the hospital&apos;s desk.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-400">
            <span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden="true" />
            Representative preview
          </p>
        </div>

        {/* Workspace window */}
        <div className="ui-window mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-lift">
          {/* Chrome */}
          <div className="flex items-center gap-3 border-b border-ink-100 bg-ivory-50 px-5 py-3.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-brand-300" />
              <span className="h-3 w-3 rounded-full bg-gold-300" />
              <span className="h-3 w-3 rounded-full bg-ink-200" />
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
              Aturseva workspace · City Care Hospital
            </p>
            <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-brand-600">
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-blink" aria-hidden="true" />
              Live
            </span>
          </div>

          <div className="grid md:grid-cols-[250px_1fr_240px]">
            {/* Doctor's day */}
            <div className="border-b border-ink-100 p-5 md:border-b-0 md:border-r">
              <p className="eyebrow text-ink-400">Doctor · Today</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 font-display text-base font-semibold text-brand-800">
                  KM
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink-900">Dr. K. Mehta</p>
                  <p className="text-xs text-ink-400">General Physician</p>
                </div>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-ink-400">
                OPD 11:00 – 2:00
              </p>
              <ul className="mt-3 space-y-1.5">
                {SCHEDULE.map((s) => (
                  <li
                    key={s.token}
                    className="flex items-center justify-between rounded-xl bg-ivory-50 px-3 py-2 text-sm"
                  >
                    <span className="font-bold text-ink-600">{s.time}</span>
                    <span className="text-ink-500">{s.name}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-extrabold text-ink-500">
                      {s.token}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live queue */}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-ink-400">Front desk · Live queue</p>
                <p className="text-xs font-bold text-ink-400">OPD 2</p>
              </div>
              <ul className="mt-4 space-y-2">
                {QUEUE.map((q) => (
                  <li
                    key={q.token}
                    className={`ui-row ${
                      q.active
                        ? "border-brand-200 bg-brand-50 font-bold text-brand-800"
                        : "bg-ivory-50 text-ink-600"
                    }`}
                  >
                    <span className="font-display text-base font-semibold">
                      {q.token}
                    </span>
                    <span className="flex-1 text-sm">{q.name}</span>
                    <span
                      className={`ui-chip ${
                        q.active ? "bg-brand-500 text-white" : "bg-white text-ink-400"
                      }`}
                    >
                      {q.active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-blink" aria-hidden="true" />
                      )}
                      {q.state}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-2xl bg-ivory-100 p-4">
                <div className="flex items-center justify-between text-xs font-bold text-ink-500">
                  <span>Queue progress</span>
                  <span>11 / 42</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full w-[26%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                </div>
              </div>
            </div>

            {/* Sevika panel */}
            <div className="border-t border-ink-100 p-5 md:border-l md:border-t-0">
              <p className="eyebrow text-gold-600">Sevika · Assistant</p>
              <label className="mt-4 flex cursor-pointer items-center justify-between rounded-xl bg-ivory-50 px-3.5 py-3 text-sm font-bold text-ink-700">
                Doctor-approved reminders
                <span className="relative inline-flex h-6 w-11 items-center">
                  <span className="absolute inset-0 rounded-full bg-brand-500" aria-hidden="true" />
                  <span className="absolute right-1 h-4 w-4 rounded-full bg-white shadow" aria-hidden="true" />
                </span>
              </label>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { t: "11:15", m: "Token #14 — 20 min left" },
                  { t: "14:10", m: "Prescription ready" },
                  { t: "20:00", m: "First dose reminder" },
                ].map((r) => (
                  <li key={r.t} className="flex gap-3 rounded-xl bg-ivory-50 px-3 py-2.5">
                    <span className="text-xs font-extrabold text-brand-600">{r.t}</span>
                    <span className="text-xs leading-relaxed text-ink-500">{r.m}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-ink-400">
                Every message is approved by the doctor before Sevika sends it.
              </p>
            </div>
          </div>
        </div>

        {/* Feature row */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Smart booking",
              body: "Patients book ahead in moments — no phone queue.",
              icon: "M8 7V3m8 4V3M3 9h18M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
            },
            {
              title: "Live, fair queue",
              body: "Tokens move visibly for patients, doctors, and the desk.",
              icon: "M4 6h16M4 12h10M4 18h7M18 15l3 3-3 3",
            },
            {
              title: "Doctor-first design",
              body: "Workflows built around the doctor's day, not against it.",
              icon: "M12 4v16m0-16a8 8 0 0 0-8 8m16 0a8 8 0 0 1-8 8",
            },
            {
              title: "Sevika follow-up",
              body: "Gentle, doctor-approved care that continues after the visit.",
              icon: "M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12C19 16.4 12 21 12 21z",
            },
          ].map((f) => (
            <div
              key={f.title}
              data-reveal
              className="rounded-2xl border border-ink-100/70 bg-white p-5 shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={f.icon} />
                </svg>
              </span>
              <p className="mt-4 text-base font-extrabold text-ink-900">{f.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
