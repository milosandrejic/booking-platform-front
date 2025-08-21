"use client";

import { forwardRef, useId, useState } from "react";
import "./Switch.scss";

export type SwitchSize = "small" | "medium" | "large";
export type SwitchColor = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface SwitchProps {
  /** Label text displayed next to the switch */
  label?: string;
  /** Whether the switch is checked (controlled) */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback fired when the switch state changes */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Size variant of the switch */
  size?: SwitchSize;
  /** Color theme of the switch */
  color?: SwitchColor;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is required */
  required?: boolean;
  /** Name attribute for form handling */
  name?: string;
  /** Additional CSS classes */
  className?: string;
  /** ID attribute for the switch */
  id?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    {
      label,
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
      ...props
    },
    ref
  ) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const reactId = useId();
    const switchId = id || `switch-${reactId}`;

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      const newChecked = event.target.checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked, event);
    };

    const classes = [
      "switch",
      `switch--${size}`,
      `switch--${color}`,
      disabled && "switch--disabled",
      isChecked && "switch--checked",
      className
    ].filter(Boolean).join(" ");

    return (
      <label 
        className={classes} 
        style={style}
      >
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          name={name}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="switch__input"
          {...props}
        />
        
        <span className="switch__track">
          <span className="switch__thumb"></span>
        </span>
        
        {
          label &&
          <span className="switch__label">
            {label}
            {
              required &&
              <span className="switch__required">*</span>
            }
          </span>
        }
      </label>
    );
  }
);

Switch.displayName = "Switch";
