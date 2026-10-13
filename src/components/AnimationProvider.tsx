"use client";

import { useLayoutEffect } from "react";

/**
 * Loads GSAP + ScrollTrigger lazily (code-split, not in the initial bundle)
 * and boots the shared vanilla animation module. The same module is inlined
 * into the self-contained preview artifact, so both stay in sync.
 *
 * B13 (File 11 Batch 3): the engine returns a full teardown — kills every
 * ScrollTrigger, reverts every gsap.matchMedia() context and removes its
 * listeners — which we invoke on unmount, so re-mount boots cleanly once.
 */
export function AnimationProvider() {
  useLayoutEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      // Plain-JS side-effect module (IIFE, no exports) — shared verbatim with
      // the self-contained preview artifact, hence not a typed ES module.
      // @ts-expect-error TS2306: not a module by design
      await import("@/lib/aturseva-anim.js");
      if (cancelled) return;
      if (typeof window.initAtursevaAnimations !== "function") return;
      dispose = window.initAtursevaAnimations(gsap, ScrollTrigger);
    })();

    return () => {
      cancelled = true;
      if (dispose) dispose();
    };
  }, []);

  return null;
}
