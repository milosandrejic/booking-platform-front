"use client";

import "./Button.scss";
import { useRef } from "react";

export type ButtonVariant = "filled" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
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
  ...props 
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // Keep keyboard focus; blur only on pointer (mouse) clicks
    if (buttonRef.current && event.detail !== 0) {
      buttonRef.current.blur();
    }
    onClick?.(event);
  };

  const classes = [
    "button",
    `button--variant-${variant}`,
    `button--size-${size}`,
    fullWidth && "button--full-width",
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      ref={buttonRef}
      className={classes}
      style={style}
      disabled={disabled}
      onClick={handleClick}
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
