// Alager Site — Sanity schema: SectorMetric (métrica do setor, usada no bloco da home)
import { defineType, defineField } from "sanity";

export const sectorMetric = defineType({
  name: "sectorMetric",
  type: "object",
  title: "Métrica do setor",
  fields: [
    defineField({ name: "label", type: "localeString", title: "Rótulo" }),
    defineField({ name: "value", type: "string", title: "Valor" }),
    defineField({ name: "source", type: "string", title: "Fonte" }),
    defineField({ name: "date", type: "date", title: "Data" }),
  ],
  preview: {
    select: { title: "value", subtitle: "label.pt" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "—", subtitle };
    },
  },
});
