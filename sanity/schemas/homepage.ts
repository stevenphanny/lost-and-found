import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
      description: "Direct URL to the hero background video (MP4 recommended).",
    }),
    defineField({
      name: "heroPosterUrl",
      title: "Hero Poster URL",
      type: "url",
      description: "Fallback image shown before the video loads.",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "campaignTitle",
      title: "Campaign Title",
      type: "string",
    }),
    defineField({
      name: "campaignBody",
      title: "Campaign Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "campaignImage",
      title: "Campaign Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "campaignCtaLabel",
      title: "Campaign CTA Label",
      type: "string",
    }),
    defineField({
      name: "campaignCtaHref",
      title: "Campaign CTA URL",
      type: "string",
    }),
    defineField({
      name: "manifestoTitle",
      title: "Manifesto Title",
      type: "string",
    }),
    defineField({
      name: "manifestoBody",
      title: "Manifesto Body",
      type: "text",
      rows: 8,
    }),
  ],
  preview: {
    select: { title: "heroHeadline" },
    prepare({ title }) {
      return { title: title ?? "Homepage" };
    },
  },
});
