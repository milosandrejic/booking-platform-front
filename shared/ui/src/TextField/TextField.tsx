"use client";

import { forwardRef, useId } from "react";
import "./TextField.scss";

export type TextFieldType = "text" | "password";
export type TextFieldVariant = "outlined" | "filled";
export type TextFieldSize = "small" | "medium" | "large";

type BaseProps = {
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: TextFieldType;
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  name?: string;
  autoComplete?: string;
  className?: string;
  style?: React.CSSProperties;
};

type InputOnly = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "value" | "defaultValue" | "onChange" | "onBlur" | "onFocus"
> & { multiline?: false };
type TextareaOnly = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "onChange" | "onBlur" | "onFocus"> & { multiline: true };

export type TextFieldProps = BaseProps & (InputOnly | TextareaOnly);

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(function TextField({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  variant = "outlined",
  size = "medium",
  error = false,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  multiline = false,
  rows = 4,
  id,
  name,
  autoComplete,
  className = "",
  ...props
}, ref) {
  const classes = [
    "textfield",
    `textfield--${variant}`,
    `textfield--${size}`,
    error && "textfield--error",
    disabled && "textfield--disabled",
    fullWidth && "textfield--full-width",
    className?.trim() || null
  ].filter(Boolean).join(" ");

  const inputClasses = ["textfield__input", multiline && "textfield__input--multiline"].filter(Boolean).join(" ");

  const InputComponent = (multiline ? "textarea" : "input") as any;
  const reactId = useId();
  const inputId = id || `textfield-${reactId}`;
  const helperId = helperText ? `${inputId}-helper-text` : undefined;

  return (
    <div className={classes}>
      {
        label &&
        <label className="textfield__label" htmlFor={inputId}>
          {label}

          {
            required &&
            <span className="textfield__required" aria-hidden> *</span>
          }
        </label>
      }

      <div className="textfield__input-container">
        <InputComponent
          className={inputClasses}
          type={multiline ? undefined : type}
          placeholder={placeholder}
          value={value as any}
          defaultValue={defaultValue as any}
          onChange={onChange as any}
          onBlur={onBlur as any}
          onFocus={onFocus as any}
          id={inputId}
          name={name}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          aria-required={required || undefined}
          ref={ref as any}
          rows={multiline ? rows : undefined}
          {...props as any}
        />
      </div>
      {
        helperText &&
        <div className="textfield__helper-text" id={helperId}>
          {helperText}
        </div>
      }
    </div>
  );
});

TextField.displayName = "TextField";
