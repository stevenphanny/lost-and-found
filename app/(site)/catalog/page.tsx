import type { Metadata } from "next";

import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { ProductCard } from "@/components/product/product-card";
import { shop } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Catalog",
  description: "All current Lost and Found pieces.",
};

export default async function CatalogPage() {
  const products = await shop.getProducts();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-10 md:py-20">
      <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
        <div>
          <p className="mb-3 text-xs tracking-[0.22em] uppercase text-muted-1">
            All products
          </p>
          <h1 className="text-4xl tracking-[-0.02em] md:text-5xl">Catalog</h1>
        </div>
        <p className="hidden text-sm text-muted-1 md:block">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="mb-8">
        <CatalogFilters />
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-1">No products yet — check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
