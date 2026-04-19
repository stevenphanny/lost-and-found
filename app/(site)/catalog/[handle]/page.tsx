import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductAccordions } from "@/components/product/product-accordions";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { RelatedProducts } from "@/components/product/related-products";
import { shop } from "@/lib/shop";

type Params = { handle: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await shop.getProduct(handle);
  if (!product) return { title: "Not found" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const product = await shop.getProduct(handle);
  if (!product) notFound();

  return (
    <>
      <div className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo
            product={product}
            accordions={<ProductAccordions product={product} />}
          />
        </div>
      </div>
      <RelatedProducts excludeHandle={product.handle} />
    </>
  );
}
