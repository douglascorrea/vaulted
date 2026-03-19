import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manual Net Worth Tracking Beats Bank Sync for Most People",
  description:
    "Automatic bank sync sounds convenient, but manual net worth tracking is often faster, simpler, and far more private. Here is why.",
  keywords: [
    "manual net worth tracking",
    "track net worth manually",
    "net worth tracker without bank sync",
    "private finance app",
    "local first finance",
  ],
  openGraph: {
    title: "Manual Net Worth Tracking Beats Bank Sync for Most People",
    description:
      "Why spending 2 minutes per month entering balances manually is often better than giving a third party your bank login.",
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
            Manual Net Worth Tracking Beats Bank Sync for Most People
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Personal finance apps love to sell one thing: convenience. Connect your
            bank, connect your brokerage, connect your credit cards, and watch
            the dashboard fill itself in.
          </p>

          <p className="leading-relaxed text-slate-300">
            But if your real goal is just to track your net worth, automatic sync
            is usually overkill. You do not need hundreds of daily account events.
            You need one number this month, one number next month, and a clean way
            to see whether you are moving in the right direction.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Why bank sync is overrated</h2>

          <ul className="space-y-2 text-slate-300">
            <li><strong>It adds privacy risk.</strong> You hand bank access to third parties.</li>
            <li><strong>It breaks often.</strong> Connections fail, MFA interrupts flows, accounts disconnect.</li>
            <li><strong>It creates noise.</strong> Net worth tracking does not require transaction-level detail.</li>
            <li><strong>It makes switching harder.</strong> Your workflow becomes tied to the aggregator.</li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">What manual tracking actually looks like</h2>

          <p className="leading-relaxed text-slate-300">
            Once a month, open your bank and investment accounts, type in the current
            balances, and save a snapshot. That is it. For most people, it takes
            two to five minutes.
          </p>

          <p className="leading-relaxed text-slate-300">
            In return, you get a cleaner habit. You look at the big picture instead
            of obsessing over every daily fluctuation. You focus on savings rate,
            debt payoff, and asset growth.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Who manual tracking is perfect for</h2>

          <ul className="space-y-2 text-slate-300">
            <li>People who update their finances monthly, not daily</li>
            <li>Privacy-conscious users who do not want Plaid-style connections</li>
            <li>Anyone who only cares about net worth, not budgeting workflows</li>
            <li>People who want a simple tool instead of a financial super-app</li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">Where Vaulted fits</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">Vaulted</Link>{" "}
            is built for exactly this use case. No account. No bank sync. No server.
            Your data stays on your device, and you still get a clean dashboard,
            charts, categories, and exports.
          </p>

          <p className="leading-relaxed text-slate-300">
            If all you want is to answer “am I richer than last month?” you do not
            need an app connected to your financial life. You need a good local
            tool and a monthly habit.
          </p>
        </article>
      </main>
    </div>
  );
}
