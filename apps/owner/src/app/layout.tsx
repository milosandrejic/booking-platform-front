import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
