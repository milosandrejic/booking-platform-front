import type { ReactNode, CSSProperties } from "react";
import "./Stack.scss";

export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type StackJustify = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
export type StackAlign = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
export type StackWrap = "nowrap" | "wrap" | "wrap-reverse";
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StackProps {
  children: ReactNode;
  direction?: StackDirection;
  justify?: StackJustify;
  align?: StackAlign;
  wrap?: StackWrap;
  gap?: StackGap;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

function getSpacingVar(gap: StackGap): string {
  return `var(--spacing-${gap})`;
}

export function Stack({
  children,
  direction = "column",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap = 3,
  className = "",
  style = {},
  as: Component = "div",
  ...rest
}: StackProps) {
  const classes = [
    "stack",
    `stack--${direction}`,
    `stack--justify-${justify}`,
    `stack--align-${align}`,
    `stack--wrap-${wrap}`,
    className?.trim() || null
  ].filter(Boolean).join(" ");

  const inlineStyles: CSSProperties = {
    ...style,
    gap: getSpacingVar(gap)
  };

  return (
    <Component className={classes} style={inlineStyles} {...rest}>
      {children}
    </Component>
  );
}

export default Stack;
