import type { CSSProperties } from "react";
import { theme, type Theme, getGlobalRegistry } from "@booking-platform-shared/theme";
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
 * Convert camelCase CSS properties to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Generate a simple hash for CSS content
 */
function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Convert CSS object to CSS string
 */
function cssObjectToString(cssObj: any, selector?: string): string {
  let cssString = "";
  const rules: string[] = [];
  const nestedRules: string[] = [];

  for (const [key, value] of Object.entries(cssObj)) {
    if (key.startsWith(":") || key.startsWith("&")) {
      // Handle pseudo-selectors and nested rules
      const nestedSelector = key.startsWith("&") ? selector + key.substring(1) : selector + key;
      nestedRules.push(cssObjectToString(value, nestedSelector));
    } else {
      // Regular CSS properties
      const kebabKey = camelToKebab(key);
      rules.push(`${kebabKey}:${value}`);
    }
  }

  if (rules.length > 0) {
    cssString += selector ? `${selector}{${rules.join(";")}}` : rules.join(";");
  } if (nestedRules.length > 0) {
    cssString += nestedRules.join("");
  }

  return cssString;
}

/**
 * Convert sx object to CSS object, resolving theme functions
 */
function convertSxToCSS(sx: SxProps): any {
  const cssObj: any = {};

  for (const [key, value] of Object.entries(sx)) {
    if (key.startsWith(":") || key.startsWith("&")) {
      // Pseudo-selectors and nested rules
      cssObj[key] = convertSxToCSS(value as SxProps);
    } else {
      // Regular CSS properties
      if (isFunction(value)) {
        cssObj[key] = (value as ThemeFunction<any>)(theme);
      } else {
        cssObj[key] = value;
      }
    }
  }

  return cssObj;
}

/**
 * Generate CSS class name and register styles
 */
function generateClassName(cssObj: any): string {
  // Convert CSS object to string for hashing
  const cssString = cssObjectToString(cssObj);
  const hash = generateHash(cssString);
  const className = `sx-${hash}`;

  // Register with global registry if available (SSR)
  const registry = getGlobalRegistry();
  if (registry && typeof window === "undefined") {
    registry.register(className, cssString);
  }

  // On client side, inject styles directly
  if (typeof window !== "undefined") {
    injectStyles(className, cssString);
  }

  return className;
}

/**
 * Inject styles into the document head (client-side only)
 */
function injectStyles(className: string, css: string): void {
  const styleId = `sx-${className}`;

  // Check if style already exists
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `.${className}{${css}}`;
  document.head.appendChild(style);
}

export function resolveSx(sx?: SxProps): { styles: CSSProperties; className?: string } {
  if (!sx) {
    return { styles: {} };
  }

  // Convert sx to CSS object, resolving theme functions
  const cssObj = convertSxToCSS(sx);

  // Generate class name and register/inject styles
  const className = generateClassName(cssObj);

  // Return empty styles since everything is handled by CSS classes
  return { styles: {}, className };
}