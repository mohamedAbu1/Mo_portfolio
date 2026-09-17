import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import { globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  globalIgnores(["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**"]),
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: { "@next/next": nextPlugin, react: reactPlugin, "react-hooks": reactHooks },
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
      globals: {
        process: "readonly", console: "readonly", Response: "readonly", URL: "readonly",
        TextEncoder: "readonly", atob: "readonly", window: "readonly", document: "readonly",
        localStorage: "readonly", Buffer: "readonly", fetch: "readonly", FormData: "readonly",
        File: "readonly", Blob: "readonly", FileReader: "readonly", URLSearchParams: "readonly",
        setTimeout: "readonly", clearTimeout: "readonly", setInterval: "readonly",
        clearInterval: "readonly", IntersectionObserver: "readonly", CustomEvent: "readonly", alert: "readonly",
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
];