type MarkProps = { className?: string };

/**
 * Minimal monochrome payment marks. These are decorative wordmarks
 * drawn as SVG so they inherit `currentColor` and scale crisp at any size.
 * Not the official brand marks — replace before public launch with
 * licensed assets if needed (Shopify supplies approved badges in admin).
 */

function Mark({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex h-5 min-w-10 items-center justify-center border border-hairline px-2 text-[9px] font-semibold tracking-[0.15em] uppercase text-muted-1 ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

export function PaymentMarks({ className }: MarkProps) {
  return (
    <ul
      aria-label="Accepted payment methods"
      className={`flex flex-wrap items-center gap-1.5 ${className ?? ""}`}
    >
      {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Afterpay"].map(
        (label) => (
          <li key={label}>
            <Mark label={label}>{label}</Mark>
          </li>
        )
      )}
    </ul>
  );
}
