// Alager Site — Sanity schema: Timeline Entry
import { defineType, defineField } from "sanity";

export const timelineEntry = defineType({
  name: "timelineEntry",
  type: "document",
  title: "Entrada da Linha do Tempo",
  fields: [
    defineField({ name: "year", type: "number", title: "Ano", validation: (rule) => rule.required() }),
    defineField({ name: "title", type: "localeString", title: "Título" }),
    defineField({ name: "body", type: "localeString", title: "Descrição" }),
  ],
  orderings: [{ name: "year", title: "Ano", by: [{ field: "year", direction: "asc" }] }],
  preview: {
    select: { title: "title.pt", subtitle: "year" },
    prepare({ title, year }: { title?: string; year?: number }) {
      return { title: title || "Sem título", subtitle: year?.toString() };
    },
  },
});
