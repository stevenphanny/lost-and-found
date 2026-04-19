"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Option = { label: string; value: string };

/**
 * Filter UI only — no filtering logic. Hooks into state so the UI
 * reads as "chosen" for visual QA, but the product grid ignores it.
 * Wire this up to a useSearchParams-driven filter pipeline in Phase 2.
 */
const CATEGORIES: Option[] = [
  { label: "All", value: "all" },
  { label: "Tees", value: "tee" },
  { label: "Hoodies", value: "hoodie" },
  { label: "Outerwear", value: "outerwear" },
];

const SIZES: Option[] = [
  { label: "Any", value: "any" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
];

const SORTS: Option[] = [
  { label: "Newest", value: "newest" },
  { label: "Price — low to high", value: "asc" },
  { label: "Price — high to low", value: "desc" },
];

export function CatalogFilters() {
  const [category, setCategory] = useState(CATEGORIES[0]!);
  const [size, setSize] = useState(SIZES[0]!);
  const [sort, setSort] = useState(SORTS[0]!);

  return (
    <div
      role="toolbar"
      aria-label="Catalog filters"
      className="flex flex-wrap items-center gap-2 border-b border-hairline pb-4 md:gap-3"
    >
      <FilterMenu
        label="Category"
        current={category}
        options={CATEGORIES}
        onSelect={setCategory}
      />
      <FilterMenu label="Size" current={size} options={SIZES} onSelect={setSize} />
      <div className="ms-auto">
        <FilterMenu
          label="Sort"
          current={sort}
          options={SORTS}
          onSelect={setSort}
          align="end"
        />
      </div>
    </div>
  );
}

function FilterMenu({
  label,
  current,
  options,
  onSelect,
  align = "start",
}: {
  label: string;
  current: Option;
  options: Option[];
  onSelect: (value: Option) => void;
  align?: "start" | "end";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-hairline bg-paper px-4 py-2 text-xs tracking-[0.18em] uppercase transition-colors hover:bg-muted-3 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <span className="text-muted-1">{label}</span>
          <span className="text-ink">{current.label}</span>
          <ChevronDown className="h-3 w-3" strokeWidth={2} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[10rem]">
        <DropdownMenuLabel className="text-[10px] tracking-[0.22em] uppercase text-muted-1">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onSelect={() => onSelect(opt)}
            className="flex items-center justify-between"
          >
            {opt.label}
            {opt.value === current.value ? (
              <Check className="h-3 w-3" strokeWidth={2} />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
