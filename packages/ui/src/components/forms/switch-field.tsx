"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import type { FormSwitchFieldProps } from "./types";

/**
 * FormInput.Switch component - Switch field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.Switch
 *   name="notifications"
 *   label="Enable notifications"
 * />
 * ```
 */
export function SwitchFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  color = "primary",
  disabled = false,
  errorMessage,
  helperText,
  label,
  name,
  required = false,
  size = "medium",
  SwitchProps,
}: FormSwitchFieldProps<TFieldValues>) {
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
              <Switch
                {...field}
                checked={!!value}
                color={color}
                onChange={(e) => onChange(e.target.checked)}
                size={size}
                {...SwitchProps}
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
