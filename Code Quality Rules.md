# Global Code Quality Rules (React + TypeScript/JSX + SCSS)

*Universal coding standards for all projects in the booking platform monorepo.*

---

## 1) Scope & Application

* **Scope:** All projects in the monorepo (shared/ui, shared/theme, apps/owner, apps/admin, apps/storefront)
* **Languages:** React with TypeScript/JSX, SCSS, JavaScript
* **Goals:** Consistent, maintainable, readable code across all projects

---

## 2) React/JSX Coding Style

### Component Structure & Exports
* **File naming:** Use PascalCase for component files (`Button.tsx`, `PropertyCard.jsx`)
* **Component exports:** 
  - **Shared UI components:** Use named exports (`export const Button = ...`)
  - **Application components:** Use named exports, default export only for Next.js pages
* **Component organization:** One component per file unless tightly coupled

### JSX Formatting Rules

#### Conditional Rendering
* **NO ternary operators** in JSX unless component has 0-1 props
* **Use guard clauses** and `&&` operator with proper formatting
* **Opening brace** `{` always on its own line
* **Condition** on its own line, followed by `&&` on the same line
* **Component** on the next line with proper indentation
* **Closing brace** `}` on its own line

✅ **Correct:**
```jsx
export const AlertComponent = ({ message, isVisible, type }) => {
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
        <ErrorIcon
          size="small"
          color="error"
        />
      }
    </div>
  );
};
```

✅ **Allowed (simple ternary with 0-1 props):**
```jsx
return (
  <div>
    {
      isReady ? <Spinner /> : <EmptyState />
    }
  </div>
);

return (
  <div>
    {
      isOpen ? <Modal title="My Modal" /> : null
    }
  </div>
);
```

#### Multiline JSX
* **2+ props:** Always use multiline formatting
* **Props alignment:** Each prop on its own line, properly indented
* **Closing tag:** Self-closing components end with `/>` on the last prop line

**Correct formatting:**
```jsx
<Button
  variant="filled"
  size="large"
  onClick={handleSubmit}
  disabled={isLoading}
>
  Save Changes
</Button>

<TextField
  label="Email Address"
  value={email}
  onChange={handleEmailChange}
  error={!!errors.email}
  helperText={errors.email}
/>
```

```

#### Loop Rendering
```jsx
{
  items.map(item =>
    <ComponentCard
      key={item.id}
      title={item.title}
      description={item.description}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
```

### Spacing Rules

#### Function/Component Spacing
* **Empty line before return** unless function starts with return
* **Empty line after variable declarations** before logic
* **Empty line before if conditions** unless function starts with if
* **Empty line around conditional rendering blocks** when not first/last child

✅ **Correct:**
```jsx
const MyComponent = ({ data, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      await onUpdate(data);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) return null;

  return (
    <form onSubmit={handleSubmit}>
      {
        errors.submit &&
        <Alert
          type="error"
          message={errors.submit}
        />
      }

      <TextField
        label="Name"
        value={data.name}
        onChange={handleNameChange}
      />
    </form>
  );
};
```

#### Conditional Rendering Spacing
* **Empty line outside braces** if the block is **not** the first or last child inside its parent
* **No empty line outside braces** if it's the first or last child

✅ **First child (no empty line above, empty line below):**
```jsx
<div>
  {
    condition &&
    <Component />
  }

  <div>Some content</div>
</div>
```

✅ **Middle child (empty lines above and below):**
```jsx
<div>
  <div>Some content</div>

  {
    condition &&
    <Component />
  }

  <div>More content</div>
</div>
```

✅ **Last child (empty line above, no empty line below):**
```jsx
<div>
  <div>Some content</div>

  {
    condition &&
    <Component />
  }
</div>
```

#### If Statement Spacing
✅ **Correct:**
```jsx
const processData = (data) => {
  const result = transformData(data);

  if (result.isEmpty) {
    return null;
  }

  return result.value;
};

// When function starts with if - no empty line above
const validateData = (data) => {
  if (!data) {
    throw new Error('Data is required');
  }

  return processData(data);
};
```

---

## 3) Styling Guidelines

### Primary Styling Method (sx Props)
* **Always prefer sx props** for:
  - Layout (flexbox, grid)
  - Spacing (margin, padding)
  - Theme-based values (colors, typography)
  - Responsive design
  - Pseudo-selectors (:hover, :focus, :active)
  - Theme functions for dynamic styling

**Component implementation pattern:**
```jsx
import { resolveSx, type SxProps } from "../utils/sx";

const Component = ({ sx, className, style, ...props }) => {
  const { styles, className: sxClassName } = resolveSx(sx);
  
  const classes = [
    "component",
    "component--variant",
    sxClassName,
    className?.trim() || null
  ].filter(Boolean).join(" ");
  
  return (
    <div
      className={classes}
      style={{ ...style, ...styles }}
      {...props}
    >
      {children}
    </div>
  );
};
```

**sx Props usage examples:**
```jsx
<Component
  sx={{
    // Direct values
    padding: 2,
    margin: 1,
    backgroundColor: '#f5f5f5',
    
    // Theme functions
    bgcolor: (theme) => theme.palette.primary.main,
    color: (theme) => theme.palette.text.primary,
    
    // Responsive breakpoints
    display: { xs: 'block', md: 'flex' },
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 3 },
    
    // Pseudo-selectors
    ':hover': {
      bgcolor: 'primary.light',
      transform: 'translateY(-2px)',
      boxShadow: 2
    },
    ':focus': {
      outline: '2px solid',
      outlineColor: 'primary.main'
    },
    ':active': {
      transform: 'translateY(0)'
    },
    
    // Complex nested selectors
    '& .child-element': {
      color: 'text.secondary'
    }
  }}
/>
```

### SCSS Usage (Limited Scope)
* **Use SCSS only for**:
  - Complex animations and transitions
  - Pseudo-elements (::before, ::after)
  - Complex selectors that can't be achieved with sx
  - Component-specific styles requiring advanced CSS features

**SCSS for complex features:**
```scss
// Component.scss
.component {
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
    opacity: 0;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  &__animated-element {
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    
    animation: slideIn 0.3s ease-out;
  }
}
```

### BEM Methodology for SCSS
* **Block__Element--Modifier** naming convention
* **Component-scoped** SCSS files
* **No global styles** except in designated global files

```scss
// PropertyCard.scss
.property-card {
  // Block styles here if needed

  &__image {
    // Element styles
  }

  &__title {
    // Element styles
  }

  &--featured {
    // Modifier styles
  }

  &--disabled {
    // Modifier styles
  }
}
```
* **Component-scoped** SCSS files
* **No global styles** except in designated global files

```scss
// PropertyCard.scss
.property-card {
  // Block styles here if needed

  &__image {
    // Element styles
  }

  &__title {
    // Element styles
  }

  &--featured {
    // Modifier styles
  }

  &--disabled {
    // Modifier styles
  }
}
```

### Responsive Design
* **Mobile-first approach** using sx prop breakpoints
* **Breakpoint system:** `xs`, `sm`, `md`, `lg`, `xl`
* **Progressive enhancement** for larger screens

```jsx
<Grid
  container
  spacing={{ xs: 2, md: 3 }}
  sx={{
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 3, md: 4 }
  }}
