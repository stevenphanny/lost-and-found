import Image from "next/image";
import Link from "next/link";

import type { SanityImage } from "@/sanity/lib/types";

type CampaignProps = {
  title: string;
  body: string;
  image: SanityImage | null;
  ctaLabel: string;
  ctaHref: string;
};

export function Campaign({ title, body, image, ctaLabel, ctaHref }: CampaignProps) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted-3 md:col-span-7 md:aspect-[4/5]">
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
        <div className="flex flex-col justify-center md:col-span-5">
          <p className="mb-4 text-xs tracking-[0.22em] uppercase text-muted-1">
            Campaign
          </p>
          <h2 className="text-4xl tracking-[-0.02em] md:text-5xl lg:text-6xl text-balance">
            {title}
          </h2>
          <p className="mt-6 max-w-[45ch] text-base text-muted-1 text-pretty md:text-lg">
            {body}
          </p>
          <div className="mt-10">
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
