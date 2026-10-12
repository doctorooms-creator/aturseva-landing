import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GSAP ScrollTrigger instances are managed imperatively; avoid double-invoke
  // of effects in dev to keep the animation module simple and predictable.
  reactStrictMode: false,
};

export default nextConfig;
