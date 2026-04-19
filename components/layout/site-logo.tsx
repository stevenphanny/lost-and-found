import Link from "next/link";

export function SiteLogo({
  className,
  srText = "Lost and Found — home",
}: {
  className?: string;
  srText?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={srText}
      className={`font-display text-lg leading-none tracking-[-0.02em] font-bold uppercase ${className ?? ""}`}
    >
      Lost<span className="text-brand">.</span>Found
    </Link>
  );
}
