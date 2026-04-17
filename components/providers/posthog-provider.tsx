"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";

    if (!key) return;

    posthog.init(key, {
      api_host: host,
      // Cookieless mode — no PII stored in localStorage or cookies.
      persistence: "memory",
      capture_pageview: false, // Manual pageview capture below.
      capture_pageleave: true,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
