import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Vaulted",
  description:
    "Articles about private finance tracking, net worth, and building wealth without giving away your data.",
};

const posts = [
  {
    slug: "private-net-worth-tracker",
    title: "Best Private Net Worth Tracker in 2026 (No Bank Login Required)",
    date: "March 19, 2026",
    summary:
      "Comparing net worth trackers on privacy: no account, no bank login, no server, open source. Where each tool stands.",
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
