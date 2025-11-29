"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { FormSelectFieldProps } from "./types";

/**
 * FormInput.Select component - Select field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.Select
 *   name="country"
 *   label="Country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 *   placeholder="Select a country"
 * />
 * ```
 */
export function SelectFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  disabled = false,
  errorMessage,
  helperText,
  label,
  multiple = false,
  name,
  options,
  placeholder,
  required = false,
  SelectProps,
  size = "medium",
  variant = "outlined",
}: FormSelectFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          disabled={disabled}
          error={!!error}
          fullWidth
          required={required}
          size={size}
          variant={variant}
        >
          {
            label &&
            <InputLabel>{label}</InputLabel>
          }

          <Select
            {...field}
            label={label}
            multiple={multiple}
            value={field.value ?? (multiple ? [] : "")}
            {...SelectProps}
          >
            {
              placeholder &&
              <MenuItem disabled value="">
                {placeholder}
              </MenuItem>
            }

            {
              options.map((option) => (
                <MenuItem
                  disabled={option.disabled}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))
            }
          </Select>

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
