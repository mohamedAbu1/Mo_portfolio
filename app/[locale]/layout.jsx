import LocaleProviders from "@/components/LocaleProviders";

const siteUrl = "https://mohamedabudeveloper.com";
const locales = ["en", "ar", "de", "es", "fr", "it", "zh"];
const localeMetadata = {
  en: {
    title: "Mohamed Abu | Full-Stack Developer",
    description: "Mohamed Abu creates reliable websites, mobile apps, and professional digital experiences for people and businesses.",
  },
  ar: {
    title: "محمد أبو | مطور Full-Stack",
    description: "محمد أبو مطور Full-Stack ينشئ مواقع وتطبيقات وتجارب رقمية احترافية للأفراد والشركات.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale: requestedLocale } = await params;
  const locale = locales.includes(requestedLocale) ? requestedLocale : "en";
  const copy = localeMetadata[locale] || localeMetadata.en;
  const languageAlternates = Object.fromEntries(locales.map((item) => [item, `/${item}`]));

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      url: `${siteUrl}/${locale}`,
      locale: locale === "ar" ? "ar_EG" : locale,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      title: copy.title,
      description: copy.description,
    },
  };
}

export default function LocaleLayout({ children }) {
  return <LocaleProviders>{children}</LocaleProviders>;
}
