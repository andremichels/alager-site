// Alager Site — Sanity schema: Energy Source stat (value + label)
import { defineType, defineField } from "sanity";

export const energyStat = defineType({
  name: "energyStat",
  type: "object",
  title: "Stat",
  fields: [
    defineField({ name: "value", type: "string", title: "Valor" }),
    defineField({ name: "label", type: "localeString", title: "Rótulo" }),
  ],
});
