// Alager Site — Sanity schema: Energy Source content
import { defineType, defineField } from "sanity";

export const energySource = defineType({
  name: "energySource",
  type: "document",
  title: "Fonte de Energia",
  fields: [
    defineField({
      name: "key",
      type: "string",
      title: "Chave",
      options: {
        list: [
          { value: "Solar", title: "Solar" },
          { value: "Eólica", title: "Eólica" },
          { value: "Biomassa", title: "Biomassa" },
          { value: "Hídrica", title: "Hídrica" },
          { value: "Hidrogênio", title: "Hidrogênio" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", type: "localeString", title: "Nome (aba)" }),
    defineField({ name: "order", type: "number", title: "Ordem" }),
    defineField({ name: "body", type: "localeString", title: "Corpo do texto" }),
    defineField({ name: "focus", type: "localeString", title: "Foco ALAGER" }),
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      of: [{ type: "energyStat" }],
    }),
  ],
  orderings: [{ name: "order", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name.pt", subtitle: "key" },
  },
});
