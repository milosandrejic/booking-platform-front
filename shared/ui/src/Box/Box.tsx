"use client";

import React, { forwardRef } from "react";
import type { CSSProperties, ElementType } from "react";
import { useTheme, type Theme } from "@booking-platform-shared/theme";
import { styleSystem, type SpacingValue } from "../utils/styleSystem";

export type SxProps = CSSProperties | ((theme: Theme) => CSSProperties);

export type BoxProps<T extends ElementType = "div"> = {
  component?: T;
  sx?: SxProps;
  // spacing shorthands (numbers use theme spacing multiplier)
  p?: SpacingValue; px?: SpacingValue; py?: SpacingValue; pt?: SpacingValue; pr?: SpacingValue; pb?: SpacingValue; pl?: SpacingValue;
  m?: SpacingValue; mx?: SpacingValue; my?: SpacingValue; mt?: SpacingValue; mr?: SpacingValue; mb?: SpacingValue; ml?: SpacingValue;
  gap?: SpacingValue; rowGap?: SpacingValue; columnGap?: SpacingValue;
  display?: CSSProperties["display"]; flexDirection?: CSSProperties["flexDirection"]; alignItems?: CSSProperties["alignItems"]; justifyContent?: CSSProperties["justifyContent"]; flexWrap?: CSSProperties["flexWrap"]; flex?: CSSProperties["flex"];
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"]; gridTemplateRows?: CSSProperties["gridTemplateRows"];
  color?: string; bgcolor?: string; borderRadius?: number | string; boxShadow?: CSSProperties["boxShadow"];
} & Omit<React.ComponentPropsWithoutRef<T>, "color" | "style"> & { style?: CSSProperties };

const { buildSpacingStyles, buildLayoutStyles, buildVisualStyles, mergeStyles } = styleSystem;

export const Box = forwardRef<HTMLElement, BoxProps<any>>(function Box(props, ref) {
  const theme = useTheme();
  const {
    component: Component = "div",
    sx,
    style: styleProp,
    // spacing
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    gap, rowGap, columnGap,
    // layout
    display, flexDirection, alignItems, justifyContent, flexWrap, flex,
    gridTemplateColumns, gridTemplateRows,
    // visuals
    color, bgcolor, borderRadius, boxShadow,
    ...rest
  } = props as BoxProps;

  const spacingStyles = buildSpacingStyles({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap, rowGap, columnGap, flexDirection });
  const layoutStyles = buildLayoutStyles({ display, flexDirection, alignItems, justifyContent, flexWrap, flex, gridTemplateColumns, gridTemplateRows });
  const visualStyles = buildVisualStyles({ color, bgcolor, borderRadius, boxShadow });
  const sxStyles: CSSProperties = typeof sx === "function" ? (sx as (t: Theme) => CSSProperties)(theme) : (sx as CSSProperties) || {};

  // Precedence: styleProp < shorthand/layout/visuals < sx
  const style = mergeStyles(styleProp, { ...spacingStyles, ...layoutStyles, ...visualStyles }, sxStyles);

  return (
    <Component ref={ref as any} style={style} {...rest} />
  );
});

export default undefined;
