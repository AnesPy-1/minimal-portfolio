import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnesPy | Portfolio for anespy.xyz",
  description: "A minimal, motion-driven portfolio for anespy.xyz built with Next.js and Django.",
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
