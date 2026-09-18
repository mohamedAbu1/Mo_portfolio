const siteUrl = "https://mohamedabudeveloper.com";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard", "/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}