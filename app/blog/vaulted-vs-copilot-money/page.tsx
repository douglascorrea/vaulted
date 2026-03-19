import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vaulted vs Copilot Money — Free vs $12/mo for Net Worth Tracking",
  description:
    "Copilot Money costs $12.99/month and is Apple-only. Vaulted is free, cross-platform, open source, and never requires your bank login. Here's the honest comparison for net worth tracking.",
  keywords: [
    "vaulted vs copilot money",
    "copilot money alternative",
    "copilot money free alternative",
    "copilot money android alternative",
    "copilot money privacy",
    "net worth tracker free",
    "copilot money open source alternative",
    "copilot money vs free app",
    "private net worth tracker",
    "track net worth without copilot",
  ],
  alternates: {
    canonical: "https://vaultedworth.com/blog/vaulted-vs-copilot-money",
  },
  openGraph: {
    title: "Vaulted vs Copilot Money — Free vs $12/mo for Net Worth Tracking",
    description:
      "Copilot Money is iOS/Mac only and costs $12.99/month. Vaulted is free, works everywhere, and keeps your financial data on your device.",
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
            Vaulted vs Copilot Money — Free vs $12/mo for Net Worth Tracking
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Copilot Money is one of the most beautifully designed personal finance apps available. It launched in 2020 and quickly became the favorite among Apple users who wanted a polished Mint replacement. The interface is genuinely excellent. The charts are clean. It&apos;s clearly built by people who care about design.
          </p>

          <p className="leading-relaxed text-slate-300">
            It also costs $12.99/month, requires an Apple device, needs your bank login, and stores your financial data on their servers. For people who want private net worth tracking on any platform — or who just don&apos;t want to pay a subscription — it&apos;s not the right fit.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">What Copilot does well</h2>

          <p className="leading-relaxed text-slate-300">
            Copilot is strong in the same areas as Monarch: automatic bank sync, smart transaction categorization, budget tracking, and net worth visualization. Where it stands out is design — the UI is one of the best in the category, with thoughtful interactions and a clear visual hierarchy.
          </p>

          <p className="leading-relaxed text-slate-300">
            If you&apos;re deep in the Apple ecosystem (iPhone + Mac), care about polish, and want a comprehensive financial management app, Copilot is a top contender.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Where it falls short</h2>

          <p className="leading-relaxed text-slate-300">
            The Apple-only limitation is a real constraint. Android users are locked out entirely. If you share finances with a partner on Android, you can&apos;t both use Copilot. And like all bank-sync apps, it requires Plaid access to your accounts and stores your financial data server-side.
          </p>

          <p className="leading-relaxed text-slate-300">
            The pricing has also increased over time — it started as a one-time purchase, then moved to subscription. At $12.99/month ($155.88/year), it&apos;s a meaningful ongoing cost for what is, for many people, a net worth snapshot tool.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            Vaulted vs Copilot Money — feature comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-2 pr-4 font-medium">Feature</th>
                  <th className="pb-2 pr-4 font-medium text-emerald-300">Vaulted</th>
                  <th className="pb-2 font-medium">Copilot Money</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Price</td>
                  <td className="py-2 pr-4 text-emerald-300">Free</td>
                  <td className="py-2">$12.99/month</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Platforms</td>
                  <td className="py-2 pr-4 text-emerald-300">All (PWA)</td>
                  <td className="py-2">iOS &amp; Mac only</td>
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
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Monthly snapshots &amp; trends</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">&#x2705;</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Multi-currency support</td>
                  <td className="py-2 pr-4">&#x2705;</td>
                  <td className="py-2">Limited (USD primary)</td>
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
                  <td className="py-2">Partial</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Android support</td>
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

          <h2 className="mt-10 text-2xl font-semibold">The platform problem</h2>

          <p className="leading-relaxed text-slate-300">
            Copilot being Apple-only is a real limitation that doesn&apos;t get enough attention. If you&apos;re tracking finances as a household and your partner is on Android, Copilot doesn&apos;t work. If you switch from iPhone to Android, you lose your Copilot history.
          </p>

          <p className="leading-relaxed text-slate-300">
            Vaulted is a Progressive Web App — it runs in any browser on any platform. Install it on iOS, Android, Windows, macOS, or Linux. Export your data as JSON and import it anywhere. Your financial history isn&apos;t tied to one vendor&apos;s ecosystem.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Who should use which</h2>

          <p className="leading-relaxed text-slate-300">
            <strong>Use Copilot if:</strong> you&apos;re all-in on Apple, want automatic bank sync, care deeply about UI polish, and want transaction categorization and budgeting alongside net worth tracking. It&apos;s genuinely the best-designed app in this category.
          </p>

          <p className="leading-relaxed text-slate-300">
            <strong>Use Vaulted if:</strong> you want free, private, cross-platform net worth tracking. You don&apos;t want to hand over bank credentials, pay a monthly fee, or be locked into Apple devices. Manual entry (2-5 minutes/month) is acceptable to you.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">How Vaulted works</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Vaulted
            </Link>{" "}
            runs entirely in your browser. Add your assets (cash, stocks, real estate, crypto, retirement accounts) and liabilities (mortgage, loans, credit cards). Your net worth is calculated automatically. Take a monthly snapshot to track your progress over time. Trend charts and asset breakdowns are built in.
          </p>

          <p className="leading-relaxed text-slate-300">
            Your data lives in IndexedDB in your browser. No server ever receives your balances. Export as JSON for backups. Import on any device. That&apos;s the full product.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Try it</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Try Vaulted free at vaultedworth.com
            </Link>{" "}
            — works on any device, no sign-up required. Check the{" "}
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
