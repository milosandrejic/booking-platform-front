"use client";

import type { ReactNode } from "react";
import { FormProvider as RHFFormProvider } from "react-hook-form";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/**
 * Props for Form component
 * @template TFieldValues - Form field values type
 */
export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  /**
   * Form methods from useForm hook
   */
  methods: UseFormReturn<TFieldValues>;

  /**
   * Form submission handler
   */
  onSubmit: (data: TFieldValues) => void | Promise<void>;

  /**
   * Form children
   */
  children: ReactNode;

  /**
   * Locale for date pickers (default: "en")
   */
  locale?: string;

  /**
   * Additional form props
   */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

/**
 * Form component wraps React Hook Form's FormProvider and MUI's LocalizationProvider
 * Provides form context and date picker localization to all child components
 *
 * @example
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { zodResolver } from "@hookform/resolvers/zod";
 * import { z } from "zod";
 * import { Form, FormInput } from "@booking-platform/ui";
 *
 * const schema = z.object({
 *   email: z.string().email(),
 *   name: z.string().min(2),
 * });
 *
 * function MyForm() {
 *   const methods = useForm({
 *     resolver: zodResolver(schema),
 *     defaultValues: { email: "", name: "" },
 *   });
 *
 *   const handleSubmit = (data) => {
 *     console.log(data);
 *   };
 *
 *   return (
 *     <Form methods={methods} onSubmit={handleSubmit}>
 *       <FormInput.Text name="name" label="Name" />
 *       <FormInput.Text name="email" label="Email" />
 *       <button type="submit">Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 */
export function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  formProps,
  locale = "en",
  methods,
  onSubmit,
}: FormProps<TFieldValues>) {
  return (
    <RHFFormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          {...formProps}
        >
          {children}
        </form>
      </LocalizationProvider>
    </RHFFormProvider>
  );
}
