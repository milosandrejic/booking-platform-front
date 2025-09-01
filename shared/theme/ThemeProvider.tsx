"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, type ReactNode } from "react";
import { merge } from "lodash";
import type { Theme } from "./types";
import { theme as defaultTheme } from "./theme";
import { CssBaseline } from "./CssBaseline";
import { useThemeVariables } from "./useThemeVariables";
import { useDefaultFont } from "./useDefaultFont";
import { getGlobalRegistry, createStyleRegistry, setGlobalRegistry } from "./styleRegistry";

// Create theme context
const ThemeContext = createContext<Theme>(defaultTheme);

// Hook to use theme in components
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: Partial<Theme>;
  applyCssReset?: boolean;
  disableDefaultFont?: boolean;
  injectCssVars?: boolean;
  isSSR?: boolean;
}

// CSR Style Injector Component
function CSRStyleInjector() {
  useLayoutEffect(() => {
    const registry = getGlobalRegistry();
    if (!registry) return;

    const css = registry.getStyles();
    if (css) {
      // Remove existing CSR style tag if it exists
      const existing = document.getElementById('sx-csr-styles');
      if (existing) {
        existing.remove();
      }

      // Create new style tag with all collected styles
      const style = document.createElement('style');
      style.id = 'sx-csr-styles';
      style.textContent = css;
      document.head.appendChild(style);
      
      // Clear registry after injection
      registry.flush();
    }
  });

  return null;
}

// React Context theme provider
export const ThemeProvider = ({
  children,
  theme,
  applyCssReset = true,
  disableDefaultFont = false,
  injectCssVars = false,
  isSSR = false
}: ThemeProviderProps) => {
  const themeValue = theme ? merge({}, defaultTheme, theme) : defaultTheme;

  // Create CSR registry if not SSR and none exists
  useEffect(() => {
    if (!isSSR && !getGlobalRegistry()) {
      const registry = createStyleRegistry({ key: "csr-sx" });
      setGlobalRegistry(registry);
    }
  }, [isSSR]);

  // Inject CSS variables client-side if requested (for CSR apps)
  if (!isSSR) {
    useThemeVariables(themeValue);
  }
  
  // Load default font unless disabled
  if (!disableDefaultFont) {
    useDefaultFont(themeValue.fontFamily);
  }
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {/* Only inject CSR styles if not SSR */}
      {!isSSR && <CSRStyleInjector />}
      {applyCssReset && <CssBaseline />}
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
