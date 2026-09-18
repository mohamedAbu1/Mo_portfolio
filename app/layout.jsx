import "./style/globals.css";
import Providers from "./providers";

const siteUrl = "https://mohamedabudeveloper.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohamed Abu | Full-Stack Developer",
    template: "%s | Mohamed Abu",
  },
  description: "Mohamed Abu is a full-stack developer creating reliable websites, mobile apps, and professional digital experiences for people and businesses.",
  applicationName: "Mohamed Abu Developer",
  keywords: ["Mohamed Abu", "full-stack developer", "web developer", "Next.js developer", "React developer", "mobile app developer", "Egypt developer"],
  authors: [{ name: "Mohamed Abu", url: siteUrl }],
  creator: "Mohamed Abu",
  publisher: "Mohamed Abu",
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
    siteName: "Mohamed Abu Developer",
    title: "Mohamed Abu | Full-Stack Developer",
    description: "Websites, mobile apps, and professional digital experiences built with clarity and care.",
    images: [{ url: "/images/mohamed-abu-logo.png", alt: "Mohamed Abu Developer logo" }],
  },
  twitter: {
    card: "summary",
    title: "Mohamed Abu | Full-Stack Developer",
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
      name: "Mohamed Abu Developer",
      url: siteUrl,
      description: "Portfolio of Mohamed Abu, a full-stack developer.",
      author: { "@type": "Person", name: "Mohamed Abu" },
      inLanguage: ["en", "ar", "de", "es", "fr", "it", "zh"],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}