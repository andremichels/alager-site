// Alager Site — Sanity schema: Blog Post
import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  type: "document",
  title: "Post do Blog",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      title: "Título",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title.pt" } }),
    defineField({ name: "excerpt", type: "localeString", title: "Resumo" }),
    defineField({ name: "body", type: "localeString", title: "Corpo (Markdown)" }),
    defineField({ name: "cat", type: "localeString", title: "Categoria" }),
    defineField({ name: "date", type: "date", title: "Data de publicação" }),
    defineField({ name: "read", type: "number", title: "Tempo de leitura (min)" }),
    defineField({ name: "featured", type: "boolean", title: "Destaque", initialValue: false }),
    defineField({ name: "membersOnly", type: "boolean", title: "Exclusivo para associados", initialValue: false }),
    defineField({ name: "mainImage", type: "image", title: "Imagem principal" }),
  ],
  preview: {
    select: { title: "title.pt", subtitle: "date" },
  },
});
