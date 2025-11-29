"use client";

import { TextFieldComponent } from "./text-field";
import { SelectFieldComponent } from "./select-field";
import { AutocompleteFieldComponent } from "./autocomplete-field";
import { CheckboxFieldComponent } from "./checkbox-field";
import { RadioFieldComponent } from "./radio-field";
import { SwitchFieldComponent } from "./switch-field";
import { DatePickerFieldComponent } from "./date-picker-field";
import { DateTimePickerFieldComponent } from "./date-time-picker-field";
import { FieldArrayComponent } from "./field-array";
import { FileUploadFieldComponent } from "./file-upload-field";

/**
 * FormInput namespace object containing all form field components
 * Use as: <FormInput.Text />, <FormInput.Select />, etc.
 *
 * @example
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { zodResolver } from "@hookform/resolvers/zod";
 * import { z } from "zod";
 * import { FormProvider, FormInput } from "@booking-platform/ui";
 *
 * const schema = z.object({
 *   email: z.string().email(),
 *   name: z.string().min(2),
 *   country: z.string(),
 *   acceptTerms: z.boolean(),
 * });
 *
 * function MyForm() {
 *   const methods = useForm({
 *     resolver: zodResolver(schema),
 *     defaultValues: {
 *       email: "",
 *       name: "",
 *       country: "",
 *       acceptTerms: false,
 *     },
 *   });
 *
 *   return (
 *     <FormProvider methods={methods} onSubmit={(data) => console.log(data)}>
 *       <FormInput.Text
 *         name="name"
 *         control={methods.control}
 *         label="Name"
 *         placeholder="Enter your name"
 *       />
 *
 *       <FormInput.Text
 *         name="email"
 *         control={methods.control}
 *         label="Email"
 *         type="email"
 *       />
 *
 *       <FormInput.Select
 *         name="country"
 *         control={methods.control}
 *         label="Country"
 *         options={[
 *           { value: "us", label: "United States" },
 *           { value: "uk", label: "United Kingdom" },
 *         ]}
 *       />
 *
 *       <FormInput.Checkbox
 *         name="acceptTerms"
 *         control={methods.control}
 *         label="I accept the terms"
 *       />
 *
 *       <button type="submit">Submit</button>
 *     </FormProvider>
 *   );
 * }
 * ```
 */
export const FormInput = {
  /**
   * Text input field
   * Supports text, email, password, number, tel, url types
   */
  Text: TextFieldComponent,

  /**
   * Select dropdown field
   * Single or multiple selection
   */
  Select: SelectFieldComponent,

  /**
   * Autocomplete field with search
   * Single or multiple selection with free solo option
   */
  Autocomplete: AutocompleteFieldComponent,

  /**
   * Checkbox field
   * For boolean values
   */
  Checkbox: CheckboxFieldComponent,

  /**
   * Radio group field
   * For single selection from multiple options
   */
  Radio: RadioFieldComponent,

  /**
   * Switch toggle field
   * For boolean values
   */
  Switch: SwitchFieldComponent,

  /**
   * Date picker field
   * For date selection
   */
  DatePicker: DatePickerFieldComponent,

  /**
   * Date and time picker field
   * For date and time selection
   */
  DateTimePicker: DateTimePickerFieldComponent,

  /**
   * Dynamic field array
   * For managing arrays of form fields (add/remove items)
   */
  Array: FieldArrayComponent,

  /**
   * File upload field
   * With drag and drop support
   */
  FileUpload: FileUploadFieldComponent,
} as const;
