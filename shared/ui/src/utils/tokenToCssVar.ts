/**
 * Convert a theme token path (e.g., "text.primary", "primary.main", "primary.contrastText")
 * into a CSS variable reference used by the shared theme CSS variables.
 *
 * Examples:
 *  - tokenToCssVar("text.primary") => "var(--color-text-primary)"
 *  - tokenToCssVar("primary.main") => "var(--color-primary-main)"
 *  - tokenToCssVar("color.info.dark") => "var(--color-info-dark)"
 *
 * Raw CSS values are passed through unchanged (e.g., "#fff", "rgba(...)", "var(--foo)").
 */
export const tokenToCssVar = (token?: string): string | undefined => {
  if (!token) return undefined;
  // passthrough for raw CSS values
  if (token.startsWith("var(")) return token;
  if (token.startsWith("#") || token.includes("(")) return token; // hex or rgba/hsl

  // drop optional "color." prefix
  const normalized = token.startsWith("color.") ? token.slice("color.".length) : token;

  // dots to dashes and camelCase to kebab-case: contrastText -> contrast-text
  const dashed = normalized
    .replaceAll(".", "-")
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

  return `var(--color-${dashed})`;
};

export default tokenToCssVar;
