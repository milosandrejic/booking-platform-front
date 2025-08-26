"use client";

import "./Avatar.scss";
import { useMemo } from "react";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export type AvatarSize = "small" | "medium" | "large";
export type AvatarShape = "circle" | "square";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string; // used to derive letter avatar
  fallback?: string; // explicit letters override
  size?: AvatarSize;
  shape?: AvatarShape; // circle default, square supported
  sx?: SxProps;
}

/**
 * Avatar: displays a user image or initials. Sizes and circle/square shapes supported.
 * - Image avatar: provide `src` (and optional `alt`).
 * - Letter avatar: provide `name` or `fallback`.
 */
export function Avatar({
  src,
  alt = "",
  name,
  fallback,
  size = "medium",
  shape = "circle",
  className = "",
  style,
  sx,
  ...rest
}: AvatarProps) {
  const theme = useTheme();
  const letters = useMemo(() => {
    if (fallback && fallback.trim()) return fallback.trim().slice(0, 2).toUpperCase();

    if (!name) return "";

    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "";

    const first = parts[0]?.[0] ?? "";
  const lastPart = parts.length > 1 ? parts[parts.length - 1] : "";
  const last = typeof lastPart === "string" && lastPart ? lastPart[0] : "";
    return `${first}${last}`.toUpperCase();
  }, [name, fallback]);

  const classes = [
    "avatar",
    `avatar--size-${size}`,
    shape === "square" ? "avatar--shape-square" : null,
    className?.trim() || null,
  ].filter(Boolean).join(" ");

  return (
  <div className={classes} role={src ? undefined : "img"} aria-label={!src && letters ? letters : undefined} style={{ ...style, ...resolveSx(theme, sx) }} {...rest}>
      {
        src &&
        <img
          className="avatar__img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      }

      {
        !src && letters &&
        <span className="avatar__fallback" aria-hidden="true">
          {letters}
        </span>
      }
    </div>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number; // max visible avatars; if exceeded, show surplus counter
  total?: number; // optional total count distinct from children length
  spacing?: number; // pixels of overlap/spacing; default 8
  children: React.ReactNode;
  sx?: SxProps;
}

/**
 * AvatarGroup: displays a horizontal stack of Avatars with overlap and an optional surplus counter.
 */
export function AvatarGroup({ max, total, spacing = 8, className = "", children, sx, style, ...rest }: AvatarGroupProps) {
  const theme = useTheme();
  const childArray = useMemo(() => {
    const arr = Array.isArray(children) ? children : [children];
    return arr.filter(Boolean) as React.ReactNode[];
  }, [children]);

  const visible = max != null && max >= 0 ? childArray.slice(0, max) : childArray;
  const count = total != null ? total : childArray.length;
  const surplus = Math.max(0, count - visible.length);

  const classes = [
    "avatar-group",
    className?.trim() || null,
  ].filter(Boolean).join(" ");

  const groupStyle = {
    // Expose spacing variable, consumers can override via inline style or CSS
    ["--avatar-group-overlap" as any]: `${Math.max(0, spacing)}px`,
  } as React.CSSProperties;

  return (
    <div className={classes} style={{ ...groupStyle, ...style, ...resolveSx(theme, sx) }} {...rest}>
      {visible.map((node, idx) => (
        <span className="avatar-group__item" key={idx}>
          {node}
        </span>
      ))}

      {
        surplus > 0 &&
        <span className="avatar-group__item">
          <Avatar
            className="avatar-group__surplus"
            fallback={`+${surplus}`}
            size="medium"
          />
        </span>
      }
    </div>
  );
}

export default undefined;
