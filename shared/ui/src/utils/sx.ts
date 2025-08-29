import type { CSSProperties } from "react";
import { css } from "@emotion/css";
import { theme, type Theme } from "@booking-platform-shared/theme";
import { merge, isFunction, compact } from "lodash";

/**
 * mergeStyles
 * Merges multiple style objects, filtering out undefined values
 */
export const mergeStyles = (
  ...styles: Array<CSSProperties | undefined>
): CSSProperties => merge({}, ...compact(styles));

/**
 * ThemeFunction
 * A function that receives the theme and returns a CSS value
 */
export type ThemeFunction<T> = (theme: Theme) => T;

/**
 * SxValue
 * A CSS value that can be static or theme-aware
 */
export type SxValue<T> = T | ThemeFunction<T>;

/**
 * SxProps
 * Extended CSSProperties that supports pseudo-selectors and nested styles
 */
export type SxProps = {
  [K in keyof CSSProperties]?: SxValue<CSSProperties[K]>;
} & {
  // Pseudo-selectors
  ":hover"?: SxProps;
  ":focus"?: SxProps;
  ":active"?: SxProps;
  ":disabled"?: SxProps;
  ":visited"?: SxProps;
  ":first-child"?: SxProps;
  ":last-child"?: SxProps;
  ":nth-child(odd)"?: SxProps;
  ":nth-child(even)"?: SxProps;
  // Add more pseudo-selectors as needed
  [selector: `&:${string}`]: SxProps;
  [selector: `&::${string}`]: SxProps;
};

/**
 * Convert sx object to Emotion CSS
 */
function convertSxToEmotion(sx: SxProps): any {
  const emotionStyles: any = {};

  for (const [key, value] of Object.entries(sx)) {
    if (key.startsWith(":") || key.startsWith("&")) {
      // Pseudo-selectors - Emotion handles these natively
      emotionStyles[key] = convertSxToEmotion(value as SxProps);
    } else {
      // Regular CSS properties
      if (isFunction(value)) {
        emotionStyles[key] = (value as ThemeFunction<any>)(theme);
      } else {
        emotionStyles[key] = value;
      }
    }
  }

  return emotionStyles;
}

/**
 * resolveSx
 * Uses Emotion to generate CSS classes with full SSR support
 */
export function resolveSx(sx?: SxProps): { styles: CSSProperties; className?: string } {
  if (!sx) {
    return { styles: {} };
  }

  // Convert sx to Emotion CSS and generate class
  const emotionCSS = convertSxToEmotion(sx);
  const className = css(emotionCSS);

  // Return empty styles since everything is handled by CSS classes now
  return { styles: {}, className };
}