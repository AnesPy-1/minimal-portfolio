import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL("https://anespy.xyz");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "AnesPy | Portfolio for anespy.xyz",
    template: "%s | AnesPy",
  },
  description: "A minimal, motion-driven portfolio for anespy.xyz built with Next.js and Django.",
  applicationName: "AnesPy",
  authors: [{ name: "Anes", url: siteUrl }],
  creator: "Anes",
  publisher: "AnesPy",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "anespy",
    "anespy.xyz",
    "Anes",
    "Portfolio",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Django Developer",
    "Frontend Engineer",
    "Software Engineer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "anespy.xyz",
    title: "AnesPy | Portfolio for anespy.xyz",
    description: "A minimal, motion-driven portfolio for anespy.xyz built with Next.js and Django.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AnesPy portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnesPy | Portfolio for anespy.xyz",
    description: "A minimal, motion-driven portfolio for anespy.xyz built with Next.js and Django.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", type: "image/png" },
    ],
    shortcut: ["/icon"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
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
