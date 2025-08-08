# shared/ui — Code Quality Rules (React + Sass)

*A short, enforceable checklist for the `shared/ui` design system.*

---

## 1) Scope & Goals

* **Scope:** Only `shared/ui` (React components + Sass styles).
* **Goals:** Simple, consistent, easy to maintain.

---

## 2) Project Structure (per component)

```
shared/ui/
  button/
    Button.jsx
    _button.scss
    Button.stories.jsx
```

* One React file + one SCSS file and Storybook story per component (split only if clearly needed).
* Components should be using **named exports** instead of default.

---

## 3) React Coding Style

* **Ternary operator for rendering in returned JSX** is generally not allowed — use early returns or guard rendering with `&&`.
  **Exception:** Allowed if the component has **no props** or **only one prop**.

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

* **Multiline JSX formatting** when there are 2+ props or children:

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

  Same rule for React components:

  ```jsx
  <Button
    size="md"
    variant="primary"
    onClick={handleClick}
  />
  ```

* **Rendering in loops** must follow the same multiline rule, with the opening curly brace on a new line, no parentheses wrapping the JSX, and the closing curly brace on its own line:

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

* Prefer **early returns** over nested conditionals.

* Keep components **pure** (no side effects in render). Effects only inside hooks.

* Keep components simple — no unnecessary complexity unless explicitly requested.

* Document props and usage with JSDoc comments above the component.

---

## 4) Sass Rules

* **BEM** naming: `.btn`, `.btn__icon`, `.btn--primary`.
* **Max nesting:** 2 levels.
* Use **CSS variables / tokens** where available; avoid hardcoded colors/spacing.
* No `@extend` across components; prefer mixins or utilities.
* Component SCSS ≤ \~150 lines (justify if larger).

---

## 6) Linting & Formatting

* **Follow the shared `eslint.config.js` rules strictly** for linting and formatting.
* **Stylelint** with `stylelint-config-standard-scss`; set `max-nesting-depth: 2` and BEM class pattern.

---

## 7) Example: Button (minimal)

```jsx
// Button.jsx
import React from 'react';
import './_button.scss';

/**
 * A theme-aware, button used for primary actions.
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
