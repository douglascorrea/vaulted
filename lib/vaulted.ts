export const APP_NAME = "Vaulted";
export const APP_VERSION = "0.1.0";
export const STORAGE_KEY = "vaulted-data-v1";

export const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "BRL",
  "GBP",
  "CAD",
  "AUD",
  "JPY",
] as const;

export type Currency = (typeof SUPPORTED_CURRENCIES)[number];
export type EntryType = "asset" | "liability";

export const ASSET_CATEGORIES = [
  "Cash",
  "Stocks/ETFs",
  "Crypto",
  "Real Estate",
  "Retirement",
  "Other",
] as const;

export const LIABILITY_CATEGORIES = [
  "Mortgage",
  "Car Loan",
  "Credit Card",
  "Student Loan",
  "Other",
] as const;

export type AssetCategory = (typeof ASSET_CATEGORIES)[number];
export type LiabilityCategory = (typeof LIABILITY_CATEGORIES)[number];
export type Category = AssetCategory | LiabilityCategory;
export type ThemeMode = "dark" | "light";
export type TabKey = "dashboard" | "assets" | "history" | "settings";

export interface Entry {
  id: string;
  type: EntryType;
  name: string;
  category: Category;
  value: number;
  currency: Currency;
  notes?: string;
  updatedAt: string;
  createdAt: string;
}

export interface Snapshot {
  id: string;
  date: string;
  netWorthUSD: number;
}

export interface Settings {
  primaryCurrency: Currency;
  theme: ThemeMode;
  onboarded: boolean;
  lastAutoSnapshotMonth?: string;
}

export interface VaultedData {
  entries: Entry[];
  snapshots: Snapshot[];
  settings: Settings;
}

export const DEFAULT_DATA: VaultedData = {
  entries: [],
  snapshots: [],
  settings: {
    primaryCurrency: "USD",
    theme: "dark",
    onboarded: false,
    lastAutoSnapshotMonth: undefined,
  },
};

export const CURRENCY_TO_USD: Record<Currency, number> = {
  USD: 1,
  EUR: 1.09,
  BRL: 0.2,
  GBP: 1.28,
  CAD: 0.74,
  AUD: 0.66,
  JPY: 0.0067,
};

export const CATEGORY_COLORS: Record<string, string> = {
  Cash: "#34d399",
  "Stocks/ETFs": "#10b981",
  Crypto: "#f59e0b",
  "Real Estate": "#60a5fa",
  Retirement: "#a78bfa",
  Mortgage: "#fb7185",
  "Car Loan": "#f97316",
  "Credit Card": "#ef4444",
  "Student Loan": "#8b5cf6",
  Other: "#94a3b8",
};

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `vaulted-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`;
}

export function getCategories(type: EntryType) {
  return type === "asset" ? ASSET_CATEGORIES : LIABILITY_CATEGORIES;
}

export function convertToUSD(value: number, currency: Currency) {
  return value * CURRENCY_TO_USD[currency];
}

export function convertFromUSD(valueInUSD: number, currency: Currency) {
  return valueInUSD / CURRENCY_TO_USD[currency];
}

export function convertCurrency(value: number, from: Currency, to: Currency) {
  const usd = convertToUSD(value, from);
  return convertFromUSD(usd, to);
}

export function formatCurrency(value: number, currency: Currency) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(value);
}

export function getMonthKey(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function formatMonth(dateString: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function calculateTotals(entries: Entry[]) {
  const totals = entries.reduce(
    (acc, entry) => {
      const usdValue = convertToUSD(entry.value, entry.currency);

      if (entry.type === "asset") {
        acc.assetsUSD += usdValue;
      } else {
        acc.liabilitiesUSD += usdValue;
      }

      return acc;
    },
    {
      assetsUSD: 0,
      liabilitiesUSD: 0,
    }
  );

  return {
    ...totals,
    netWorthUSD: totals.assetsUSD - totals.liabilitiesUSD,
  };
}

export function serializeData(data: VaultedData) {
  return JSON.stringify(data, null, 2);
}

export function safeParseData(raw: string | null): VaultedData {
  if (!raw) return DEFAULT_DATA;

  try {
    const parsed = JSON.parse(raw) as Partial<VaultedData>;

    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : DEFAULT_DATA.entries,
      snapshots: Array.isArray(parsed.snapshots)
        ? parsed.snapshots
        : DEFAULT_DATA.snapshots,
      settings: {
        ...DEFAULT_DATA.settings,
        ...(parsed.settings ?? {}),
      },
    };
  } catch {
    return DEFAULT_DATA;
  }
}

export function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseCsv(text: string): Entry[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(",").map((header) => header.trim().toLowerCase());

  return lines.slice(1).flatMap((line) => {
    const values = line.split(",").map((value) => value.trim());
    const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));

    const numericValue = Number(String(record.value ?? "").replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(numericValue) || !record.name) {
      return [];
    }

    const rawCategory = String(record.category ?? "Other").trim();
    const rawType = String(record.type ?? "").trim().toLowerCase();

    const inferredType: EntryType =
      rawType === "liability"
        ? "liability"
        : LIABILITY_CATEGORIES.includes(rawCategory as LiabilityCategory)
          ? "liability"
          : numericValue < 0
            ? "liability"
            : "asset";

    const categories = getCategories(inferredType);
    const category = categories.includes(rawCategory as never)
      ? (rawCategory as Category)
      : "Other";

    const currency = SUPPORTED_CURRENCIES.includes(record.currency as Currency)
      ? (record.currency as Currency)
      : "USD";

    const now = new Date().toISOString();

    return [
      {
        id: createId(),
        name: String(record.name),
        type: inferredType,
        category,
        currency,
        value: Math.abs(numericValue),
        notes: String(record.notes ?? "").trim() || undefined,
        createdAt: now,
        updatedAt: now,
      },
    ];
  });
}
