"use client";

import { forwardRef, useId, useState } from "react";
import "./Checkbox.scss";
import { resolveSx, type SxProps } from "../utils/sx";

export type CheckboxSize = "small" | "medium" | "large";
export type CheckboxColor = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: CheckboxSize;
  color?: CheckboxColor;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 4.5L6 12L2.5 8.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      checked,
      defaultChecked = false,
      onChange,
      size = "medium",
      color = "primary",
      icon,
      checkedIcon,
      disabled = false,
      required = false,
      name,
      value,
      className = "",
      id,
      style,
      sx,
      ...props
    },
    ref
  ) {
    const { styles, className: sxClassName } = resolveSx(sx);
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const reactId = useId();
    const checkboxId = id || `checkbox-${reactId}`;

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      
      onChange?.(newChecked, event);
    };

    const classes = [
      "checkbox",
      `checkbox--${size}`,
      `checkbox--${color}`,
      disabled && "checkbox--disabled",
      isChecked && "checkbox--checked",
      sxClassName,
      className
    ].filter(Boolean).join(" ");

    const hasCustomIcons = icon || checkedIcon;

    const renderIcon = () => {
      if (isChecked) {
        return checkedIcon || <CheckIcon />;
      }

      return icon || null;
    };

    return (
      <label 
        className={classes} 
        style={{ ...style, ...styles }}
      >
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="checkbox__input"
          {...props}
        />
        
        {
          hasCustomIcons ? (
            <span className="checkbox__custom-icon">
              {renderIcon()}
            </span>
          ) : (
            <span className="checkbox__box">
              <span className="checkbox__icon">
                {renderIcon()}
              </span>
            </span>
          )
        }
        
        {
          label &&
          <span className="checkbox__label">
            {label}
            {
              required &&
              <span className="checkbox__required">*</span>
            }
          </span>
        }
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
