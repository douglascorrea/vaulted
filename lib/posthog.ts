import posthog from "posthog-js";

const POSTHOG_KEY = "phc_gr7SqngtiASRWHPmin72R2iYbog5kEI4x7jOQFjqZ3h";
const POSTHOG_HOST = "https://us.i.posthog.com";

let initialized = false;

export function initPostHog() {
  if (typeof window === "undefined" || initialized) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    persistence: "localStorage+cookie",
    // respect privacy: no session recording by default
    disable_session_recording: true,
  });

  initialized = true;
}

export { posthog };
