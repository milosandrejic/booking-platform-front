import globals from "globals";
import eslintJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import stylisticPlugin from "@stylistic/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

// ----------------------------------------------------------------------

/**
 * @rules common
 * from "react", "eslint-plugin-react-hooks"...
 */
const commonRules = () => ({
  ...reactHooksPlugin.configs.recommended.rules,
  "no-shadow": 2,
  "func-names": 1,
  "no-bitwise": 2,
  "object-shorthand": 1,
  "no-useless-rename": 1,
  "default-case-last": 2,
  "consistent-return": 2,
  "no-constant-condition": 1,
  // Disabled here and specifically configured in unusedCodesRules
  "no-unused-vars": 0,
  "default-case": [2, { commentPattern: "^no default$" }],
  "lines-around-directive": [2, { before: "always", after: "always" }],
  "arrow-body-style": 0,
  "no-constant-binary-expression": 0,
  // react
  "react/jsx-key": 0,
  "react/prop-types": 0,
  "react/display-name": 0,
  "react/no-children-prop": 0,
  "react/jsx-boolean-value": 2,
  "react/self-closing-comp": 2,
  "react/react-in-jsx-scope": 0,
  "react/jsx-no-useless-fragment": [1, { allowExpressions: true }],
  "react/jsx-curly-brace-presence": [2, { props: "never", children: "never" }],
  "react/no-unescaped-entities": 0,
  "react-hooks/exhaustive-deps": 0,
});

/**
 * @rules import
 * from "eslint-plugin-import".
 */
const importRules = () => ({
  ...importPlugin.configs.recommended.rules,
  "import/named": 0,
  "import/export": 0,
  "import/default": 0,
  "import/namespace": 0,
  "import/no-named-as-default": 0,
  "import/newline-after-import": 2,
  "import/no-named-as-default-member": 0,
});

/**
 * @rules unused imports and functions
 * from "eslint-plugin-unused-imports" and core eslint.
 */
const unusedCodesRules = () => ({
  // Use warnings for unused imports and vars
  "unused-imports/no-unused-imports": 1,
  "unused-imports/no-unused-vars": [
    1,
    {
      vars: "all",
      varsIgnorePattern: "^_",
      args: "after-used",
      argsIgnorePattern: "^_",
      ignoreRestSiblings: true
    }
  ],
  // Rules for detecting unused functions and code (as warnings)
  "no-unused-expressions": [1, { allowShortCircuit: true, allowTernary: true }],
  // Disable the core no-unused-vars since we're using the unused-imports version
  "no-unused-vars": 0,
  "no-unused-private-class-members": 1
});

/**
 * @rules sort or imports/exports
 * from "eslint-plugin-perfectionist".
 */
const sortImportsRules = () => {
  const customGroups = {
    mui: ["custom-mui"],
    auth: ["custom-auth"],
    hooks: ["custom-hooks"],
    utils: ["custom-utils"],
    types: ["custom-types"],
    routes: ["custom-routes"],
    sections: ["custom-sections"],
    components: ["custom-components"],
  };

  const typeGroups = [
    ["type", "external-type", "builtin-type"],
    { newlinesBetween: "never" },
    ["index-type",
      "parent-type",
      "sibling-type",
      "internal-type"],
  ];

  return {
    "perfectionist/sort-named-imports": [1, { type: "line-length", order: "asc" }],
    "perfectionist/sort-named-exports": [1, { type: "line-length", order: "asc" }],
    "perfectionist/sort-exports": [
      1,
      {
        order: "asc",
        type: "line-length",
        groupKind: "values-first",
      },
    ],
    "perfectionist/sort-imports": [
      2,
      {
        order: "asc",
        ignoreCase: true,
        type: "line-length",
        environment: "node",
        maxLineLength: undefined,
        newlinesBetween: "always",
        internalPattern: ["^@/.+"],
        groups: [
          "style",
          "side-effect",
          ...typeGroups,
          ["builtin", "external"],
          customGroups.mui,
          customGroups.routes,
          customGroups.hooks,
          customGroups.utils,
          "internal",
          customGroups.components,
          customGroups.sections,
          customGroups.auth,
          customGroups.types,
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        customGroups: {
          value: {
            [customGroups.mui]: ["^@mui/.+"],
            [customGroups.auth]: ["^@/auth/.+"],
            [customGroups.hooks]: ["^@/hooks/.+"],
            [customGroups.utils]: ["^@/utils/.+"],
            [customGroups.types]: ["^@/types/.+"],
            [customGroups.routes]: ["^@/routes/.+"],
            [customGroups.sections]: ["^@/sections/.+"],
            [customGroups.components]: ["^@/components/.+"],
          },
        },
      },
    ],
  };
};

/**
 * Custom ESLint configuration.
 */
export const customConfig = {
  plugins: {
    "react-hooks": reactHooksPlugin,
    "unused-imports": unusedImportsPlugin,
    perfectionist: perfectionistPlugin,
    import: importPlugin,
    "@stylistic": stylisticPlugin
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".json"],
      },
    },
  },
  rules: {
    ...commonRules(),
    ...importRules(),
    ...unusedCodesRules(),
    ...sortImportsRules(),
    // Add stylistic rules
    "quotes": ["warn", "double", { "avoidEscape": true }],
    "@stylistic/quotes": ["warn", "double", { "avoidEscape": true }],
    "@stylistic/semi": ["warn", "always"],
    curly: "error",
    "@stylistic/dot-location": ["warn", "property"],
    "@stylistic/indent": ["warn", 2, { SwitchCase: 1 }],
    "@stylistic/multiline-ternary": ["error", "never"],
    "@stylistic/space-before-function-paren": "off",
    "@stylistic/function-call-argument-newline": ["warn", "consistent"],
    "@stylistic/no-multiple-empty-lines": ["error",
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 1
      }],
  },
};

// ----------------------------------------------------------------------

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: ["*", "!src/", "!eslint.config.*", "eslint.config.mjs"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: "detect" } },
  },
  eslintJs.configs.recommended,
  reactPlugin.configs.flat.recommended,
  customConfig,
];