import type { CSSProperties } from "react";
import { getGlobalRegistry } from "@booking-platform-shared/theme";
import _ from "lodash";

/**
 * Merge multiple style objects into one, filtering out undefined values
 */
export const mergeStyles = (
  ...styles: Array<CSSProperties | undefined>
): CSSProperties => Object.assign({}, ...styles.filter(Boolean));

/**
 * Supported CSS properties with pseudo-selector support
 */
export type SxProps = {
  [K in keyof CSSProperties]?: string | number;
} & {
  ":hover"?: SxProps;
  ":focus"?: SxProps;
  ":active"?: SxProps;
  ":disabled"?: SxProps;
  [selector: `&:${string}`]: SxProps;
  [selector: `&::${string}`]: SxProps;
};

/**
 * CSS properties that should remain unitless (no 'px' added)
 */
const UNITLESS_PROPERTIES = new Set([
  "zIndex",
  "opacity",
  "flexGrow",
  "flexShrink",
  "order",
  "fontWeight"
]);

/**
 * Converts numeric values to CSS values, adding 'px' when needed
 * Examples: 16 → "16px", 0.5 → "0.5" (for opacity), "100%" → "100%"
 */
function convertToCSSValue(cssProperty: string, value: string | number): string {
  if (typeof value === "number") {
    const shouldRemainUnitless = UNITLESS_PROPERTIES.has(cssProperty);
    return shouldRemainUnitless ? value.toString() : `${value}px`;
  }
  return String(value);
}

/**
 * Creates a unique hash from a string for CSS class generation
 */
function createHashFromString(text: string): string {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    const character = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
}

/**
 * Converts a CSS object to a CSS string, handling nested pseudo-selectors
 * Examples:
 * - { color: "red" } → "color:red"
 * - { ":hover": { color: "blue" } } → ".className:hover{color:blue}"
 */
function convertCSSObjectToString(cssObject: any, baseSelector?: string): string {
  const regularCSSRules: string[] = [];
  const nestedSelectorRules: string[] = [];

  for (const [cssProperty, cssValue] of Object.entries(cssObject)) {
    const isPseudoSelector = cssProperty.startsWith(":") || cssProperty.startsWith("&");

    if (isPseudoSelector) {
      // &:hover → .className:hover, :hover → .className:hover
      const fullSelector = cssProperty.startsWith("&") ? baseSelector + cssProperty.substring(1) : baseSelector + cssProperty;

      const nestedCSS = convertCSSObjectToString(cssValue, fullSelector);
      nestedSelectorRules.push(nestedCSS);
    } else {
      const kebabCaseProperty = _.kebabCase(cssProperty);
      const formattedValue = convertToCSSValue(cssProperty, cssValue as string | number);
      regularCSSRules.push(`${kebabCaseProperty}:${formattedValue}`);
    }
  }

  let finalCSSString = "";

  // Add regular CSS rules
  if (regularCSSRules.length > 0) {
    const rulesString = regularCSSRules.join(";");
    finalCSSString += baseSelector ? `${baseSelector}{${rulesString}}` : rulesString;
  }

  // Add nested selector rules (pseudo-selectors)
  if (nestedSelectorRules.length > 0) {
    finalCSSString += nestedSelectorRules.join("");
  }

  return finalCSSString;
}

/**
 * Generates a unique CSS class name and registers the styles
 * Returns the class name for use in React components
 */
function generateCSSClassAndRegisterStyles(cssObject: any): string {
  const cssString = convertCSSObjectToString(cssObject);
  const uniqueHash = createHashFromString(cssString);
  const className = `sx-${uniqueHash}`;

  // Register styles with the global registry for SSR/CSR collection
  const styleRegistry = getGlobalRegistry();
  if (styleRegistry) {
    styleRegistry.register(className, cssString);
  }

  return className;
}

/**
 * Main function: Converts sx props to CSS class name
 * 
 * Usage:
 * const sxClassName = resolveSx({ color: "red", ":hover": { color: "blue" } });
 * 
 * Returns:
 * - Generated CSS class name (e.g., "sx-abc123") or empty string if no sx props
 */
export function resolveSx(sxProps?: SxProps): string {
  if (!sxProps) {
    return "";
  }

  return generateCSSClassAndRegisterStyles(sxProps);
}