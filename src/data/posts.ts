import { Post } from '../types/post';

export function filterDrafts(posts: Post[]): Post[] {
  if (import.meta.env.SHOW_DRAFTS === 'true') {
    return posts;
  }

  return posts.filter((post) => !post.frontmatter.tags?.includes('draft'));
}

export function sortPosts(posts: Post[]): Post[] {
  posts.sort(
    (a: Post, b: Post) =>
      new Date(b.frontmatter.publishDate).valueOf() -
      new Date(a.frontmatter.publishDate).valueOf(),
  );

  return posts;
}
