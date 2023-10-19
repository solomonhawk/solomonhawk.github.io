import { z } from 'zod';

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  tags: z.array(z.string()),
  markdown: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
