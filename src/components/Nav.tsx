"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#journeys", label: "The Journeys" },
  { href: "#connection", label: "How it connects" },
  { href: "#platform", label: "Platform" },
  { href: "#sevika", label: "Sevika" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header id="site-nav" className="fixed inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="relative z-10 shrink-0 rounded-lg"
          aria-label="Aturseva — back to top"
        >
          <Logo variant="word" className="h-8 w-auto text-ivory-50 sm:h-9" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link rounded-lg px-1 py-2 text-sm font-semibold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#paths"
            className="hidden rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-ink-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-brand-300 sm:inline-flex"
          >
            Get started
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-ivory-50 lg:hidden"
            aria-expanded={open}
            aria-controls="nav-mobile"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="nav-mobile"
          className="mx-4 rounded-2xl border border-white/10 bg-ink-950/95 p-4 shadow-lift backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-ivory-100/90 hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-white/10 pt-3">
              <a
                href="#paths"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-brand-400 px-4 py-3 text-center text-base font-bold text-ink-950"
              >
                Get started
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
