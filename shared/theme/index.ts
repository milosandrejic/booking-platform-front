// Main theme exports
export { default as theme } from "./theme";
export { default as tokens } from "./tokens.json";
export type { Theme } from "./types";

// React Context providers and hooks
export { default as ThemeProvider, useTheme } from "./ThemeProvider";
export type { ThemeProviderProps } from "./ThemeProvider";
export { default as StylesInjector } from "./StylesInjector";
export { CssBaseline } from "./CssBaseline";
export { useThemeVariables } from "./useThemeVariables";
export { useDefaultFont } from "./useDefaultFont";

// CSS Variables utilities
export {
  flattenTheme,
  generateCSSVariables
} from "./cssVariables";

// Type exports for consumers
export type {
  Color,
  ColorScale,
  ColorVariant,
  FontSize,
  Spacing,
  BorderRadius,
  Shadow,
  Breakpoint
} from "./types";

// Style Registry for SSR
export {
  StyleRegistry,
  createStyleRegistry,
  setGlobalRegistry,
  getGlobalRegistry
} from './styleRegistry';
export type { StyleRegistryOptions } from './styleRegistry';
