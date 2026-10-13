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
            <Logo variant="full" className="h-24 w-auto text-ivory-50" />
            {/* B3 — brand-philosophy framing (matches Sevika §5): our promise,
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
              <li><a className="text-ivory-100/80 transition-colors hover:text-ivory-50" href="#sevika">Sevika</a></li>
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
