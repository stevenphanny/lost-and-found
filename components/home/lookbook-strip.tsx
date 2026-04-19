import Image from "next/image";

import type { LookbookImage } from "@/sanity/lib/types";

type LookbookStripProps = {
  images: LookbookImage[];
};

export function LookbookStrip({ images }: LookbookStripProps) {
  const items = images.filter((i) => i.asset?.url);
  if (items.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto mb-8 flex w-full max-w-[1440px] items-end justify-between px-6 md:mb-12 md:px-10">
        <div>
          <p className="mb-4 text-xs tracking-[0.22em] uppercase text-muted-1">
            Lookbook
          </p>
          <h2 className="text-3xl tracking-[-0.02em] md:text-4xl">
            In the field
          </h2>
        </div>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:gap-6 md:px-10">
        {items.map((img, i) => (
          <figure
            key={i}
            className="relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden bg-muted-3 md:w-[38vw] lg:w-[28vw]"
          >
            {img.asset?.url ? (
              <Image
                src={img.asset.url}
                alt={img.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 38vw, 78vw"
                placeholder={img.asset.metadata?.lqip ? "blur" : undefined}
                blurDataURL={img.asset.metadata?.lqip}
                className="object-cover"
              />
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
