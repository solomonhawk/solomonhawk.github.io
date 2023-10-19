import { defineCollection } from 'astro:content';

import { postSchema } from '@/data/posts/schema';

const postsCollection = defineCollection({
  type: 'content',
  schema: postSchema,
});

export const collections = {
  posts: postsCollection,
};
