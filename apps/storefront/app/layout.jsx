import { ThemeProvider, createStyleRegistry, setGlobalRegistry, StylesInjector } from "@booking-platform-shared/theme";

const registry = createStyleRegistry({ key: "owner-sx" });
setGlobalRegistry(registry);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <StylesInjector />
      </head>
      <body>
        <ThemeProvider isSSR={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
