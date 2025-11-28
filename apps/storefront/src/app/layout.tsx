import type { Metadata } from "next";

import { ThemeProvider } from "@/theme";

export const metadata: Metadata = {
  title: "Storefront - Booking Platform",
  description: "Booking Platform Storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
