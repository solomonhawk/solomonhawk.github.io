import type { CollectionEntry } from 'astro:content';

export const groupTagsByCount = (posts: CollectionEntry<'posts'>[]) => {
  const tagsByCount = posts.reduce(
    (t, post) => {
      for (const tag of post.data.tags || []) {
        t[tag] = (t[tag] || 0) + 1;
      }

      return t;
    },
    {} as Record<string, number>,
  );

  return Object.entries(tagsByCount)
    .sort(([a, av], [b, bv]) => {
      if (bv === av) {
        return a.localeCompare(b);
      }

      return bv - av;
    })
    .map(([tag, count]) => ({
      tag,
      count,
    }));
};
