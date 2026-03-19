import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vaulted vs YNAB — Do You Need a $14/mo Budget App to Track Net Worth?",
  description:
    "YNAB costs $14.99/month and is built for zero-based budgeting, not net worth tracking. Vaulted is free, private, and purpose-built for net worth. Here's the honest comparison.",
  keywords: [
    "vaulted vs ynab",
    "ynab alternative",
    "ynab net worth tracker",
    "ynab too expensive",
    "free ynab alternative",
    "net worth tracker free",
    "ynab vs free app",
    "zero based budgeting vs net worth",
    "ynab privacy",
    "track net worth without ynab",
  ],
  alternates: {
    canonical: "https://vaultedworth.com/blog/vaulted-vs-ynab",
  },
  openGraph: {
    title: "Vaulted vs YNAB — Do You Need a $14/mo Budget App to Track Net Worth?",
    description:
      "YNAB is great for budgeting. Vaulted is purpose-built for net worth tracking and costs nothing. Know which one you actually need.",
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
            Vaulted vs YNAB — Do You Need a $14/mo Budget App to Track Net Worth?
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            YNAB (You Need A Budget) is one of the most beloved personal finance apps on the market. It has a passionate user base, a proven methodology (zero-based budgeting), and genuinely changes people&apos;s relationship with money. At $14.99/month, it&apos;s also one of the most expensive.
          </p>

          <p className="leading-relaxed text-slate-300">
            But YNAB is a <strong>budgeting app</strong>, not a net worth tracker. If what you actually want is to see your net worth trend over time — assets minus liabilities, month by month — you might be paying for a lot of functionality you don&apos;t need.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">What YNAB is actually for</h2>

          <p className="leading-relaxed text-slate-300">
            YNAB&apos;s philosophy is zero-based budgeting: every dollar gets a job. You assign your income to categories, track spending against those categories, and adjust as the month progresses. It&apos;s active, hands-on financial management.
          </p>

          <p className="leading-relaxed text-slate-300">
            YNAB does show account balances and has a net worth report, but that&apos;s secondary to its core purpose. The app is optimized for people who want to change their spending behavior, not just observe their wealth growing.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">The YNAB cost question</h2>

          <p className="leading-relaxed text-slate-300">
            YNAB fans will tell you that the app &ldquo;pays for itself&rdquo; by helping you cut spending. That&apos;s true for many people. If YNAB&apos;s budgeting methodology genuinely changes your financial behavior, $14.99/month is cheap.
          </p>

          <p className="leading-relaxed text-slate-300">
            But if you&apos;re already good at budgeting and just want to answer &ldquo;is my net worth going up?&rdquo; month over month, you&apos;re paying $180/year for a feature that a simpler (free) tool handles just as well.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            Vaulted vs YNAB — what each does
          </h2>

          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-2 pr-4 font-medium">Feature</th>
                  <th className="pb-2 pr-4 font-medium text-emerald-300">Vaulted</th>
                  <th className="pb-2 font-medium">YNAB</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Price</td>
                  <td className="py-2 pr-4 text-emerald-300">Free</td>
                  <td className="py-2">$14.99/month</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">No account required</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">No bank login required</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">Optional (but encouraged)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Data stays on device</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x274C; (cloud sync)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Open source</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Net worth tracking</td>
                  <td className="py-2 pr-4">&#x2705; (primary focus)</td>
                  <td className="py-2">&#x2705; (secondary feature)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Monthly snapshots &amp; trends</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Asset type breakdown</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">Limited</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Multi-currency support</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">Limited</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Zero-based budgeting</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x2705; (core feature)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Transaction categorization</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Works offline</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">Limited</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Data export</td>
                  <td className="py-2 pr-4">&#x2705; (JSON)</td>
                  <td className="py-2">&#x2705; (CSV)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 text-2xl font-semibold">The honest answer: they&apos;re for different goals</h2>

          <p className="leading-relaxed text-slate-300">
            YNAB is for people who want to actively manage their budget, reduce debt, and change their spending behavior. It&apos;s hands-on financial coaching software. If that&apos;s what you need, it&apos;s worth the price.
          </p>

          <p className="leading-relaxed text-slate-300">
            Vaulted is for people who want to watch their net worth grow. You already know how to manage your money — you just want a clean, private place to see the big picture. Enter your balances once a month, check the trend, move on.
          </p>

          <p className="leading-relaxed text-slate-300">
            If you&apos;re using YNAB mainly for the net worth report and finding the $14.99/month hard to justify, Vaulted is worth trying.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">What manual entry actually costs you</h2>

          <p className="leading-relaxed text-slate-300">
            Vaulted doesn&apos;t auto-sync with your bank. You enter balances manually. For net worth tracking — where you need a monthly snapshot, not a real-time feed — this means:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>Log in to each financial account (you do this anyway)</li>
            <li>Note the current balance</li>
            <li>Enter it in Vaulted</li>
            <li>Take a snapshot</li>
          </ul>

          <p className="leading-relaxed text-slate-300">
            Total time: <strong>2-5 minutes per month</strong>. That&apos;s the cost of keeping your financial data private and not paying a subscription fee.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Try it</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Try Vaulted free at vaultedworth.com
            </Link>{" "}
            — no account, no credit card, no bank login required. Or read the{" "}
            <a
              href="https://github.com/douglascorrea/vaulted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              source code on GitHub
            </a>
            .
          </p>
        </article>
      </main>
    </div>
  );
}
