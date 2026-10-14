import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="grain relative mt-auto bg-ink-950 text-ivory-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
      />
      <div className="relative z-[2] mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            {/* B5 (File 08 §16 option a, owner-delegated): tagline-free lockup +
                the canonical tagline as a separate text line (File 04 §6, File 05
                §10 — one pairing per page, adjacent to the wordmark). The full
                variant and its "Make healthcare intelligent." lettering remain
                untouched in Logo.tsx and public/assets/logo-primary.svg; only
                the footer's display choice changes. Revert = variant="full". */}
            <div className="flex items-center gap-3.5">
              <Logo variant="word" className="h-20 w-auto text-ivory-50" />
              {/* File 21 §9 (Phase 4): the orb, 24px, night-state, beside the
                  wordmark — the day ends; she's still on. Static by design
                  (no loop in the footer; reduced-motion by default). */}
              <span className="orb-foot" aria-hidden="true" />
            </div>
            <p className="mt-3 font-display text-xl italic text-ivory-100">
              Care that walks with you.
            </p>
            {/* B3 — brand-philosophy framing (matches the assistant §5): our promise,
                never a customer testimonial. */}
            <p className="eyebrow mt-6 text-ink-300">Our philosophy</p>
            <p className="mt-3 font-display text-lg italic text-brand-200">
              “Aturseva ne hamara saath diya.”
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">
              “Aturseva stood with us.” Support that walks with patients,
              doctors, and hospitals — never in place of them.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            <ul className="space-y-3">
              <li className="eyebrow mb-4 text-ink-300">Explore</li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#journeys">The Journeys</a></li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#connection">How it connects</a></li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#platform">Platform</a></li>
            </ul>
            <ul className="space-y-3">
              <li className="eyebrow mb-4 text-ink-300">Care</li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#sevika">Aturseva</a></li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#paths">For you</a></li>
            </ul>
            <ul className="space-y-3">
              <li className="eyebrow mb-4 text-ink-300">Paths</li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#paths">Patients</a></li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#paths">Doctors</a></li>
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#paths">Hospitals</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          {/* B8 — dynamic year (server-rendered: current year in dev; resolved
              at build time in the static export — both honest). */}
          <p>© {new Date().getFullYear()} Aturseva. Care, coordinated.</p>
          <p>Interface visuals shown are representative previews of the product.</p>
        </div>
      </div>
    </footer>
  );
}
