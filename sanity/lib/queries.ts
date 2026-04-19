import { groq } from "next-sanity";

/** First-wins: we model homepage as a singleton but allow any doc
 * of type `homepage` in case the Studio hasn't flagged it yet. */
export const homepageQuery = groq`*[_type == "homepage"][0]{
  heroVideoUrl,
  heroPosterUrl,
  heroHeadline,
  campaignTitle,
  campaignBody,
  "campaignImage": campaignImage{
    ..., asset->{
      url,
      "metadata": metadata{ lqip, dimensions }
    }
  },
  campaignCtaLabel,
  campaignCtaHref,
  campaign2Title,
  campaign2Body,
  "campaign2Image": campaign2Image{
    ..., asset->{
      url,
      "metadata": metadata{ lqip, dimensions }
    }
  },
  campaign2CtaLabel,
  campaign2CtaHref,
  manifestoTitle,
  manifestoBody
}`;

export const lookbookQuery = groq`*[_type == "lookbook"][0]{
  "images": images[]{
    alt,
    "asset": asset->{
      url,
      "metadata": metadata{ lqip, dimensions }
    }
  }
}`;

export const legalPageQuery = groq`*[_type == "legalPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  body
}`;

export const sizeGuideQuery = groq`*[_type == "sizeGuide" && title == $title][0]{
  title,
  rows
}`;
