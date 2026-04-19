import Image from "next/image";

import type { LookbookImage } from "@/sanity/lib/types";

type LookbookStripProps = {
  images: LookbookImage[];
};

export function LookbookStrip({ images }: LookbookStripProps) {
  const items = images.filter((i) => i.asset?.url);
  if (items.length === 0) return null;

  return (
    <section className="w-full py-8 md:py-12">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 md:gap-4 md:px-10">
        {items.map((img, i) => (
          <figure
            key={i}
            className="relative aspect-[3/4] w-[72vw] shrink-0 snap-start overflow-hidden bg-muted-3 md:w-[34vw] lg:w-[24vw]"
          >
            {img.asset?.url ? (
              <Image
                src={img.asset.url}
                alt={img.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 768px) 34vw, 72vw"
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
