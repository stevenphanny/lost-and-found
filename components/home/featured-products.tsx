import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import { shop } from "@/lib/shop";

export async function FeaturedProducts() {
  const products = await shop.getProducts({ first: 3 });
  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
        <div>
          <p className="mb-4 text-xs tracking-[0.22em] uppercase text-muted-1">
            Featured
          </p>
          <h2 className="text-4xl tracking-[-0.02em] md:text-5xl">
            New in rotation
          </h2>
        </div>
        <Link
          href="/catalog"
          className="shrink-0 border-b border-ink pb-1 text-xs tracking-[0.22em] uppercase transition-colors hover:text-brand hover:border-brand"
        >
          All products
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