>
  <Grid
    item
    xs={12}
    md={6}
    lg={4}
  >
    <Card>Content</Card>
  </Grid>
</Grid>
```

---

## 4) Component Development

### Component Props
* **Boolean props** should start with `is`, `has`, or `can`
* **Event handler props** should start with `on`
* **Enum-like props** should be restricted to known values
* **Required props** should be clearly documented

```jsx
// Good prop naming
export const Button = ({
  variant = 'outlined',
  size = 'medium',
  disabled = false,
  isLoading = false,
  hasIcon = false,
  onClick,
  onFocus,
  children,
  ...props
}) => {
  // Component implementation
};
```

### SSR Compatibility Guidelines
* **Use `"use client"` directive only when necessary:**
  - Components with event handlers (`onClick`, `onChange`, `onSubmit`, etc.)
  - Components with client-side state (`useState`, `useEffect`, `useRef` for DOM manipulation)
  - Components that use browser-only APIs
* **Server components (no `"use client"` needed):**
  - Layout components (containers, grids, stacks)
  - Display components (typography, cards, dividers, badges)
  - Non-interactive UI elements
* **Always use the sx props system** for styling components

```jsx
// ✅ Server component (SSR-compatible)
export const Card = ({ children, sx, className, ...props }) => {
  const { styles, className: sxClassName } = resolveSx(sx);
  
  return (
    <div 
      className={`card ${sxClassName} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

// ✅ Client component (interactive, needs "use client")
"use client";
export const Button = ({ onClick, sx, className, children, ...props }) => {
  const { styles, className: sxClassName } = resolveSx(sx);
  
  return (
    <button 
      className={`button ${sxClassName} ${className}`}
      style={styles}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Controlled vs Uncontrolled Components
* **All form-like components** must support both controlled and uncontrolled modes
* **Controlled mode:** Component receives both `value` and `onChange` props
* **Uncontrolled mode:** Component receives `defaultValue` and manages internal state
* **Implementation pattern:**

```jsx
export const TextField = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (event) => {
    const newValue = event.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(event);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};
```

---

## 5) Performance Guidelines

### React Optimization
* **React.memo** for components that receive stable props
* **useCallback** for event handlers passed as props to memoized components
* **useMemo** for expensive calculations
* **Avoid creating objects/functions in render**

```jsx
import { memo, useCallback, useMemo } from 'react';

const ExpensiveComponent = memo(({ items, onItemClick, filterText }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [items, filterText]);

  const handleItemClick = useCallback((item) => {
    onItemClick(item.id);
  }, [onItemClick]);

  return (
    <div>
      {
        filteredItems.map(item =>
          <ItemCard
            key={item.id}
            item={item}
            onClick={handleItemClick}
          />
        )
      }
    </div>
  );
});
```

### Bundle Optimization
* **Dynamic imports** for large components
* **Tree shaking** - import only what you need
* **Code splitting** at route level

```jsx
// Lazy loading
const HeavyModal = lazy(() => import('./HeavyModal'));

// Tree-shaking friendly imports
import { Button, TextField } from '@booking-platform-shared/ui';
// Instead of: import * as UI from '@booking-platform-shared/ui';
```

---

## 6) Error Handling

### Error Boundaries
* **Wrap route-level components** with error boundaries
* **Graceful fallback UI** for errors
* **Error logging** for debugging

```jsx
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            textAlign: 'center',
            p: 4
          }}
        >
          <Typography variant="headlineSmall" sx={{ mb: 2 }}>
            Something went wrong
          </Typography>
          <Button
            variant="outlined"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
