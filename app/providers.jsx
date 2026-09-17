"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import SeasonalThemeSync from "@/components/Portfolio/SeasonalThemeSync";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <SeasonalThemeSync />
          <Suspense fallback={<div>Loading...</div>}>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            {children}
          </Suspense>
        </ThemeProvider>
      </I18nextProvider>
    </SessionProvider>
  );
}

