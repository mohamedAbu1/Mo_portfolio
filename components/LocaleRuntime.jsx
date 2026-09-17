"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import i18n, { RTL_LANGUAGES, SUPPORTED_LANGUAGES } from "@/i18n";

export default function LocaleRuntime() {
  const params = useParams();
  const locale = String(params?.locale || "en").toLowerCase();
  useEffect(() => {
    const nextLocale = SUPPORTED_LANGUAGES.includes(locale) ? locale : "en";
    const isRtl = RTL_LANGUAGES.includes(nextLocale);
    i18n.changeLanguage(nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.dataset.locale = nextLocale;
  }, [locale]);
  return null;
}
