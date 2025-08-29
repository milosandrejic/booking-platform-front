# shared/ui — Code Quality Rules (Design System Components)

*Project-specific rules for the **`shared/ui`** design system library.*

> **📖 Global Standards:** This document extends the [Global Code Quality Rules](../../Code%20Quality%20Rules.md). Read the global rules first for universal coding standards.

---

## 1) Library-Specific Scope & Goals

* **Scope:** Reusable UI component library for the booking platform
* **Purpose:** Provide consistent, accessible, and themeable components
* **Framework:** React + TypeScript + SCSS + Storybook + Emotion CSS-in-JS
* **Goals:** Design system consistency, developer experience, accessibility compliance, SSR compatibility

---

## 2) Component Library Structure

```
shared/ui/src/
  ComponentName/
    ComponentName.tsx          # Main component
    ComponentName.scss         # Component styles
    ComponentName.stories.tsx  # Storybook documentation
    index.ts                   # Re-exports
```

### File Organization Rules
* **One component per directory** with all related files
* **Named exports only** - no default exports for components
* **Complete Storybook stories** for every public component
* **TypeScript interfaces** for all component props

---

## 3) Design System Component Requirements

### Component API Design
* **Consistent prop naming** across similar components
* **Variant-based design** (size, variant, color props)
* **Composition over configuration** - prefer multiple small components
* **Theme integration** - all colors/spacing through theme tokens

**Component API example:**
```tsx
export interface ButtonProps {
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'outlined',
  size = 'medium',
  color = 'primary',
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  // Implementation
};
```

### Required Component Features
Every UI component must support:

1. **SSR-Compatible sx Props Integration**
   ```tsx
   import { resolveSx, type SxProps } from "../utils/sx";
   
   export const Component = ({ sx, className, style, ...props }) => {
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
       />
     );
   };
   ```

2. **sx Props Interface Support**
   ```tsx
   export interface BaseComponentProps {
     sx?: SxProps;
     className?: string;
     style?: React.CSSProperties;
     // ... other props
   }
   ```

3. **SSR Compatibility Guidelines**
   - Use `"use client"` directive only for components with event handlers or client-side state
   - Layout components should be server-side compatible
   - All styling should use the new sx system for SSR support
   ```tsx
  // Server component (no "use client" needed)
   export const Card = ({ children, sx }) => {
     const { styles, className: sxClassName } = resolveSx(sx);
     return <div className={`card ${sxClassName}`} style={styles}>{children}</div>;
   };
   
  // Client component (needs "use client")
   "use client";
   export const Button = ({ onClick, sx }) => {
     const { styles, className: sxClassName } = resolveSx(sx);
     return <button className={`button ${sxClassName}`} style={styles} onClick={onClick} />;
   };
   ```

4. **Ref Forwarding**
   ```tsx
   export const Component = forwardRef<HTMLDivElement, ComponentProps>(
     (props, ref) => {
       return <div ref={ref} {...props} />;
     }
   );
   ```

5. **Accessibility Compliance**
   - ARIA attributes where appropriate
   - Keyboard navigation support
   - Screen reader compatibility
   - Color contrast compliance

---

## 4) Storybook Documentation

### Required Stories for Each Component
* **Default** - Basic component usage
* **All Variants** - Show all variant options
* **All Sizes** - Show all size options
* **Interactive States** - hover, focus, disabled, loading
* **With Icons** - if component supports icons
* **Playground** - Controls for all props

**Complete story example:**
```tsx
// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primary button component for user actions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
  },
} as Meta<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button startIcon={<AddIcon />}>Add Item</Button>
      <Button endIcon={<ArrowIcon />}>Continue</Button>
    </Stack>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'filled',
    size: 'medium',
    color: 'primary',
  },
};
```

### Documentation Standards
* **Clear descriptions** for component purpose
* **Props documentation** with types and defaults
* **Usage examples** for common scenarios
* **Accessibility notes** where relevant
* **sx Props examples** showing theme functions, pseudo-selectors, and responsive design

---

## 5) sx Props System & Styling Guidelines

### sx Props Implementation Pattern
Every component must implement sx props using the SSR-compatible pattern:

