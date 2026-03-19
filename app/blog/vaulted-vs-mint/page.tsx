import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vaulted vs Mint — Why Mint Users Need a Private Alternative (2026)",
  description:
    "Mint shut down in 2024. If you're looking for a Mint alternative that doesn't require bank login or subscriptions, Vaulted is a free, private, open-source net worth tracker.",
  keywords: [
    "mint alternative",
    "mint shut down alternative",
    "vaulted vs mint",
    "mint replacement app",
    "free mint alternative 2024",
    "net worth tracker after mint",
    "private mint alternative",
    "mint closed what now",
    "best mint replacement",
    "mint alternative no bank login",
  ],
  alternates: {
    canonical: "https://vaultedworth.com/blog/vaulted-vs-mint",
  },
  openGraph: {
    title: "Vaulted vs Mint — Why Mint Users Need a Private Alternative (2026)",
    description:
      "Mint is gone. Most replacements want your bank login and a monthly fee. Vaulted is free, private, and needs neither.",
    type: "article",
    publishedTime: "2026-03-19T00:00:00Z",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#07110d] text-slate-100">
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          &larr; Back to Blog
        </Link>

        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Vaulted vs Mint — Why Mint Users Need a Private Alternative
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Mint shut down on January 1, 2024. After 16 years as the go-to free personal finance app, Intuit killed it and pushed users toward Credit Karma. Millions of people who relied on Mint for budgeting and net worth tracking were left looking for an alternative.
          </p>

          <p className="leading-relaxed text-slate-300">
            The mainstream recommendation is Monarch Money (good, but $14.99/month) or Copilot (Apple-only, $12.99/month). Both require bank access. Neither is free. If you were using Mint specifically to track your net worth, you don&apos;t actually need any of that.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">What Mint was (and what it wasn&apos;t)</h2>

          <p className="leading-relaxed text-slate-300">
            Mint was free because Intuit monetized your data — showing you targeted financial product ads based on your spending patterns. You paid with your privacy, even if it didn&apos;t feel that way. When that model stopped being profitable enough, the product died.
          </p>

          <p className="leading-relaxed text-slate-300">
            Mint&apos;s net worth tracker was one of its best features: a simple dashboard showing your assets minus liabilities over time. It worked because Plaid pulled your balances automatically. But that convenience came with Plaid having persistent access to your bank accounts, Mint storing your data on Intuit servers, and Intuit using your financial profile for ad targeting.
          </p>

          <p className="leading-relaxed text-slate-300">
            Now that Mint is gone, the question is: what actually replaces it?
          </p>

          <h2 className="mt-10 text-2xl font-semibold">The honest landscape of Mint alternatives</h2>

          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-2 pr-4 font-medium">App</th>
                  <th className="pb-2 pr-4 font-medium">Cost</th>
                  <th className="pb-2 pr-4 font-medium">Bank login</th>
                  <th className="pb-2 pr-4 font-medium">Private</th>
                  <th className="pb-2 font-medium">Net worth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-emerald-300">Vaulted</td>
                  <td className="py-2 pr-4 text-emerald-300">Free</td>
                  <td className="py-2 pr-4">Not required</td>
                  <td className="py-2 pr-4">&#x2705; Local only</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Monarch Money</td>
                  <td className="py-2 pr-4">$14.99/mo</td>
                  <td className="py-2 pr-4">Required</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Copilot</td>
                  <td className="py-2 pr-4">$12.99/mo</td>
                  <td className="py-2 pr-4">Required</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">YNAB</td>
                  <td className="py-2 pr-4">$14.99/mo</td>
                  <td className="py-2 pr-4">Optional</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">Partial</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Credit Karma</td>
                  <td className="py-2 pr-4">Free</td>
                  <td className="py-2 pr-4">Required</td>
                  <td className="py-2 pr-4">&#x274C; Ad-supported</td>
                  <td className="py-2">Limited</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Spreadsheet</td>
                  <td className="py-2 pr-4">Free</td>
                  <td className="py-2 pr-4">Not required</td>
                  <td className="py-2 pr-4">Depends</td>
                  <td className="py-2">Manual</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 text-2xl font-semibold">
            What you actually need to replace Mint&apos;s net worth tracker
          </h2>

          <p className="leading-relaxed text-slate-300">
            If the part of Mint you actually used was the net worth dashboard — not the budget categories or transaction feed — you need something much simpler than what most Mint alternatives offer:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>A place to enter your asset and liability balances</li>
            <li>A chart showing your net worth over time</li>
            <li>Monthly snapshots so you can see your progress</li>
            <li>Asset breakdown by type (cash, investments, real estate, etc.)</li>
          </ul>

          <p className="leading-relaxed text-slate-300">
            That&apos;s it. You don&apos;t need daily transaction syncs for net worth tracking. You need to log in to your bank once a month, note the balance, and enter it. Takes 2-3 minutes.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            Why Vaulted is the best free Mint replacement for net worth
          </h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Vaulted
            </Link>{" "}
            does exactly what Mint&apos;s net worth tracker did — trend charts, asset/liability breakdown, monthly snapshots — without the Plaid dependency, subscription fee, or server-side data storage.
          </p>

          <ul className="space-y-2 text-slate-300">
            <li><strong>Free forever.</strong> No subscription, no freemium tier.</li>
            <li><strong>No bank login.</strong> You enter balances manually. 2-3 minutes per month.</li>
            <li><strong>No account needed.</strong> Open the app, start adding assets.</li>
            <li><strong>Local storage.</strong> Your data never leaves your device.</li>
            <li><strong>Open source.</strong> <a href="https://github.com/douglascorrea/vaulted" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Read the code</a> — no surprises.</li>
            <li><strong>Works offline.</strong> Install as a PWA, use it anywhere.</li>
            <li><strong>Multi-currency.</strong> USD, EUR, GBP, BRL, CAD, AUD, JPY.</li>
          </ul>

          <p className="leading-relaxed text-slate-300">
            The trade-off vs Mint: no automatic bank sync. You type numbers in manually. If you used Mint&apos;s budgeting and transaction categorization heavily, Vaulted won&apos;t replace that — Monarch Money or YNAB will serve you better. But for the net worth piece specifically, Vaulted is a cleaner and more private replacement.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Mint is gone — your data still matters</h2>

          <p className="leading-relaxed text-slate-300">
            Mint&apos;s shutdown is a good reminder that when you give a company persistent access to your financial accounts, you&apos;re depending on them to stay in business, stay secure, and keep your data private. Intuit killed Mint. Credit Karma is now pushing product ads to the same audience.
          </p>

          <p className="leading-relaxed text-slate-300">
            Vaulted can&apos;t shut down in a way that takes your data with it. Your data is on your device. Export a JSON backup. Use it on any browser. If vaultedworth.com ever disappears, you can run the open-source code yourself.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Try it</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Try Vaulted free at vaultedworth.com
            </Link>{" "}
            — no sign-up required. Or{" "}
            <a
              href="https://github.com/douglascorrea/vaulted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              inspect the source on GitHub
            </a>
            .
          </p>
        </article>
      </main>
    </div>
  );
}
