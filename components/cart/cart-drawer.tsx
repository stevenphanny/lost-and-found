"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const itemCount = 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Cart, ${itemCount} items`}
          className="relative inline-flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
          {itemCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center bg-brand px-1 text-[10px] font-semibold text-brand-ink"
            >
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="border-b border-hairline pb-4">
          <SheetTitle className="font-display text-xs tracking-[0.18em] uppercase">
            Your cart
          </SheetTitle>
          <SheetDescription className="sr-only">
            Items in your shopping cart
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-2" strokeWidth={1} />
          <div className="space-y-2">
            <p className="font-display text-xl">Your cart is empty</p>
            <p className="text-sm text-muted-1">
              Once cart is wired (Phase 3), added items will live here.
            </p>
          </div>
          <SheetClose asChild>
            <Button asChild variant="outline">
              <a href="/catalog">Browse catalog</a>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
