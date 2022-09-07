import type { MarkdownInstance, MDXInstance } from 'astro'

import * as t from 'io-ts';

const PostSchemaRequired = t.type({
  title: t.string,
  description: t.string,
  publishDate: t.string,
});

const PostSchemaOptional = t.partial({
  tags: t.array(t.string),
  markdown: t.string,
});

export const PostSchema = t.intersection([PostSchemaRequired, PostSchemaOptional]);

export type PostData = t.TypeOf<typeof PostSchema>;

export type Post = MarkdownInstance<PostData> | MDXInstance<PostData>;