```

### Form Validation
* **Real-time validation** for better UX
* **Consistent error messaging** across forms
* **Clear validation rules**

```jsx
const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    if (rule.required && !value?.toString().trim()) {
      return `${rule.label || name} is required`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${rule.label || name} must be at least ${rule.minLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || `${rule.label || name} format is invalid`;
    }

    return '';
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return { values, errors, handleChange, validateField };
};
```

---

## 7) Accessibility Guidelines

### ARIA and Semantic HTML
* **Semantic HTML elements** as foundation
* **ARIA labels** for screen readers
* **Focus management** for keyboard navigation
* **Color contrast compliance** (WCAG AA minimum)

```jsx
<Button
  variant="filled"
  onClick={handleDelete}
  aria-label={`Delete item ${item.name}`}
  disabled={isDeleting}
>
  {
    isDeleting ? (
      <Progress size="small" aria-label="Deleting..." />
    ) : (
      <DeleteIcon aria-hidden="true" />
    )
  }
</Button>

<Dialog
  open={isOpen}
  onClose={handleClose}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <Typography
    id="dialog-title"
    variant="titleLarge"
  >
    Confirm Action
  </Typography>
  <Typography
    id="dialog-description"
    variant="bodyMedium"
  >
    This action cannot be undone.
  </Typography>
</Dialog>
```

### Keyboard Navigation
* **Tab order** should be logical
* **Focus indicators** must be visible
* **Escape key** should close modals/dropdowns
* **Enter/Space** should activate buttons

---

## 8) Testing Guidelines

### Component Testing Principles
* **Test behavior, not implementation**
* **User-centric approach** - test what users see and do
* **Accessibility testing** included in component tests

```jsx
// Good: Testing behavior
test('shows error message when validation fails', async () => {
  render(<LoginForm onSubmit={mockSubmit} />);
  
  const submitButton = screen.getByRole('button', { name: /log in/i });
  fireEvent.click(submitButton);
  
  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
});

// Bad: Testing implementation
test('calls setError when email is empty', () => {
  // This tests internal implementation details
});
```

---

## 9) Code Review Checklist

### Universal Standards
Before submitting any code for review, ensure:

- [ ] **Formatting:** Code follows spacing and conditional rendering rules
- [ ] **Styling:** sx props used appropriately with SSR-compatible pattern, SCSS only when necessary
- [ ] **SSR Compatibility:** Appropriate use of `"use client"` directive (only for interactive components)
- [ ] **sx Props Implementation:** Uses new pattern with `resolveSx(sx)` destructuring
- [ ] **Components:** Proper multiline JSX formatting for 2+ props
- [ ] **Performance:** No unnecessary re-renders or expensive operations in render
- [ ] **Accessibility:** ARIA labels and semantic HTML where needed
- [ ] **Error Handling:** Proper error states and loading states
- [ ] **Responsiveness:** Works on mobile and desktop devices using sx props
- [ ] **Consistency:** Follows established patterns in the codebase
- [ ] **Testing:** Component behavior is testable and tested
- [ ] **Security:** No sensitive data exposed, proper input validation
- [ ] **Theme Integration:** No direct `useTheme()` calls, use sx props system instead

### Project-Specific Additions
Each project may add additional checklist items specific to their domain:
- UI Library: Storybook stories, component API documentation
- Applications: Route protection, data fetching patterns, business logic validation

---

*This document serves as the foundation for all projects. Individual projects should reference this document and add only project-specific rules in their own Code Quality Rules files.*
