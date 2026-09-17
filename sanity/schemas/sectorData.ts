// Alager Site — Sanity schema: SectorData (singleton — bloco fixo e atualizável da home)
import { defineType, defineField } from "sanity";

export const sectorData = defineType({
  name: "sectorData",
  type: "document",
  title: "Dados do Setor (singleton)",
  fields: [
    defineField({ name: "kicker", type: "localeString", title: "Kicker" }),
    defineField({ name: "title", type: "localeString", title: "Título" }),
    defineField({
      name: "metrics",
      type: "array",
      title: "Métricas",
      of: [{ type: "sectorMetric" }],
    }),
  ],
  preview: {
    select: { subtitle: "title.pt" },
    prepare({ subtitle }: { subtitle?: string }) {
      return { title: "Dados do Setor", subtitle: subtitle || "Bloco fixo da home" };
    },
  },
});
