"use client";

import { forwardRef, useId } from "react";
import "./Radio.scss";

export type RadioSize = "small" | "medium" | "large";
export type RadioColor = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface RadioProps {
  label?: string;
  value: string | number;
  checked?: boolean;
  onChange?: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: RadioSize;
  color?: RadioColor;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    {
      label,
      value,
      checked = false,
      onChange,
      size = "medium",
      color = "primary",
      disabled = false,
      required = false,
      name,
      className = "",
      id,
      style,
      ...props
    },
    ref
  ) {
    const reactId = useId();
    const radioId = id || `radio-${reactId}`;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }
      
      onChange?.(value, event);
    };

    const classes = [
      "radio",
      `radio--${size}`,
      `radio--${color}`,
      disabled && "radio--disabled",
      checked && "radio--checked",
      className
    ].filter(Boolean).join(" ");

    return (
      <label 
        className={classes} 
        style={style}
      >
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="radio__input"
          {...props}
        />
        
        <span className="radio__circle">
          <span className="radio__dot"></span>
        </span>
        
        {
          label &&
          <span className="radio__label">
            {label}
            {
              required &&
              <span className="radio__required">*</span>
            }
          </span>
        }
      </label>
    );
  }
);

Radio.displayName = "Radio";
