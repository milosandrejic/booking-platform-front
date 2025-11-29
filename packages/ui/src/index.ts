// Form components and providers
export {
  Form,
  FormInput,
} from "./components/forms";

export type {
  FormProps,
  BaseFormFieldProps,
  FormTextFieldProps,
  FormSelectFieldProps,
  FormAutocompleteFieldProps,
  FormCheckboxFieldProps,
  FormRadioFieldProps,
  FormSwitchFieldProps,
  FormDatePickerFieldProps,
  FormDateTimePickerFieldProps,
  FormFileUploadFieldProps,
  FormArrayFieldProps,
  FormArrayRenderProps,
  FormSubmitHandler,
  FormFieldError,
  FormState,
  SelectOption,
} from "./components/forms";

// Common Zod schemas
export {
  emailSchema,
  phoneSchema,
  urlSchema,
  optionalUrlSchema,
  passwordSchema,
  simplePasswordSchema,
  requiredStringSchema,
  optionalStringSchema,
  numberSchema,
  dateSchema,
  fileSchema,
  arraySchema,
} from "./schemas";

// Re-export commonly used third-party libraries
export { useForm, useFormContext, useWatch, useFieldArray } from "react-hook-form";
export type { UseFormReturn, FieldValues, Path, Control } from "react-hook-form";

export { zodResolver } from "@hookform/resolvers/zod";
export { z } from "zod";
export type { ZodSchema, ZodType } from "zod";
