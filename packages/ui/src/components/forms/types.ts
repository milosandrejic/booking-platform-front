import type { ReactNode } from "react";
import type {
  FieldValues,
  Path,
  ArrayPath,
  FieldError,
  UseFormReturn,
} from "react-hook-form";
import type {
  TextFieldProps,
  SelectProps,
  AutocompleteProps,
  CheckboxProps,
  RadioGroupProps,
  SwitchProps,
} from "@mui/material";
import type { DatePickerProps, DateTimePickerProps } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";

/**
 * Base props for all form field components
 * @template TFieldValues - Form field values type from react-hook-form
 * @template TName - Field name type (must be a path in TFieldValues)
 */
export interface BaseFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  /**
   * Field name (must match form schema)
   */
  name: TName;

  /**
   * Custom error message override (overrides Zod schema error)
   */
  errorMessage?: string;

  /**
   * Field label
   */
  label?: string;

  /**
   * Helper text shown below the field
   */
  helperText?: string;

  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;

  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
}

/**
 * Props for FormInput.Text component
 */
export interface FormTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Text field type
   */
  type?: "text" | "email" | "password" | "number" | "tel" | "url";

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Number of rows for multiline input
   */
  rows?: number;

  /**
   * Maximum number of rows for multiline input
   */
  maxRows?: number;

  /**
   * Whether the field is multiline
   */
  multiline?: boolean;

  /**
   * MUI TextField variant
   */
  variant?: TextFieldProps["variant"];

  /**
   * Field size
   */
  size?: TextFieldProps["size"];

  /**
   * Start adornment
   */
  startAdornment?: ReactNode;

  /**
   * End adornment
   */
  endAdornment?: ReactNode;

  /**
   * Additional TextField props
   */
  TextFieldProps?: Partial<Omit<TextFieldProps, "name" | "value" | "onChange" | "error" | "helperText">>;
}

/**
 * Option type for Select and Autocomplete components
 */
export interface SelectOption<T = string> {
  /**
   * Option value
   */
  value: T;

  /**
   * Option label (displayed to user)
   */
  label: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

/**
 * Props for FormInput.Select component
 */
export interface FormSelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Select options
   */
  options: SelectOption[];

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * MUI Select variant
   */
  variant?: SelectProps["variant"];

  /**
   * Field size
   */
  size?: SelectProps["size"];

  /**
   * Whether to allow multiple selections
   */
  multiple?: boolean;

  /**
   * Additional Select props
   */
  SelectProps?: Partial<Omit<SelectProps, "name" | "value" | "onChange" | "error">>;
}

/**
 * Props for FormInput.Autocomplete component
 */
export interface FormAutocompleteFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
  TOption = SelectOption
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Autocomplete options
   */
  options: TOption[];

  /**
   * Function to get option label
   */
  getOptionLabel?: (option: TOption) => string;

  /**
   * Function to check if options are equal
   */
  isOptionEqualToValue?: (option: TOption, value: TOption) => boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether to allow multiple selections
   */
  multiple?: boolean;

  /**
   * Whether to allow free solo input
   */
  freeSolo?: boolean;

  /**
   * Field size
   */
  size?: AutocompleteProps<TOption, boolean | undefined, boolean | undefined, boolean | undefined>["size"];

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * No options text
   */
  noOptionsText?: string;

  /**
   * Additional Autocomplete props
   */
  AutocompleteProps?: Partial<Omit<
    AutocompleteProps<TOption, boolean | undefined, boolean | undefined, boolean | undefined>,
    "options" | "value" | "onChange" | "renderInput"
  >>;
}

/**
 * Props for FormInput.Checkbox component
 */
export interface FormCheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Checkbox size
   */
  size?: CheckboxProps["size"];

  /**
   * Checkbox color
   */
  color?: CheckboxProps["color"];

  /**
   * Additional Checkbox props
   */
  CheckboxProps?: Partial<Omit<CheckboxProps, "checked" | "onChange">>;
}

