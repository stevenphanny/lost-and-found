"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product, Variant } from "@/lib/shop/types";

type CtaState =
  | { kind: "dropping"; releaseAt: Date }
  | { kind: "notify" }
  | { kind: "add"; variant: Variant };

/**
 * CTA state machine per PRD §6.3.
 *  1. Dropping — release_at is in the future → countdown + disabled.
 *  2. Notify me — all variants sold out & notify_me_enabled.
 *  3. Add to cart — default.
 *
 * Phase 1 scope: stub all three. Wiring: Phase 2 (release metafields),
 * Phase 2 (Notify Me submission), Phase 3 (real cart).
 */
function resolveState(product: Product, variant: Variant | null): CtaState {
  if (product.releaseAt) {
    const date = new Date(product.releaseAt);
    if (!Number.isNaN(date.getTime()) && date.getTime() > Date.now()) {
      return { kind: "dropping", releaseAt: date };
    }
  }
  const anyAvailable = product.variants.some((v) => v.availableForSale);
  if (!anyAvailable && product.notifyMeEnabled) {
    return { kind: "notify" };
  }
  if (variant?.availableForSale) {
    return { kind: "add", variant };
  }
  const firstAvailable = product.variants.find((v) => v.availableForSale);
  if (firstAvailable) return { kind: "add", variant: firstAvailable };
  return { kind: "notify" };
}

function formatRelease(d: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function ProductCta({
  product,
  selectedVariantId,
  quantity,
}: {
  product: Product;
  selectedVariantId: string | null;
  quantity: number;
}) {
  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === selectedVariantId) ?? null,
    [product.variants, selectedVariantId]
  );
  const state = resolveState(product, selectedVariant);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notified, setNotified] = useState(false);

  // Live countdown for dropping state
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    if (state.kind !== "dropping") return;
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, [state.kind]);

  if (state.kind === "dropping") {
    const delta = state.releaseAt.getTime() - now;
    const days = Math.max(0, Math.floor(delta / (24 * 60 * 60 * 1000)));
    return (
      <div className="flex flex-col gap-3">
        <Button
          size="lg"
          disabled
          className="h-14 w-full bg-brand text-brand-ink text-xs tracking-[0.22em] uppercase hover:bg-brand"
        >
          Dropping {formatRelease(state.releaseAt)}
        </Button>
        <p className="text-xs text-muted-1">
          {days === 0 ? "Today" : `${days} day${days === 1 ? "" : "s"} to go`}
        </p>
      </div>
    );
  }

  if (state.kind === "notify") {
    if (notified) {
      return (
        <div className="border border-ink bg-ink px-5 py-4 text-sm text-paper">
          On the list. We&rsquo;ll email when it&rsquo;s back.
        </div>
      );
    }
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!/^\S+@\S+\.\S+$/.test(notifyEmail)) {
            toast.error("Enter a valid email");
            return;
          }
          // Phase 2: POST to Shopify Admin API, add variant to user's
          // `custom.variants_of_interest` metafield.
          console.info("[notify-me] would subscribe:", notifyEmail, product.handle);
          setNotified(true);
        }}
        className="flex flex-col gap-2"
      >
        <p className="text-xs tracking-[0.18em] uppercase text-muted-1">
          Sold out — notify me when back
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            required
            placeholder="you@example.com"
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            className="h-12 flex-1 border-hairline"
            aria-label="Email for notify me"
          />
          <Button
            type="submit"
            size="lg"
            className="h-12 px-6 text-xs tracking-[0.18em] uppercase"
          >
            Notify me
          </Button>
        </div>
      </form>
    );
  }

  // Add to cart
  const disabled = !state.variant.availableForSale;
  return (
    <Button
      type="button"
      size="lg"
      disabled={disabled}
      onClick={() => {
        // Phase 3: shop.addToCart(cartId, [{ merchandiseId: state.variant.id, quantity }])
        console.info("[cart] would add:", state.variant.id, "x", quantity);
        toast.message("Cart wiring comes in Phase 3.", {
          description: `Would add ${quantity} × ${product.title} (${state.variant.title})`,
        });
      }}
      className="h-14 w-full bg-ink text-paper text-xs tracking-[0.22em] uppercase hover:bg-brand"
    >
      Add to cart — ${Number(state.variant.price.amount).toFixed(0)} {state.variant.price.currencyCode}
    </Button>
  );
}
