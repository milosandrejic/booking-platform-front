import { ThemeProvider, createStyleRegistry, setGlobalRegistry } from "@booking-platform-shared/theme";
import StylesInjector from "../components/StylesInjector";

const registry = createStyleRegistry({ key: "owner-sx" });
setGlobalRegistry(registry);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <StylesInjector />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
