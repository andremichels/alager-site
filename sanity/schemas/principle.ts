// Alager Site — Sanity schema: Principle (values grid on Quem Somos)
import { defineType, defineField } from "sanity";

export const principle = defineType({
  name: "principle",
  type: "document",
  title: "Princípio",
  fields: [
    defineField({ name: "t", type: "localeString", title: "Título" }),
    defineField({ name: "b", type: "localeString", title: "Corpo" }),
    defineField({ name: "order", type: "number", title: "Ordem", options: { canvasApp: { exclude: true } } }),
  ],
  orderings: [{ name: "order", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "t.pt", subtitle: "order" },
  },
});
