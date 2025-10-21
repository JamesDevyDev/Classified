import type { Metadata } from "next";
import "./globals.css";
import Footer from "./Footer";

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
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
