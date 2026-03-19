import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Local-First Personal Finance Software Makes Sense",
  description:
    "Local-first personal finance apps keep your data on your device instead of a company server. Here is why that matters for net worth tracking.",
  keywords: [
    "local first personal finance",
    "local first finance app",
    "privacy personal finance software",
    "offline finance app",
    "net worth tracker local first",
  ],
  openGraph: {
    title: "Why Local-First Personal Finance Software Makes Sense",
    description:
      "For personal finance, local-first is not a trendy architecture choice. It is the obvious one.",
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
            Why Local-First Personal Finance Software Makes Sense
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            For notes, tasks, and documents, local-first software is becoming more
            popular every year. But for personal finance, it should be the default.
          </p>

          <p className="leading-relaxed text-slate-300">
            Your finances are among the most sensitive data you have. Income,
            savings, debt, investments, property, and spending patterns say a lot
            about your life. If a finance app stores that on someone else’s server,
            you are trusting a company, its vendors, its security practices, and
            its long-term incentives.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">What local-first means</h2>

          <p className="leading-relaxed text-slate-300">
            A local-first app stores your data on your own device first. The app can
            work without an internet connection. In the best implementations, there
            is no mandatory cloud account at all.
          </p>

          <p className="leading-relaxed text-slate-300">
            For a net worth tracker, that is ideal. You only need a local database,
            a good interface, and reliable import/export. You do not need a backend
            just to add up assets and liabilities.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Benefits of local-first finance tools</h2>

          <ul className="space-y-2 text-slate-300">
            <li><strong>Privacy by default.</strong> Your balances stay on your device.</li>
            <li><strong>Offline access.</strong> You can open the app even without internet.</li>
            <li><strong>No vendor lock-in.</strong> Export your data and move on any time.</li>
            <li><strong>Lower risk.</strong> No central database means no mass leak of user financial data.</li>
            <li><strong>Lower cost.</strong> Static hosting is cheap. That makes free products possible.</li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">The trade-offs</h2>

          <p className="leading-relaxed text-slate-300">
            Local-first is not magic. You have to think about backups. If you wipe
            your browser storage without exporting, you can lose your data. That is
            why export and import matter so much.
          </p>

          <p className="leading-relaxed text-slate-300">
            It also means fewer “smart” cloud features. But for many personal finance
            use cases, that is a feature, not a bug. Simplicity beats complexity.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Vaulted is local-first by design</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">Vaulted</Link>{" "}
            runs entirely in your browser as a PWA. It uses IndexedDB and local
            storage on your device. There is no account, no server, and no bank
            connection layer in the middle.
          </p>

          <p className="leading-relaxed text-slate-300">
            That makes it a better fit for people who care about long-term wealth
            tracking without turning their financial life into another SaaS account.
          </p>
        </article>
      </main>
    </div>
  );
}
