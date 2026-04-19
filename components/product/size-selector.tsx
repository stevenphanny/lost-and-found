"use client";

import type { Variant } from "@/lib/shop/types";

export function SizeSelector({
  variants,
  selectedId,
  onSelect,
}: {
  variants: Variant[];
  selectedId: string | null;
  onSelect: (variantId: string) => void;
}) {
  if (variants.length <= 1) return null;

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-xs tracking-[0.18em] uppercase text-muted-1">Size</p>
        <a
          href="#size-guide"
          className="text-xs tracking-[0.12em] uppercase text-muted-1 underline-offset-4 hover:text-ink hover:underline"
        >
          Size guide
        </a>
      </div>
      <div
        role="radiogroup"
        aria-label="Size"
        className="grid grid-cols-4 gap-2"
      >
        {variants.map((v) => {
          const sold = !v.availableForSale;
          const active = v.id === selectedId;
          return (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={sold}
              onClick={() => onSelect(v.id)}
              className={`relative h-12 border text-sm font-medium transition-colors ${
                sold
                  ? "cursor-not-allowed border-hairline text-muted-2 line-through"
                  : active
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline hover:border-ink"
              }`}
            >
              {v.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
