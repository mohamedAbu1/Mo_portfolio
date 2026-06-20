// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "build",
    ],
    rules: {
      // أمثلة على قواعد إضافية
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
