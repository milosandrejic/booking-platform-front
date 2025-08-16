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

export interface BackgroundColor {
  default: string;
  paper: string;
  subtle: string;
  hover: string;
}

export interface TextColor {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}

export interface BorderColor {
  light: string;
  main: string;
  dark: string;
}

export interface Color {
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorVariant;
  warning: ColorVariant;
  error: ColorVariant;
  info: ColorVariant;
  grey: GreyScale;
  background: BackgroundColor;
  text: TextColor;
  divider: string;
  border: BorderColor;
}

export interface FontSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
  "8xl": string;
  "9xl": string;
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

export interface Shadow {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

export interface Breakpoint {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface Theme {
  color: Color;
  fontFamily: string;
  fontSize: FontSize;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadow;
  breakpoints: Breakpoint;
}
