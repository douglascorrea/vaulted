import type { Metadata } from "next";

const SITE_URL = "https://vaultedworth.com";
const TITLE = "Net Worth Percentile Calculator by Age (Fed SCF 2022)";
const DESCRIPTION =
  "Use this net worth percentile calculator to see where you rank by age. Compare your wealth to Federal Reserve SCF 2022 benchmarks and answer: am I rich for my age?";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "net worth percentile calculator",
    "net worth by age",
    "am i rich for my age",
    "net worth percentile by age",
    "wealth percentile calculator",
    "median net worth by age",
    "average net worth by age",
    "federal reserve scf 2022",
    "mint alternative",
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/net-worth-percentile`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/tools/net-worth-percentile`,
    siteName: "Vaulted",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 900,
        alt: "Net worth percentile calculator by age from Vaulted",
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
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
