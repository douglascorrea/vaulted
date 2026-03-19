import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Vaulted",
  description:
    "Articles about private finance tracking, net worth, and building wealth without giving away your data.",
};

const posts = [
  {
    slug: "local-first-personal-finance",
    title: "Why Local-First Personal Finance Software Makes Sense",
    date: "March 19, 2026",
    summary:
      "For personal finance, local-first should be the default. Your net worth data belongs on your device, not someone else's server.",
  },
  {
    slug: "manual-net-worth-tracking",
    title: "Manual Net Worth Tracking Beats Bank Sync for Most People",
    date: "March 19, 2026",
    summary:
      "Automatic sync sounds convenient, but monthly manual tracking is often simpler, cleaner, and much more private.",
  },
  {
    slug: "private-net-worth-tracker",
    title: "Best Private Net Worth Tracker in 2026 (No Bank Login Required)",
    date: "March 19, 2026",
    summary:
      "Comparing net worth trackers on privacy: no account, no bank login, no server, open source. Where each tool stands.",
  },
  {
    slug: "net-worth-tracker-without-plaid",
    title: "Net Worth Tracker Without Plaid — Why Manual Entry Wins on Privacy",
    date: "March 19, 2026",
    summary:
      "Why you don't need Plaid to track your net worth. Manual entry takes 2 minutes/month and keeps your bank credentials private.",
  },
  {
    slug: "offline-net-worth-tracker",
    title: "Offline Net Worth Tracker — Track Your Wealth Without Internet",
    date: "March 19, 2026",
    summary:
      "A PWA that works without internet. Install it, go offline, and your net worth data is still right there.",
  },
  {
    slug: "vaulted-vs-monarch-money",
    title: "Vaulted vs Monarch Money — Privacy Comparison 2026",
    date: "March 19, 2026",
    summary:
      "Monarch Money costs $14.99/mo and requires your bank login. Vaulted is free, open source, and never touches your bank credentials.",
  },
  {
    slug: "vaulted-vs-mint",
    title: "Vaulted vs Mint — Why Mint Users Need a Private Alternative",
    date: "March 19, 2026",
    summary:
      "Mint shut down in 2024. Most replacements want your bank login and a monthly fee. Here's the free, private alternative for net worth tracking.",
  },
  {
    slug: "vaulted-vs-ynab",
    title: "Vaulted vs YNAB — Do You Need a $14/mo Budget App to Track Net Worth?",
    date: "March 19, 2026",
    summary:
      "YNAB is built for zero-based budgeting, not net worth tracking. Vaulted is free, private, and purpose-built for watching your wealth grow.",
  },
  {
    slug: "vaulted-vs-copilot-money",
    title: "Vaulted vs Copilot Money — Free vs $12/mo for Net Worth Tracking",
    date: "March 19, 2026",
    summary:
      "Copilot Money is iOS/Mac only and costs $12.99/month. Vaulted is free, works on any platform, and keeps your data local.",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#07110d] text-slate-100">
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          &larr; Back to Vaulted
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Blog
        </h1>

        <div className="mt-8 space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-white/8 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <p className="text-sm text-slate-400">{post.date}</p>
              <h2 className="mt-1 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{post.summary}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
