// Main theme export
export { default as theme } from "./theme";
export type { Theme } from "./types";

// Individual system exports  
export { colors } from "./colors";
export {
  typography,
  fontFamily,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacing
} from "./typography";
export { spacing, borderRadius, shadows, breakpoints } from "./spacing";

// React Context providers and hooks
export { default as ThemeProvider, useTheme } from "./ThemeProvider";
export type { ThemeProviderProps } from "./ThemeProvider";
export { CssBaseline } from "./CssBaseline";

// Type exports for consumers
export type {
  Colors,
  ColorScale,
  ColorVariant,
  Typography,
  TypographyVariant,
  FontWeights,
  FontSizes,
  LineHeights,
  LetterSpacing,
  Spacing,
  BorderRadius,
  Shadows,
  Breakpoints
} from "./types";
