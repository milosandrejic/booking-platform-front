# @booking-platform/ui

Shared UI component library for the booking platform monorepo. Includes form components built with React Hook Form, Zod validation, and Material-UI.

## Installation

This package is part of the monorepo workspace and is automatically linked to all apps.

```json
{
  "dependencies": {
    "@booking-platform/ui": "workspace:*"
  }
}
```

## Usage

### Basic Form Example

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, FormInput, emailSchema } from "@booking-platform/ui";
import { Button, Stack } from "@mui/material";

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = (data: LoginFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormInput.Text
          name="email"
          control={methods.control}
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <FormInput.Text
          name="password"
          control={methods.control}
          label="Password"
          type="password"
        />

        <FormInput.Checkbox
          name="rememberMe"
          control={methods.control}
          label="Remember me"
        />

        <Button type="submit" variant="contained" size="large">
          Sign In
        </Button>
      </Stack>
    </FormProvider>
  );
}
```

### Advanced Form with Multiple Field Types

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormProvider,
  FormInput,
  emailSchema,
  phoneSchema,
  requiredStringSchema,
} from "@booking-platform/ui";
import { Button, Stack, Box } from "@mui/material";
import dayjs from "dayjs";

const registrationSchema = z.object({
  firstName: requiredStringSchema(2, "First name"),
  lastName: requiredStringSchema(2, "Last name"),
  email: emailSchema,
  phone: phoneSchema,
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "Please select a city"),
  birthDate: z.date(),
  gender: z.enum(["male", "female", "other"]),
  notifications: z.boolean(),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

const cityOptions = [
  { value: "ny", label: "New York" },
  { value: "la", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
];

const interestOptions = [
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food & Dining" },
  { value: "sports", label: "Sports" },
  { value: "arts", label: "Arts & Culture" },
];

export function RegistrationForm() {
  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      gender: "male",
      notifications: false,
      interests: [],
    },
  });

  const handleSubmit = (data: RegistrationFormData) => {
    console.log("Registration data:", data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <FormInput.Text
            name="firstName"
            control={methods.control}
            label="First Name"
            required
          />

          <FormInput.Text
            name="lastName"
            control={methods.control}
            label="Last Name"
            required
          />
        </Box>

        <FormInput.Text
          name="email"
          control={methods.control}
          label="Email"
          type="email"
          required
        />

        <FormInput.Text
          name="phone"
          control={methods.control}
          label="Phone Number"
          type="tel"
          required
        />

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <FormInput.Select
            name="country"
            control={methods.control}
            label="Country"
            options={countryOptions}
            required
          />

          <FormInput.Autocomplete
            name="city"
            control={methods.control}
            label="City"
            options={cityOptions}
            required
          />
        </Box>

        <FormInput.DatePicker
          name="birthDate"
          control={methods.control}
          label="Birth Date"
          disableFuture
          format="MM/DD/YYYY"
          required
        />

        <FormInput.Radio
          name="gender"
          control={methods.control}
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          row
        />

        <FormInput.Autocomplete
          name="interests"
          control={methods.control}
          label="Interests"
          options={interestOptions}
          multiple
          placeholder="Select your interests"
        />

        <FormInput.Switch
          name="notifications"
          control={methods.control}
          label="Receive email notifications"
        />

        <Button type="submit" variant="contained" size="large">
          Register
        </Button>
      </Stack>
    </FormProvider>
  );
}
```

### Dynamic Field Array Example

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, FormInput, emailSchema } from "@booking-platform/ui";
import { Button, Stack, Box, IconButton, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: emailSchema,
  phone: z.string().min(1, "Phone is required"),
});

const formSchema = z.object({
  contacts: z.array(contactSchema).min(1, "Add at least one contact"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactListForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contacts: [{ name: "", email: "", phone: "" }],
    },
  });

  const handleSubmit = (data: FormData) => {
    console.log("Contacts:", data.contacts);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormInput.Array name="contacts" control={methods.control}>
          {({ fields, append, remove }) => (
            <Stack spacing={2}>
              <Typography variant="h6">Emergency Contacts</Typography>

              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="subtitle2">Contact {index + 1}</Typography>
                      {fields.length > 1 && (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => remove(index)}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>

                    <FormInput.Text
                      name={`contacts.${index}.name`}
                      control={methods.control}
                      label="Name"
                      required
                    />

                    <FormInput.Text
                      name={`contacts.${index}.email`}
                      control={methods.control}
                      label="Email"
                      type="email"
                      required
                    />

                    <FormInput.Text
                      name={`contacts.${index}.phone`}
                      control={methods.control}
                      label="Phone"
                      type="tel"
                      required
                    />
                  </Stack>
                </Box>
              ))}

              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => append({ name: "", email: "", phone: "" })}
              >
                Add Contact
              </Button>
            </Stack>
          )}
        </FormInput.Array>

        <Button type="submit" variant="contained" size="large">
          Save Contacts
        </Button>
      </Stack>
    </FormProvider>
  );
}
```

### File Upload Example

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, fileSchema } from "@booking-platform/ui";
import { FormProvider, FormInput } from "@booking-platform/ui";
import { Button, Stack } from "@mui/material";

const uploadSchema = z.object({
  profilePicture: fileSchema({
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    fieldName: "Profile picture",
  }),
  documents: z.array(
    fileSchema({
      maxSize: 10 * 1024 * 1024, // 10MB
      fieldName: "Document",
    })
  ),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export function UploadForm() {
  const methods = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const handleSubmit = (data: UploadFormData) => {
    console.log("Files:", data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormInput.FileUpload
          name="profilePicture"
          control={methods.control}
          label="Profile Picture"
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          showPreview
          required
        />

        <FormInput.FileUpload
          name="documents"
          control={methods.control}
          label="Documents"
          accept=".pdf,.doc,.docx"
          multiple
          maxSize={10 * 1024 * 1024}
          showPreview
        />

        <Button type="submit" variant="contained" size="large">
          Upload Files
        </Button>
      </Stack>
    </FormProvider>
  );
}
```

