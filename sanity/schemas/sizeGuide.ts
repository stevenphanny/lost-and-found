import { defineField, defineType } from "sanity";

export const sizeGuide = defineType({
  name: "sizeGuide",
  title: "Size Guide",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rows",
      title: "Size rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "size", title: "Size", type: "string" }),
            defineField({ name: "chest", title: "Chest (cm)", type: "string" }),
            defineField({ name: "length", title: "Length (cm)", type: "string" }),
            defineField({ name: "shoulder", title: "Shoulder (cm)", type: "string" }),
          ],
          preview: {
            select: { title: "size" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
