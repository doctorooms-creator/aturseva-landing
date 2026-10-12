import type { NextConfig } from "next";

// Deploy targets:
// - (default) local dev (:3005), self-contained preview (:3006) and Vercel:
//   root path, standard build — zero flags needed.
// - DEPLOY_TARGET=pages: static export for the GitHub Pages project site
//   (served under /aturseva-landing/) — see .github/workflows/deploy-pages.yml.
const isPagesExport = process.env.DEPLOY_TARGET === "pages";

const nextConfig: NextConfig = {
  // GSAP ScrollTrigger instances are managed imperatively; avoid double-invoke
  // of effects in dev to keep the animation module simple and predictable.
  reactStrictMode: false,
  ...(isPagesExport
    ? {
        output: "export" as const,
        basePath: "/aturseva-landing",
        distDir: ".next-pages",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
