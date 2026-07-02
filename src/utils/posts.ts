import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Publishing gate for blog posts.
 *
 * A post is live only if it is not a draft AND its `pubDate` lies in the past.
 * A missing, commented-out, or future `pubDate` keeps the post out of every
 * listing, the RSS feed, and its own route (no page is built for it).
 *
 * Note: because the build is static, a future-dated post only appears once the
 * site is rebuilt after that date has passed — schedule a periodic rebuild if
 * you rely on future pubDates to publish automatically.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
  const now = Date.now();
  const posts = await getCollection("blog", ({ data }) => {
    if (data.draft) return false;
    if (!data.pubDate) return false;
    return data.pubDate.valueOf() <= now;
  });
  return posts.sort(
    (a, b) => b.data.pubDate!.valueOf() - a.data.pubDate!.valueOf(),
  );
}
