// Alager Site — Root layout (minimal, delegates html/body to [locale])
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "ALAGER — Associação Latino-Americana de Energia Renovável",
    template: "%s — ALAGER",
  },
  description:
    "A ALAGER reúne associações, geradoras e instituições da Argentina ao México para articular políticas públicas e defender o investimento em energias renováveis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
