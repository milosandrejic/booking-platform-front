import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylistic from "@stylistic/eslint-plugin";

// Base configuration that can be extended by packages
export const baseConfig = {
  files: ["**/*.{js,jsx}"],
  plugins: {
    "@stylistic": stylistic,
  },
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: "latest",
      ecmaFeatures: {
        jsx: true 
      },
      sourceType: "module",
    },
  },
  rules: {
    "no-unused-vars": ["error",
      {
        varsIgnorePattern: "^[A-Z_]" 
      }],
    semi: "error",
    curly: "error",
    "@stylistic/array-element-newline": ["warn",
      {
        multiline: true, 
        minItems: 4 
      }],
    "@stylistic/arrow-parens": ["error",
      "as-needed",
      {
        requireForBlockBody: true 
      }],
    "@stylistic/dot-location": ["warn", "property"],
    "@stylistic/indent": ["warn",
      2,
      {
        SwitchCase: 1 
      }],
    "@stylistic/max-len": ["error",
      {
        code: 160,
        tabWidth: 2
      }],
    "@stylistic/multiline-ternary": ["error", "never"],
    "@stylistic/space-before-function-paren": "off",
    "@stylistic/function-call-argument-newline": ["warn", "consistent"],
    "@stylistic/no-multiple-empty-lines": ["error",
      { 
        max: 1, 
        maxEOF: 1, 
        maxBOF: 1
      }],
    "@stylistic/object-curly-spacing": ["warn", "always"],
    "@stylistic/padded-blocks": ["warn", "never"],
    "@stylistic/quote-props": ["warn", "as-needed"],
    "@stylistic/quotes": ["error", "double"],
  },
};

// React-specific configuration
export const reactConfig = {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    "react-hooks": reactHooks,
  },
  rules: {
    ...baseConfig.rules,
    ...reactHooks.configs.recommended.rules,
  },
};

// Vite-specific configuration (for React + Vite apps)
export const viteReactConfig = {
  ...reactConfig,
  plugins: {
    ...reactConfig.plugins,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactConfig.rules,
    ...reactRefresh.configs.vite.rules,
  },
};

// Next.js-specific configuration
export const nextReactConfig = {
  ...reactConfig,
  languageOptions: {
    ...reactConfig.languageOptions,
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
};

// Node.js-specific configuration (for utilities and tools)
export const nodeConfig = {
  ...baseConfig,
  languageOptions: {
    ...baseConfig.languageOptions,
    globals: {
      ...globals.node,
    },
  },
};

// Default export for root configuration
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**", 
      "**/.next/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/.cache/**",
      "**/.pnpm-store/**",
      "**/*.min.js",
      "**/*.d.ts",
    ],
  },
  {
    ...js.configs.recommended,
    ...baseConfig,
  },
];
