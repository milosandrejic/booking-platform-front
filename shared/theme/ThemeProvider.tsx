"use client";

import { createContext, useContext, type ReactNode } from "react";
import { merge } from "lodash";
import type { Theme } from "./types";
import { theme as defaultTheme } from "./theme";
import { CssBaseline } from "./CssBaseline";
import { useThemeVariables } from "./useThemeVariables";
import { useDefaultFont } from "./useDefaultFont";

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
  loadDefaultFont?: boolean | { url?: string; id?: string };
}

// React Context theme provider
export const ThemeProvider = ({
  children,
  theme,
  applyCssReset = true,
  loadDefaultFont = false
}: ThemeProviderProps) => {
  const themeValue = theme ? merge({}, defaultTheme, theme) : defaultTheme;
  
  // Inject CSS variables in the document head based on the theme
  useThemeVariables(themeValue);
  // Optionally load default font (Roboto via Google Fonts or custom URL)
  if (loadDefaultFont) {
    const { url, id } = typeof loadDefaultFont === "object" ? loadDefaultFont : {};

    useDefaultFont(themeValue.fontFamily, id, url);
  }
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {applyCssReset && <CssBaseline />}
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
