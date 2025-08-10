"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider.jsx";

// Global styles as a React component that injects CSS
export const GlobalStyle = () => {
  const theme = useTheme();

  useEffect(() => {
    // Create or update the global style element
    let styleElement = document.getElementById("booking-platform-global-styles");
    
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "booking-platform-global-styles";
      document.head.appendChild(styleElement);
    }

    const cssVars = {
      // simple, flat variables
      "--primary": theme.colors.primary.main,
      "--color-primary-dark": theme.colors.primary.dark,
      "--secondary": theme.colors.secondary.main,
      "--on-primary": theme.colors.primary.contrastText,
      "--color-error-main": theme.colors.error.main,
      "--background": theme.colors.background.paper,
      "--background-default": theme.colors.background.default,
      "--background-paper": theme.colors.background.paper,
      "--text-primary": theme.colors.text.primary,
      "--text-secondary": theme.colors.text.secondary,
      "--color-text-disabled": theme.colors.text.disabled,
      "--outline": theme.colors.border.main,
      "--border-main": theme.colors.border.main,
      // greys and utility colors frequently referenced
      "--color-grey-200": theme.colors.grey[200],
      "--color-grey-300": theme.colors.grey[300],
      "--color-primary-50": theme.colors.primary[50],
      
      // spacing scale (subset used by UI)
      "--spacing-0": "0",
      "--spacing-1": theme.spacing[1] || "0.25rem",
      "--spacing-2": theme.spacing[2] || "0.5rem",
      "--spacing-3": theme.spacing[3] || "0.75rem",
      "--spacing-4": theme.spacing[4] || "1rem",
      "--spacing-5": theme.spacing[5] || "1.25rem",
      "--spacing-6": theme.spacing[6] || "1.5rem",
      "--spacing-8": theme.spacing[8] || "2rem",
      
      // radii mapping to Tailwind-like keys
      "--border-radius-none": theme.borderRadius.none,
      "--border-radius-sm": theme.borderRadius.sm,
      "--border-radius-base": theme.borderRadius.base,
      "--border-radius-md": theme.borderRadius.md,
      "--border-radius-lg": theme.borderRadius.lg,
      "--border-radius-xl": theme.borderRadius.xl,
      "--border-radius-2xl": theme.borderRadius["2xl"],
      "--border-radius-3xl": theme.borderRadius["3xl"],
    };

    const varText = Object.entries(cssVars)
      .map(([k, v]) => `${k}: ${v};`)
      .join("\n        ");

    styleElement.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@` +
      `0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
      
      :root {
        ${varText}
      }

      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        padding: 0;
        font-family: ${theme.fontFamily};
        color: ${theme.colors.text.primary};
        background-color: ${theme.colors.background.default};
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      h1, h2, h3, h4, h5, h6, p {
        margin: 0;
      }
    `;

    // Cleanup function
    return () => {
      const element = document.getElementById("booking-platform-global-styles");
      if (element) {
        element.remove();
      }
    };
  }, [theme]);

  return null; // This component doesn't render anything visible
};

export default GlobalStyle;
