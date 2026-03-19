"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const AGE_GROUPS = [
  {
    key: "under-35",
    label: "Under 35",
    p10: -28_000,
    p25: 5_000,
    p50: 39_000,
    p75: 131_000,
    p90: 367_000,
  },
  {
    key: "35-44",
    label: "35-44",
    p10: -14_000,
    p25: 36_000,
    p50: 135_000,
    p75: 377_000,
    p90: 972_000,
  },
  {
    key: "45-54",
    label: "45-54",
    p10: -4_000,
    p25: 57_000,
    p50: 247_000,
    p75: 727_000,
    p90: 1_800_000,
  },
  {
    key: "55-64",
    label: "55-64",
    p10: 3_000,
    p25: 68_000,
    p50: 364_000,
    p75: 1_100_000,
    p90: 2_700_000,
  },
  {
    key: "65-74",
    label: "65-74",
    p10: 31_000,
    p25: 115_000,
    p50: 410_000,
    p75: 1_000_000,
    p90: 2_600_000,
  },
  {
    key: "75-plus",
    label: "75+",
    p10: 26_000,
    p25: 91_000,
    p50: 335_000,
    p75: 825_000,
    p90: 1_900_000,
  },
] as const;

const COUNTRY_OPTIONS = [{ value: "US", label: "United States" }] as const;
const BAR_SEGMENTS = [
  { start: 0, end: 10, color: "bg-rose-500/80", label: "0-10th" },
  { start: 10, end: 25, color: "bg-orange-400/80", label: "10th-25th" },
  { start: 25, end: 50, color: "bg-amber-300/90", label: "25th-50th" },
  { start: 50, end: 75, color: "bg-lime-300/90", label: "50th-75th" },
  { start: 75, end: 90, color: "bg-emerald-400/90", label: "75th-90th" },
  { start: 90, end: 100, color: "bg-teal-300/90", label: "90th+" },
] as const;

type AgeGroup = (typeof AGE_GROUPS)[number];

function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

function formatCurrencyCompact(value: number): string {
  const absolute = Math.abs(value);

  if (absolute >= 1_000_000) {
    return `${value < 0 ? "-" : ""}$${(absolute / 1_000_000).toFixed(absolute >= 10_000_000 ? 0 : 1)}M`;
  }

  if (absolute >= 1_000) {
    return `${value < 0 ? "-" : ""}$${(absolute / 1_000).toFixed(absolute >= 100_000 ? 0 : 1)}k`;
  }

  return formatCurrency(value);
}

function formatOrdinal(value: number): string {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) return `${value}st`;
  if (mod10 === 2 && mod100 !== 12) return `${value}nd`;
  if (mod10 === 3 && mod100 !== 13) return `${value}rd`;
  return `${value}th`;
}

function estimatePercentile(netWorth: number, group: AgeGroup): number {
  const lowerStep = Math.max(group.p25 - group.p10, 1);
  const upperStep = Math.max(group.p90 - group.p75, 1);

  const anchors = [
    { percentile: 1, value: group.p10 - lowerStep },
    { percentile: 10, value: group.p10 },
    { percentile: 25, value: group.p25 },
    { percentile: 50, value: group.p50 },
    { percentile: 75, value: group.p75 },
    { percentile: 90, value: group.p90 },
    { percentile: 99, value: group.p90 + upperStep * 2.5 },
  ];

  if (netWorth <= anchors[0].value) {
    return 1;
  }

  if (netWorth >= anchors[anchors.length - 1].value) {
    return 99;
  }

  for (let index = 1; index < anchors.length; index += 1) {
    const lower = anchors[index - 1];
    const upper = anchors[index];

    if (netWorth <= upper.value) {
      const range = upper.value - lower.value || 1;
      const progress = (netWorth - lower.value) / range;
      const percentile = lower.percentile + progress * (upper.percentile - lower.percentile);
      return Math.max(1, Math.min(99, Math.round(percentile)));
    }
  }

  return 99;
}

function getPercentileCopy(percentile: number): string {
  if (percentile >= 90) {
    return "You are in the top 10% for your age group.";
  }

  if (percentile >= 75) {
    return "You are well above the typical net worth for your age.";
  }

  if (percentile >= 50) {
    return "You are above the median for your age group.";
  }

  if (percentile >= 25) {
    return "You are below the median, but ahead of a meaningful share of peers.";
  }

  return "You are early in the distribution for your age group, which gives you a clear benchmark to improve from.";
}

