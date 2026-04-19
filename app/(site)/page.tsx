import { Campaign } from "@/components/home/campaign";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { LookbookStrip } from "@/components/home/lookbook-strip";
import { Manifesto } from "@/components/home/manifesto";
import { Newsletter } from "@/components/home/newsletter";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery, lookbookQuery } from "@/sanity/lib/queries";
import type { Homepage, Lookbook } from "@/sanity/lib/types";

/**
 * Copy shown when Sanity has no homepage doc yet. Tuned so the page
 * still reads as the brand on a fresh install.
 */
const fallback = {
  heroHeadline: "Lost in a dream",
  campaignTitle: "Season 01 — Found in the fog",
  campaignBody:
    "A four-piece drop of heavyweight essentials. Cut, printed, and finished in small runs. Here until the next one.",
  campaignCtaLabel: "See the drop",
  campaignCtaHref: "/catalog",
  campaign2Title: "Made to last longer than the season.",
  campaign2Body:
    "Constructed for movement, finished by hand. Each piece runs in editions of 50.",
  campaign2CtaLabel: "Shop now",
  campaign2CtaHref: "/catalog",
  manifestoTitle: "Small runs. Worn harder.",
  manifestoBody:
    "Every piece is made with one thing in mind — wearing it until it feels like yours.\n\nNo seasonal churn, no trend-chasing. We put out a few things, then we put out a few more.\n\nLost and Found is a name, a tag, and a reminder to slow down long enough to notice what you pick up.",
  campaign1Image: {
    asset: {
      url: "/lost-and-found-images/conroy-back-light.png",
    },
  },
  campaign2Image: {
    asset: {
      url: "/lost-and-found-images/angel-main.JPG",
    },
  },

  };

export default async function HomePage() {
  const [homepage, lookbook] = await Promise.all([
    sanityFetch<Homepage>(homepageQuery, {}, { tags: ["sanity", "homepage"] }).catch(
      () => null
    ),
    sanityFetch<Lookbook>(lookbookQuery, {}, { tags: ["sanity", "lookbook"] }).catch(
      () => null
    ),
  ]);

  return (
    <>
      {/* Hero Video */}
      <Hero
        videoUrl={homepage?.heroVideoUrl ?? null}
        posterUrl={homepage?.heroPosterUrl ?? null}
        headline={homepage?.heroHeadline ?? fallback.heroHeadline}
      />
      {/* Campaign 1 Image left */}
      <Campaign
        title={homepage?.campaignTitle ?? fallback.campaignTitle}
        body={homepage?.campaignBody ?? fallback.campaignBody}
        image={homepage?.campaignImage ?? fallback.campaign1Image}
        ctaLabel={homepage?.campaignCtaLabel ?? fallback.campaignCtaLabel}
        ctaHref={homepage?.campaignCtaHref ?? fallback.campaignCtaHref}
      />
      {/* Campaign 2 Image right*/}
      <Campaign
        title={homepage?.campaign2Title ?? fallback.campaign2Title}
        body={homepage?.campaign2Body ?? fallback.campaign2Body}
        image={homepage?.campaign2Image ?? fallback.campaign2Image}
        ctaLabel={homepage?.campaign2CtaLabel ?? fallback.campaign2CtaLabel}
        ctaHref={homepage?.campaign2CtaHref ?? fallback.campaign2CtaHref}
        imagePosition="right"
      />
      <FeaturedProducts />
      <Manifesto
        title={homepage?.manifestoTitle ?? fallback.manifestoTitle}
        body={homepage?.manifestoBody ?? fallback.manifestoBody}
      />
      {lookbook?.images?.length ? <LookbookStrip images={lookbook.images} /> : null}
      <Newsletter />
    </>
  );
}
