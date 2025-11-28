import { createTheme, PaletteMode } from "@mui/material/styles";

// Custom blue palette
const primaryBlue = "#3498db";
const complementaryOrange = "#e67e22";

// Generate palette variations
const createPalette = (mode: PaletteMode) => {
  const isLight = mode === "light";

  return {
    mode,
    primary: {
      main: primaryBlue,
      light: "#5dade2",
      dark: "#2980b9",
      contrastText: "#ffffff",
    },
    secondary: {
      main: complementaryOrange,
      light: "#f39c12",
      dark: "#d35400",
      contrastText: "#ffffff",
    },
    background: {
      default: isLight ? "#fafafa" : "#121212",
      paper: isLight ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: isLight ? "#2c3e50" : "#ecf0f1",
      secondary: isLight ? "#7f8c8d" : "#bdc3c7",
    },
    divider: isLight ? "#ecf0f1" : "#34495e",
    grey: {
      50: "#f8f9fa",
      100: "#ecf0f1",
      200: "#bdc3c7",
      300: "#95a5a6",
      400: "#7f8c8d",
      500: "#34495e",
      600: "#2c3e50",
      700: "#2c3e50",
      800: "#1a252f",
      900: "#0d1117",
    },
  };
};

// Create theme function
export function createCustomTheme(mode: PaletteMode = "light") {
  return createTheme({
    palette: createPalette(mode),
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        fontSize: "2rem",
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.75rem",
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "10px 24px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(52, 152, 219, 0.15)",
            },
          },
          containedPrimary: {
            background: `linear-gradient(45deg, ${primaryBlue} 0%, #5dade2 100%)`,
            "&:hover": {
              background: `linear-gradient(45deg, #2980b9 0%, ${primaryBlue} 100%)`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });
}