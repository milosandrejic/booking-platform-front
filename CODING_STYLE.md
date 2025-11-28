# Coding Style Guide

## File & Component Naming

- **File naming**: Use kebab-case for all files (`sign-in-view.jsx`, `account-drawer.jsx`)
- **Component exports**: Use named exports only (`export function ComponentName() {}`)
- **Component organization**: One component per file unless tightly coupled

## Import Conventions

### Tree-Shaking Optimized Imports
**ALWAYS use named imports** for third-party libraries to enable tree-shaking:

✅ **Correct:**
```javascript
// Material-UI - grouped named imports
import { Box, Button, Typography, Card, Alert } from "@mui/material";
import { LoadingButton, DatePicker } from "@mui/lab";
import { AddIcon, EditIcon } from "@mui/icons-material";

// React & Router - named imports
import { useState, useEffect, useCallback, useMemo } from "react";
import { Navigate, useNavigate } from "react-router";

// Utilities - individual function imports
import debounce from "lodash/debounce";
import dayjs from "dayjs";

// Internal - absolute imports with @ prefix
import { useAuthContext } from "@/auth/hooks";
import { Iconify } from "@/components/iconify";
import { paths } from "@/routes/paths";
```

❌ **Avoid:**
```javascript
// Prevents tree-shaking
import * as MUI from "@mui/material";
import * as React from "react";
import _ from "lodash";

// Relative parent imports
import { Component } from "../../components/component";
```

### Import Formatting
- **Single import**: `import { Component } from "library"`
- **Multiple imports (2+)**: Use multiline format:
```javascript
import {
  Component1,
  Component2,
  Component3
} from "library";
```

## JSX Formatting Rules

### Conditional Rendering
- **NO ternary operators** in JSX unless component has 0-1 props
- **Use guard clauses** and `&&` operator with proper formatting
- **Opening brace** `{` always on its own line
- **Condition** on its own line, followed by `&&` on the same line
- **Component** on the next line with proper indentation

✅ **Correct:**
```jsx
export function AlertComponent({ message, isVisible, type }) {
  if (!message) return null;

  return (
    <div>
      {
        isVisible &&
        <Alert
          type={type}
          message={message}
        />
      }

      {
        type === 'error' &&
        <Iconify
          icon="eva:alert-circle-fill"
          color="error.main"
        />
      }
    </div>
  );
}
```

✅ **Allowed (simple ternary with 0-1 props):**
```jsx
return (
  <div>
    {
      isReady ? <LoadingScreen /> : <EmptyContent />
    }
  </div>
);
```

### Multiline JSX
- **2+ props**: Always use multiline formatting
- **Props alignment**: Each prop on its own line, properly indented
- **Closing tag**: Self-closing components end with `/>` on the last prop line

```jsx
<LoadingButton
  variant="contained"
  size="large"
  onClick={handleSubmit}
  loading={isSubmitting}
>
  Sign In
</LoadingButton>

<Field
  name="email"
  label="Email address"
  placeholder="example@gmail.com"
  InputLabelProps={{ shrink: true }}
/>
```

### Loop Rendering
```jsx
{
  items.map(item =>
    <MenuItem
      key={item.id}
      value={item.value}
      onClick={() => handleSelect(item)}
    >
      {item.label}
    </MenuItem>
  )
}
```

## Function & Component Spacing

### Spacing Rules
- **Empty line before return** unless function starts with return
- **Empty line after variable declarations** before logic
- **Empty line before if conditions** unless function starts with if
- **Empty line around conditional rendering blocks** when not first/last child

✅ **Correct:**
```jsx
export function SignInView() {
  const [errorMsg, setErrorMsg] = useState("");
  const password = useBoolean();

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" }
  });

  if (checkUserSession) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return (
    <Card>
      {
        errorMsg &&
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {errorMsg}
        </Alert>
      }

      <Form methods={methods} onSubmit={onSubmit}>
        <Field
          name="email"
          label="Email address"
          InputLabelProps={{ shrink: true }}
        />
      </Form>
    </Card>
  );
}
```

## TypeScript Conventions

### Component Structure
```jsx
// Standard component pattern
export function ComponentName({ prop1, prop2, ...other }) {
  // Hook declarations first
  const [state, setState] = useState(initialValue);
  const { data } = useSWR(key, fetcher);
  
  // Derived values
  const computedValue = useMemo(() => 
    expensiveComputation(state), [state]
  );
  
  // Event handlers
  const handleClick = useCallback((event) => {
    // handler logic
  }, [dependencies]);

  // Early returns/guards
  if (!data) return <LoadingSkeleton />;

  return (
    <Box>
      {/* Component JSX */}
    </Box>
  );
}
```

### Function Preferences
- **Function declarations** preferred over arrow functions for components
- **Named exports only** - no default exports
- **Absolute imports** required for `@/` paths (@ = src)