// Alager Site — Sanity schema: Membership tier
import { defineType, defineField } from "sanity";

export const membershipTier = defineType({
  name: "membershipTier",
  type: "document",
  title: "Categoria de Associação",
  fields: [
    defineField({
      name: "key",
      type: "string",
      title: "Chave",
      options: {
        list: [
          { value: "institutional", title: "Institucional" },
          { value: "corporate", title: "Corporativo" },
          { value: "academic", title: "Acadêmica" },
        ],
        canvasApp: { exclude: true },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", type: "localeString", title: "Nome" }),
    defineField({ name: "price", type: "localeString", title: "Preço" }),
    defineField({ name: "desc", type: "localeString", title: "Descrição" }),
    defineField({
      name: "features",
      type: "array",
      title: "Benefícios",
      of: [{ type: "localeString" }],
    }),
    defineField({ name: "order", type: "number", title: "Ordem", options: { canvasApp: { exclude: true } } }),
  ],
  orderings: [{ name: "order", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name.pt", subtitle: "key" },
  },
});
