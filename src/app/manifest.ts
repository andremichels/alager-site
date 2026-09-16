// Alager Site — PWA manifest
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALAGER — Associação Latino-Americana de Energia Renovável",
    short_name: "ALAGER",
    description:
      "Associação Latino-Americana de Energia Renovável — articulando a transição energética da América Latina desde 2018.",
    id: "/",
    start_url: "/pt",
    scope: "/",
    display: "standalone",
    background_color: "#07301f",
    theme_color: "#0a3d2e",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/maskable-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
