"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { FormRadioFieldProps } from "./types";

/**
 * FormInput.Radio component - Radio group field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.Radio
 *   name="gender"
 *   label="Gender"
 *   options={[
 *     { value: "male", label: "Male" },
 *     { value: "female", label: "Female" },
 *     { value: "other", label: "Other" },
 *   ]}
 * />
 * ```
 */
export function RadioFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  color = "primary",
  disabled = false,
  errorMessage,
  helperText,
  label,
  name,
  options,
  RadioGroupProps,
  required = false,
  row = false,
  size = "medium",
}: FormRadioFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          disabled={disabled}
          error={!!error}
          required={required}
        >
          {
            label &&
            <FormLabel>{label}</FormLabel>
          }

          <RadioGroup
            {...field}
            row={row}
            {...RadioGroupProps}
          >
            {
              options.map((option) => (
              <FormControlLabel
                control={
                  <Radio
                    color={color}
                    size={size}
                  />
                }
                disabled={option.disabled}
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))
          }
          </RadioGroup>

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
