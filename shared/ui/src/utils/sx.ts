import type { CSSProperties } from "react";
import { getGlobalRegistry } from "@booking-platform-shared/theme";
import _ from "lodash";

/**
 * mergeStyles - Simple object merge
 */
export const mergeStyles = (
  ...styles: Array<CSSProperties | undefined>
): CSSProperties => Object.assign({}, ...styles.filter(Boolean));

/**
 * SxProps - Simple CSS properties (strings only)
 */
export type SxProps = {
  [K in keyof CSSProperties]?: string | number;
} & {
  // Pseudo-selectors
  ":hover"?: SxProps;
  ":focus"?: SxProps;
  ":active"?: SxProps;
  ":disabled"?: SxProps;
  [selector: `&:${string}`]: SxProps;
  [selector: `&::${string}`]: SxProps;
};

/**
 * Add px to numeric values for common CSS properties
 */
function addPxIfNeeded(property: string, value: string | number): string {
  if (typeof value === "number") {
    // Properties that should remain unitless
    if (property === "zIndex" || property === "opacity" || property === "flexGrow" ||
      property === "flexShrink" || property === "order" || property === "fontWeight") {
      return value.toString();
    }
    // Add px to numeric values
    return `${value}px`;
  }
  return String(value);
}

/**
 * Generate hash for CSS string
 */
function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Convert CSS object to CSS string
 */
function cssObjectToString(cssObj: any, selector?: string): string {
  const rules: string[] = [];
  const nestedRules: string[] = [];

  for (const [key, value] of Object.entries(cssObj)) {
    if (key.startsWith(":") || key.startsWith("&")) {
      // Handle pseudo-selectors
      const nestedSelector = key.startsWith("&") ? selector + key.substring(1) : selector + key;
      nestedRules.push(cssObjectToString(value, nestedSelector));
    } else {
      // Regular CSS properties
      const kebabKey = _.kebabCase(key);
      const cssValue = addPxIfNeeded(key, value as string | number);
      rules.push(`${kebabKey}:${cssValue}`);
    }
  }

  let cssString = "";
  if (rules.length > 0) {
    cssString += selector ? `${selector}{${rules.join(";")}}` : rules.join(";");
  }
  if (nestedRules.length > 0) {
    cssString += nestedRules.join("");
  }

  return cssString;
}

/**
 * Generate className and always use registry (both SSR and CSR)
 */
function generateClassName(cssObj: any): string {
  const cssString = cssObjectToString(cssObj);
  const hash = generateHash(cssString);
  const className = `sx-${hash}`;

  // Always use registry for collection (both SSR and CSR)
  const registry = getGlobalRegistry();
  if (registry) {
    registry.register(className, cssString);
  }

  return className;
}

export function resolveSx(sx?: SxProps): { styles: CSSProperties; className: string } {
  if (!sx) {
    return { styles: {}, className: "" };
  }

  const className = generateClassName(sx);

  return { styles: {}, className };
}