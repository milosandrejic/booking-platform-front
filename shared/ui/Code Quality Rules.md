# shared/ui — Code Quality Rules (Design System Components)

*Project-specific rules for the **`shared/ui`** design system library.*

> **📖 Global Standards:** This document extends the [Global Code Quality Rules](../../Code%20Quality%20Rules.md). Read the global rules first for universal coding standards.

---

## 1) Library-Specific Scope & Goals

* **Scope:** Reusable UI component library for the booking platform
* **Purpose:** Provide consistent, accessible, and themeable components
* **Framework:** React + TypeScript + SCSS + Storybook
* **Goals:** Design system consistency, developer experience, accessibility compliance

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

✅ **Good component API:**
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

1. **Theme Integration**
   ```tsx
   const theme = useTheme();
   // Use theme tokens for all styling
   ```

2. **sx Props Support**
   ```tsx
   export interface BaseComponentProps {
     sx?: SxProps;
     // ... other props
   }
   ```

3. **Ref Forwarding**
   ```tsx
   export const Component = forwardRef<HTMLDivElement, ComponentProps>(
     (props, ref) => {
       return <div ref={ref} {...props} />;
     }
   );
   ```

4. **Accessibility Compliance**
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

✅ **Complete story example:**
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

---

## 5) Component Testing Requirements

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

## 6) Theme Integration Requirements

### Theme Token Usage
* **All colors** must come from theme palette
* **All spacing** must use theme spacing scale
* **All typography** must use theme typography variants
* **All breakpoints** must use theme breakpoint system

```scss
// Component.scss
.component {
  // ✅ Use CSS custom properties from theme
  color: var(--color-primary-main);
  padding: var(--spacing-2);
  font-family: var(--typography-body-large-font);
  
  // ❌ Don't use hardcoded values
  // color: #1976d2;
  // padding: 16px;
  // font-family: 'Roboto', sans-serif;
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

```tsx
// ✅ Tree-shakeable structure
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
// Mark deprecated props with JSDoc
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
- [ ] **Storybook:** All required stories are implemented and documented
- [ ] **Theme Integration:** All styling uses theme tokens via CSS custom properties
- [ ] **Accessibility:** ARIA attributes, keyboard navigation, screen reader support
- [ ] **TypeScript:** Complete prop interfaces with proper types
- [ ] **Testing:** Unit tests, accessibility tests, and visual regression tests
- [ ] **Performance:** Component is memoized if needed, no unnecessary re-renders
- [ ] **Documentation:** Clear JSDoc comments for all public APIs
- [ ] **Responsive:** Component works across all breakpoints
- [ ] **Browser Support:** Tested in all supported browsers
- [ ] **Bundle Impact:** Tree-shakeable exports, minimal bundle size increase

### Design System Consistency Checks
- [ ] **Variant Naming:** Consistent with other similar components
- [ ] **Color Mapping:** Uses semantic color names (primary, error, etc.)
- [ ] **Size Scale:** Follows established size conventions
- [ ] **Spacing:** Uses theme spacing multipliers
- [ ] **Typography:** Uses theme typography variants

---

*This document covers only UI library-specific rules. For universal coding standards, refer to the [Global Code Quality Rules](../../Code%20Quality%20Rules.md).*
