"use client";

import Link from "next/link";
import { useEffect } from "react";

export function BrandError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry auto-captures from error boundaries; log locally for dev.
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-paper px-6 py-20 text-center">
      <p className="mb-6 text-xs tracking-[0.22em] uppercase text-brand">
        Something broke
      </p>
      <h1 className="max-w-[14ch] text-[clamp(3rem,10vw,7rem)] leading-[0.95] tracking-[-0.03em] uppercase text-balance">
        Off the rails.
      </h1>
      <p className="mt-6 max-w-[42ch] text-sm text-muted-1 text-pretty">
        Something unexpected happened. We&rsquo;ve been notified. Try again —
        if it keeps happening, hit us up.
      </p>
      {error.digest ? (
        <p className="mt-4 font-mono text-[10px] tracking-widest text-muted-2 uppercase">
          Ref {error.digest}
        </p>
      ) : null}
      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="border border-ink bg-ink px-8 py-4 text-xs tracking-[0.22em] uppercase text-paper transition-colors hover:bg-brand hover:border-brand"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-b border-ink pb-1 text-xs tracking-[0.22em] uppercase transition-colors hover:text-brand hover:border-brand"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
