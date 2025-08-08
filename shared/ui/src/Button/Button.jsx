"use client";

import "./Button.scss";
import { useRef } from "react";

/**
 * Theme-aware button for primary and secondary actions.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Button label/content.
 * @param {('filled'|'outlined'|'text')} [props.variant='filled'] - Visual style.
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Size variant.
 * @param {boolean} [props.disabled=false] - Disable interactions.
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Native button type.
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick] - Click handler.
 * @param {boolean} [props.fullWidth=false] - Stretch to container width.
 * @param {React.ReactNode} [props.startIcon] - Optional leading icon.
 * @param {React.ReactNode} [props.endIcon] - Optional trailing icon.
 * @param {string} [props.className] - Additional class names.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element}
 */
export const Button = ({ 
  children, 
  variant = "filled", // Material Design 3 default
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
}) => {
  const buttonRef = useRef(null);

  const handleClick = (event) => {
    // Remove focus after click to prevent persistent hover state
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
    
    if (onClick) {
      onClick(event);
    }
  };

  const classes = [
    "button",
    `button--variant-${variant}`,
    `button--size-${size}`,
    fullWidth && "button--fullWidth",
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
      {startIcon && <span className="button__startIcon">{startIcon}</span>}
      {children}
      {endIcon && <span className="button__endIcon">{endIcon}</span>}
    </button>
  );
};
