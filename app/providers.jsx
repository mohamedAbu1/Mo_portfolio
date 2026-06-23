// app/providers.tsx
"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ReviewProvider } from "../context/ReviewContext";
import { MessageProvider } from "../context/MessageContext";
import { AuthProvider } from "../context/AuthContext";
export default function Providers({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <MessageProvider>
            <ReviewProvider>
              <Suspense fallback={<div>Loading filters...</div>}>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  theme="colored"
                />
                {children}
              </Suspense>
            </ReviewProvider>
          </MessageProvider>
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
