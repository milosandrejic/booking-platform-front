import { reactConfig } from "../../eslint.config.js";
import react from "eslint-plugin-react";
import eslintPluginImport from "eslint-plugin-import";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist", "build", "node_modules", "coverage"],
  },
  {
    ...reactConfig,
    plugins: {
      ...reactConfig.plugins,
      react,
      import: eslintPluginImport,
    },
    files: ["**/*.{js,jsx,ts,tsx}"],
    // Components-specific overrides can be added here
    rules: {
      ...reactConfig.rules,
      // Allow default exports at package level; we will be rational with exports in code reviews
      "import/no-default-export": "off",

      // Ensure variables used in JSX aren't flagged as unused (e.g., Story in decorators)
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "off",

      // Keep JSX props multiline when there are 2+ props
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "react/jsx-first-prop-new-line": ["error", "multiline"],
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],

      // Discourage complex ternaries; nested ternaries are not allowed
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  // Per-file overrides no longer needed since the rule is globally disabled
];
