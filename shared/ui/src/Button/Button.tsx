"use client";

import "./Button.scss";
import { resolveSx, type SxProps } from "../utils/sx";

export type ButtonVariant = "filled" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps;
}

export const Button = ({ 
  children, 
  variant = "filled",
  size = "medium", 
  disabled = false,
  onClick,
  type = "button",
  className = "",
  style = {},
  fullWidth = false,
  startIcon,
  endIcon,
  sx,
  ...props 
}: ButtonProps) => {
  const sxClassName = resolveSx(sx);
  const classes = [
    "button",
    `button--variant-${variant}`,
    `button--size-${size}`,
    fullWidth && "button--full-width",
    sxClassName,
    className?.trim() || null
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      style={style}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {
        startIcon &&
        <span className="button__startIcon" aria-hidden="true">
          {startIcon}
        </span>
      }

      {children}

      {
        endIcon &&
        <span className="button__endIcon" aria-hidden="true">
          {endIcon}
        </span>
      }
    </button>
  );
};
