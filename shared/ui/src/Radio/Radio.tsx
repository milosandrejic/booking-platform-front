"use client";

import { forwardRef, useId, useState } from "react";
import "./Radio.scss";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export type RadioSize = "small" | "medium" | "large";
export type RadioColor = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface RadioProps {
  label?: string;
  value: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: RadioSize;
  color?: RadioColor;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    {
      label,
      value,
      checked,
      defaultChecked = false,
      onChange,
      size = "medium",
      color = "primary",
      disabled = false,
      required = false,
      name,
      className = "",
      id,
      style,
      sx,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const reactId = useId();
    const radioId = id || `radio-${reactId}`;

    // Support both controlled and uncontrolled modes
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }
      
      // Update internal state if uncontrolled
      if (checked === undefined) {
        setInternalChecked(event.target.checked);
      }
      
      onChange?.(value, event);
    };

    const classes = [
      "radio",
      `radio--${size}`,
      `radio--${color}`,
      disabled && "radio--disabled",
      isChecked && "radio--checked",
      className
    ].filter(Boolean).join(" ");

    return (
      <label 
        className={classes} 
        style={{ ...style, ...resolveSx(theme, sx) }}
      >
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={isChecked}
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
