import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/shop/types";

function formatPrice(amount: string, currencyCode: string) {
  const n = Number(amount);
  if (Number.isNaN(n)) return `${currencyCode} ${amount}`;
  return `$${n.toFixed(0)} ${currencyCode}`;
}

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [primary, secondary] = product.images;
  const soldOut =
    !product.availableForSale ||
    product.variants.every((v) => !v.availableForSale);
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  return (
    <Link
      href={`/catalog/${product.handle}`}
      className="group block"
      aria-label={`${product.title} — ${price}`}
    >
      <div className="relative aspect-[5/6] w-full overflow-hidden">
        {primary ? (
          <Image
            src={primary.url}
            alt={primary.altText ?? product.title}
            width={primary.width ?? 800}
            height={primary.height ?? 1000}
            sizes="(min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="h-full w-full object-contain transition-opacity duration-500 ease-[var(--ease-brand)] group-hover:opacity-0"
          />
        ) : null}
        {secondary ? (
          <Image
            src={secondary.url}
            alt={secondary.altText ?? `${product.title} alternate view`}
            width={secondary.width ?? 800}
            height={secondary.height ?? 1000}
            sizes="(min-width: 640px) 50vw, 100vw"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-[var(--ease-brand)] group-hover:opacity-100"
          />
        ) : null}
        {soldOut ? (
          <span className="absolute top-3 left-3 bg-ink px-2 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-paper">
            Sold out
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-base leading-tight tracking-[-0.01em] md:text-lg">
          {product.title}
        </h3>
        <p className="text-sm tabular-nums text-muted-1">{price}</p>
      </div>
    </Link>
  );
}
