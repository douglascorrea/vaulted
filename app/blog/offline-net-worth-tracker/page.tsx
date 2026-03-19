import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline Net Worth Tracker — Track Your Wealth Without Internet",
  description:
    "Need a net worth tracker that works offline? Vaulted is a free PWA that stores everything locally in your browser — no internet required after first load.",
  keywords: [
    "offline net worth tracker",
    "net worth tracker offline",
    "local net worth tracker",
    "net worth app no internet",
    "pwa finance app",
    "offline finance tracker",
    "local-first finance app",
    "browser-based net worth tracker",
  ],
  alternates: {
    canonical: "https://vaultedworth.com/blog/offline-net-worth-tracker",
  },
  openGraph: {
    title: "Offline Net Worth Tracker — Track Your Wealth Without Internet",
    description:
      "A net worth tracker that works without internet. Install it as a PWA and track your finances anywhere.",
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
            Offline Net Worth Tracker — Track Your Wealth Without Internet
          </h1>

          <p className="mt-2 text-sm text-slate-400">Published March 19, 2026</p>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Most finance apps stop working the moment you lose your internet connection.
            Monarch Money, YNAB, Copilot — they all require a live connection to their
            servers. Your financial data lives on their infrastructure, not yours.
          </p>

          <p className="leading-relaxed text-slate-300">
            But what if you want to update your net worth on a flight? At a cabin with
            spotty WiFi? Or simply prefer that your financial data doesn&apos;t transit
            through someone else&apos;s servers?
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            What &ldquo;offline-first&rdquo; means
          </h2>

          <p className="leading-relaxed text-slate-300">
            An offline-first app is designed to work without a network connection as
            its <em>default</em> state. The internet is optional, not required. This
            means:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>
              <strong>Data storage is local.</strong> Your numbers live on your
              device, not on a remote server.
            </li>
            <li>
              <strong>The app loads from cache.</strong> After the first visit, a
              service worker serves the app from your browser cache — no network
              needed.
            </li>
            <li>
              <strong>No sync failures.</strong> There&apos;s no server to be
              down, no API to timeout, no sync conflict to resolve.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">
            Why this matters for net worth tracking
          </h2>

          <p className="leading-relaxed text-slate-300">
            Net worth tracking is a monthly ritual for most people. You sit down, check
            your account balances, and update your tracker. This is the perfect use case
            for offline-first because:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>You don&apos;t need real-time data — monthly snapshots are enough</li>
            <li>
              The data set is small — a few dozen entries at most, easily stored in
              your browser
            </li>
            <li>
              Privacy is paramount — net worth data is among the most sensitive
              financial information you have
            </li>
            <li>
              You want it to &ldquo;just work&rdquo; — no login, no loading
              spinner, no &ldquo;server unavailable&rdquo;
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">
            How Vaulted works offline
          </h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Vaulted
            </Link>{" "}
            is a Progressive Web App (PWA) built as a static Next.js export. Here&apos;s
            what happens technically:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>
              <strong>First visit:</strong> the app downloads and a service worker
              caches all assets (HTML, CSS, JS, icons)
            </li>
            <li>
              <strong>Subsequent visits:</strong> the service worker serves the app
              from cache — zero network requests needed
            </li>
            <li>
              <strong>Data persistence:</strong> your entries and snapshots are
              stored in IndexedDB (primary) with a localStorage fallback
            </li>
            <li>
              <strong>Install as app:</strong> on mobile or desktop, you can
              &ldquo;Add to Home Screen&rdquo; and it runs like a native app
            </li>
          </ul>

          <p className="leading-relaxed text-slate-300">
            The entire app is about 200KB. Once cached, it loads instantly.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            The backup question
          </h2>

          <p className="leading-relaxed text-slate-300">
            The obvious concern with local-only storage: what if you clear your browser
            data? Vaulted handles this in two ways:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li>
              <strong>IndexedDB is durable.</strong> Unlike cookies or localStorage,
              IndexedDB is not typically cleared when you &ldquo;clear browsing
              data&rdquo; in most browsers (unless you specifically choose to clear
              site data).
            </li>
            <li>
              <strong>Backup reminders.</strong> Vaulted tracks changes since your
              last export and nudges you to download a JSON backup. One click, and
              you have a portable file you can import anywhere.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">Try it</h2>

          <p className="leading-relaxed text-slate-300">
            <Link href="/" className="text-emerald-400 underline hover:text-emerald-300">
              Open Vaulted at vaultedworth.com
            </Link>
            , add a few entries, then turn off your WiFi and reload. It just works.
            Free, open source, no sign-up. Check the{" "}
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
