import Link from "next/link";

/**
 * Shared not-found body — used by both the root `app/not-found.tsx`
 * (for unmatched URLs) and `app/(site)/not-found.tsx` (for notFound()
 * calls inside the site group).
 */
export function BrandNotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-paper px-6 py-20 text-center">
      <p className="mb-6 text-xs tracking-[0.22em] uppercase text-muted-1">
        404 — not found
      </p>
      <h1 className="max-w-[12ch] text-[clamp(3rem,10vw,7rem)] leading-[0.95] tracking-[-0.03em] uppercase text-balance">
        Lost something?
      </h1>
      <p className="mt-6 max-w-[38ch] text-sm text-muted-1 text-pretty">
        The page you&rsquo;re after isn&rsquo;t here. Maybe it dropped and sold
        out, maybe it was never here to begin with.
      </p>
      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
        <Link
          href="/"
          className="border border-ink bg-ink px-8 py-4 text-xs tracking-[0.22em] uppercase text-paper transition-colors hover:bg-brand hover:border-brand"
        >
          Back home
        </Link>
        <Link
          href="/catalog"
          className="border-b border-ink pb-1 text-xs tracking-[0.22em] uppercase transition-colors hover:text-brand hover:border-brand"
        >
          Browse catalog
        </Link>
      </div>
    </section>
  );
}
