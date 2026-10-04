import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { staticPages } from "./build/staticPages";

const siteUrl = (process.env.VITE_SITE_URL ?? "https://bcrnic.github.io/remielectric").replace(
  /\/$/,
  "",
);

// Titles and descriptions come from the Serbian translations, the site's default language
const seo = JSON.parse(fs.readFileSync(path.resolve(__dirname, "src/i18n/locales/sr.json"), "utf8"))
  .seo as Record<string, { title: string; description: string }>;

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
  base: process.env.VITE_BASE_URL ?? "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    staticPages({
      siteUrl,
      gaMeasurementId: process.env.VITE_GA_MEASUREMENT_ID,
      pages: [
        { path: "/", ...seo.home, changefreq: "weekly", priority: "1.0" },
        { path: "/usluge", ...seo.services, priority: "0.9" },
        { path: "/galerija", ...seo.gallery, changefreq: "weekly", priority: "0.8" },
        { path: "/kontakt", ...seo.contact, priority: "0.8" },
        { path: "/zakazivanje", ...seo.booking, priority: "0.9" },
        {
          path: "/admin",
          title: "Admin - REMIELECTRIC",
          description: "Admin panel",
          index: false,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
