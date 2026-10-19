import { query } from "@/lib/mysql";

const siteUrl = "https://mohamedabudeveloper.com";
const locales = ["en", "ar", "de", "es", "fr", "it", "zh"];

export const dynamic = "force-dynamic";

export default async function sitemap() {
  let projectIds = [];
  try {
    const rows = await query("SELECT DISTINCT e.id FROM engagements e INNER JOIN deliverables d ON d.engagement_id=e.id WHERE d.visibility='public' AND d.status <> 'archived'");
    projectIds = rows.map((row) => `db-${row.id}`);
  } catch (error) {
    console.error("Sitemap project query failed:", error);
  }

  const localeEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.8,
  }));

  const detailEntries = locales.flatMap((locale) => projectIds.map((id) => ({
    url: `${siteUrl}/${locale}/details?id=${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  })));

  return [...localeEntries, ...detailEntries];
}
