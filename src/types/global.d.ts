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
    ) => (() => void) | undefined;
    /** Teardown handle mirrored by the engine (B13); null after dispose. */
    __atursevaAnimDispose?: (() => void) | null;
    /** Single-init guard (verified since Batch 1); reset by the teardown. */
    __atursevaAnimBooted?: boolean;
  }
}
