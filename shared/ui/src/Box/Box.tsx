import React, { forwardRef } from "react";
import type { CSSProperties, ElementType } from "react";
import { resolveSx, type SxProps } from "../utils/sx";

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  component?: ElementType;
  sx?: SxProps;
  style?: CSSProperties;
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(props, ref) {
  const {
    component: Component = "div",
    sx,
    style: styleProp,
    ...rest
  } = props;

  const sxClassName = resolveSx(sx);

  // Merge class names
  const mergedClassName = [rest.className, sxClassName].filter(Boolean).join(" ");

  return (
    <Component 
      ref={ref as any} 
      style={styleProp} 
      className={mergedClassName || undefined}
      {...rest} 
    />
  );
});

export default Box;
