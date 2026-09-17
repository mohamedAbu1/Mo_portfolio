"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const labels = { en: "English", ar: "العربية", es: "Español", fr: "Français", de: "Deutsch", it: "Italiano", zh: "中文" };

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || pathname.split("/")[1] || "en").split("-")[0];

  function changeLanguage(event) {
    const next = event.target.value;
    const parts = pathname.split("/");
    if (SUPPORTED_LANGUAGES.includes(parts[1])) parts[1] = next;
    else parts.splice(1, 0, next);
    i18n.changeLanguage(next);
    router.push(parts.join("/") || `/${next}`);
  }

  return (
    <label className="language-switcher" aria-label={t("nav.language")}>
      <span aria-hidden="true">文</span>
      <select value={SUPPORTED_LANGUAGES.includes(current) ? current : "en"} onChange={changeLanguage}>
        {SUPPORTED_LANGUAGES.map((language) => <option key={language} value={language}>{labels[language]}</option>)}
      </select>
    </label>
  );
}
