import { Post } from "../types/post";

export const groupTagsByCount = (posts: Post[])=> {
  const tagsByCount = posts.reduce((t, post) => {
    for (const tag of post.frontmatter.tags || []) {
      t[tag] = (t[tag] || 0) + 1;
    }

    return t;
  }, {} as Record<string, number>);

  return Object.entries(tagsByCount).sort(([a, av], [b, bv]) => {
    if (bv === av) {
      return a.localeCompare(b);
    }

    return bv - av;
  }).map(([tag, count]) => ({
    tag,
    count,
  }))
}