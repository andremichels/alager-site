// Alager Site — Sanity schema: Topic (taxonomia de temas)
import { defineType, defineField } from "sanity";

export const topic = defineType({
  name: "topic",
  type: "document",
  title: "Tema",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      title: "Nome do tema",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title.pt" },
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Ordem",
      options: { canvasApp: { exclude: true } },
    }),
  ],
  orderings: [
    { name: "order", title: "Ordem", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title.pt", subtitle: "slug.current" },
  },
});
