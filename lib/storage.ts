import {
  type VaultedData,
  DEFAULT_DATA,
  safeParseData,
  serializeData,
  STORAGE_KEY,
} from "./vaulted";

const DB_NAME = "vaulted-db";
const DB_VERSION = 1;
const STORE_NAME = "vault";
const DATA_KEY = "main";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbGet(): Promise<VaultedData | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(DATA_KEY);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function idbPut(data: VaultedData): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, DATA_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // IndexedDB unavailable — localStorage is the fallback
  }
}

export async function loadData(): Promise<VaultedData> {
  // Try IndexedDB first
  const idbData = await idbGet();
  if (idbData && Array.isArray(idbData.entries)) {
    return {
      entries: idbData.entries,
      snapshots: Array.isArray(idbData.snapshots) ? idbData.snapshots : [],
      settings: { ...DEFAULT_DATA.settings, ...(idbData.settings ?? {}) },
    };
  }

  // Fall back to localStorage and migrate to IndexedDB
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = safeParseData(raw);
      await idbPut(parsed);
      return parsed;
    }
  }

  return DEFAULT_DATA;
}

export async function saveData(data: VaultedData): Promise<void> {
  // Write to both IndexedDB and localStorage for redundancy
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, serializeData(data));
    } catch {
      // localStorage full or unavailable
    }
  }
  await idbPut(data);
}