```tsx
import { resolveSx, type SxProps } from "../utils/sx";

export interface ComponentProps {
  sx?: SxProps;
  className?: string;
  style?: React.CSSProperties;
  // ... other props
}

export const Component = ({ sx, className, style, ...props }) => {
  // ✅ Correct: Extract both styles and className from resolveSx
  const { styles, className: sxClassName } = resolveSx(sx);
  
  // ✅ Correct: Include sxClassName in classes array
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
    />
  );
};
```

### sx Props Features Support
Components must support all sx prop features:

1. **Theme Functions**
   ```tsx
   <Component sx={{
     color: (theme) => theme.palette.primary.main,
     padding: (theme) => theme.spacing(2),
     backgroundColor: (theme) => theme.palette.background.paper
   }} />
   ```

2. **Pseudo-Selectors**
   ```tsx
   <Component sx={{
     backgroundColor: 'primary.main',
     '&:hover': {
       backgroundColor: 'primary.dark'
     },
     '&:focus': {
       outline: '2px solid',
       outlineColor: 'primary.light'
     },
     '&:active': {
       transform: 'scale(0.98)'
     }
   }} />
   ```

3. **Responsive Breakpoints**
   ```tsx
   <Component sx={{
     display: { xs: 'block', md: 'flex' },
     padding: { xs: 1, sm: 2, md: 3 },
     fontSize: { xs: '14px', md: '16px' }
   }} />
   ```

4. **Mixed Property Types**
   ```tsx
   <Component sx={{
     // Direct values
     margin: 2,
     color: 'primary.main',
     
     // Theme functions
     padding: (theme) => theme.spacing(1, 2),
     backgroundColor: (theme) => theme.palette.background.default,
     
     // Responsive with theme functions
     fontSize: {
       xs: (theme) => theme.typography.body2.fontSize,
       md: (theme) => theme.typography.body1.fontSize
     }
   }} />
   ```

### SSR Compatibility Rules
* **Never use `useTheme()` directly** - use sx props system instead
* **Use `"use client"` directive only when necessary:**
  - Components with event handlers (`onClick`, `onChange`, etc.)
  - Components with client-side state (`useState`, `useEffect`, etc.)
  - Interactive components (buttons, form inputs)
* **Server components (no `"use client"` needed):**
  - Layout components (containers, grids, stacks)
  - Display components (typography, cards, dividers)
  - Non-interactive UI elements

