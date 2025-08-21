import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (cfg) => {
    cfg.esbuild = cfg.esbuild || {};
    // Ensure JSX automatic runtime
    cfg.esbuild.jsx = "automatic";

    // Fix docs renderer optimization issue
    cfg.optimizeDeps = cfg.optimizeDeps || {};
    cfg.optimizeDeps.exclude = cfg.optimizeDeps.exclude || [];
    cfg.optimizeDeps.exclude.push("@storybook/addon-docs");

    return cfg;
  },
};

export default config;
