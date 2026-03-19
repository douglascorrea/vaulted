import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Private Net Worth Tracker in 2026 (No Bank Login Required)",
  description:
    "Looking for a net worth tracker that doesn't require bank access or an account? Vaulted is a free, open-source, local-first net worth tracker that keeps your financial data on your device.",
  keywords: [
    "private net worth tracker",
    "net worth tracker no bank login",
    "net worth tracker without plaid",
    "offline net worth tracker",
    "local net worth tracker",
    "free net worth tracker",
    "privacy finance app",
    "mint alternative privacy",
    "net worth tracker no account",
  ],
  openGraph: {
    title: "Best Private Net Worth Tracker in 2026 (No Bank Login Required)",
    description:
      "Track your net worth without linking your bank or creating an account. Free, open source, works offline.",
    type: "article",
    publishedTime: "2026-03-19T00:00:00Z",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#07110d] text-slate-100">
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          &larr; Back to Vaulted
        </Link>

        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Best Private Net Worth Tracker in 2026 (No Bank Login Required)
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Published March 19, 2026
          </p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Most net worth trackers want your bank login. Mint did. Monarch
            does. Copilot does. They connect through Plaid or similar services,
            pulling your account balances automatically. Convenient, sure. But
            it means a third party has access to your financial data.
          </p>

          <p className="leading-relaxed text-slate-300">
            If you just want to answer &ldquo;am I richer than last
            month?&rdquo; without handing over your bank credentials, your
            options have been limited. Spreadsheets work, but they&apos;re not
            pretty and they don&apos;t give you trend charts.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            What makes a net worth tracker &ldquo;private&rdquo;?
          </h2>

          <p className="leading-relaxed text-slate-300">
            A truly private net worth tracker should meet these criteria:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>
              <strong>No account creation.</strong> If you need an email to
              sign up, that&apos;s already a data point you&apos;re giving
              away.
            </li>
            <li>
              <strong>No bank login.</strong> No Plaid, no Yodlee, no MX. You
              enter your numbers manually.
            </li>
            <li>
              <strong>No server.</strong> Your data should never leave your
              device. No cloud database, no API calls with your balances.
            </li>
            <li>
              <strong>No tracking.</strong> No analytics that tie your
              financial data to an identity. Pageview analytics are fine.
              Logging what you type into a finance app is not.
            </li>
            <li>
              <strong>Open source.</strong> You should be able to verify every
              claim above by reading the code.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">
            Comparing your options
          </h2>

          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-2 pr-4 font-medium">Tool</th>
                  <th className="pb-2 pr-4 font-medium">No account</th>
                  <th className="pb-2 pr-4 font-medium">No bank login</th>
                  <th className="pb-2 pr-4 font-medium">No server</th>
                  <th className="pb-2 pr-4 font-medium">Open source</th>
                  <th className="pb-2 font-medium">Free</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-emerald-300">
                    Vaulted
                  </td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Monarch Money</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Copilot Money</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Google Sheets</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Local spreadsheet</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2 pr-4">N/A</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 text-2xl font-semibold">
            How Vaulted works
          </h2>

          <p className="leading-relaxed text-slate-300">
            <Link
              href="/"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              Vaulted
            </Link>{" "}
            is a Progressive Web App (PWA) built with Next.js. When you open
            it, everything runs in your browser. Your data is stored in
            IndexedDB with a localStorage fallback. No server receives your
            balances. No API is called with your financial data.
          </p>

          <p className="leading-relaxed text-slate-300">You can:</p>

          <ul className="space-y-2 text-slate-300">
            <li>Add assets (cash, stocks, crypto, real estate, retirement accounts)</li>
            <li>Add liabilities (mortgage, student loans, credit cards, auto loans)</li>
            <li>See your net worth calculated automatically</li>
            <li>Take monthly snapshots to track your progress over time</li>
            <li>View trend charts and asset breakdowns</li>
            <li>Support for multiple currencies (USD, EUR, GBP, BRL, CAD, AUD, JPY)</li>
            <li>Export your data as JSON for backups</li>
            <li>Import from CSV if you&apos;re coming from a spreadsheet</li>
            <li>Install it on your phone or desktop (works offline)</li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">The trade-off</h2>

          <p className="leading-relaxed text-slate-300">
            No automatic bank sync. You type your balances manually. For most
            people tracking net worth, this means spending about 2 minutes per
            month updating their numbers. That&apos;s the trade-off for
            knowing that nobody else has access to your financial data.
          </p>

          <p className="leading-relaxed text-slate-300">
            Since your data is stored locally, clearing your browser data will
            erase your vault. Vaulted reminds you to export backups
            regularly. You can also import those backups on any device.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Try it</h2>

          <p className="leading-relaxed text-slate-300">
            Vaulted is free and open source.{" "}
            <Link
              href="/"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              Try it at vaultedworth.com
            </Link>{" "}
            or check out the{" "}
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
