"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;
    const url = window.location.href;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, posthog]);

  return null;
}
