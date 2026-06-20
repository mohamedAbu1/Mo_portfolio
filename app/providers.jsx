// app/providers.tsx
"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import {ThemeProvider} from "../context/ThemeContext"
export default function Providers({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Suspense fallback={<div>Loading filters...</div>}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
          {children}
        </Suspense>
      </ThemeProvider>
    </I18nextProvider>
  );
}
