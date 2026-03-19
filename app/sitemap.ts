import type { MetadataRoute } from "next";

const SITE_URL = "https://vaultedworth.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/blog",
    "/blog/private-net-worth-tracker",
    "/blog/net-worth-tracker-without-plaid",
    "/blog/offline-net-worth-tracker",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-03-19T14:30:00Z"),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
