import type { Theme } from "./types";
import tokens from "./tokens.json";

// Main theme object - directly from tokens
export const theme: Theme = {
  color: tokens.color,
  typography: tokens.typography,
  fontFamily: tokens.fontFamily.primary,
  fontWeights: tokens.fontWeight,
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  shadows: tokens.shadow,
  breakpoints: tokens.breakpoint
};

export default theme;
