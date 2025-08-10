import React from "react";
import "./Typography.scss";

/**
 * Typography component to render text with design-system variants.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Text content.
 * @param {string} [props.variant='bodyLarge'] - Variant token (e.g., 'displayMedium', 'headlineMedium', 'titleLarge', 'bodyMedium', 'labelLarge').
 * @param {string} [props.color='onSurface'] - Color token.
 * @param {keyof JSX.IntrinsicElements} [props.component] - Override rendered element (e.g., 'p', 'h1', 'span').
 * @param {('left'|'center'|'right'|'justify')} [props.align] - Text alignment.
 * @param {boolean} [props.gutterBottom=false] - Adds bottom margin.
 * @param {boolean} [props.noWrap=false] - Prevents wrapping.
 * @param {string} [props.className] - Additional class names.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element}
 */
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
}) => {
  const Component = component || getDefaultComponent(variant);
  
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
      aria-label={props["aria-label"]}
      title={props.title}
      aria-hidden={props["aria-hidden"]}
      {...props}
    >
      {children}
    </Component>
  );
};

const getDefaultComponent = (variant) => {
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