function PercentileBar({ group, netWorth, percentile }: { group: AgeGroup; netWorth: number; percentile: number }) {
  const clampedPercentile = Math.max(1, Math.min(99, percentile));
  const ticks = [
    { label: "10th", value: group.p10, position: 10 },
    { label: "25th", value: group.p25, position: 25 },
    { label: "50th", value: group.p50, position: 50 },
    { label: "75th", value: group.p75, position: 75 },
    { label: "90th", value: group.p90, position: 90 },
  ];

  return (
    <div className="mt-6">
      <div className="relative pt-12">
        <div className="flex h-5 overflow-hidden rounded-full border border-white/10 bg-white/5">
          {BAR_SEGMENTS.map((segment) => (
            <div
              key={segment.label}
              className={segment.color}
              style={{ width: `${segment.end - segment.start}%` }}
            />
          ))}
        </div>

        {ticks.map((tick) => (
          <div
            key={tick.label}
            className="absolute top-10 h-7 w-px bg-white/20"
            style={{ left: `${tick.position}%` }}
          />
        ))}

        <div
          className="absolute top-0 z-10 -translate-x-1/2 transition-all duration-500"
          style={{ left: `${clampedPercentile}%` }}
        >
          <div className="rounded-lg border border-emerald-400/40 bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg shadow-emerald-950/40">
            {formatCurrency(netWorth)}
          </div>
          <div className="mx-auto h-3 w-3 rotate-45 border-r border-b border-emerald-400/40 bg-emerald-500" />
          <div className="mx-auto mt-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-400 shadow-lg shadow-emerald-500/40" />
        </div>
      </div>

      <div className="relative mt-6 h-12">
        {ticks.map((tick) => (
          <div
            key={tick.label}
            className="absolute -translate-x-1/2 text-center"
            style={{ left: `${tick.position}%` }}
          >
            <div className="text-[11px] font-medium text-slate-300">{tick.label}</div>
            <div className="text-[11px] text-slate-500">{formatCurrencyCompact(tick.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NetWorthPercentilePage() {
  const [ageGroupKey, setAgeGroupKey] = useState<(typeof AGE_GROUPS)[number]["key"]>("under-35");
  const [netWorthInput, setNetWorthInput] = useState("");
  const [country, setCountry] = useState<(typeof COUNTRY_OPTIONS)[number]["value"]>("US");

  const selectedGroup = AGE_GROUPS.find((group) => group.key === ageGroupKey) ?? AGE_GROUPS[0];

  const result = useMemo(() => {
    if (netWorthInput.trim() === "") {
      return null;
    }

    const parsedValue = Number(netWorthInput);

    if (!Number.isFinite(parsedValue)) {
      return null;
    }

    const percentile = estimatePercentile(parsedValue, selectedGroup);

    return {
      group: selectedGroup,
      netWorth: parsedValue,
      percentile,
    };
  }, [netWorthInput, selectedGroup]);

  return (
    <div className="min-h-screen bg-[#07110d] text-slate-100">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          &larr; Back to Vaulted
        </Link>

        <section className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Net Worth Percentile Calculator
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-300">
            Find out where your net worth ranks compared to people your age. This calculator uses
            Federal Reserve Survey of Consumer Finances data, so you can answer the classic
            question: am I rich for my age?
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Source: Federal Reserve Survey of Consumer Finances, 2022
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="age-group"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Age group
              </label>
              <select
                id="age-group"
                value={ageGroupKey}
                onChange={(event) => setAgeGroupKey(event.target.value as (typeof AGE_GROUPS)[number]["key"])}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {AGE_GROUPS.map((group) => (
                  <option key={group.key} value={group.key} className="bg-slate-900 text-slate-100">
                    {group.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="net-worth"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Net worth
              </label>
              <input
                id="net-worth"
                type="number"
                inputMode="decimal"
                value={netWorthInput}
                onChange={(event) => setNetWorthInput(event.target.value)}
                placeholder="250000"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <p className="mt-1 text-xs text-slate-500">Assets minus liabilities. Negative values work too.</p>
            </div>

            <div>
              <label
                htmlFor="country"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(event) => setCountry(event.target.value as (typeof COUNTRY_OPTIONS)[number]["value"])}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-900 text-slate-100">
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">U.S. data only for now. More countries coming soon.</p>
            </div>
          </div>
        </section>

        {result ? (
          <>
            <section className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Your result</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                You are in the {formatOrdinal(result.percentile)} percentile for your age group.
              </h2>
              <p className="mt-3 max-w-2xl text-slate-300">{getPercentileCopy(result.percentile)}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-slate-400">Age group</p>
                  <p className="mt-1 text-lg font-medium text-slate-100">{result.group.label}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-slate-400">Your net worth</p>
                  <p className="mt-1 text-lg font-medium text-slate-100">{formatCurrency(result.netWorth)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-slate-400">Median for your group</p>
                  <p className="mt-1 text-lg font-medium text-slate-100">{formatCurrency(result.group.p50)}</p>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold tracking-tight">Where you fall</h2>
              <p className="mt-2 text-sm text-slate-400">
                The bar below shows the estimated percentile ranges for U.S. households in your age
                group.
              </p>
              <PercentileBar
                group={result.group}
                netWorth={result.netWorth}
                percentile={result.percentile}
              />
            </section>

            <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold tracking-tight">Net worth by age: your benchmark</h2>
              <p className="mt-2 text-sm text-slate-400">
                These are the percentile breakpoints for the {result.group.label} age group.
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm text-slate-300">
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th className="pb-2 pr-4 font-medium">Percentile</th>
                      <th className="pb-2 pr-4 text-right font-medium">Net worth</th>
                      <th className="pb-2 text-right font-medium">Difference vs. you</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "10th percentile", value: result.group.p10 },
                      { label: "25th percentile", value: result.group.p25 },
                      { label: "50th percentile", value: result.group.p50 },
                      { label: "75th percentile", value: result.group.p75 },
                      { label: "90th percentile", value: result.group.p90 },
                    ].map((row) => {
                      const difference = result.netWorth - row.value;
                      const isPositive = difference >= 0;

                      return (
                        <tr key={row.label} className="border-b border-white/5">
                          <td className="py-3 pr-4">{row.label}</td>
                          <td className="py-3 pr-4 text-right font-medium text-slate-100">
                            {formatCurrency(row.value)}
                          </td>
                          <td
                            className={`py-3 text-right font-medium ${
                              isPositive ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {isPositive ? "+" : ""}
                            {formatCurrency(difference)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-slate-400">
            Enter your net worth to see your estimated percentile and benchmark bar.
          </section>
        )}

        <section className="mt-12 space-y-6 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Am I rich for my age?</h2>
          <p className="leading-relaxed text-slate-300">
            That depends on who you compare yourself to. A 30-year-old with a $100,000 net worth is
            in a very different position from a 65-year-old with the same number. That is why net
            worth by age is more useful than a single national average.
          </p>
          <p className="leading-relaxed text-slate-300">
            This page uses percentile breakpoints from the 2022 Survey of Consumer Finances, the
            Federal Reserve&apos;s best household balance-sheet dataset. It is one of the best ways to
            benchmark whether you are below the median, around the middle, or far ahead of peers.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight">Net worth by age (2022 SCF)</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm text-slate-300">
              <thead>
                <tr className="bg-white/5 text-left">
                  <th className="px-4 py-3 font-medium">Age group</th>
                  <th className="px-4 py-3 text-right font-medium">10th</th>
                  <th className="px-4 py-3 text-right font-medium">25th</th>
                  <th className="px-4 py-3 text-right font-medium">50th</th>
                  <th className="px-4 py-3 text-right font-medium">75th</th>
                  <th className="px-4 py-3 text-right font-medium">90th</th>
                </tr>
              </thead>
              <tbody>
                {AGE_GROUPS.map((group) => (
                  <tr key={group.key} className="border-t border-white/5">
                    <td className="px-4 py-3 font-medium text-slate-100">{group.label}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(group.p10)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(group.p25)}</td>
                    <td className="px-4 py-3 text-right text-emerald-300">{formatCurrency(group.p50)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(group.p75)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(group.p90)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-400">
            Source: Federal Reserve Survey of Consumer Finances, 2022
          </p>

          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 to-slate-900/60 p-6">
            <Link
              href="/"
              className="text-lg font-semibold text-emerald-300 underline hover:text-emerald-200"
            >
              Track your net worth privately with Vaulted — no account required
            </Link>
            <p className="mt-2 text-sm text-slate-400">
              Vaulted is local-first and manual by design. No bank login, no signup, no server.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