### Component Implementation Pattern
**SSR-compatible sx props implementation:**
```tsx
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

---

## 6) Component Testing Requirements

### Testing Standards for UI Components
* **Visual regression tests** (Storybook snapshots)
* **Accessibility tests** (axe-core integration)
* **Interaction tests** (user events)
* **API contract tests** (prop variations)

```tsx
// Button.test.tsx
describe('Button Component', () => {
  it('renders with correct variant classes', () => {
    render(<Button variant="filled">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--filled');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    render(<Button>Keyboard Test</Button>);
    const button = screen.getByRole('button');
    
    button.focus();
    expect(button).toHaveFocus();
    
    fireEvent.keyDown(button, { key: 'Enter' });
    // Test enter key behavior
  });
});
```

---

## 7) Theme Integration Requirements

### Theme Token Usage via sx Props
* **All colors** must come from theme palette via sx props or CSS custom properties
* **All spacing** must use theme spacing scale via sx props
* **All typography** must use theme typography variants via sx props
* **All breakpoints** must use theme breakpoint system via sx props

```tsx
// ✅ Use sx props with theme integration
<Component sx={{
  // Colors from theme palette
  color: 'primary.main',
  backgroundColor: 'surface.variant',
  
  // Spacing from theme scale
  padding: 2, // theme.spacing(2)
  margin: { xs: 1, md: 3 },
  
  // Typography from theme
  fontSize: 'body1.fontSize',
  fontWeight: 'bold',
  
  // Theme functions for complex logic
  borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200'
}} />
```

```scss
// ✅ Use CSS custom properties in SCSS (when sx props aren't sufficient)
.component {
  // Colors via CSS custom properties
  color: var(--color-primary-main);
  background-color: var(--color-surface-variant);
  
  // Spacing via CSS custom properties
  padding: var(--spacing-2);
  margin: var(--spacing-1);
  
  // Typography via CSS custom properties
  font-family: var(--typography-body-large-font);
  font-size: var(--typography-body-large-size);
}
```

### Component Variants with sx Props
* **Consistent variant naming** across components
* **Semantic color mapping** (primary, secondary, error, etc.)
* **Size scale consistency** (small, medium, large)
* **sx props override capability** for all variants

**sx props should override component variants:**
```tsx
<Button 
  variant="filled" 
  color="primary"
  sx={{
    // These sx styles override the variant styles
    backgroundColor: 'error.main',
    '&:hover': {
      backgroundColor: 'error.dark'
    }
  }}
>
  Custom Styled Button
</Button>
```
* **All breakpoints** must use theme breakpoint system

```scss
// Component.scss
.component {
  // Use CSS custom properties from theme
  color: var(--color-primary-main);
  padding: var(--spacing-2);
  font-family: var(--typography-body-large-font);
}
```

### Component Variants
* **Consistent variant naming** across components
* **Semantic color mapping** (primary, secondary, error, etc.)
* **Size scale consistency** (small, medium, large)

---

## 7) Performance Requirements

### Bundle Size Optimization
* **Tree-shakeable exports** - individual component imports
* **Minimal dependencies** - avoid unnecessary external libs
* **Optimized bundle splitting** - separate stories from components

**Tree-shakeable structure:**
```tsx
// src/index.ts
export { Button } from './Button';
export { TextField } from './TextField';
export { Card } from './Card';

// ✅ Individual component exports
// src/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### Runtime Performance
* **Memoization** for expensive computations
* **Minimal re-renders** - stable prop patterns
* **Efficient event handling** - avoid inline functions in props

---

## 8) Versioning & Breaking Changes

### Semantic Versioning
* **Patch** (0.0.x) - Bug fixes, documentation updates
* **Minor** (0.x.0) - New components, new props (backward compatible)
* **Major** (x.0.0) - Breaking API changes, prop removals

### Deprecation Strategy
```tsx
// Mark props that will be removed with JSDoc
export interface ButtonProps {
  /**
   * @deprecated Use `variant="text"` instead. Will be removed in v2.0.0
   */
  ghost?: boolean;
  variant?: 'filled' | 'outlined' | 'text';
}
```

---

## 9) Code Review Checklist (UI Library Specific)

Before submitting component code for review, ensure:

- [ ] **API Design:** Component props follow design system conventions
- [ ] **sx Props Implementation:** Uses new SSR-compatible pattern with `resolveSx(sx)`
- [ ] **SSR Compatibility:** Appropriate use of `"use client"` directive (only for interactive components)
- [ ] **Storybook:** All required stories implemented with sx props examples
- [ ] **Theme Integration:** All styling uses sx props or CSS custom properties
- [ ] **Accessibility:** ARIA attributes, keyboard navigation, screen reader support
- [ ] **TypeScript:** Complete prop interfaces with proper types and SxProps
- [ ] **Testing:** Unit tests, accessibility tests, and visual regression tests
- [ ] **Performance:** Component is memoized if needed, no unnecessary re-renders
- [ ] **Documentation:** Clear JSDoc comments for all public APIs
- [ ] **Responsive:** Component works across all breakpoints using sx props
- [ ] **Browser Support:** Tested in all supported browsers
- [ ] **Bundle Impact:** Tree-shakeable exports, minimal bundle size increase

### sx Props & SSR Specific Checks
- [ ] **sx Props Pattern:** Uses `const { styles, className: sxClassName } = resolveSx(sx)`
- [ ] **className Handling:** Includes `sxClassName` in classes array
- [ ] **Style Application:** Uses `style={{ ...style, ...styles }}`
- [ ] **sx Props Pattern:** Component uses current `resolveSx()` pattern for styling
- [ ] **Client Directive:** `"use client"` only used for components with event handlers/state
- [ ] **Theme Functions:** sx props support theme functions for dynamic values
- [ ] **Pseudo-Selectors:** sx props support `:hover`, `:focus`, `:active` states
- [ ] **Responsive Design:** sx props support breakpoint-based responsive values

### Design System Consistency Checks
- [ ] **Variant Naming:** Consistent with other similar components
- [ ] **Color Mapping:** Uses semantic color names (primary, error, etc.)
- [ ] **Size Scale:** Follows established size conventions
- [ ] **Spacing:** Uses theme spacing multipliers via sx props
- [ ] **Typography:** Uses theme typography variants via sx props
- [ ] **sx Override:** Component variants can be overridden by sx props

---

*This document covers only UI library-specific rules. For universal coding standards, refer to the [Global Code Quality Rules](../../Code%20Quality%20Rules.md).*
