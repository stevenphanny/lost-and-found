import { sanityClient } from "./client";

type FetchOptions = {
  tags?: string[];
  revalidate?: number | false;
};

/**
 * Typed Sanity fetch that slots into the Next.js cache tagging
 * system. Default revalidation is 60s; webhooks should call
 * `revalidateTag` on one of the `tags` to flush explicitly.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: FetchOptions = {}
): Promise<T> {
  const { tags = ["sanity"], revalidate = 60 } = options;
  return sanityClient.fetch<T>(query, params, {
    next: { tags, revalidate },
  });
}
