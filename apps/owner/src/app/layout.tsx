import type { Metadata } from "next";

import { ThemeProvider } from "@/theme";

export const metadata: Metadata = {
  title: "Owner - Booking Platform",
  description: "Booking Platform Owner Dashboard",
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
}
