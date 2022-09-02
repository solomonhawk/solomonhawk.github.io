import type { MarkdownInstance, MDXInstance } from 'astro'

type PostData = {
  title: string;
  publishDate: string;
  description: string;
  tags: string[];
}

export type Post = MarkdownInstance<PostData> | MDXInstance<PostData>;