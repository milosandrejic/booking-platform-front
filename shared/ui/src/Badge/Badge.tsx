"use client";

import "./Badge.scss";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export type BadgeColor = "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info";
export type BadgeVariant = "standard" | "dot";
export type BadgeAnchor = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  badgeContent?: number | string;
  showZero?: boolean;
  invisible?: boolean;
  max?: number; // caps the badgeContent, e.g. 99+ 
  color?: BadgeColor;
  variant?: BadgeVariant;
  anchorOrigin?: BadgeAnchor;
  icon?: React.ReactNode; // optional icon instead of text/number
  children?: React.ReactNode; // wrapped element
  sx?: SxProps;
}

/**
 * Badge: displays a small status/count overlaid on its child.
 * - Supports dot and standard variants, colors, max capping, showZero, invisible.
 * - Accepts icon to render inside the badge (takes precedence over text content).
 */
export function Badge({
  children,
  badgeContent,
  showZero = false,
  invisible = false,
  max = 99,
  color = "default",
  variant = "standard",
  anchorOrigin = "top-right",
  icon,
  className = "",
  style,
  sx,
  ...rest
}: BadgeProps) {
  const theme = useTheme();
  const isZeroLike = badgeContent === 0 || badgeContent === "0";
  const hideForZero = !showZero && isZeroLike;
  const isDot = variant === "dot";

  let displayContent: React.ReactNode = null;
  if (!isDot) {
    if (icon != null) {
      displayContent = icon;
    } else if (typeof badgeContent === "number") {
      const capped = Math.min(Math.max(0, badgeContent), Number.MAX_SAFE_INTEGER);
      displayContent = capped > max ? `${max}+` : String(capped);
    } else if (badgeContent != null) {
      displayContent = String(badgeContent);
    }
  }

  const classes = [
    "badge",
    `badge--variant-${variant}`,
    `badge--color-${color}`,
    `badge--anchor-${anchorOrigin}`,
    (invisible || hideForZero) && "badge--invisible",
    className?.trim() || null,
  ].filter(Boolean).join(" ");

  return (
  <span className={classes} style={{ ...style, ...resolveSx(theme, sx) }} {...rest}>
      <span className="badge__child">
        {children}
      </span>

      <span className="badge__content" aria-hidden={isDot}>
        {displayContent}
      </span>
    </span>
  );
}

export default undefined;
