import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import PostHogProvider from "@/components/PostHogProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://vaultedworth.com";
const TITLE = "Vaulted — private net worth tracker";
const DESCRIPTION =
  "Track your net worth without creating an account, linking your bank, or giving your data away. 100% local, no sign-up, works offline.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Vaulted",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Vaulted",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 900,
        alt: "Vaulted — privacy-first net worth tracker dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
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
    "no sign up",
    "no bank login",
    "personal finance",
    "net worth calculator",
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
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
