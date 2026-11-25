import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Sidebar group and position within it (see src/lib/nav.ts).
    section: z.enum(["Start here", "Using Snug", "Reference", "Help"]),
    order: z.number(),
  }),
});

export const collections = { docs };
