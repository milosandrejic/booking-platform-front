import React, { forwardRef, useId } from "react";
import "./TextField.scss";

/**
 * Text input field with variants and sizes. Supports multiline via textarea.
 *
 * @param {object} props
 * @param {string} [props.label] - Label text.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string|number} [props.value] - Controlled value.
 * @param {(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void} [props.onChange] - Change handler.
 * @param {(e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => void} [props.onBlur] - Blur handler.
 * @param {(e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => void} [props.onFocus] - Focus handler.
 * @param {('text'|'password')} [props.type='text'] - Input type (ignored when multiline).
 * @param {('outlined'|'filled')} [props.variant='outlined'] - Visual style.
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Size variant.
 * @param {boolean} [props.error=false] - Error state styling.
 * @param {React.ReactNode} [props.helperText] - Helper or error text below the field.
 * @param {boolean} [props.disabled=false] - Disable input.
 * @param {boolean} [props.required=false] - Mark as required.
 * @param {boolean} [props.fullWidth=false] - Stretch to container width.
 * @param {boolean} [props.multiline=false] - Render as textarea.
 * @param {number} [props.rows=4] - Rows for textarea.
 * @param {string} [props.className] - Additional class names.
 * @returns {JSX.Element}
 */
export const TextField = forwardRef(function TextField({
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
    className
  ].filter(Boolean).join(" ");

  const inputClasses = ["textfield__input", multiline && "textfield__input--multiline"].filter(Boolean).join(" ");

  const InputComponent = multiline ? "textarea" : "input";
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
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          id={inputId}
          name={name}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          aria-required={required || undefined}
          ref={ref}
          rows={multiline ? rows : undefined}
          {...props}
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
