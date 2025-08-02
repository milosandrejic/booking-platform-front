import "./TextField.scss";

const TextField = ({
  label,
  placeholder,
  value,
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
  className = "",
  ...props
}) => {
  const classes = [
    "textfield",
    `textfield--${variant}`,
    `textfield--${size}`,
    error && "textfield--error",
    disabled && "textfield--disabled",
    fullWidth && "textfield--full-width",
    className
  ].filter(Boolean).join(" ");

  const inputClasses = [
    "textfield__input", multiline && "textfield__input--multiline"
  ].filter(Boolean).join(" ");

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className={classes}>
      {label && (
        <label className="textfield__label">
          {label}
          {required && <span className="textfield__required">*</span>}
        </label>
      )}
      <div className="textfield__input-container">
        <InputComponent
          className={inputClasses}
          type={multiline ? undefined : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          rows={multiline ? rows : undefined}
          {...props}
        />
      </div>
      {helperText && (
        <div className="textfield__helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default TextField;
