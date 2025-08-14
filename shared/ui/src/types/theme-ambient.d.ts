declare module "@booking-platform-shared/theme" {
  export const theme: {
    colors: Record<string, Record<string, string>>;
    typography: Record<string, Record<string, string | number>>;
    fontFamily: string;
    fontWeights: Record<string, string | number>;
    spacing: Record<string, string | number>;
    borderRadius: Record<string, string | number>;
    shadows: unknown;
    breakpoints: Record<string, string | number>;
  };

  export const colors: typeof theme.colors;
  export const typography: typeof theme.typography;
  export const spacing: typeof theme.spacing;
  export const borderRadius: typeof theme.borderRadius;
  export const fontWeights: typeof theme.fontWeights;
  export const breakpoints: typeof theme.breakpoints;

  const ThemeProvider: (props: any) => any;
  export default ThemeProvider;
  export const useTheme: () => any;
  export const GlobalStyle: any;
}
