import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prefix a public asset path with Vite's base URL (needed for the GitHub Pages subpath). */
export const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
};

export const contactLinks = {
  danielPhone: "063 312 579",
  danielTel: "tel:+38163312579",
  srdjanPhone: "060 630 1113",
  srdjanTel: "tel:+381606301113",
  viber: "viber://chat?number=%2B38163312579",
  whatsapp: "https://wa.me/38163312579",
  email: "info@remielectric.rs",
};
