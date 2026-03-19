import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaulted — private net worth tracker",
  description:
    "Track your net worth without creating an account, linking your bank, or giving your data away.",
  applicationName: "Vaulted",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vaulted",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "net worth tracker",
    "privacy finance app",
    "offline finance app",
    "mint alternative",
    "local-first finance",
  ],
};

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
