import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aturseva — Care that walks with you",
  description:
    "Aturseva weaves patients, doctors, and hospitals into one calm, coordinated experience — from the first booking to Sevika's doctor-approved follow-up care.",
  openGraph: {
    title: "Aturseva — Care that walks with you",
    description:
      "One journey, in step: patients, doctors, and hospitals connected by Aturseva.",
    type: "website",
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
