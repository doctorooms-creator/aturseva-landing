export {};

declare global {
  interface Window {
    /** Defined in src/lib/aturseva-anim.js (plain JS, no imports). */
    initAtursevaAnimations?: (
      gsap: unknown,
      ScrollTrigger: unknown
    ) => void;
  }
}
