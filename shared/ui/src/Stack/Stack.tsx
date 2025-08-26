import type { ReactNode, CSSProperties } from "react";
import "./Stack.scss";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

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
  sx?: SxProps;
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
  sx,
  ...rest
}: StackProps) {
  const theme = useTheme();
  const classes = [
    "stack",
    `stack--${direction}`,
    `stack--justify-${justify}`,
    `stack--align-${align}`,
    `stack--wrap-${wrap}`,
    className?.trim() || null
  ].filter(Boolean).join(" ");

  const inlineStyles: CSSProperties = {
    gap: getSpacingVar(gap)
  };

  return (
    <Component className={classes} style={{ ...inlineStyles, ...style, ...resolveSx(theme, sx) }} {...rest}>
      {children}
    </Component>
  );
}

export default Stack;
