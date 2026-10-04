import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * GitHub Pages only knows about real files, so every client-side route used to
 * come back as HTTP 404 (served by 404.html). This plugin writes one HTML file
 * per route at build time (dist/usluge.html is served at /usluge) with that
 * page's own title, description and canonical URL, and generates sitemap.xml.
 */

export interface StaticPage {
  /** Route path, e.g. "/usluge" ("/" for the homepage). */
  path: string;
  title: string;
  description: string;
  /** false: noindex and left out of the sitemap. */
  index?: boolean;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

interface Options {
  /** Public URL without a trailing slash, e.g. https://bcrnic.github.io/remielectric */
  siteUrl: string;
  pages: StaticPage[];
  /** Google Analytics id; the GA snippet is removed from the HTML when empty. */
  gaMeasurementId?: string;
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Replace the value of `attr` on the first tag that has `selector` (e.g. name="description"). */
const setAttr = (html: string, selector: string, attr: string, value: string) => {
  const pattern = new RegExp(`(<(?:meta|link)\\b[^>]*?${selector}[^>]*?${attr}=")[^"]*(")`, "s");
  if (!pattern.test(html)) throw new Error(`staticPages: no tag with ${selector} in index.html`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
};

const renderPage = (template: string, page: StaticPage, url: string) => {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`);
  html = setAttr(html, 'name="description"', "content", page.description);
  html = setAttr(
    html,
    'name="robots"',
    "content",
    page.index === false ? "noindex, nofollow" : "index, follow",
  );
  html = setAttr(html, 'rel="canonical"', "href", url);
  html = setAttr(html, 'property="og:url"', "content", url);
  html = setAttr(html, 'property="og:title"', "content", page.title);
  html = setAttr(html, 'property="og:description"', "content", page.description);
  html = setAttr(html, 'name="twitter:title"', "content", page.title);
  html = setAttr(html, 'name="twitter:description"', "content", page.description);
  return html;
};

const renderSitemap = (siteUrl: string, pages: StaticPage[]) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => p.index !== false)
    .map(
      (p) => `  <url>
    <loc>${siteUrl}${p.path === "/" ? "/" : p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq ?? "monthly"}</changefreq>
    <priority>${p.priority ?? "0.5"}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

export const staticPages = ({ siteUrl, pages, gaMeasurementId }: Options): Plugin => {
  let outDir = "dist";
  let basePath = "/";

  return {
    name: "remielectric-static-pages",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      basePath = config.base;
    },
    transformIndexHtml(html) {
      let out = html.replace(/%SITE_URL%/g, siteUrl);
      if (!gaMeasurementId) {
        out = out.replace(/\s*<!-- ga:start -->[\s\S]*?<!-- ga:end -->/, "");
      }
      return out;
    },
    closeBundle() {
      const indexFile = path.join(outDir, "index.html");
      if (!fs.existsSync(indexFile)) return; // dev server, nothing to write

      const template = fs.readFileSync(indexFile, "utf8");
      for (const page of pages) {
        const url = `${siteUrl}${page.path === "/" ? "/" : page.path}`;
        const file = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
        fs.writeFileSync(path.join(outDir, file), renderPage(template, page, url));
      }

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), renderSitemap(siteUrl, pages));

      for (const file of ["robots.txt", "404.html"]) {
        const target = path.join(outDir, file);
        if (!fs.existsSync(target)) continue;
        const text = fs
          .readFileSync(target, "utf8")
          .replace(/%SITE_URL%/g, siteUrl)
          .replace(/%BASE_PATH%/g, basePath.replace(/\/$/, ""));
        fs.writeFileSync(target, text);
      }
    },
  };
};
