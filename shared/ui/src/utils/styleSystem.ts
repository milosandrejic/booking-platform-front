import type { CSSProperties } from "react";
import { getSpacing } from "@booking-platform-shared/theme";
import { tokenToCssVar } from "./tokenToCssVar";

export type SpacingValue = number | string | undefined;

export const toSpacing = (v: SpacingValue): string | undefined => {
  if (v === undefined) {
    return undefined;
  }

  if (typeof v === "number") {
    return getSpacing(v);
  }
  return v;
};

export const mergeStyles = (
  ...styles: Array<CSSProperties | undefined>
): CSSProperties => Object.assign({}, ...styles.filter(Boolean));

export const buildSpacingStyles = (args: {
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  m?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  gap?: SpacingValue;
  rowGap?: SpacingValue;
  columnGap?: SpacingValue;
  flexDirection?: CSSProperties["flexDirection"];
}): CSSProperties => {
  const { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap, rowGap, columnGap, flexDirection } = args;

  const _p = toSpacing(p); const _px = toSpacing(px); const _py = toSpacing(py);
  const _pt = toSpacing(pt); const _pr = toSpacing(pr); const _pb = toSpacing(pb); const _pl = toSpacing(pl);
  const _m = toSpacing(m); const _mx = toSpacing(mx); const _my = toSpacing(my);
  const _mt = toSpacing(mt); const _mr = toSpacing(mr); const _mb = toSpacing(mb); const _ml = toSpacing(ml);

  const gapAll = toSpacing(gap);

  const rowGapResolved = toSpacing(rowGap);
  const columnGapResolved = toSpacing(columnGap);

  let computedRowGap: string | undefined = rowGapResolved;
  if (computedRowGap == null) {
    computedRowGap = flexDirection === "column" ? gapAll : undefined;
  }

  let computedColumnGap: string | undefined = columnGapResolved;
  if (computedColumnGap == null) {
    if (!flexDirection) {
      computedColumnGap = gapAll;
    } else if (flexDirection.startsWith("row")) {
      computedColumnGap = gapAll;
    } else {
      computedColumnGap = undefined;
    }
  }

  return {
    paddingTop: _pt ?? _py ?? _p,
    paddingRight: _pr ?? _px ?? _p,
    paddingBottom: _pb ?? _py ?? _p,
    paddingLeft: _pl ?? _px ?? _p,
    marginTop: _mt ?? _my ?? _m,
    marginRight: _mr ?? _mx ?? _m,
    marginBottom: _mb ?? _my ?? _m,
    marginLeft: _ml ?? _mx ?? _m,
    gap: gapAll,
    rowGap: computedRowGap,
    columnGap: computedColumnGap,
  };
};

export const buildLayoutStyles = (args: {
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  flexWrap?: CSSProperties["flexWrap"];
  flex?: CSSProperties["flex"];
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
  gridTemplateRows?: CSSProperties["gridTemplateRows"];
}): CSSProperties => ({ ...args });

export const buildVisualStyles = (args: {
  color?: string; bgcolor?: string; borderRadius?: number | string; boxShadow?: CSSProperties["boxShadow"];
}): CSSProperties => {
  const { color, bgcolor, borderRadius, boxShadow } = args;
  return {
    color: tokenToCssVar(color) ?? color,
    backgroundColor: tokenToCssVar(bgcolor) ?? bgcolor,
    borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
    boxShadow,
  };
};

export const styleSystem = {
  toSpacing,
  mergeStyles,
  buildSpacingStyles,
  buildLayoutStyles,
  buildVisualStyles,
  tokenToCssVar,
};

export default styleSystem;
