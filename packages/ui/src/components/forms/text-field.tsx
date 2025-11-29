"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
import type { FormTextFieldProps } from "./types";

/**
 * FormInput.Text component - Text field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.Text
 *   name="email"
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   errorMessage="Custom error message"
 * />
 * ```
 */
export function TextFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  disabled = false,
  endAdornment,
  errorMessage,
  helperText,
  label,
  multiline = false,
  maxRows,
  name,
  placeholder,
  required = false,
  rows,
  size = "medium",
  startAdornment,
  TextFieldProps,
  type = "text",
  variant = "outlined",
}: FormTextFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          disabled={disabled}
          error={!!error}
          fullWidth
          helperText={errorMessage || error?.message || helperText}
          label={label}
          multiline={multiline}
          maxRows={maxRows}
          placeholder={placeholder}
          required={required}
          rows={rows}
          size={size}
          slotProps={{
            input: {
              ...(startAdornment && {
                startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
              }),
              ...(endAdornment && {
                endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
              }),
            },
          }}
          type={type}
          variant={variant}
          {...TextFieldProps}
        />
      )}
    />
  );
}
