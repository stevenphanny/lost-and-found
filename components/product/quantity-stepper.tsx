"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  max,
  disabled,
}: {
  value: number;
  onChange: (next: number) => void;
  max: number;
  disabled?: boolean;
}) {
  const canDecrement = !disabled && value > 1;
  const canIncrement = !disabled && value < max;

  return (
    <div>
      <p className="mb-3 text-xs tracking-[0.18em] uppercase text-muted-1">
        Quantity
      </p>
      <div className="inline-flex h-12 items-stretch border border-hairline">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={!canDecrement}
          onClick={() => onChange(value - 1)}
          className="flex w-12 items-center justify-center text-ink transition-colors hover:bg-muted-3 disabled:cursor-not-allowed disabled:text-muted-2 disabled:hover:bg-transparent"
        >
          <Minus className="h-3 w-3" strokeWidth={2} />
        </button>
        <div
          aria-live="polite"
          className="flex w-12 items-center justify-center border-x border-hairline text-sm tabular-nums"
        >
          {value}
        </div>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={!canIncrement}
          onClick={() => onChange(value + 1)}
          className="flex w-12 items-center justify-center text-ink transition-colors hover:bg-muted-3 disabled:cursor-not-allowed disabled:text-muted-2 disabled:hover:bg-transparent"
        >
          <Plus className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
