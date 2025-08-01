"use client";

import "./Button.scss";
import { useRef } from "react";

const Button = ({ 
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

export default Button;
