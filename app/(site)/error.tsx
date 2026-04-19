"use client";

import { BrandError } from "@/components/system/brand-error";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <BrandError error={error} reset={reset} />;
}
