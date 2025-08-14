import React from "react";
import "./Typography.scss";

export type TypographyVariant =
  | "displayLarge" | "displayMedium" | "displaySmall"
  | "headlineLarge" | "headlineMedium" | "headlineSmall"
  | "titleLarge" | "titleMedium" | "titleSmall"
  | "bodyLarge" | "bodyMedium" | "bodySmall"
  | "labelLarge" | "labelMedium" | "labelSmall";

export type TypographyColor = "onSurface" | string;
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
  title?: string;
  [key: string]: any;
}

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
  ...props 
}: TypographyProps) => {
  const Component = (component || getDefaultComponent(variant)) as React.ElementType;
  
  const classes = [
    "typography",
    `typography--variant-${variant}`,
    color !== "onSurface" && `typography--color-${color}`,
    align && `typography--align-${align}`,
    gutterBottom && "typography--gutterBottom",
    noWrap && "typography--noWrap",
    className
  ].filter(Boolean).join(" ");
  
  return (
    <Component
      className={classes}
      style={style}
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

// no default export; use named export
