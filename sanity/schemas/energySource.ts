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
    defineField({ name: "headline", type: "localeString", title: "Headline" }),
    defineField({ name: "body", type: "localeString", title: "Corpo do texto" }),
    defineField({ name: "focus", type: "localeString", title: "Foco ALAGER" }),
    defineField({ name: "stat1Value", type: "string", title: "Stat 1 — Valor" }),
    defineField({ name: "stat1Label", type: "localeString", title: "Stat 1 — Rótulo" }),
    defineField({ name: "stat2Value", type: "string", title: "Stat 2 — Valor" }),
    defineField({ name: "stat2Label", type: "localeString", title: "Stat 2 — Rótulo" }),
    defineField({ name: "stat3Value", type: "string", title: "Stat 3 — Valor" }),
    defineField({ name: "stat3Label", type: "localeString", title: "Stat 3 — Rótulo" }),
  ],
  preview: {
    select: { title: "key" },
  },
});
