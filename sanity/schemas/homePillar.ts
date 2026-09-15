// Alager Site — Sanity schema: Home pillar (numbered card)
import { defineType, defineField } from "sanity";

export const homePillar = defineType({
  name: "homePillar",
  type: "object",
  title: "Pilar",
  fields: [
    defineField({ name: "n", type: "string", title: "Número" }),
    defineField({ name: "t", type: "localeString", title: "Título" }),
    defineField({ name: "b", type: "localeString", title: "Corpo" }),
  ],
  preview: {
    select: { title: "t.pt", subtitle: "n" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Pilar", subtitle: subtitle || "" };
    },
  },
});
