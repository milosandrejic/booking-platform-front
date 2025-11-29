"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import type { FormDateTimePickerFieldProps } from "./types";

/**
 * FormInput.DateTimePicker component - Date and time picker field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.DateTimePicker
 *   name="appointmentTime"
 *   label="Appointment Time"
 *   disablePast
 *   format="MM/DD/YYYY HH:mm"
 * />
 * ```
 */
export function DateTimePickerFieldComponent<TFieldValues extends FieldValues = FieldValues>({
  DateTimePickerProps,
  disabled = false,
  disableFuture = false,
  disablePast = false,
  errorMessage,
  format = "MM/DD/YYYY HH:mm",
  helperText,
  label,
  maxDateTime,
  minDateTime,
  name,
  required = false,
}: FormDateTimePickerFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          disabled={disabled}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format}
          label={label}
          maxDateTime={maxDateTime}
          minDateTime={minDateTime}
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
          {...DateTimePickerProps}
        />
      )}
    />
  );
}
