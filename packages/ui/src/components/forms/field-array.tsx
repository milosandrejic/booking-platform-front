"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { FormArrayFieldProps } from "./types";

/**
 * FormInput.Array component - Field array with React Hook Form integration
 * Provides utilities for managing dynamic form fields (add, remove, move, etc.)
 *
 * @example
 * ```tsx
 * <FormInput.Array name="contacts">
 *   {({ fields, append, remove }) => (
 *     <>
 *       {fields.map((field, index) => (
 *         <Box key={field.id}>
 *           <FormInput.Text
 *             name={`contacts.${index}.name`}
 *             label="Name"
 *           />
 *           <Button onClick={() => remove(index)}>Remove</Button>
 *         </Box>
 *       ))}
 *       <Button onClick={() => append({ name: "" })}>Add Contact</Button>
 *     </>
 *   )}
 * </FormInput.Array>
 * ```
 */
export function FieldArrayComponent<TFieldValues extends FieldValues = FieldValues>({
  children,
  name,
}: FormArrayFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const { append, fields, insert, move, remove, update } = useFieldArray({
    control,
    name,
  });

  return children({
    append,
    fields,
    insert,
    move,
    remove,
    update,
  });
}
