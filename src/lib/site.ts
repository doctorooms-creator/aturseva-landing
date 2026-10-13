/**
 * site.ts — single source of truth for the public site origin.
 *
 * T-SEO-02/03/04 (File 12 §16, owner-delegated SEO-hygiene pass): the
 * live site is a GitHub Pages project site served under the subpath
 * /aturseva-landing (verified live 200). Every absolute metadata URL —
 * canonical, og:url, the sitemap entry — derives from these constants,
 * so nothing else in the app hardcodes the origin.
 *
 * File 04 §15 (metadata framework of record): "canonical/OG values must
 * reflect the actual public origin; if hosting moves (custom
 * domain/Vercel), metadata needs a one-pass origin update" — that
 * one-pass update is exactly this file.
 */
export const SITE_ORIGIN = "https://doctorooms-creator.github.io";
export const SITE_PATH = "/aturseva-landing";
export const SITE_URL = `${SITE_ORIGIN}${SITE_PATH}/`;
