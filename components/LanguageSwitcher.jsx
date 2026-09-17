"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const languages = [
  { code: "en", flag: "🇬🇧", native: "English", name: "English" },
  { code: "ar", flag: "🇪🇬", native: "العربية", name: "Arabic" },
  { code: "es", flag: "🇪🇸", native: "Español", name: "Spanish" },
  { code: "fr", flag: "🇫🇷", native: "Français", name: "French" },
  { code: "de", flag: "🇩🇪", native: "Deutsch", name: "German" },
  { code: "it", flag: "🇮🇹", native: "Italiano", name: "Italian" },
  { code: "zh", flag: "🇨🇳", native: "中文", name: "Chinese" },
].filter(({ code }) => SUPPORTED_LANGUAGES.includes(code));

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const currentCode = (i18n.resolvedLanguage || pathname.split("/")[1] || "en").split("-")[0];
  const current = languages.find(({ code }) => code === currentCode) || languages[0];

  useEffect(() => {
    function closeOnOutside(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function changeLanguage(next) {
    const parts = pathname.split("/");
    if (SUPPORTED_LANGUAGES.includes(parts[1])) parts[1] = next;
    else parts.splice(1, 0, next);
    i18n.changeLanguage(next);
    setOpen(false);
    router.push(parts.join("/") || `/${next}`);
  }

  return (
    <div ref={containerRef} className="language-switcher">
      <button
        type="button"
        className="language-trigger"
        aria-label={t("nav.language")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="language-current-flag" aria-hidden="true">{current.flag}</span>
        <span className="language-current-name">{current.native}</span>
        <span className="language-chevron" aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="language-menu" role="menu" aria-label={t("nav.language")}>
          {languages.map((language) => {
            const active = language.code === current.code;
            return (
              <button
                key={language.code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                className={`language-option${active ? " active" : ""}`}
                onClick={() => changeLanguage(language.code)}
              >
                <span className="language-option-flag" aria-hidden="true">{language.flag}</span>
                <span className="language-option-copy">
                  <span className="language-option-native">{language.native}</span>
                  <span className="language-option-english">{language.name}</span>
                </span>
                {active && <span className="language-check" aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
