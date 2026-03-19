import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vaulted vs Monarch Money — Privacy Comparison 2026",
  description:
    "Vaulted vs Monarch Money: which is better for private net worth tracking? Monarch requires a subscription and bank login. Vaulted is free, open source, and keeps your data on your device.",
  keywords: [
    "vaulted vs monarch money",
    "monarch money alternative",
    "monarch money privacy",
    "monarch money free alternative",
    "net worth tracker no subscription",
    "private net worth tracker",
    "monarch money no bank login",
    "net worth tracker open source",
    "monarch money vs free app",
  ],
  alternates: {
    canonical: "https://vaultedworth.com/blog/vaulted-vs-monarch-money",
  },
  openGraph: {
    title: "Vaulted vs Monarch Money — Privacy Comparison 2026",
    description:
      "Monarch Money costs $14.99/mo and requires your bank login. Vaulted is free, open source, and never touches your bank credentials.",
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
            Vaulted vs Monarch Money — Privacy Comparison 2026
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Monarch Money is the finance app most people switched to after Mint shut down. It&apos;s polished, well-designed, and handles budgeting and net worth in one place. It&apos;s also $14.99/month and requires you to connect your bank accounts through Plaid. If those two things don&apos;t bother you, Monarch is a solid product.
          </p>

          <p className="leading-relaxed text-slate-300">
            But if you&apos;re specifically trying to track your <strong>net worth</strong> — not your daily coffee spend — you might be paying for a lot of features you don&apos;t need, while handing over more access than necessary.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">What Monarch Money does well</h2>

          <p className="leading-relaxed text-slate-300">
            To be fair: Monarch is genuinely good. It syncs your bank accounts automatically, categorizes transactions, tracks budgets, shows net worth trends, and has a clean collaborative mode for couples. If you want a single app to manage your entire financial life with minimal manual work, Monarch is worth considering.
          </p>

          <p className="leading-relaxed text-slate-300">
            The automatic sync is the killer feature. Your balances update without you doing anything. For people who want real-time visibility into their finances, that&apos;s valuable.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Where the trade-offs hit</h2>

          <p className="leading-relaxed text-slate-300">
            Monarch&apos;s auto-sync model requires persistent access to your bank accounts via Plaid. That means:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>Plaid has a token allowing ongoing access to your financial accounts</li>
            <li>Your transaction history, account balances, and spending patterns flow through Plaid&apos;s servers</li>
            <li>Monarch&apos;s servers store your financial data to power the dashboard</li>
            <li>You&apos;re paying $14.99/month for this access indefinitely</li>
          </ul>

          <p className="leading-relaxed text-slate-300">
            For <strong>net worth tracking specifically</strong>, you only need a balance update once a month. You don&apos;t need daily transaction feeds. The privacy cost of persistent bank access is real; the benefit for net worth tracking is marginal.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            Vaulted vs Monarch Money — feature comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-2 pr-4 font-medium">Feature</th>
                  <th className="pb-2 pr-4 font-medium text-emerald-300">Vaulted</th>
                  <th className="pb-2 font-medium">Monarch Money</th>
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
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Data stays on your device</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Open source</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Net worth tracking</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Monthly snapshots &amp; trend charts</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Multi-currency support</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Auto bank sync</td>
                  <td className="py-2 pr-4">&#x274C; (manual)</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Budget &amp; transaction tracking</td>
                  <td className="py-2 pr-4">&#x274C;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Works offline</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x274C;</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Data export</td>
                  <td className="py-2 pr-4">&#x2705; (JSON)</td>
                  <td className="py-2">&#x2705; (CSV)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 text-2xl font-semibold">Who should use which</h2>

          <p className="leading-relaxed text-slate-300">
            <strong>Use Monarch if:</strong> you want to track your full financial life — budgets, spending categories, subscriptions — in one place and the subscription cost and privacy trade-off are acceptable. It&apos;s genuinely good software for that use case.
          </p>

          <p className="leading-relaxed text-slate-300">
            <strong>Use Vaulted if:</strong> you care specifically about net worth tracking and don&apos;t want to hand over bank credentials or pay a monthly fee. Spend 2-3 minutes per month updating your balances and you get trend charts, asset breakdowns, and a clean net worth history — with no one else having access to your financial data.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">How Vaulted works</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Vaulted
            </Link>{" "}
            is a Progressive Web App that runs entirely in your browser. Add your assets and liabilities, take a monthly snapshot, and watch your net worth trend over time. Your data is stored in IndexedDB — no server, no account, no subscription.
          </p>

          <p className="leading-relaxed text-slate-300">
            It installs on your phone or desktop and works offline. Export your data as JSON for backups. Import it on another device. That&apos;s the whole product.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Try it</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Try Vaulted free at vaultedworth.com
            </Link>{" "}
            — no sign-up, no credit card, no bank login. Or read the{" "}
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
