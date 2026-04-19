import type { Metadata } from "next";

import { LegalPortableText } from "@/components/legal/portable-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { legalPageQuery } from "@/sanity/lib/queries";
import type { LegalPage } from "@/sanity/lib/types";

type Params = { slug: string };

const TITLES: Record<string, string> = {
  privacy: "Privacy policy",
  terms: "Terms of service",
  returns: "Returns & exchanges",
  shipping: "Shipping",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fallback = TITLES[slug];
  const doc = await sanityFetch<LegalPage>(
    legalPageQuery,
    { slug },
    { tags: ["sanity", "legal", `legal:${slug}`] }
  ).catch(() => null);
  return { title: doc?.title ?? fallback ?? "Legal" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const doc = await sanityFetch<LegalPage>(
    legalPageQuery,
    { slug },
    { tags: ["sanity", "legal", `legal:${slug}`] }
  ).catch(() => null);

  const fallbackTitle = TITLES[slug] ?? null;
  const title = doc?.title ?? fallbackTitle ?? "Legal";

  return (
    <article className="mx-auto w-full max-w-[760px] px-6 py-16 md:px-10 md:py-24">
      <p className="mb-4 text-xs tracking-[0.22em] uppercase text-muted-1">
        Legal
      </p>
      <h1 className="mb-10 text-4xl tracking-[-0.02em] md:mb-14 md:text-5xl text-balance">
        {title}
      </h1>
      {doc?.body?.length ? (
        <div className="prose prose-neutral prose-headings:font-display prose-headings:tracking-[-0.02em] prose-a:text-ink prose-a:underline-offset-4 max-w-none">
          <LegalPortableText value={doc.body} />
        </div>
      ) : (
        <div className="border-t border-hairline pt-8 text-sm text-muted-1">
          <p className="text-pretty">
            This page is awaiting content. Publish a{" "}
            <code className="rounded-sm bg-muted-3 px-1.5 py-0.5 text-xs">
              legalPage
            </code>{" "}
            document in Sanity Studio with slug{" "}
            <code className="rounded-sm bg-muted-3 px-1.5 py-0.5 text-xs">
              {slug}
            </code>{" "}
            to populate it.
          </p>
        </div>
      )}
    </article>
  );
}
