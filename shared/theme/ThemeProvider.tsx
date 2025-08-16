"use client";

import { createContext, useContext, type ReactNode } from "react";
import { merge } from "lodash";
import type { Theme } from "./types";
import { theme as defaultTheme } from "./theme";
import { CssBaseline } from "./CssBaseline";

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
}

// React Context theme provider
export const ThemeProvider = ({ 
  children, 
  theme, 
  applyCssReset = true
}: ThemeProviderProps) => {
  const themeValue = theme ? merge({}, defaultTheme, theme) : defaultTheme;
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {applyCssReset && <CssBaseline />}
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
