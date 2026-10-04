/**
 * Public address of the site, without a trailing slash. Set VITE_SITE_URL at
 * build time (see .github/workflows/pages.yml); switch it to the custom domain
 * once one is connected.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://bcrnic.github.io/remielectric"
).replace(/\/$/, "");

/** Absolute URL of a page or public file, e.g. pageUrl("/usluge"). */
export const pageUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
