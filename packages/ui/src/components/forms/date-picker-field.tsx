"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import type { FormDatePickerFieldProps } from "./types";

/**
 * FormInput.DatePicker component - Date picker field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.DatePicker
 *   name="birthDate"
 *   label="Birth Date"
 *   disableFuture
 *   format="MM/DD/YYYY"
 * />
 * ```
 */
export function DatePickerFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  DatePickerProps,
  disabled = false,
  disableFuture = false,
  disablePast = false,
  errorMessage,
  format = "MM/DD/YYYY",
  helperText,
  label,
  maxDate,
  minDate,
  name,
  required = false,
}: FormDatePickerFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <DatePicker
          {...field}
          disabled={disabled}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format}
          label={label}
          maxDate={maxDate}
          minDate={minDate}
          onChange={onChange}
          slotProps={{
            textField: {
              error: !!error,
              fullWidth: true,
              helperText: errorMessage || error?.message || helperText,
              required,
            },
          }}
          value={value || null}
          {...DatePickerProps}
        />
      )}
    />
  );
}
