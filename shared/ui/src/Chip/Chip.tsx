"use client";

import "./Chip.scss";
import { Avatar as UiAvatar } from "../Avatar";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export type ChipVariant = "filled" | "outlined";
export type ChipSize = "small" | "medium" | "large";
export type ChipColor = "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  color?: ChipColor;
  icon?: React.ReactNode; // leading icon
  avatar?: { src?: string; alt?: string; name?: string; fallback?: string }; // letter/image avatar
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteIcon?: React.ReactNode;
  clickable?: boolean;
  disabled?: boolean;
  sx?: SxProps;
}

/**
 * Chip: compact element to represent inputs/filters/tags.
 */
export function Chip({
  label,
  variant = "filled",
  size = "medium",
  color = "default",
  icon,
  avatar,
  onClick,
  onDelete,
  deleteIcon,
  clickable,
  disabled = false,
  className = "",
  style,
  sx,
  ...rest
}: ChipProps) {
  const theme = useTheme();
  const classes = [
    "chip",
    `chip--variant-${variant}`,
    `chip--size-${size}`,
    `chip--color-${color}`,
    (clickable || onClick) && !disabled ? "chip--clickable" : null,
    className?.trim() || null,
  ].filter(Boolean).join(" ");

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }
    onClick?.(e);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    onDelete?.(e);
  };

  return (
    <div
      className={classes}
      style={{ ...style, ...resolveSx(theme, sx) }}
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {
        avatar &&
        <span className="chip__avatar" aria-hidden="true">
          {avatar.src || avatar.name || avatar.fallback ? (
            <UiAvatar
              src={avatar.src}
              alt={avatar.alt}
              name={avatar.name}
              fallback={avatar.fallback}
              size="small"
            />
          ) : null}
        </span>
      }

      {
        icon &&
        <span className="chip__icon" aria-hidden="true">{icon}</span>
      }

      <span className="chip__label">{label}</span>

      {
        onDelete &&
        <button
          type="button"
          className="chip__delete"
          aria-label="remove"
          onClick={handleDelete}
        >
          {deleteIcon ?? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d={
                  "M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12" +
                  "l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12" +
                  "l4.9-4.89a1 1 0 0 0-.01-1.4Z"
                }
              />
            </svg>
          )}
        </button>
      }
    </div>
  );
}

export default undefined;
