/**
 * Sitemap Generator
 *
 * Generiše sitemap.xml fajl za sve stranice sajta
 *
 * Pokretanje:
 * node scripts/generate-sitemap.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://remielectric.rs";

const pages = [
  {
    url: "/",
    changefreq: "weekly",
    priority: "1.0",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: "/usluge",
    changefreq: "monthly",
    priority: "0.9",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: "/galerija",
    changefreq: "weekly",
    priority: "0.8",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: "/kontakt",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: "/zakazivanje",
    changefreq: "monthly",
    priority: "0.9",
    lastmod: new Date().toISOString().split("T")[0],
  },
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  const publicDir = path.join(__dirname, "../public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  fs.writeFileSync(sitemapPath, sitemap, "utf-8");
  console.log("✅ Sitemap.xml uspešno generisan!");
  console.log(`📍 Lokacija: ${sitemapPath}`);
  console.log(`\n📄 Generisano ${pages.length} stranica:`);
  pages.forEach((page) => {
    console.log(`   - ${SITE_URL}${page.url} (priority: ${page.priority})`);
  });
  console.log("\n💡 Pošaljite sitemap Google-u: https://search.google.com/search-console");
}

generateSitemap();
