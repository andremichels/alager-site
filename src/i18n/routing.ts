// Alager Site — Next.js + next-intl routing config
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "es", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
  localeDetection: true,
});
