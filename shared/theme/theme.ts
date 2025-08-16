import type { Theme } from "./types";
import tokens from "./tokens.json";

// Main theme object - directly from tokens
export const theme: Theme = {
  color: tokens.color,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily.primary,
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  shadows: tokens.shadow,
  breakpoints: tokens.breakpoint
};

export default theme;
