import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Static-export compatibility (DEPLOY_TARGET=pages, File 10 §10): with
// `output: "export"`, metadata routes must be explicitly static.
export const dynamic = "force-static";

/**
 * T-SEO-04 (File 12 §16, owner-delegated SEO-hygiene pass): the minimal
 * one-page sitemap — the complete public route inventory is exactly one
 * URL (route invention is prohibited; File 12 §16 T-SEO-12).
 *
 * Deliberately carries no indexing hints (no changeFrequency, no
 * priority): T-SEO-03 records "do not imply indexing goals". The static
 * export emits this at /aturseva-landing/sitemap.xml; on a GitHub Pages
 * project subpath it is discoverable via direct submission — a root
 * robots.txt cannot reference it (see layout.tsx robots note and the
 * File 12 §16 addendum).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL }];
}
