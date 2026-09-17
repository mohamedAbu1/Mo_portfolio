import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import es from "./locales/es/translation.json";
import fr from "./locales/fr/translation.json";
import de from "./locales/de/translation.json";
import it from "./locales/it/translation.json";
import zh from "./locales/zh/translation.json";

export const SUPPORTED_LANGUAGES = ["en", "ar", "es", "fr", "de", "it", "zh"];
export const RTL_LANGUAGES = ["ar"];
const resources = {
  en: { translation: en },
  ar: { translation: ar },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  zh: { translation: zh },
};

if (!i18n.isInitialized) {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    defaultNS: "translation",
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: { order: ["path", "localStorage", "cookie", "navigator"], caches: ["localStorage", "cookie"] },
    react: { useSuspense: false },
  });
}
export default i18n;
