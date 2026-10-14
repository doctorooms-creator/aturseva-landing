import { AnimationProvider } from "@/components/AnimationProvider";
import { BeatBaari } from "@/components/landing/beats/BeatBaari";
import { BeatBooking } from "@/components/landing/beats/BeatBooking";
import { BeatRxPhoto } from "@/components/landing/beats/BeatRxPhoto";
import { BeatSubah } from "@/components/landing/beats/BeatSubah";
import { Connection } from "@/components/Connection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HeroCharacter } from "@/components/landing/hero/HeroCharacter";
import { Journeys } from "@/components/Journeys";
import { Nav } from "@/components/Nav";
import { Paths } from "@/components/Paths";
import { ProductReveal } from "@/components/ProductReveal";
import { Sevika } from "@/components/Sevika";

/* File 19 Phase 1 — hero v2 flag: DEFAULT ON (owner GO, this build).
   NEXT_PUBLIC_HERO_V2=0 restores the legacy hero instantly (one-env rollback
   on dev, preview and the Pages workflow alike). Removed at Phase 7 cleanup
   once the whole "Aturseva ka din" narrative is live. */
const HERO_V2 = process.env.NEXT_PUBLIC_HERO_V2 !== "0";

/* File 19 Phase 2 — day-beats flag: DEFAULT ON. NEXT_PUBLIC_BEATS_V2=0
   removes beats 1–2 (Subah + Rx photo) and restores the pre-Phase-2 page
   instantly. The beats continue the hero's day narrative, so they only
   render alongside the v2 hero. */
const BEATS_V2 = process.env.NEXT_PUBLIC_BEATS_V2 !== "0";

/* File 19 Phase 3 — beats 3–4 flag: DEFAULT ON. NEXT_PUBLIC_BEATS_34=0
   removes Booking + BAARI (the pinned queue countdown) and restores the
   pre-Phase-3 page instantly. Same narrative-dependency rule: the day story
   only ships complete alongside the v2 hero and beats 1–2. */
const BEATS_34 = process.env.NEXT_PUBLIC_BEATS_34 !== "0";

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {HERO_V2 ? <HeroCharacter /> : <Hero />}
        {HERO_V2 && BEATS_V2 ? (
          <>
            <BeatSubah />
            <BeatRxPhoto />
          </>
        ) : null}
        {HERO_V2 && BEATS_V2 && BEATS_34 ? (
          <>
            <BeatBooking />
            <BeatBaari />
          </>
        ) : null}
        <Journeys />
        <Connection />
        <ProductReveal />
        <Sevika />
        <Paths />
      </main>
      <Footer />
      <AnimationProvider />
    </>
  );
}
