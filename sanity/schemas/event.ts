// Alager Site — Sanity schema: Event (agenda)
import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  type: "document",
  title: "Evento",
  fields: [
    defineField({
      name: "name",
      type: "localeString",
      title: "Nome",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "dateStart", type: "date", title: "Data de início" }),
    defineField({ name: "dateEnd", type: "date", title: "Data de término" }),
    defineField({ name: "location", type: "string", title: "Local" }),
    defineField({ name: "url", type: "url", title: "Link de inscrição" }),
    defineField({ name: "description", type: "localeString", title: "Descrição" }),
    defineField({ name: "image", type: "image", title: "Imagem" }),
    defineField({
      name: "origin",
      type: "string",
      title: "Origem",
      options: {
        list: [
          { value: "alager", title: "ALAGER" },
          { value: "external", title: "Externo" },
        ],
        canvasApp: { exclude: true },
      },
      initialValue: "external",
    }),
    defineField({
      name: "topic",
      type: "reference",
      to: [{ type: "topic" }],
      title: "Tema",
    }),
  ],
  orderings: [
    { name: "dateStart", title: "Data", by: [{ field: "dateStart", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.pt", subtitle: "dateStart", location: "location" },
    prepare({ title, subtitle, location }: { title?: string; subtitle?: string; location?: string }) {
      return { title: title || "—", subtitle: [subtitle, location].filter(Boolean).join(" · ") };
    },
  },
});
