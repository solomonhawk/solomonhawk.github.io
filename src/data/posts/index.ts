import type { CollectionEntry } from 'astro:content';

export function filterDrafts(
  posts: CollectionEntry<'posts'>[],
): CollectionEntry<'posts'>[] {
  if (import.meta.env.SHOW_DRAFTS === 'true') {
    return posts;
  }

  return posts.filter((post) => !post.data.tags?.includes('draft'));
}

export function sortPosts(
  posts: CollectionEntry<'posts'>[],
): CollectionEntry<'posts'>[] {
  posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  return posts;
}
