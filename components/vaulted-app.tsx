"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChartNoAxesCombined,
  CreditCard,
  Download,
  FileSpreadsheet,
  History,
  Import,
  Landmark,
  Moon,
  Plus,
  Settings,
  Share2,
  Shield,
  Sparkles,
  Sun,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import {
  APP_NAME,
  APP_VERSION,
  ASSET_CATEGORIES,
  CATEGORY_COLORS,
  DEFAULT_DATA,
  formatCurrency,
  formatMonth,
  calculateTotals,
  convertFromUSD,
  convertToUSD,
  type Currency,
  downloadFile,
  type Entry,
  type EntryType,
  getCategories,
  getMonthKey,
  LIABILITY_CATEGORIES,
  parseCsv,
  safeParseData,
  serializeData,
  SUPPORTED_CURRENCIES,
  type TabKey,
  type VaultedData,
  createId,
} from "@/lib/vaulted";
import { loadData, saveData } from "@/lib/storage";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { posthog } from "@/lib/posthog";

const BACKUP_REMINDER_THRESHOLD = 5; // remind after N changes without backup
const BACKUP_REMINDER_DAYS = 7; // remind after N days without backup

const NAV_ITEMS: { key: TabKey; label: string; icon: typeof ChartNoAxesCombined }[] = [
  { key: "dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { key: "assets", label: "Assets", icon: Wallet },
  { key: "history", label: "History", icon: History },
  { key: "settings", label: "Settings", icon: Settings },
];

type EntryFormState = {
  id?: string;
  type: EntryType;
  name: string;
  category: string;
  value: string;
  currency: Currency;
  notes: string;
};

const EMPTY_FORM: EntryFormState = {
  type: "asset",
  name: "",
  category: ASSET_CATEGORIES[0],
  value: "",
  currency: "USD",
  notes: "",
};

function shellClasses(dark: boolean) {
  return dark
    ? "min-h-screen bg-[#07110d] text-slate-100"
    : "min-h-screen bg-[#f6fbf8] text-slate-900";
}

function panelClasses(dark: boolean) {
  return dark
    ? "rounded-3xl border border-white/8 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur"
    : "rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(16,185,129,0.08)]";
}

function secondaryPanelClasses(dark: boolean) {
  return dark
    ? "rounded-2xl border border-white/8 bg-black/20"
    : "rounded-2xl border border-slate-200 bg-slate-50/80";
}

function buttonClasses(dark: boolean, tone: "primary" | "secondary" | "danger" = "secondary") {
  if (tone === "primary") {
    return "inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-400";
  }

  if (tone === "danger") {
    return dark
      ? "inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
      : "inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100";
  }

  return dark
    ? "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
    : "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50";
}

function inputClasses(dark: boolean) {
  return dark
    ? "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
    : "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-400";
}

function createSnapshot(data: VaultedData) {
  const monthKey = getMonthKey(new Date());
  const totals = calculateTotals(data.entries);

  return {
    ...data,
    snapshots: [
      ...data.snapshots.filter((snapshot) => getMonthKey(new Date(snapshot.date)) !== monthKey),
      {
        id: createId(),
        date: new Date().toISOString(),
        netWorthUSD: totals.netWorthUSD,
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    settings: {
      ...data.settings,
      lastAutoSnapshotMonth: monthKey,
    },
  };
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function EntryModal({
  dark,
  form,
  onChange,
  onClose,
  onSave,
  onDelete,
  isEditing,
}: {
  dark: boolean;
  form: EntryFormState;
  onChange: (patch: Partial<EntryFormState>) => void;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  isEditing: boolean;
}) {
  const categories = getCategories(form.type);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center">
      <div className={`${panelClasses(dark)} w-full max-w-lg overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">{isEditing ? "Edit entry" : "Add entry"}</h2>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Keep it simple. No bank login, no sync, no surveillance.
            </p>
          </div>
          <button
            className={buttonClasses(dark)}
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={
                form.type === "asset"
                  ? `${buttonClasses(dark, "primary")} w-full`
                  : `${buttonClasses(dark)} w-full`
              }
              onClick={() => onChange({ type: "asset", category: ASSET_CATEGORIES[0] })}
            >
              <ArrowUpCircle className="h-4 w-4" /> Asset
            </button>
            <button
              type="button"
              className={
                form.type === "liability"
                  ? `${buttonClasses(dark, "primary")} w-full`
                  : `${buttonClasses(dark)} w-full`
              }
              onClick={() => onChange({ type: "liability", category: LIABILITY_CATEGORIES[0] })}
            >
              <ArrowDownCircle className="h-4 w-4" /> Liability
            </button>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Name</span>
            <input
              className={inputClasses(dark)}
              value={form.name}
              onChange={(event) => onChange({ name: event.target.value })}
              placeholder={form.type === "asset" ? "Emergency fund" : "Mortgage balance"}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-2">
              <span className="text-sm font-medium">Category</span>
              <select
                className={inputClasses(dark)}
                value={form.category}
                onChange={(event) => onChange({ category: event.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium">Currency</span>
              <select
                className={inputClasses(dark)}
                value={form.currency}
                onChange={(event) => onChange({ currency: event.target.value as Currency })}
              >
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Current value</span>
            <input
              className={inputClasses(dark)}
              value={form.value}
              onChange={(event) => onChange({ value: event.target.value })}
              inputMode="decimal"
              placeholder="12500"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Notes</span>
            <textarea
              className={`${inputClasses(dark)} min-h-24 resize-none`}
              value={form.notes}
              onChange={(event) => onChange({ notes: event.target.value })}
              placeholder="Optional notes"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:justify-between">
          {isEditing ? (
            <button type="button" className={buttonClasses(dark, "danger")} onClick={onDelete}>
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-3 sm:ml-auto">
            <button type="button" className={buttonClasses(dark)} onClick={onClose}>
              Cancel
            </button>
            <button type="button" className={buttonClasses(dark, "primary")} onClick={onSave}>
              <Plus className="h-4 w-4" /> {isEditing ? "Save changes" : "Save entry"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function shouldShowBackupReminder(settings: VaultedData["settings"]): boolean {
  const changes = settings.changesSinceBackup ?? 0;
  if (changes >= BACKUP_REMINDER_THRESHOLD) return true;

  if (settings.lastBackupAt) {
    const last = new Date(settings.lastBackupAt).getTime();
    const now = Date.now();
    const daysSince = (now - last) / (1000 * 60 * 60 * 24);
    if (daysSince >= BACKUP_REMINDER_DAYS && changes > 0) return true;
  } else if (changes > 0) {
    // Never backed up but has changes
    return true;
  }

  return false;
}

export function VaultedApp() {
  const [data, setData] = useState<VaultedData>(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [showBackupReminder, setShowBackupReminder] = useState(false);
  const [form, setForm] = useState<EntryFormState>(EMPTY_FORM);
  const [status, setStatus] = useState<string>("");

  const jsonInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const dark = data.settings.theme === "dark";

  // Load from IndexedDB (primary) with localStorage fallback
  useEffect(() => {
    loadData().then((stored) => {
      setData(stored);
      setLoaded(true);
    });
  }, []);

  // Persist to both IndexedDB + localStorage
  useEffect(() => {
    if (!loaded) return;
    saveData(data);
  }, [data, loaded]);

  useEffect(() => {
    if (data.entries.length === 0) return;

    const currentMonth = getMonthKey(new Date());
    if (data.settings.lastAutoSnapshotMonth === currentMonth) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData((current) => createSnapshot(current));
  }, [data.entries.length, data.settings.lastAutoSnapshotMonth]);

  useEffect(() => {
    if (!status) return;
    const timeout = window.setTimeout(() => setStatus(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  // Check backup reminder when data changes
  const backupNeeded = loaded && shouldShowBackupReminder(data.settings);

  const assets = useMemo(
    () => data.entries.filter((entry) => entry.type === "asset"),
    [data.entries]
  );
  const liabilities = useMemo(
    () => data.entries.filter((entry) => entry.type === "liability"),
    [data.entries]
  );

  const totals = useMemo(() => calculateTotals(data.entries), [data.entries]);

  const totalAssets = convertFromUSD(totals.assetsUSD, data.settings.primaryCurrency);
  const totalLiabilities = convertFromUSD(
    totals.liabilitiesUSD,
    data.settings.primaryCurrency
  );
  const netWorth = convertFromUSD(totals.netWorthUSD, data.settings.primaryCurrency);

  const latestSnapshot = useMemo(() => {
    return [...data.snapshots].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, [data.snapshots]);

  const deltaSinceSnapshot = latestSnapshot
    ? convertFromUSD(
        totals.netWorthUSD - latestSnapshot.netWorthUSD,
        data.settings.primaryCurrency
      )
    : null;

  const breakdownData = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const entry of assets) {
      const currentValue = convertToUSD(entry.value, entry.currency);
      grouped.set(entry.category, (grouped.get(entry.category) ?? 0) + currentValue);
    }

    return [...grouped.entries()].map(([name, valueInUSD]) => ({
      name,
      value: convertFromUSD(valueInUSD, data.settings.primaryCurrency),
      fill: CATEGORY_COLORS[name] ?? CATEGORY_COLORS.Other,
    }));
  }, [assets, data.settings.primaryCurrency]);

  const historyData = useMemo(() => {
    const snapshotSeries = [...data.snapshots]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((snapshot) => ({
        label: formatMonth(snapshot.date),
        value: convertFromUSD(snapshot.netWorthUSD, data.settings.primaryCurrency),
      }));

    return [
      ...snapshotSeries,
      {
        label: snapshotSeries.length ? "Now" : formatMonth(new Date().toISOString()),
        value: netWorth,
      },
    ];
  }, [data.settings.primaryCurrency, data.snapshots, netWorth]);

  const openNewEntry = (type: EntryType = "asset") => {
    setForm({
      ...EMPTY_FORM,
      type,
      category: getCategories(type)[0],
      currency: data.settings.primaryCurrency,
    });
    setShowModal(true);
  };

  const openEditEntry = (entry: Entry) => {
    setForm({
      id: entry.id,
      type: entry.type,
      name: entry.name,
      category: entry.category,
      value: String(entry.value),
      currency: entry.currency,
      notes: entry.notes ?? "",
    });
    setShowModal(true);
  };

  const saveEntry = () => {
    const numericValue = Number(form.value.replace(/,/g, "").trim());

    if (!form.name.trim() || !Number.isFinite(numericValue)) {
      setStatus("Add a name and a valid number first.");
      return;
    }

    const now = new Date().toISOString();
    const entry: Entry = {
      id: form.id ?? createId(),
      type: form.type,
      name: form.name.trim(),
      category: form.category as Entry["category"],
      value: Math.abs(numericValue),
      currency: form.currency,
      notes: form.notes.trim() || undefined,
      createdAt: form.id
        ? data.entries.find((item) => item.id === form.id)?.createdAt ?? now
        : now,
      updatedAt: now,
    };

    setData((current) => ({
      ...current,
      entries: current.entries.some((item) => item.id === entry.id)
        ? current.entries.map((item) => (item.id === entry.id ? entry : item))
        : [entry, ...current.entries],
      settings: {
        ...current.settings,
        changesSinceBackup: (current.settings.changesSinceBackup ?? 0) + 1,
      },
    }));
    posthog?.capture(form.id ? "entry_updated" : "entry_created", {
      type: entry.type,
      category: entry.category,
      currency: entry.currency,
    });
    setStatus(form.id ? "Entry updated." : "Entry saved.");
    setShowModal(false);
  };

  const deleteEntry = () => {
    if (!form.id) return;

    setData((current) => ({
      ...current,
      entries: current.entries.filter((item) => item.id !== form.id),
      settings: {
        ...current.settings,
        changesSinceBackup: (current.settings.changesSinceBackup ?? 0) + 1,
      },
    }));
    posthog?.capture("entry_deleted");
    setStatus("Entry deleted.");
    setShowModal(false);
  };

  const saveSnapshotNow = () => {
    if (data.entries.length === 0) {
      setStatus("Add at least one entry before saving a snapshot.");
      return;
    }

    setData((current) => createSnapshot(current));
    posthog?.capture("snapshot_saved");
    setStatus("Snapshot saved.");
  };

  const exportJson = () => {
    downloadFile("vaulted-export.json", serializeData(data), "application/json");
    setData((current) => ({
      ...current,
      settings: {
        ...current.settings,
        lastBackupAt: new Date().toISOString(),
        changesSinceBackup: 0,
      },
    }));
    setShowBackupReminder(false);
    posthog?.capture("export_json");
    setStatus("Exported JSON backup.");
  };

  const importJson = async (file: File) => {
    const text = await readFile(file);
    const parsed = safeParseData(text);
    setData({
      ...parsed,
      settings: {
        ...parsed.settings,
        lastBackupAt: new Date().toISOString(),
        changesSinceBackup: 0,
      },
    });
    setShowBackupReminder(false);
    posthog?.capture("import_json", { entries: parsed.entries.length });
    setStatus("Imported JSON backup.");
  };

  const importCsv = async (file: File) => {
    const text = await readFile(file);
    const importedEntries = parseCsv(text);

    if (importedEntries.length === 0) {
      setStatus("CSV import found no valid rows.");
      return;
    }

    setData((current) => ({
      ...current,
      entries: [...importedEntries, ...current.entries],
    }));
    posthog?.capture("import_csv", { rows: importedEntries.length });
    setStatus(`Imported ${importedEntries.length} row(s) from CSV.`);
  };

  const clearAll = () => {
    const ok = window.confirm("Clear all local data on this device? This cannot be undone.");
    if (!ok) return;

    setData(DEFAULT_DATA);
    setActiveTab("dashboard");
    setStatus("All data cleared from this device.");
  };

  return (
    <div className={shellClasses(dark)}>
      <ServiceWorkerRegister />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-28 pt-4 sm:px-6">
        <section
          className={`${panelClasses(dark)} relative overflow-hidden px-5 pb-5 pt-6 sm:px-7 sm:pb-7`}
        >
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)]" />

          <div className="relative flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                  <Shield className="h-3.5 w-3.5" /> privacy-first net worth tracker
                </div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{APP_NAME}</h1>
                <p className={`mt-2 max-w-2xl text-sm sm:text-base ${dark ? "text-slate-300" : "text-slate-600"}`}>
                  Track your money without giving away your logins, your inbox, or your life.
                </p>
              </div>

              <button
                className={buttonClasses(dark)}
                type="button"
                onClick={() =>
                  setData((current) => ({
                    ...current,
                    settings: {
                      ...current.settings,
                      theme: current.settings.theme === "dark" ? "light" : "dark",
                    },
                  }))
                }
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {dark ? "Light" : "Dark"}
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className={`${secondaryPanelClasses(dark)} p-5 sm:p-6`}>
                <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  Net worth
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {formatCurrency(netWorth, data.settings.primaryCurrency)}
                  </h2>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                      (deltaSinceSnapshot ?? 0) >= 0
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-rose-500/15 text-rose-300"
                    }`}
                  >
                    {deltaSinceSnapshot === null
                      ? "No snapshot yet"
                      : `${deltaSinceSnapshot >= 0 ? "+" : ""}${formatCurrency(
                          deltaSinceSnapshot,
                          data.settings.primaryCurrency
                        )} vs latest snapshot`}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <StatCard
                    dark={dark}
                    icon={<Landmark className="h-4 w-4" />}
                    label="Assets"
                    value={formatCurrency(totalAssets, data.settings.primaryCurrency)}
                  />
                  <StatCard
                    dark={dark}
                    icon={<CreditCard className="h-4 w-4" />}
                    label="Liabilities"
                    value={formatCurrency(totalLiabilities, data.settings.primaryCurrency)}
                  />
                  <StatCard
                    dark={dark}
                    icon={<Sparkles className="h-4 w-4" />}
                    label="Entries"
                    value={String(data.entries.length)}
                  />
                </div>

                <p className={`mt-5 text-sm ${dark ? "text-emerald-200/80" : "text-emerald-700"}`}>
                  🔒 Your data lives only on this device. Never shared.
                </p>
              </div>

              <div className={`${secondaryPanelClasses(dark)} p-5 sm:p-6`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Quick actions</h3>
                  <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
                    no bank login
                  </p>
                </div>
                <div className="mt-4 grid gap-3">
                  <button className={buttonClasses(dark, "primary")} onClick={() => openNewEntry("asset")}>
                    <Plus className="h-4 w-4" /> Add asset
                  </button>
                  <button className={buttonClasses(dark)} onClick={() => openNewEntry("liability")}>
                    <Plus className="h-4 w-4" /> Add liability
                  </button>
                  <button className={buttonClasses(dark)} onClick={saveSnapshotNow}>
                    <History className="h-4 w-4" /> Save monthly snapshot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {status ? (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
              dark ? "bg-emerald-500/10 text-emerald-200" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {status}
          </div>
        ) : null}

        {(showBackupReminder || backupNeeded) && !showModal && data.settings.onboarded ? (
          <div
            className={`mt-4 rounded-2xl px-5 py-4 ${
              dark
                ? "border border-amber-400/20 bg-amber-500/10"
                : "border border-amber-200 bg-amber-50"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Download className={`mt-0.5 h-5 w-5 flex-shrink-0 ${dark ? "text-amber-300" : "text-amber-600"}`} />
                <div>
                  <p className={`text-sm font-semibold ${dark ? "text-amber-200" : "text-amber-800"}`}>
                    Back up your vault
                  </p>
                  <p className={`mt-1 text-sm ${dark ? "text-amber-200/70" : "text-amber-700"}`}>
                    {data.settings.changesSinceBackup ?? 0} unsaved change{(data.settings.changesSinceBackup ?? 0) !== 1 ? "s" : ""} since your last backup.
                    Your data lives only on this device — export a backup to keep it safe.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:flex-shrink-0">
                <button
                  className={buttonClasses(dark, "primary")}
                  onClick={exportJson}
                >
                  <Download className="h-4 w-4" /> Export backup
                </button>
                <button
                  className={buttonClasses(dark)}
                  onClick={() => setShowBackupReminder(false)}
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex-1">
          {activeTab === "dashboard" ? (
            <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className={`${panelClasses(dark)} p-5 sm:p-6`}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Net worth over time</h3>
                    <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                      Monthly snapshots, updated locally.
                    </p>
                  </div>
                </div>

                <div className="h-72">
                  {historyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={historyData} margin={{ left: 0, right: 8, top: 16, bottom: 0 }}>
                        <defs>
                          <linearGradient id="vaultedTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.03} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1f2937" : "#dbe4dd"} />
                        <XAxis dataKey="label" stroke={dark ? "#94a3b8" : "#64748b"} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke={dark ? "#94a3b8" : "#64748b"}
                          tickFormatter={(value) =>
                            formatCurrency(value, data.settings.primaryCurrency).replace(/\.00$/, "")
                          }
                          tickLine={false}
                          axisLine={false}
                          width={88}
                        />
                        <Tooltip
                          formatter={(value: unknown) =>
                            formatCurrency(Number(value ?? 0), data.settings.primaryCurrency)
                          }
                          contentStyle={{
                            borderRadius: 18,
                            border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #d1fae5",
                            backgroundColor: dark ? "#07110d" : "#ffffff",
                            color: dark ? "#f8fafc" : "#0f172a",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#10b981"
                          strokeWidth={3}
                          fill="url(#vaultedTrend)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState dark={dark} title="No history yet" description="Save your first snapshot to start building your trend line." />
                  )}
                </div>
              </div>

              <div className={`${panelClasses(dark)} p-5 sm:p-6`}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Asset breakdown</h3>
                    <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                      Where your money sits right now.
                    </p>
                  </div>
                </div>

                {breakdownData.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={breakdownData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            outerRadius={82}
                            paddingAngle={3}
                          >
                            {breakdownData.map((item) => (
                              <Cell key={item.name} fill={item.fill} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: unknown) =>
                              formatCurrency(Number(value ?? 0), data.settings.primaryCurrency)
                            }
                            contentStyle={{
                              borderRadius: 18,
                              border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #d1fae5",
                              backgroundColor: dark ? "#07110d" : "#ffffff",
                              color: dark ? "#f8fafc" : "#0f172a",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      {breakdownData.map((item) => (
                        <div key={item.name} className={`${secondaryPanelClasses(dark)} flex items-center justify-between px-4 py-3`}>
                          <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatCurrency(item.value, data.settings.primaryCurrency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    dark={dark}
                    title="No assets yet"
                    description="Add your first asset to see the breakdown chart."
                    action={{ label: "Add asset", onClick: () => openNewEntry("asset") }}
                  />
                )}
              </div>
            </section>
          ) : null}

          {activeTab === "assets" ? (
            <section className="grid gap-4 lg:grid-cols-2">
              <EntriesPanel
                dark={dark}
                title="Assets"
                subtitle="Cash, brokerages, real estate, crypto, retirement and more."
                entries={assets}
                primaryCurrency={data.settings.primaryCurrency}
                emptyTitle="No assets added"
                emptyDescription="Start with the money you can see today."
                onAdd={() => openNewEntry("asset")}
                onEdit={openEditEntry}
              />

              <EntriesPanel
                dark={dark}
                title="Liabilities"
                subtitle="Mortgages, cards, loans and the stuff dragging down net worth."
                entries={liabilities}
                primaryCurrency={data.settings.primaryCurrency}
                emptyTitle="No liabilities added"
                emptyDescription="Great if true. If not, add them so the number stays honest."
                onAdd={() => openNewEntry("liability")}
                onEdit={openEditEntry}
              />
            </section>
          ) : null}

          {activeTab === "history" ? (
            <section className={`${panelClasses(dark)} p-5 sm:p-6`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Monthly history</h3>
                  <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                    Vaulted keeps one clean snapshot per month on this device.
                  </p>
                </div>
                <button className={buttonClasses(dark, "primary")} onClick={saveSnapshotNow}>
                  <History className="h-4 w-4" /> Save snapshot now
                </button>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-white/8">
                {data.snapshots.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead className={dark ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-600"}>
                        <tr>
                          <th className="px-4 py-3 font-medium">Month</th>
                          <th className="px-4 py-3 font-medium">Net worth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...data.snapshots]
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((snapshot) => (
                            <tr key={snapshot.id} className={dark ? "border-t border-white/8" : "border-t border-slate-200"}>
                              <td className="px-4 py-3">{formatMonth(snapshot.date)}</td>
                              <td className="px-4 py-3 font-semibold">
                                {formatCurrency(
                                  convertFromUSD(
                                    snapshot.netWorthUSD,
                                    data.settings.primaryCurrency
                                  ),
                                  data.settings.primaryCurrency
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-16">
                    <EmptyState
                      dark={dark}
                      title="No saved snapshots"
                      description="Once you save one, this becomes your clean monthly scoreboard."
                    />
                  </div>
                )}
              </div>
            </section>
          ) : null}

          {activeTab === "settings" ? (
            <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className={`${panelClasses(dark)} p-5 sm:p-6`}>
                <h3 className="text-lg font-semibold">Preferences</h3>
                <p className={`mt-1 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  Everything here stays local too.
                </p>

                <div className="mt-5 space-y-4">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium">Primary currency</span>
                    <select
                      className={inputClasses(dark)}
                      value={data.settings.primaryCurrency}
                      onChange={(event) =>
                        setData((current) => ({
                          ...current,
                          settings: {
                            ...current.settings,
                            primaryCurrency: event.target.value as Currency,
                          },
                        }))
                      }
                    >
                      {SUPPORTED_CURRENCIES.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className={`${secondaryPanelClasses(dark)} p-4 text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>
                    Exchange rates are bundled locally for offline use. Good enough for tracking, not for taxes.
                  </div>
                </div>
              </div>

              <div className={`${panelClasses(dark)} p-5 sm:p-6`}>
                <h3 className="text-lg font-semibold">Backups & imports</h3>
                <p className={`mt-1 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  Backup your local vault, or bulk import simple CSV files.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button className={buttonClasses(dark, "primary")} onClick={exportJson}>
                    <Download className="h-4 w-4" /> Export JSON backup
                  </button>
                  <button className={buttonClasses(dark)} onClick={() => jsonInputRef.current?.click()}>
                    <Import className="h-4 w-4" /> Import JSON
                  </button>
                  <button className={buttonClasses(dark)} onClick={() => csvInputRef.current?.click()}>
                    <FileSpreadsheet className="h-4 w-4" /> Import CSV
                  </button>
                  <button className={buttonClasses(dark, "danger")} onClick={clearAll}>
                    <Trash2 className="h-4 w-4" /> Clear all data
                  </button>
                </div>

                {data.settings.lastBackupAt ? (
                  <div className={`mt-4 rounded-2xl px-4 py-3 text-sm ${dark ? "bg-white/5 text-slate-400" : "bg-slate-50 text-slate-500"}`}>
                    Last backup: {new Date(data.settings.lastBackupAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    {(data.settings.changesSinceBackup ?? 0) > 0
                      ? ` · ${data.settings.changesSinceBackup} change${(data.settings.changesSinceBackup ?? 0) !== 1 ? "s" : ""} since`
                      : " · All changes backed up ✓"}
                  </div>
                ) : (
                  <div className={`mt-4 rounded-2xl px-4 py-3 text-sm ${dark ? "bg-amber-500/10 text-amber-200" : "bg-amber-50 text-amber-700"}`}>
                    ⚠️ You haven&apos;t exported a backup yet. Your data only exists on this device.
                  </div>
                )}

                <input
                  ref={jsonInputRef}
                  hidden
                  type="file"
                  accept="application/json"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    await importJson(file);
                    event.currentTarget.value = "";
                  }}
                />
                <input
                  ref={csvInputRef}
                  hidden
                  type="file"
                  accept=".csv,text/csv"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    await importCsv(file);
                    event.currentTarget.value = "";
                  }}
                />

                <div className={`mt-6 rounded-3xl border p-4 text-sm ${dark ? "border-white/8 bg-white/5 text-slate-300" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  <p className="font-medium">CSV format</p>
                  <p className="mt-2">Use columns like: <code>name,value,category,currency,type,notes</code>.</p>
                </div>

                <div className={`mt-6 text-xs uppercase tracking-[0.22em] ${dark ? "text-slate-500" : "text-slate-400"}`}>
                  Version {APP_VERSION}
                </div>
              </div>
            </section>
          ) : null}
        </div>

        <footer className={`mt-10 pb-4 text-center text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href="/blog" className="transition hover:text-emerald-400">
              blog
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="https://github.com/douglascorrea/vaulted"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-emerald-400"
            >
              source code
            </a>
            <span aria-hidden="true">•</span>
            <span>100% local-first</span>
          </div>
        </footer>
      </main>

      <button
        className="fixed bottom-24 right-4 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-[1.02] hover:bg-emerald-400 sm:right-6"
        onClick={() => openNewEntry("asset")}
        aria-label="Quick add"
      >
        <Plus className="h-7 w-7" />
      </button>

      <nav className={`fixed inset-x-0 bottom-0 z-40 border-t px-3 py-3 backdrop-blur ${dark ? "border-white/10 bg-[#07110d]/85" : "border-slate-200 bg-white/90"}`}>
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.key === activeTab;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${
                  active
                    ? "bg-emerald-500 text-white"
                    : dark
                      ? "text-slate-400 hover:bg-white/5 hover:text-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {!data.settings.onboarded ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 p-4 sm:items-center">
          <div className={`${panelClasses(true)} w-full max-w-xl overflow-hidden border border-emerald-500/20`}>
            <div className="bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),_transparent_65%)] px-6 py-8 sm:px-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                <Shield className="h-3.5 w-3.5" /> welcome to Vaulted
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                Your money data should stay yours.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                No account. No Plaid. No sales calls. No sync unless you decide to export it yourself.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <OnboardingChip icon={<Shield className="h-4 w-4" />} label="100% local" />
                <OnboardingChip icon={<Wallet className="h-4 w-4" />} label="Manual + CSV" />
                <OnboardingChip icon={<History className="h-4 w-4" />} label="Monthly snapshots" />
              </div>

              <button
                className={`${buttonClasses(true, "primary")} mt-8 w-full sm:w-auto`}
                onClick={() => {
                  setData((current) => ({
                    ...current,
                    settings: {
                      ...current.settings,
                      onboarded: true,
                    },
                  }));
                  posthog?.capture("onboarding_completed");
                }}
              >
                Start my private vault
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showModal ? (
        <EntryModal
          dark={dark}
          form={form}
          onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
          onClose={() => setShowModal(false)}
          onSave={saveEntry}
          onDelete={deleteEntry}
          isEditing={Boolean(form.id)}
        />
      ) : null}
    </div>
  );
}

function StatCard({
  dark,
  icon,
  label,
  value,
}: {
  dark: boolean;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className={`${secondaryPanelClasses(dark)} px-4 py-4`}>
      <div className={`mb-3 inline-flex rounded-2xl p-2 ${dark ? "bg-white/8 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`}>
        {icon}
      </div>
      <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function EntriesPanel({
  dark,
  title,
  subtitle,
  entries,
  primaryCurrency,
  emptyTitle,
  emptyDescription,
  onAdd,
  onEdit,
}: {
  dark: boolean;
  title: string;
  subtitle: string;
  entries: Entry[];
  primaryCurrency: Currency;
  emptyTitle: string;
  emptyDescription: string;
  onAdd: () => void;
  onEdit: (entry: Entry) => void;
}) {
  return (
    <div className={`${panelClasses(dark)} p-5 sm:p-6`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>
        </div>
        <button className={buttonClasses(dark, "primary")} onClick={onAdd}>
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {entries.length > 0 ? (
          entries.map((entry) => {
            const converted = convertFromUSD(
              convertToUSD(entry.value, entry.currency),
              primaryCurrency
            );
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onEdit(entry)}
                className={`${secondaryPanelClasses(dark)} flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:scale-[1.005]`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[entry.category] ?? CATEGORY_COLORS.Other }}
                    />
                    <p className="font-medium">{entry.name}</p>
                  </div>
                  <div className={`mt-2 flex flex-wrap gap-2 text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
                    <span className="rounded-full bg-white/5 px-2 py-1">{entry.category}</span>
                    <span className="rounded-full bg-white/5 px-2 py-1">{entry.currency}</span>
                    <span className="rounded-full bg-white/5 px-2 py-1">updated {formatMonth(entry.updatedAt)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold">{formatCurrency(entry.value, entry.currency)}</p>
                  <p className={`mt-1 text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
                    {formatCurrency(converted, primaryCurrency)} in {primaryCurrency}
                  </p>
                </div>
              </button>
            );
          })
        ) : (
          <div className="py-10">
            <EmptyState dark={dark} title={emptyTitle} description={emptyDescription} />
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({
  dark,
  title,
  description,
  action,
}: {
  dark: boolean;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl ${dark ? "bg-white/5 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`}>
        <Shield className="h-7 w-7" />
      </div>
      <h4 className="mt-4 text-lg font-semibold">{title}</h4>
      <p className={`mt-2 text-sm leading-7 ${dark ? "text-slate-400" : "text-slate-500"}`}>{description}</p>
      {action ? (
        <button className={`${buttonClasses(dark, "primary")} mt-5`} onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  );
}

function OnboardingChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
      {icon}
      {label}
    </div>
  );
}
