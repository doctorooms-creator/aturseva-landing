import { AnimationProvider } from "@/components/AnimationProvider";
import { Connection } from "@/components/Connection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journeys } from "@/components/Journeys";
import { Nav } from "@/components/Nav";
import { Paths } from "@/components/Paths";
import { ProductReveal } from "@/components/ProductReveal";
import { Sevika } from "@/components/Sevika";

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
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