## Available Components

### FormProvider
Wraps your form with React Hook Form context and MUI LocalizationProvider.

**Props:**
- `methods` - Form methods from `useForm()`
- `onSubmit` - Form submission handler
- `locale` - Date picker locale (default: "en")
- `formProps` - Additional HTML form attributes

### FormInput.Text
Text input field supporting various types (text, email, password, number, tel, url).

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `label` - Field label
- `type` - Input type
- `placeholder` - Placeholder text
- `multiline` - Enable multiline input
- `rows` / `maxRows` - For multiline inputs
- `variant` - MUI variant (outlined/filled/standard)
- `errorMessage` - Override error message
- `startAdornment` / `endAdornment` - Input adornments

### FormInput.Select
Dropdown select field with single or multiple selection.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `options` - Array of `{ value, label, disabled? }`
- `label` - Field label
- `placeholder` - Placeholder text
- `multiple` - Enable multiple selection
- `variant` - MUI variant

### FormInput.Autocomplete
Searchable autocomplete field with single or multiple selection.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `options` - Array of options
- `label` - Field label
- `multiple` - Enable multiple selection
- `freeSolo` - Allow custom input
- `loading` - Show loading state
- `getOptionLabel` - Custom label function
- `isOptionEqualToValue` - Custom equality function

### FormInput.Checkbox
Boolean checkbox field.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `label` - Field label
- `size` - Checkbox size
- `color` - Checkbox color

### FormInput.Radio
Radio group for single selection.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `options` - Array of `{ value, label, disabled? }`
- `label` - Group label
- `row` - Horizontal layout

### FormInput.Switch
Toggle switch for boolean values.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `label` - Field label
- `size` - Switch size
- `color` - Switch color

### FormInput.DatePicker
Date picker field.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `label` - Field label
- `format` - Date format (default: "MM/DD/YYYY")
- `minDate` / `maxDate` - Date constraints
- `disablePast` / `disableFuture` - Disable past/future dates

### FormInput.DateTimePicker
Date and time picker field.

**Props:**
- Similar to DatePicker with time selection

### FormInput.Array
Dynamic field array for add/remove functionality.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `children` - Render function receiving `{ fields, append, remove, move, insert, update }`

### FormInput.FileUpload
File upload with drag-and-drop support.

**Props:**
- `name` - Field name (required)
- `control` - Form control (required)
- `label` - Field label
- `accept` - Accepted file types
- `multiple` - Allow multiple files
- `maxSize` - Maximum file size in bytes
- `showPreview` - Show file preview

## Common Zod Schemas

Pre-built validation schemas for common use cases:

- `emailSchema` - Email validation
- `phoneSchema` - Phone number validation
- `urlSchema` / `optionalUrlSchema` - URL validation
- `passwordSchema` - Strong password (8+ chars, uppercase, lowercase, number, special char)
- `simplePasswordSchema` - Simple password (6+ chars)
- `requiredStringSchema(minLength, fieldName)` - Required string with custom length
- `optionalStringSchema(minLength, fieldName)` - Optional string
- `numberSchema({ min, max, fieldName })` - Number with constraints
- `dateSchema({ min, max, fieldName })` - Date with constraints
- `fileSchema({ maxSize, allowedTypes, fieldName })` - File validation
- `arraySchema(itemSchema, { min, max, fieldName })` - Array validation

## TypeScript Support

All components are fully typed with TypeScript for excellent IntelliSense support. Import types as needed:

```tsx
import type {
  FormProviderProps,
  FormTextFieldProps,
  FormSelectFieldProps,
  SelectOption,
  FormSubmitHandler,
} from "@booking-platform/ui";
```

## License

Private - Part of booking-platform monorepo
