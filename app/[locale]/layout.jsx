"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import LocaleRuntime from "@/components/LocaleRuntime";

export default function LocaleLayout({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleRuntime />
      {children}
    </I18nextProvider>
  );
}
