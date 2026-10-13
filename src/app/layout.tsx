import type { Metadata, Viewport } from "next";
import { SITE_ORIGIN, SITE_PATH } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  // T-SEO-02 (File 12 §16): base for resolving every relative metadata
  // URL below into its absolute form. Dev (:3005) and the preview (:3006)
  // serve from the repo root — they intentionally inherit the production
  // canonical, because a canonical always names the authoritative
  // production URL regardless of where the page is being viewed.
  metadataBase: new URL(SITE_ORIGIN),
  title: "Aturseva — Care that walks with you",
  description:
    "Aturseva weaves patients, doctors, and hospitals into one calm, coordinated experience — from the first booking to Sevika's doctor-approved follow-up care.",
  // T-SEO-02 — canonical URL. The subpath form is the production URL
  // policy in effect (the deployed, verified live location); the trailing
  // slash matches GitHub Pages' final served URL. A hosting move later is
  // a one-pass origin update in src/lib/site.ts (File 04 §15).
  alternates: {
    canonical: `${SITE_PATH}/`,
  },
  openGraph: {
    title: "Aturseva — Care that walks with you",
    description:
      "One journey, in step: patients, doctors, and hospitals connected by Aturseva.",
    type: "website",
    url: `${SITE_PATH}/`,
  },
  // T-SEO-03 — minimal robots policy: the permissive crawler default made
  // explicit ("index, follow"). Identical in effect to the tag's absence;
  // flipping to noindex later is a one-line change. A physical robots.txt
  // is deliberately NOT added: GitHub Pages project sites serve under the
  // /aturseva-landing subpath, and robots.txt is only honoured at the host
  // root, which this repo cannot control — the meta tag is the one
  // effective policy channel here (File 12 §16 addendum records this).
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
