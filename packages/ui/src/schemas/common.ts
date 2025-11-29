import { z } from "zod";

/**
 * Common email validation schema with default error message
 * @example
 * const schema = z.object({ email: emailSchema });
 */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

/**
 * Common phone number validation schema (international format)
 * @example
 * const schema = z.object({ phone: phoneSchema });
 */
export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^[\d\s()+\-ext.]+$/,
    "Please enter a valid phone number"
  );

/**
 * Common URL validation schema
 * @example
 * const schema = z.object({ website: urlSchema });
 */
export const urlSchema = z
  .string()
  .min(1, "URL is required")
  .url("Please enter a valid URL");

/**
 * Optional URL validation schema (allows empty string)
 * @example
 * const schema = z.object({ website: optionalUrlSchema });
 */
export const optionalUrlSchema = z
  .string()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal(""));

/**
 * Strong password validation schema
 * Requires: min 8 chars, uppercase, lowercase, number, special char
 * @example
 * const schema = z.object({ password: passwordSchema });
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

/**
 * Simple password validation schema (minimum length only)
 * @example
 * const schema = z.object({ password: simplePasswordSchema });
 */
export const simplePasswordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

/**
 * Required string validation schema with custom minimum length
 * @param minLength - Minimum length (default: 1)
 * @param fieldName - Field name for error message (default: "This field")
 * @example
 * const schema = z.object({ name: requiredStringSchema(3, "Name") });
 */
export function requiredStringSchema(
  minLength: number = 1,
  fieldName: string = "This field"
) {
  return z
    .string()
    .min(minLength, `${fieldName} must be at least ${minLength} characters`);
}

/**
 * Optional string validation schema with minimum length when provided
 * @param minLength - Minimum length when string is provided
 * @param fieldName - Field name for error message
 * @example
 * const schema = z.object({ bio: optionalStringSchema(10, "Bio") });
 */
export function optionalStringSchema(
  minLength: number = 1,
  fieldName: string = "This field"
) {
  return z
    .string()
    .min(minLength, `${fieldName} must be at least ${minLength} characters`)
    .optional()
    .or(z.literal(""));
}

/**
 * Number validation schema with optional min/max constraints
 * @param options - Min/max values and field name
 * @example
 * const schema = z.object({ age: numberSchema({ min: 18, max: 120, fieldName: "Age" }) });
 */
export function numberSchema(options?: {
  min?: number;
  max?: number;
  fieldName?: string;
}) {
  const fieldName = options?.fieldName || "This field";
  let schema = z.number({
    required_error: `${fieldName} is required`,
    invalid_type_error: `${fieldName} must be a number`,
  });

  if (options?.min !== undefined) {
    schema = schema.min(options.min, `${fieldName} must be at least ${options.min}`);
  }

  if (options?.max !== undefined) {
    schema = schema.max(options.max, `${fieldName} must be at most ${options.max}`);
  }

  return schema;
}

/**
 * Date validation schema with optional min/max constraints
 * @param options - Min/max dates and field name
 * @example
 * const schema = z.object({ birthDate: dateSchema({ max: new Date(), fieldName: "Birth date" }) });
 */
export function dateSchema(options?: {
  min?: Date;
  max?: Date;
  fieldName?: string;
}) {
  const fieldName = options?.fieldName || "Date";
  let schema = z.date({
    required_error: `${fieldName} is required`,
    invalid_type_error: `${fieldName} must be a valid date`,
  });

  if (options?.min) {
    schema = schema.min(options.min, `${fieldName} must be after ${options.min.toLocaleDateString()}`);
  }

  if (options?.max) {
    schema = schema.max(options.max, `${fieldName} must be before ${options.max.toLocaleDateString()}`);
  }

  return schema;
}

/**
 * File validation schema with type and size constraints
 * @param options - Max size in bytes, allowed types, and field name
 * @example
 * const schema = z.object({ 
 *   avatar: fileSchema({ 
 *     maxSize: 5 * 1024 * 1024, // 5MB
 *     allowedTypes: ['image/jpeg', 'image/png'],
 *     fieldName: "Avatar"
 *   }) 
 * });
 */
export function fileSchema(options?: {
  maxSize?: number;
  allowedTypes?: string[];
  fieldName?: string;
}) {
  const fieldName = options?.fieldName || "File";
  
  return z.custom<File>(
    (file) => file instanceof File,
    `${fieldName} is required`
  ).refine(
    (file) => !options?.maxSize || file.size <= options.maxSize,
    `${fieldName} must be smaller than ${options?.maxSize ? Math.round(options.maxSize / 1024 / 1024) : 0}MB`
  ).refine(
    (file) => !options?.allowedTypes || options.allowedTypes.includes(file.type),
    `${fieldName} must be one of: ${options?.allowedTypes?.join(", ")}`
  );
}

/**
 * Array validation schema with min/max length constraints
 * @param itemSchema - Schema for array items
 * @param options - Min/max length and field name
 * @example
 * const schema = z.object({ 
 *   tags: arraySchema(z.string(), { min: 1, max: 5, fieldName: "Tags" }) 
 * });
 */
export function arraySchema<T extends z.ZodTypeAny>(
  itemSchema: T,
  options?: {
    min?: number;
    max?: number;
    fieldName?: string;
  }
) {
  const fieldName = options?.fieldName || "This field";
  let schema = z.array(itemSchema);

  if (options?.min !== undefined) {
    schema = schema.min(options.min, `${fieldName} must have at least ${options.min} items`);
  }

  if (options?.max !== undefined) {
    schema = schema.max(options.max, `${fieldName} must have at most ${options.max} items`);
  }

  return schema;
}
