"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import type { FormCheckboxFieldProps } from "./types";

/**
 * FormInput.Checkbox component - Checkbox field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.Checkbox
 *   name="acceptTerms"
 *   label="I accept the terms and conditions"
 *   required
 * />
 * ```
 */
export function CheckboxFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  CheckboxProps,
  color = "primary",
  disabled = false,
  errorMessage,
  helperText,
  label,
  name,
  required = false,
  size = "medium",
}: FormCheckboxFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <FormControl
          disabled={disabled}
          error={!!error}
          required={required}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={!!value}
                color={color}
                onChange={(e) => onChange(e.target.checked)}
                size={size}
                {...CheckboxProps}
              />
            }
            label={label}
          />

          {
            (error?.message || errorMessage || helperText) &&
            <FormHelperText>
              {errorMessage || error?.message || helperText}
            </FormHelperText>
          }
        </FormControl>
      )}
    />
  );
}
