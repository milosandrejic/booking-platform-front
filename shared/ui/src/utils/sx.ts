import type { CSSProperties } from "react";
import type { Theme } from "@booking-platform-shared/theme";

/**
 * SxProps
 * A theme-aware style input used across components.
 * - Object form: plain CSSProperties applied directly.
 * - Function form: receives Theme and returns CSSProperties.
 */
export type SxProps = CSSProperties | ((theme: Theme) => CSSProperties);

/**
 * resolveSx
 * Normalizes an sx prop into a concrete CSSProperties object.
 * If sx is a function, it's invoked with the provided theme; otherwise the object is returned.
 * Falsy values (undefined/null) produce an empty object.
 */
export function resolveSx(theme: Theme, sx?: SxProps): CSSProperties {
  if (!sx) {
    return {};
  }

  if (typeof sx === "function") {
    return (sx as (t: Theme) => CSSProperties)(theme);
  }

  return sx;
}
