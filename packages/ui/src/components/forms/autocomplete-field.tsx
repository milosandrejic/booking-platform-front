"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import type { FormAutocompleteFieldProps, SelectOption } from "./types";

/**
 * FormInput.Autocomplete component - Autocomplete field with React Hook Form integration
 *
 * @example
 * ```tsx
 * <FormInput.Autocomplete
 *   name="city"
 *   label="City"
 *   options={[
 *     { value: "ny", label: "New York" },
 *     { value: "la", label: "Los Angeles" },
 *   ]}
 *   placeholder="Search for a city"
 * />
 * ```
 */
export function AutocompleteFieldComponent<
  TFieldValues extends FieldValues = FieldValues,
  TOption = SelectOption
>({
  AutocompleteProps,
  disabled = false,
  errorMessage,
  freeSolo = false,
  getOptionLabel,
  helperText,
  isOptionEqualToValue,
  label,
  loading = false,
  multiple = false,
  name,
  noOptionsText = "No options",
  options,
  placeholder,
  required = false,
  size = "medium",
}: FormAutocompleteFieldProps<TFieldValues, any, TOption>) {
  const { control } = useFormContext<TFieldValues>();
  const defaultGetOptionLabel = (option: TOption | string): string => {
    if (typeof option === "string") return option;
    return (option as SelectOption).label || String(option);
  };

  const defaultIsOptionEqualToValue = (option: TOption | string, value: TOption | string): boolean => {
    if (typeof option === "string" && typeof value === "string") {
      return option === value;
    }
    return (option as SelectOption).value === (value as SelectOption).value;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          disabled={disabled}
          freeSolo={freeSolo}
          getOptionLabel={(getOptionLabel || defaultGetOptionLabel) as any}
          isOptionEqualToValue={(isOptionEqualToValue || defaultIsOptionEqualToValue) as any}
          loading={loading}
          multiple={multiple}
          noOptionsText={noOptionsText}
          onChange={(_, data) => onChange(data)}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={errorMessage || error?.message || helperText}
              label={label}
              placeholder={placeholder}
              required={required}
            />
          )}
          size={size}
          value={value ?? (multiple ? [] : null)}
          {...AutocompleteProps}
        />
      )}
    />
  );
}
