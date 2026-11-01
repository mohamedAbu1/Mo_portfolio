import "./style/globals.css";
import Providers from "./providers";
import { headers } from "next/headers";

const siteUrl = "https://mohamedabudeveloper.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "codeify | Full-Stack Developer",
    template: "%s | codeify",
  },
  description: "codeify creates reliable websites, mobile apps, and professional digital experiences for people and businesses.",
  applicationName: "codeify",
  keywords: ["codeify", "full-stack developer", "web developer", "Next.js developer", "React developer", "mobile app developer", "Egypt developer"],
  authors: [{ name: "Mohamed Abu", url: siteUrl }],
  creator: "codeify",
  publisher: "codeify",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ar: "/ar",
      de: "/de",
      es: "/es",
      fr: "/fr",
      it: "/it",
      zh: "/zh",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "codeify",
    title: "codeify | Full-Stack Developer",
    description: "Websites, mobile apps, and professional digital experiences built with clarity and care.",
    images: [{ url: "/images/mohamed-abu-logo.png", alt: "codeify logo" }],
  },
  twitter: {
    card: "summary",
    title: "codeify | Full-Stack Developer",
    description: "Websites, mobile apps, and professional digital experiences built with clarity and care.",
    images: ["/images/mohamed-abu-logo.png"],
  },
  icons: {
    icon: "/images/mohamed-abu-logo.png",
    shortcut: "/images/mohamed-abu-logo.png",
    apple: "/images/mohamed-abu-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Mohamed Abu",
      url: siteUrl,
      image: `${siteUrl}/images/mohamed-abu-logo.png`,
      jobTitle: "Full-Stack Developer",
      sameAs: [
        "https://www.facebook.com/mohamed.abu.102566",
        "https://www.instagram.com/webd66995/",
        "https://www.tiktok.com/@user997682949",
        "https://github.com/mohamedAbu1",
        "https://www.linkedin.com/in/mohamed-ahmed-a993b729b/",
      ],
    },
    {
      "@type": "WebSite",
      name: "codeify",
      url: siteUrl,
      description: "Portfolio of codeify, a full-stack digital studio.",
      author: { "@type": "Person", name: "Mohamed Abu" },
      inLanguage: ["en", "ar", "de", "es", "fr", "it", "zh"],
    },
  ],
};

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") || "en";
  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} data-locale={locale} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
