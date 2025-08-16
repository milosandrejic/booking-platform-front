# Theme System

A modern, type-safe design system with automated CSS generation.

## Overview

This theme system provides:
- **Design Tokens** - Single source of truth in `tokens.json`
- **TypeScript Types** - Full type safety for theme values
- **CSS Variables** - Automatically generated static CSS file
- **React Context** - Theme object available in components

## Usage

### 1. Setup Theme Provider

```tsx
import { ThemeProvider } from '@/shared/theme';

export default function App({ children }) {
  return (
    <ThemeProvider applyCssReset={true}>
      {children}
    </ThemeProvider>
  );
}
```

### 2. Import CSS Variables

```tsx
// In your app layout or main CSS file
import '@/shared/theme/dist/variables.css';
```

### 3. Use in Components

#### JavaScript/TypeScript
```tsx
import { useTheme } from '@/shared/theme';

export const Button = () => {
  const theme = useTheme();
  
  return (
    <button
      style={{
        backgroundColor: theme.color.primary.main,
        color: theme.color.primary.contrastText,
        padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
        borderRadius: theme.borderRadius.md,
      }}
    >
      Click me
    </button>
  );
};
```

#### CSS
```css
.button {
  background-color: var(--color-primary-main);
  color: var(--color-primary-contrast-text);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--border-radius-md);
}
```

### 4. Custom Theme Override

You can create custom themes by overriding specific parts of the default theme. The theme provider uses **deep merge** (lodash.merge) to combine your custom theme with the default theme:

```tsx
import { ThemeProvider } from '@/shared/theme';

// Custom theme with different primary and secondary colors
const customColors = {
  color: {
    primary: {
      main: "#ff6b35",     // Orange primary
      light: "#ff9563",
      dark: "#c53d10",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#6c5ce7",     // Purple secondary
      light: "#a29bfe",
      dark: "#5f3dc4",
      contrastText: "#ffffff"
    }
  }
};

export default function CustomApp({ children }) {
  return (
    <ThemeProvider theme={customColors}>
      {children}
    </ThemeProvider>
  );
}
```

> **Note**: Only the properties you specify will be overridden. All other theme values (spacing, typography, etc.) will remain from the default theme. No need for manual spreading!

#### Brand-specific Theme Example
```tsx
import { ThemeProvider } from '@/shared/theme';

// Brand colors with complete palette
const brandTheme = {
  color: {
    primary: {
      50: "#fff3e0",
      100: "#ffe0b2", 
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      main: "#ff9800",
      light: "#ffa726",
      dark: "#f57c00",
      contrastText: "#000000"
    },
    secondary: {
      50: "#e8f5e8",
      100: "#c8e6c8",
      200: "#a5d6a5", 
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      main: "#4caf50",
      light: "#66bb6a", 
      dark: "#388e3c",
      contrastText: "#ffffff"
    }
  }
};

export const BrandThemeProvider = ({ children }) => (
  <ThemeProvider theme={brandTheme}>
    {children}
  </ThemeProvider>
);
```

#### Dark Mode Theme Example
```tsx
const darkTheme = {
  color: {
    background: {
      default: "#121212",
      paper: "#1e1e1e",
      subtle: "#2a2a2a",
      hover: "#333333"
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
      disabled: "#666666",
      hint: "#888888"
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5", 
      800: "#424242",
      900: "#212121"
    }
  }
};

export const DarkThemeProvider = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    {children}
  </ThemeProvider>
);
```

## Development

### Scripts

- `pnpm run theme:build` - Build theme and generate CSS variables
- `pnpm run theme:watch` - Watch for changes and auto-rebuild

### File Structure

```
shared/theme/
├── tokens.json          # Design tokens (source of truth)
├── theme.ts            # TypeScript theme object
├── types.ts            # TypeScript type definitions
├── cssVariables.ts     # CSS generation utilities
├── ThemeProvider.tsx   # React context provider
├── CssBaseline.tsx     # CSS reset component
└── dist/
    └── variables.css   # Generated CSS variables (auto-generated)
```

## Design Tokens

All design values are defined in `tokens.json`:

```json
{
  "color": {
    "primary": {
      "50": "#e3f2fd",
      "500": "#2196f3",
      "main": "#2196f3"
    }
  },
  "spacing": {
    "0": "0px",
    "1": "4px",
    "2": "8px"
  }
}
```

## CSS Variables

Generated CSS variables follow the pattern:
- `--color-primary-main`
- `--color-primary-500`
- `--spacing-4`
- `--border-radius-md`
