import { ProductCard } from "@/components/product/product-card";
import { shop } from "@/lib/shop";

export async function RelatedProducts({ excludeHandle }: { excludeHandle: string }) {
  const all = await shop.getProducts();
  const related = all.filter((p) => p.handle !== excludeHandle).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
        <p className="mb-3 text-xs tracking-[0.22em] uppercase text-muted-1">
          You may also like
        </p>
        <h2 className="mb-10 text-2xl tracking-[-0.02em] md:text-3xl">
          More in rotation
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
