import { isRight } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import fs from 'fs';
import path from 'path';
import { PostData, PostSchema } from '../../src/types/post';

type DBPost = {
  title: string;
  markdown: string;
  modifiedAt: number;
  tags: string;
}

export async function readJSONFromStdIn(): Promise<DBPost[]> {
  const data = await fs.promises.readFile('/dev/stdin', 'utf-8');
  return JSON.parse(data);
}

export function parsePost(post: DBPost): O.Option<PostData> {
  console.log(`> Parsing "${post.title}" from JSON`);

  const postData: PostData = {
    title: post.title,
    markdown: post.markdown,
    publishDate: postDate(post.modifiedAt),
    tags: filterBearTags(JSON.parse(post.tags) || [])
  };

  if (isRight(PostSchema.decode(postData))) {
    return O.some(postData);
  }

  console.log(`[!] Failed to parse "${post.title}" from JSON`);

  return O.none;
}

function postDate(date: number): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function filterBearTags(tags: string[]): string[] {
  return tags.map(tag => tag.replace(/^(blog\/solomonhawk\/?)|(blog\/?)/, '')).filter(Boolean).filter(tag => tag !== 'published');
}

export function convertToMarkdown(post: PostData): { filename: string, markdown: string } {
  console.log(`> Converting "${post.title}" to MDX`);

  return {
    filename: slugify(post.title),
    markdown: `---
layout: '@layouts/BlogPost.astro'
title: ${post.title}
publishDate: ${post.publishDate}
tags: [${post.tags?.join(', ')}]
---
${pipe(post.markdown?.trim() || '', stripNoteTitle, stripBearTags).trim()}
`};
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/ /g, '-');
}

/**
 * Removes the first line of the note (H1 title).
 *
 * @param {string} markdown Markdown note
 * @returns string with title removed
 */
function stripNoteTitle(markdown: string): string {
  return markdown.replace(/^#\s.*$/m, '');
}

/**
 * Removes tags that are specific to Bear which are prefixed with a hashtag and
 * may contain forward slashes.
 *
 * @param {string} markdown Markdown string with Bear tags
 * @returns string with Bear tags removed
 */
function stripBearTags(markdown: string): string {
  return markdown.replace(/(?<!`)\B#[\w\/]+\b/gm, '');
}

export function writePostAsMarkdown({filename, markdown}: { filename: string, markdown: string }): void {
  const relPath = `./src/pages/writing/posts/${filename}.mdx`;
  const fullPath = path.resolve(__dirname, '../../', relPath);

  console.log(`> Writing ${relPath}`);

  fs.writeFileSync(fullPath, markdown);
}
