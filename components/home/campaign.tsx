import Image from "next/image";
import Link from "next/link";

import type { SanityImage } from "@/sanity/lib/types";

type CampaignProps = {
  title: string;
  body: string;
  image: SanityImage | null;
  ctaLabel: string;
  ctaHref: string;
  imagePosition?: "left" | "right";
};

export function Campaign({ title, body, image, ctaLabel, ctaHref, imagePosition = "left" }: CampaignProps) {
  const imageCol = imagePosition === "right" ? "md:col-start-6 md:col-span-7 md:row-start-1" : "md:col-span-7";
  const textCol = imagePosition === "right" ? "md:col-start-1 md:col-span-5 md:row-start-1" : "md:col-span-5";

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-10 md:py-16">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className={`relative aspect-[4/5] w-full overflow-hidden bg-muted-3 ${imageCol}`}>
          {image?.asset?.url ? (
            <Image
              src={image.asset.url}
              alt={image.alt ?? title}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              placeholder={image.asset.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image.asset.metadata?.lqip}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-muted-3 via-muted-2/40 to-muted-3" />
          )}
        </div>
        <div className={`flex flex-col justify-center ${textCol}`}>
          <h2 className="text-3xl tracking-[-0.02em] md:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          <p className="mt-4 max-w-[40ch] text-sm text-muted-1 text-pretty">
            {body}
          </p>
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-xs tracking-[0.22em] uppercase transition-colors hover:text-brand hover:border-brand"
            >
              {ctaLabel}
              <span
                aria-hidden="true"
                className="translate-x-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
