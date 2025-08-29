import "./Typography.scss";
import { resolveSx, type SxProps } from "../utils/sx";

export type TypographyVariant =
  | "displayLarge" | "displayMedium" | "displaySmall"
  | "headlineLarge" | "headlineMedium" | "headlineSmall"
  | "titleLarge" | "titleMedium" | "titleSmall"
  | "bodyLarge" | "bodyMedium" | "bodySmall"
  | "labelLarge" | "labelMedium" | "labelSmall";

// Support semantic tokens and arbitrary CSS color strings (hex, rgb, var(), etc.)
export type TypographyColor =
  | "onSurface"
  | "onSurfaceVariant"
  | "outline"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | string;
export type TypographyAlign = "left" | "center" | "right" | "justify";

export interface TypographyProps {
  children?: React.ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  component?: React.ElementType;
  align?: TypographyAlign;
  gutterBottom?: boolean;
  noWrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  title?: string;
  [key: string]: any;
}

const semanticColorToVar: Record<string, string> = {
  onSurface: "var(--color-text-primary)",
  onSurfaceVariant: "var(--color-text-secondary)",
  outline: "var(--color-border-main)",
  primary: "var(--color-primary-main)",
  secondary: "var(--color-secondary-main)",
  success: "var(--color-success-main)",
  warning: "var(--color-warning-main)",
  error: "var(--color-error-main)",
  info: "var(--color-info-main)"
};

const isDirectCssColor = (v: string) =>
  /^#|^rgb|^hsl|^lab|^lch|^oklch|^color\(|^var\(/i.test(v.trim());

export const Typography = ({ 
  children, 
  variant = "bodyLarge",
  color = "onSurface",
  component,
  className = "",
  align,
  gutterBottom = false,
  noWrap = false,
  style = {},
  sx,
  ...props 
}: TypographyProps) => {
  const { styles: sxStyles, className: sxClassName } = resolveSx(sx);
  const Component = (component || getDefaultComponent(variant)) as React.ElementType;
 
  // Resolve color to inline style for semantic tokens or direct CSS values
  let resolvedInlineColor: string | undefined;
  if (typeof color === "string") {
    if (semanticColorToVar[color]) {
      resolvedInlineColor = semanticColorToVar[color];
    } else if (isDirectCssColor(color)) {
      resolvedInlineColor = color;
    }
  }
  
  const classes = [
    "typography",
    `typography--variant-${variant}`,
    // If no inline color was resolved, allow class-based styling for custom tokens
    !resolvedInlineColor && color !== "onSurface" && `typography--color-${color}`,
    align && `typography--align-${align}`,
    gutterBottom && "typography--gutterBottom",
    noWrap && "typography--noWrap",
    className?.trim() || null,
    sxClassName,
  ].filter(Boolean).join(" ");
  const mergedStyleBase = resolvedInlineColor ? { ...style, color: resolvedInlineColor } : style;
  const mergedStyle = { ...mergedStyleBase, ...sxStyles };

  return (
    <Component
      className={classes}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

const getDefaultComponent = (variant: TypographyVariant) => {
  switch (variant) {
    case "displayLarge": return "h1";
    case "displayMedium": return "h1";
    case "displaySmall": return "h1";
    case "headlineLarge": return "h1";
    case "headlineMedium": return "h2";
    case "headlineSmall": return "h3";
    case "titleLarge": return "h4";
    case "titleMedium": return "h5";
    case "titleSmall": return "h6";
    case "bodyLarge": return "p";
    case "bodyMedium": return "p";
    case "bodySmall": return "p";
    case "labelLarge": return "span";
    case "labelMedium": return "span";
    case "labelSmall": return "span";
    default: return "p";
  }
};
