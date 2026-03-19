"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
        await navigator.serviceWorker.register(`${base}/sw.js`);
      } catch (error) {
        console.warn("Service worker registration failed", error);
      }
    };

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
