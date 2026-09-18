const siteUrl = "https://mohamedabudeveloper.com";
const locales = ["en", "ar", "de", "es", "fr", "it", "zh"];

export default function sitemap() {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.8,
  }));
}