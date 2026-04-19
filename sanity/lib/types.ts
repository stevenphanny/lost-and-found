import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  asset: {
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  } | null;
  alt?: string | null;
};

export type Homepage = {
  heroVideoUrl: string | null;
  heroPosterUrl: string | null;
  heroHeadline: string | null;
  campaignTitle: string | null;
  campaignBody: string | null;
  campaignImage: SanityImage | null;
  campaignCtaLabel: string | null;
  campaignCtaHref: string | null;
  manifestoTitle: string | null;
  manifestoBody: string | null;
} | null;

export type LookbookImage = {
  alt: string | null;
  asset: SanityImage["asset"];
};

export type Lookbook = {
  images: LookbookImage[] | null;
} | null;

export type LegalPage = {
  title: string;
  slug: string;
  body: PortableTextBlock[];
} | null;

export type SizeGuideRow = {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
};

export type SizeGuide = {
  title: string;
  rows: SizeGuideRow[];
} | null;
