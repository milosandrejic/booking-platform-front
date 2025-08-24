import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
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

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
