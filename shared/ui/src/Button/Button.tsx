"use client";

import "./Button.scss";

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
  const classes = [
    "button",
    `button--variant-${variant}`,
    `button--size-${size}`,
    fullWidth && "button--full-width",
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
