import { AnimationProvider } from "@/components/AnimationProvider";
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

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {HERO_V2 ? <HeroCharacter /> : <Hero />}
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
