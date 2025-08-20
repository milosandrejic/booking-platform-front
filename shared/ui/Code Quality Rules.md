# shared/ui — Code Quality Rules (React + Typescript + Sass)

*A short, enforceable checklist for the **`shared/ui`** design system.*

---

## 1) Scope & Goals

* **Scope:** Only `shared/ui` (React components + Sass styles + Typescript).
* **Goals:** Simple, consistent, easy to maintain.

---

## 2) Project Structure (per component)

```
shared/ui/
  button/
    Button.tsx
    _button.scss
    Button.stories.tsx
```

* One React file + one SCSS file and Storybook story per component (split only if clearly needed).
* Components should be using **named exports** instead of default.

---

## 3) React Coding Style

* **Ternary operator for rendering in returned JSX** is generally not allowed — use early returns or guard rendering with `&&`. **Exception:** Allowed if the component has **no props** or **only one prop**.
* **Conditional rendering formatting:**

  ```jsx
  {
    condition &&
    <Component
      propA="value"
      propB="value"
    />
  }
  ```

  * Opening brace on a new line.
  * Condition on its own line.
  * `&&` followed by a new line with the component.
  * Closing brace on its own line.
  * This rule applies to **all conditional rendering** — including inside loops, fragments, and wrappers.
* **Multiline JSX formatting** when there are 2+ props or children.
* **Rendering in loops** must follow the same formatting rules above.
* Braces for JSX blocks must always open and close **in-line** with the surrounding code.
* Prefer **early returns** over nested conditionals.
* Keep components **pure** (no side effects in render). Effects only inside hooks.
* Keep components simple — no unnecessary complexity unless explicitly requested.

### Examples

* ✅ Allowed (guard):

```jsx
if (!isReady) return null;
return (
  <div>
    {
      condition &&
      <Component />
    }
  </div>
);
```

* ✅ Allowed (simple ternary with no/one prop):

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

* ❌ Not allowed (multiple props in JSX without multiline):

```jsx
return <Component propA={a} propB={b} />;
```

**Multiline JSX formatting** examples:

```jsx
<div
  className="someClass"
  style={{
    ...props
  }}
>
  text
</div>
```

```jsx
<Button
  size="md"
  variant="primary"
  onClick={handleClick}
/>
```

**Loop rendering format:**

```jsx
{
  items.map(item =>
    <Component
      key={item.id}
      propA={item.a}
      propB={item.b}
    />
  )
}
```

### Conditional Rendering Spacing Rule

- **Opening curly brace** `{` is always on its own line.  
- **Condition** on its own line, followed by `&&` on the same line.  
- **Component** on the next line.  
- **Closing curly brace** `}` on its own line.  
- **Empty line outside braces** if the block is **not** the first or last child inside its parent.  
- **No empty line outside braces** if it’s the first or last child.  

✅ **Example — first child (no empty line above, but empty line below because we have tag)**  
```jsx
<div>
  {
    condition &&
    <Component />
  }

  <div>Some text</div>
</div>
```

#### Other spacing rules
- empty line above return unles function is not a 
* ✅ Allowed:
```
    const func = (params) => {
        -- other code

        return someValue;
    }
```

❌ Not allowed
```
    const func = (params) => {
        -- other code
        return someValue;
    }
```

- if condition spacing

* ✅ Allowed:
```
  const selectedLabels = useMemo(() => {
    const getLabelByValue = (val) => {
      const opt = normalizedOptions.find(o => o.value === val);
      return opt ? opt.label : "";
    };

    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue : [];

      return arr.map(getLabelByValue).filter(Boolean);
    }

    return selectedValue != null ? getLabelByValue(selectedValue) : "";
  }, [multiple, selectedValue, normalizedOptions]);
```

* ✅ Allowed:
when function is staring with if condition no empty line is required above if
```
  const selectedLabels = useMemo(() => {
    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue : [];
      
      return arr.map(getLabelByValue).filter(Boolean);
    }

    return selectedValue != null ? getLabelByValue(selectedValue) : "";
  }, [multiple, selectedValue, normalizedOptions]);
```

❌ Not allowed
```
  const selectedLabels = useMemo(() => {
    const getLabelByValue = (val) => {
      const opt = normalizedOptions.find(o => o.value === val);
      return opt ? opt.label : "";
    };
    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue : [];
      return arr.map(getLabelByValue).filter(Boolean);
    }
    return selectedValue != null ? getLabelByValue(selectedValue) : "";
  }, [multiple, selectedValue, normalizedOptions]);```
```
---

## 4) Components

* Each component must:

  * Have a **clear purpose** (avoid multi-responsibility components).
  * Provide **basic variants** (similar to Material UI: size, variant, state).
  * Include **default props** for predictable behavior.
  * Keep **logic and presentation separate** (hooks vs. UI).
* Props:

  * Boolean props should start with `is` or `has`.
  * Enum-like props should be restricted to known values.
---

## 5) Comments in Code

* Write comments only when necessary to explain **why**, not **what**.
* Use **inline comments** sparingly for complex logic.
* Use **block comments** above significant code sections or functions.
* Keep comments **up to date**; outdated comments must be removed.
* Avoid redundant comments for self-explanatory JSX or Sass.

---

## 6) Sass Rules

* **BEM** naming: `.btn`, `.btn__icon`, `.btn--primary`.
* **Max nesting:** 2 levels.
* **Hex colors:** always 6-digit and lowercase (e.g., `#ffffff`, not `#fff`).
* Use **CSS variables / tokens** where available; avoid hardcoded colors/spacing.
* No `@extend` across components; prefer mixins or utilities.
* Component SCSS ≤ \~150 lines (justify if larger).

---

## 7) Storybook Stories — Good Practices

* Each component must have a `.stories.jsx` file in the same folder.
* **Use named exports** for stories; the default export defines metadata.
* Always include:

  * `title` (follows folder/component path)
  * `component` (the React component)
  * `args` with default prop values
  * `argTypes` for controls
* Provide at least:

  * **Default** story
  * **Variants** story
  * **Edge cases** story
* Use **args** instead of hardcoding props in JSX.

---

## 8) Linting & Formatting

* **Follow the shared `eslint.config.js` rules strictly**.
* **Prettier** for consistent formatting.
* **Stylelint** with `stylelint-config-standard-scss`; set `max-nesting-depth: 2` and BEM class pattern.

---

## 9) Example: Button (minimal)

```jsx
// Button.jsx
import './_button.scss';

/**
 * A theme-aware button used for primary actions.
 * @param {object} props
 * @param {React.ReactNode} props.children - Button label/content.
 * @param {('primary'|'secondary'|'text')} [props.variant='primary'] - Visual style.
 * @param {boolean} [props.disabled=false] - Disable interactions.
 * @param {() => void} [props.onClick] - Click handler.
 */
export function Button({ children, variant = 'primary', disabled, onClick }) {
  if (!children) return null;

  return (
    <button
      className={`btn btn--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

```scss
/* _button.scss */
.btn { display:inline-flex; align-items:center; gap:.5rem; }
.btn--primary { /* use tokens/variables here */ }
```
