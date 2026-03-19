import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Net Worth Tracker Without Plaid — Why Manual Entry Wins on Privacy",
  description:
    "Why you don't need Plaid to track your net worth. Compare Plaid-based trackers vs local-first alternatives like Vaulted that keep your bank credentials private.",
  keywords: [
    "net worth tracker without plaid",
    "no plaid finance app",
    "plaid alternative",
    "track net worth without bank login",
    "privacy net worth app",
    "manual net worth tracker",
    "net worth tracker no bank access",
  ],
  alternates: {
    canonical: "https://vaultedworth.com/blog/net-worth-tracker-without-plaid",
  },
  openGraph: {
    title: "Net Worth Tracker Without Plaid — Why Manual Entry Wins on Privacy",
    description:
      "You don't need to share your bank login to track your net worth. Here's why manual entry is the privacy-first choice.",
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
            Net Worth Tracker Without Plaid — Why Manual Entry Wins on Privacy
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            If you&apos;ve ever signed up for a finance app, you&apos;ve probably been asked to
            &ldquo;link your accounts.&rdquo; Behind that button is usually{" "}
            <strong>Plaid</strong> — a service that connects to your bank using your credentials
            and pulls transaction data on your behalf.
          </p>

          <p className="leading-relaxed text-slate-300">
            Plaid is convenient. It&apos;s also a third party that now has access to your bank
            login, your transaction history, your account balances, and your spending patterns.
            For budgeting apps that need daily transaction data, maybe that&apos;s worth the
            trade-off. But for <strong>net worth tracking</strong> — where you&apos;re updating
            numbers once a month — do you really need to give away that access?
          </p>

          <h2 className="mt-10 text-2xl font-semibold">What Plaid actually does</h2>

          <p className="leading-relaxed text-slate-300">
            Plaid acts as a middleman between you and your bank. When you &ldquo;link&rdquo; an
            account in Monarch Money, Copilot, or the now-defunct Mint, Plaid stores a token
            that lets it pull your data on an ongoing basis. This means:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>A third party has persistent access to your financial accounts</li>
            <li>Your transaction data flows through Plaid&apos;s servers</li>
            <li>If Plaid is breached, your financial data is exposed</li>
            <li>
              You can&apos;t verify what data is being collected or how it&apos;s used
              (Plaid has settled lawsuits over data collection practices)
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">
            The case for manual entry
          </h2>

          <p className="leading-relaxed text-slate-300">
            Net worth tracking is fundamentally different from expense tracking. You don&apos;t
            need real-time transaction feeds. You need a monthly snapshot of your balances:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>
              <strong>Checking & savings:</strong> log in to your bank, note the balance
            </li>
            <li>
              <strong>Investments:</strong> check your brokerage, note the total
            </li>
            <li>
              <strong>Real estate:</strong> update your estimate quarterly
            </li>
            <li>
              <strong>Debts:</strong> check your loan balances
            </li>
          </ul>

          <p className="leading-relaxed text-slate-300">
            Total time: <strong>2-5 minutes per month</strong>. That&apos;s the entire cost of
            not sharing your bank credentials with a third party.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            Trackers that don&apos;t use Plaid
          </h2>

          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-2 pr-4 font-medium">Tool</th>
                  <th className="pb-2 pr-4 font-medium">No Plaid</th>
                  <th className="pb-2 pr-4 font-medium">No server</th>
                  <th className="pb-2 pr-4 font-medium">Open source</th>
                  <th className="pb-2 font-medium">Free</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-emerald-300">Vaulted</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Local spreadsheet</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">N/A</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Firefly III</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">Self-host</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google Sheets</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 text-2xl font-semibold">
            How Vaulted works without Plaid
          </h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Vaulted
            </Link>{" "}
            takes the manual-entry approach and wraps it in a clean UI with trend charts,
            asset breakdowns, monthly snapshots, and multi-currency support. Your data is
            stored in IndexedDB inside your browser. No server ever sees your balances.
          </p>

          <p className="leading-relaxed text-slate-300">
            You get the visualization and tracking benefits of a finance app without the
            privacy costs of Plaid. Export your data as JSON anytime. Import it on another
            device. That&apos;s it.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Try it</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Try Vaulted at vaultedworth.com
            </Link>{" "}
            — free, open source, no sign-up required. Or check the{" "}
            <a
              href="https://github.com/douglascorrea/vaulted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              source code
            </a>
            .
          </p>
        </article>
      </main>
    </div>
  );
}
