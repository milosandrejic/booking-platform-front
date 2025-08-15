import type { Theme } from "./types";
import { colors } from "./colors";
import { typography, fontFamily, fontWeights } from "./typography";
import { spacing, borderRadius, shadows, breakpoints } from "./spacing";

// Main theme object - simple and focused
export const theme: Theme = {
  colors,
  typography,
  fontFamily,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
  breakpoints
};

export default theme;
