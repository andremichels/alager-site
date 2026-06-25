// Alager Site — Sanity schema: Board Member
import { defineType, defineField } from "sanity";

export const boardMember = defineType({
  name: "boardMember",
  type: "document",
  title: "Membro da Diretoria",
  fields: [
    defineField({ name: "name", type: "string", title: "Nome", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "localeString", title: "Cargo" }),
    defineField({ name: "country", type: "string", title: "País de origem" }),
    defineField({ name: "order", type: "number", title: "Ordem" }),
    defineField({ name: "photo", type: "image", title: "Foto" }),
  ],
  orderings: [{ name: "order", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "country" },
  },
});
