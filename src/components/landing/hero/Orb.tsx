/**
 * File 20 §3 — the "Living State Orb" (owner-endorsed, File 17 §6/§6A).
 *
 * Phase 0 build decision (documented per File 20 §3 tech lane): the orb is
 * rendered as layered CSS/SVG, NOT WebGL — zero new dependencies, works in
 * the static self-contained preview artifact and the GitHub Pages export,
 * every state is a class the shared vanilla engine toggles, and the global
 * reduced-motion rule degrades it to a static pose for free.
 *
 * Identity rule (File 17 §6): faceless by design — the core displays LIVE
 * STATE (queue token / countdown / pulse), never a face, never a person.
 * The orb is the character's body; there is no second mascot (§6A).
 *
 * States (toggled by src/lib/aturseva-anim.js):
 *   orb--idle      breathe 4s (default)
 *   orb--listening tilt toward cursor (GSAP quickTo, desktop only)
 *   orb--speaking  concentric ripple rings
 *   orb--alert     hop + core flash (the "baari" moment)
 *   orb--night     dimmed 40%, slower breathe
 */
export function Orb({
  token = "#12",
  coreLabel = "queue token",
  size = "hero",
  className = "",
}: {
  token?: string;
  coreLabel?: string;
  size?: "hero" | "mini";
  className?: string;
}) {
  return (
    <div
      className={`orb orb--idle ${size === "hero" ? "orb--hero" : "orb--mini"} ${className}`}
      data-orb
      role="img"
      aria-label={`Aturseva — the AI care assistant, showing ${coreLabel} ${token}`}
    >
      {/* Ambient bloom behind the body */}
      <div className="orb-bloom" aria-hidden="true" />

      {/* Tilt wrapper — the engine rotates this (max ±8°) toward the cursor */}
      <div className="orb-tilt-perspective" aria-hidden="true">
        <div className="orb-tilt" data-orb-tilt>
          <div className="orb-body">
            {/* Rim light — paper-50 arc, top-left 40% (File 20 §3 form spec) */}
            <svg
              viewBox="0 0 200 200"
              className="orb-rim"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 38,58 A 74,74 0 0 1 128,26"
                stroke="var(--color-paper-50)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 30,76 A 74,74 0 0 0 26,120"
                stroke="var(--color-paper-50)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.35"
              />
            </svg>

            {/* Live-state core — the one thing the orb always shows */}
            <div className="orb-core">
              <span className="orb-core-num" data-orb-core>
                {token}
              </span>
              <span className="orb-core-label">{coreLabel}</span>
            </div>
          </div>

          {/* Speaking ripple rings (visible in orb--speaking only) */}
          <div className="orb-rings" aria-hidden="true">
            <span className="orb-ring" />
            <span className="orb-ring" />
            <span className="orb-ring" />
          </div>
        </div>
      </div>

      {/* Ground shadow — soft ellipse, never moves with the tilt */}
      <div className="orb-shadow" aria-hidden="true" />
    </div>
  );
}
