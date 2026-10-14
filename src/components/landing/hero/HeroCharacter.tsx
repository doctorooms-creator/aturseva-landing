import { Logo } from "@/components/Logo";
import { Orb } from "./Orb";

/**
 * File 18 §4.1 + File 20 — HERO v2: "the conversation is the product"
 * (Stitch pattern). Replaces the journey-arc hero under
 * NEXT_PUBLIC_HERO_V2 (default on; =0 restores the legacy hero instantly).
 *
 * Architecture (matches the codebase's progressive-enhancement pattern):
 * this is a SERVER component — the markup ships in its FINAL state
 * (completed conversation, all content visible), so crawlers, the static
 * preview artifact and reduced-motion users see the whole story with zero
 * JS. The shared vanilla engine (src/lib/aturseva-anim.js, buildHeroV2)
 * then replays the conversation, drives the orb states, the chips, the
 * cursor layer and the parallax — identical code on dev, preview and live.
 *
 * Honesty rails (File 02 §4 / File 18 R1):
 *  - the chat is a labelled REPLAY of a product-true moment — no free-text
 *    input on the landing (the app owns real conversation);
 *  - every canned reply maps to a File 16 §4 verified use case;
 *  - Hinglish is contained to the character's voice (File 02 §4.4);
 *  - the orb never pretends to be human (File 17 §6 identity rule).
 */
const CHAT_REPLIES: { chip: string; reply: string; core: string }[] = [
  {
    chip: "Aaj ki dawai?",
    reply: "Aaj ki dawai: 9 baje — doctor-approved schedule se.",
    core: "09:00",
  },
  {
    chip: "Diet plan yaad dilao",
    reply: "Doctor ne diet batayi hai — shaam 7 baje yaad dungi.",
    core: "diet",
  },
  {
    chip: "Prescription ka photo bhejo",
    reply: "Photo bhejo — main DRAFT list banaungi, aap confirm karo.",
    core: "scan",
  },
];

export function HeroCharacter() {
  return (
    <section
      id="top"
      className="grain hero2 relative flex min-h-svh flex-col overflow-hidden bg-ink-950 text-ivory-50"
      data-hero2
    >
      {/* Dot-grid backdrop (I-C-03 spotlight zone, File 20 §7) */}
      <div className="hero2-dots-zone absolute inset-0" aria-hidden="true">
        <div className="hero2-dots" />
        <div className="hero2-dots-hi" data-hero2-spot />
      </div>

      {/* Ambient glows — consistent with the site's dark-stage grammar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-25%] h-[75vh] w-[95vw] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[130px]" />
        <div className="absolute bottom-[-35%] right-[-12%] h-[55vh] w-[55vw] rounded-full bg-gold-500/10 blur-[110px]" />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* ── LEFT: the promise (H-01…04, File 20 §2) ───────────────── */}
        <div className="order-2 lg:order-1" data-hero2-left>
          <div className="mb-7 flex items-center gap-3" data-hero2-fade>
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-300/30 bg-ink-900/60 shadow-glow">
              <Logo variant="mark" className="h-7 w-7 text-brand-200" />
            </span>
            <span className="eyebrow text-brand-300">
              Aturseva · the AI care assistant
            </span>
          </div>

          <h1 className="max-w-xl font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-ivory-50 sm:text-6xl lg:text-[4.2rem]">
            <span className="block" data-hero2-h1line>
              Care that
            </span>
            <span className="mt-2 block italic text-brand-200" data-hero2-h1line>
              walks with you.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-200 sm:text-lg" data-hero2-fade>
            Meet <strong className="font-bold text-ivory-100">Aturseva</strong> —
            the AI care assistant who books your doctor, holds your queue
            token, and remembers every dose. Doctor-approved, always in step.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4" data-hero2-fade>
            <a
              href="#paths"
              data-magnetic
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-400 px-7 text-sm font-bold text-ink-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-brand-300"
            >
              Start with Aturseva
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4v12m0 0l-5-5m5 5l5-5" />
              </svg>
            </a>
            <a
              href="#journeys"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory-50/25 px-7 text-sm font-bold text-ivory-100 transition-colors hover:border-ivory-50/60"
            >
              Watch her work
              <svg viewBox="0 0 20 20" className="h-4 w-4 animate-[hero2-arrow_0.8s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4v12m0 0l-5-5m5 5l5-5" data-hero2-arrow />
              </svg>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Aturseva at work (O-01, C-01…03, File 20 §2) ───── */}
        <div className="order-1 flex flex-col items-center lg:order-2" data-hero2-right>
          <Orb token="#12" coreLabel="queue token" size="hero" className="mb-6 lg:mb-8" data-hero2-fade />

          {/* Chat replay — ships COMPLETED (no-JS/reduce/SEO see the story) */}
          <div className="hero2-chat glass w-full max-w-md rounded-3xl p-4 sm:p-5" data-hero2-fade>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="orb-dot" aria-hidden="true" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-300">
                  Aturseva · replay
                </span>
              </div>
              <button
                type="button"
                className="hero2-replay"
                data-hero2-replay
                aria-label="Conversation phir se dekhein"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 10a7 7 0 1 0 2.05-4.95M3 4v3h3" />
                </svg>
                Phir se dekhein
              </button>
            </div>

            <div className="hero2-thread max-h-80 overflow-y-auto" data-hero2-thread aria-live="polite">
              {/* Initial exchange (the hero beat: queue state) */}
              <div className="h2b h2b--user" data-h2b-user>
                <p>Meri baari kab hai?</p>
              </div>
              <div className="h2b h2b--bot" data-h2b-bot>
                <span className="h2b-avatar" aria-hidden="true" />
                <p data-h2b-bottext>
                  Token #12. Teen log bache — taqreeban 15 minute. Clinic
                  nikal jao.
                </p>
              </div>
              {/* Typing indicator — hidden in markup; the engine shows it */}
              <div className="h2b h2b--bot h2b--typing" data-h2b-typing>
                <span className="h2b-avatar" aria-hidden="true" />
                <span className="h2b-dots" aria-hidden="true">
                  <span /><span /><span />
                </span>
              </div>
            </div>

            {/* Suggestion chips (I-T-01, File 20 §5) — real buttons, ≥44px */}
            <div className="mt-4 flex flex-wrap gap-2" data-hero2-chips role="group" aria-label="Aturseva se poochhein">
              {CHAT_REPLIES.map((c) => (
                <button
                  key={c.chip}
                  type="button"
                  className="hero2-chip"
                  data-chip-reply={c.reply}
                  data-chip-core={c.core}
                >
                  {c.chip}
                </button>
              ))}
            </div>
          </div>

          {/* Caption — tagline lock (File 18 §1) */}
          <p className="mt-5 text-center text-xs font-medium tracking-wide text-ink-300" data-hero2-fade>
            Aturseva ke saath — care that walks with you.
          </p>
        </div>
      </div>

      {/* Scroll cue — quiet, consistent with the site's close */}
      <div className="relative z-[2] mx-auto mb-6 hidden md:block" data-hero2-fade aria-hidden="true">
        <span className="hero2-scrollcue" />
      </div>
    </section>
  );
}
