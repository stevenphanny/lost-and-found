"use client";

import { useState } from "react";

import { ProductCta } from "@/components/product/product-cta";
import { QuantityStepper } from "@/components/product/quantity-stepper";
import { SizeSelector } from "@/components/product/size-selector";
import type { Product } from "@/lib/shop/types";

function formatPrice(amount: string, currencyCode: string) {
  const n = Number(amount);
  if (Number.isNaN(n)) return `${currencyCode} ${amount}`;
  return `$${n.toFixed(0)} ${currencyCode}`;
}

export function ProductInfo({
  product,
  accordions,
}: {
  product: Product;
  accordions: React.ReactNode;
}) {
  const defaultVariant =
    product.variants.find((v) => v.availableForSale)?.id ??
    product.variants[0]?.id ??
    null;
  const [selectedId, setSelectedId] = useState<string | null>(defaultVariant);
  const [quantity, setQuantity] = useState(1);

  const selected = product.variants.find((v) => v.id === selectedId) ?? null;
  const max = Math.max(1, selected?.quantityAvailable ?? 1);
  const qty = Math.min(quantity, max);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl leading-tight tracking-[-0.02em] md:text-4xl text-balance">
          {product.title}
        </h1>
        <p className="mt-3 text-base text-muted-1">
          {formatPrice(
            product.priceRange.minVariantPrice.amount,
            product.priceRange.minVariantPrice.currencyCode
          )}
        </p>
      </header>

      <SizeSelector
        variants={product.variants}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id);
          setQuantity(1);
        }}
      />

      <QuantityStepper
        value={qty}
        max={max}
        onChange={setQuantity}
        disabled={!selected?.availableForSale}
      />

      <ProductCta
        product={product}
        selectedVariantId={selectedId}
        quantity={qty}
      />

      {accordions}
    </div>
  );
}
