// Type definitions for the theme system

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface ColorVariant {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface GreyScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface BackgroundColors {
  default: string;
  paper: string;
  subtle: string;
  hover: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}

export interface BorderColors {
  light: string;
  main: string;
  dark: string;
}

export interface Colors {
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorVariant;
  warning: ColorVariant;
  error: ColorVariant;
  info: ColorVariant;
  grey: GreyScale;
  background: BackgroundColors;
  text: TextColors;
  divider: string;
  border: BorderColors;
}

export interface FontWeights {
  thin: number;
  extralight: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface FontSizes {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}

export interface LineHeights {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface LetterSpacing {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

export interface TypographyVariant {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: number | string;
  letterSpacing?: string;
  textTransform?: string;
}

export interface Typography {
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  h5: TypographyVariant;
  h6: TypographyVariant;
  subtitle1: TypographyVariant;
  subtitle2: TypographyVariant;
  body1: TypographyVariant;
  body2: TypographyVariant;
  button: TypographyVariant;
  caption: TypographyVariant;
  overline: TypographyVariant;
}

export interface Spacing {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  full: string;
}

export interface Shadows {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface Theme {
  colors: Colors;
  typography: Typography;
  fontFamily: string;
  fontWeights: FontWeights;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  breakpoints: Breakpoints;
}
