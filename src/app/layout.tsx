import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classified",
  description: "Class Scheduling System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">

      <body>
        {children}
      </body>
    </html>
  );
}
