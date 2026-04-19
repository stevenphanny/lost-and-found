import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import { shop } from "@/lib/shop";

export async function FeaturedProducts() {
  const products = await shop.getProducts({ first: 2 });
  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-10 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-xs tracking-[0.22em] uppercase text-muted-1">New in</span>
        <Link
          href="/catalog"
          className="text-xs tracking-[0.22em] uppercase border-b border-ink pb-0.5 transition-colors hover:text-brand hover:border-brand"
        >
          All →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 max-w-2xl">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
