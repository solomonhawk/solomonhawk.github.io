import { Post } from "../types/post";

export function sortPosts(posts: Post[]): Post[] {
  posts.sort(
		(a: Post, b: Post) =>
			new Date(b.frontmatter.publishDate).valueOf() -
			new Date(a.frontmatter.publishDate).valueOf()
	);

  return posts;
}