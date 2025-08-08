import { reactConfig } from "../../eslint.config.js";
import react from "eslint-plugin-react";
import eslintPluginImport from "eslint-plugin-import";

export default [
  {
    ignores: [
      "dist", 
      "build",
      "node_modules",
      "coverage",
    ],
  },
  {
    ...reactConfig,
    plugins: {
      ...reactConfig.plugins,
      react,
      import: eslintPluginImport,
    },
    files: ["**/*.{js,jsx}"],
    // Components-specific overrides can be added here
    rules: {
      ...reactConfig.rules,
      // Prefer named exports for components (allow default export only in index files via override below)
      "import/no-default-export": "error",

      // Keep JSX props multiline when there are 2+ props
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "react/jsx-first-prop-new-line": ["error", "multiline"],
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],

      // Discourage complex ternaries; nested ternaries are not allowed
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "warn",
    },
  },
  // Allow default exports in index files used for re-export/barrel patterns
  {
    files: ["**/index.js", "**/index.jsx"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  // Allow default exports in configuration files
  {
    files: ["**/*.config.js", "**/*.config.mjs", "**/*.config.cjs"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  // Allow default exports in Storybook stories (CSF default export is required)
  {
    files: ["**/*.stories.@(js|jsx)"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  // Allow default exports under utils
  {
    files: ["src/utils/**/*.{js,jsx}"],
    rules: {
      "import/no-default-export": "off",
    },
  },
];