/**
 * Props for FormInput.Radio component
 */
export interface FormRadioFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Radio options
   */
  options: SelectOption[];

  /**
   * Radio group layout direction
   */
  row?: boolean;

  /**
   * Radio size
   */
  size?: "small" | "medium";

  /**
   * Radio color
   */
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";

  /**
   * Additional RadioGroup props
   */
  RadioGroupProps?: Partial<Omit<RadioGroupProps, "value" | "onChange">>;
}

/**
 * Props for FormInput.Switch component
 */
export interface FormSwitchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Switch size
   */
  size?: SwitchProps["size"];

  /**
   * Switch color
   */
  color?: SwitchProps["color"];

  /**
   * Additional Switch props
   */
  SwitchProps?: Partial<Omit<SwitchProps, "checked" | "onChange">>;
}

/**
 * Props for FormInput.DatePicker component
 */
export interface FormDatePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Minimum selectable date
   */
  minDate?: Dayjs;

  /**
   * Maximum selectable date
   */
  maxDate?: Dayjs;

  /**
   * Disable dates before today
   */
  disablePast?: boolean;

  /**
   * Disable dates after today
   */
  disableFuture?: boolean;

  /**
   * Date format
   */
  format?: string;

  /**
   * Additional DatePicker props
   */
  DatePickerProps?: Partial<Omit<DatePickerProps<Dayjs>, "value" | "onChange" | "label">>;
}

/**
 * Props for FormInput.DateTimePicker component
 */
export interface FormDateTimePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Minimum selectable date
   */
  minDateTime?: Dayjs;

  /**
   * Maximum selectable date
   */
  maxDateTime?: Dayjs;

  /**
   * Disable dates before now
   */
  disablePast?: boolean;

  /**
   * Disable dates after now
   */
  disableFuture?: boolean;

  /**
   * Date time format
   */
  format?: string;

  /**
   * Additional DateTimePicker props
   */
  DateTimePickerProps?: Partial<Omit<DateTimePickerProps<Dayjs>, "value" | "onChange" | "label">>;
}

/**
 * Props for FormInput.FileUpload component
 */
export interface FormFileUploadFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  /**
   * Accepted file types (e.g., "image/*", ".pdf")
   */
  accept?: string;

  /**
   * Whether to allow multiple files
   */
  multiple?: boolean;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Custom upload button text
   */
  buttonText?: string;

  /**
   * Show file preview
   */
  showPreview?: boolean;

  /**
   * Drag and drop zone text
   */
  dropzoneText?: string;
}

/**
 * Render props for FormInput.Array component
 */
export interface FormArrayRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  _TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
> {
  /**
   * Array fields from useFieldArray
   */
  fields: Record<"id", string>[];

  /**
   * Append a new item to the array
   */
  append: (value: any) => void;

  /**
   * Remove an item from the array
   */
  remove: (index: number) => void;

  /**
   * Move an item in the array
   */
  move: (from: number, to: number) => void;

  /**
   * Insert an item at a specific position
   */
  insert: (index: number, value: any) => void;

  /**
   * Update an item in the array
   */
  update: (index: number, value: any) => void;
}

/**
 * Props for FormInput.Array component
 */
export interface FormArrayFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  _TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
> {
  /**
   * Field name (must match form schema)
   */
  name: _TName;

  /**
   * Render function for array items
   */
  children: (props: FormArrayRenderProps<TFieldValues, _TName>) => ReactNode;
}

/**
 * Form submission handler type
 */
export type FormSubmitHandler<TFieldValues extends FieldValues = FieldValues> = (
  data: TFieldValues
) => void | Promise<void>;

/**
 * Form error type
 */
export type FormFieldError = FieldError;

/**
 * Form state type from useForm
 */
export type FormState<TFieldValues extends FieldValues = FieldValues> = UseFormReturn<TFieldValues>;
