export {};

// Side-effect module: plain JS IIFE (no exports), shared verbatim with the
// self-contained preview artifact. Declared so `next build` type-checks the
// dynamic side-effect import in AnimationProvider.
declare module "@/lib/aturseva-anim.js";

declare global {
  interface Window {
    /** Defined in src/lib/aturseva-anim.js (plain JS, no imports). */
    initAtursevaAnimations?: (
      gsap: unknown,
      ScrollTrigger: unknown
    ) => void;
  }
}
