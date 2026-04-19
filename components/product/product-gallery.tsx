"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Image as ShopImage } from "@/lib/shop/types";

export function ProductGallery({
  images,
  title,
}: {
  images: ShopImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/5] w-full bg-muted-3" aria-hidden="true" />
    );
  }

  const current = images[active]!;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      {/* Desktop thumbnail strip — hidden on mobile */}
      <div className="order-2 hidden shrink-0 flex-col gap-3 md:order-1 md:flex md:w-20">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
            className={`relative aspect-[4/5] w-full overflow-hidden border transition-colors ${
              i === active ? "border-ink" : "border-hairline hover:border-muted-1"
            }`}
          >
            <Image
              src={img.url}
              alt=""
              width={img.width ?? 200}
              height={img.height ?? 250}
              sizes="80px"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Primary image — desktop shows active, mobile swipes horizontally */}
      <div className="order-1 flex-1 md:order-2">
        {/* Mobile: horizontal swipe carousel with dots */}
        <div className="md:hidden">
          <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
            {images.map((img, i) => (
              <div
                key={img.url}
                className="relative aspect-[4/5] w-full shrink-0 snap-center bg-muted-3"
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? `${title} image ${i + 1}`}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`h-1 w-4 ${i === 0 ? "bg-ink" : "bg-muted-2"}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: click primary to open lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label={`Open ${title} in fullscreen`}
              className="group relative hidden aspect-[4/5] w-full overflow-hidden bg-muted-3 md:block"
            >
              <Image
                src={current.url}
                alt={current.altText ?? title}
                width={current.width ?? 800}
                height={current.height ?? 1000}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="h-full w-full object-cover"
              />
              <span className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center bg-paper/80 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>
          </DialogTrigger>
          <DialogContent
            showCloseButton
            className="h-[92vh] max-w-[95vw] border-none bg-ink/95 p-0 sm:max-w-[95vw]"
          >
            <DialogTitle className="sr-only">{title} — fullscreen view</DialogTitle>
            <div className="relative h-full w-full">
              <Image
                src={current.url}
                alt={current.altText ?? title}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
