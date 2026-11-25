import { getCollection, type CollectionEntry } from "astro:content";

export type Doc = CollectionEntry<"docs">;

export const SECTIONS = ["Start here", "Using Hive Local", "Reference", "Help"] as const;

export const REPO = "https://github.com/elliotwestlake/hive-local";
export const MARKETPLACE =
  "https://my.home-assistant.io/redirect/marketplace_repository/?owner=elliotwestlake&repository=hive-local&category=integration";

/** The page's URL: docs/index.md is /docs/, docs/schedules.md is /docs/schedules/. */
export function href(doc: Doc): string {
  return doc.id === "index" ? "/docs/" : `/docs/${doc.id}/`;
}

/** Every doc in sidebar order. */
export async function ordered(): Promise<Doc[]> {
  const docs = await getCollection("docs");
  return docs.sort(
    (a, b) =>
      SECTIONS.indexOf(a.data.section) - SECTIONS.indexOf(b.data.section) ||
      a.data.order - b.data.order,
  );
}

export function grouped(docs: Doc[]): { section: string; docs: Doc[] }[] {
  return SECTIONS.map((section) => ({
    section,
    docs: docs.filter((d) => d.data.section === section),
  })).filter((g) => g.docs.length);
}
