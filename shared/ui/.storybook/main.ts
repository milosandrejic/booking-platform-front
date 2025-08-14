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
  },
  viteFinal: async (cfg) => {
    cfg.esbuild = cfg.esbuild || {};
    // Ensure JSX automatic runtime
    cfg.esbuild.jsx = "automatic";
    return cfg;
  },
};

export default config;
