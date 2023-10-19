import fg from 'fast-glob';
import { isRight } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import fs from 'fs';
import GithubSlugger from 'github-slugger';
import os from 'os';
import path from 'path';

import { PostData, PostSchema } from '../../src/types/post';
import config from './config';

const slugger = new GithubSlugger();

type DBPost = {
  title: string;
  markdown: string;
  modifiedAt: number;
  tags: string;
};

type FileInfoMap = {
  [key: string]: {
    filename: string;
    info: ReturnType<typeof path.parse>;
    found: boolean;
    path: string | null;
  };
};

export async function readJSONFromStdIn(): Promise<DBPost[]> {
  const data = await fs.promises.readFile('/dev/stdin', 'utf-8');
  return JSON.parse(data);
}

export function parsePost(post: DBPost): O.Option<PostData> {
  console.log(`> Parsing "${post.title}" from JSON`);

  const postData: PostData = {
    title: post.title,
    // TODO: can I do better to determine a description for this post?
    description: post.title,
    markdown: post.markdown,
    publishDate: postDate(post.modifiedAt),
    tags: filterBearTags(JSON.parse(post.tags) || []),
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

/**
 * Filters out tags that are specific to Bear which are prefixed with a hashtag.
 * Removes "published" from the remaining tags.
 *
 * @param {string[]} tags a list of tags to filter
 * @returns {string[]} the filtered tags
 */
function filterBearTags(tags: string[]): string[] {
  return tags
    .map((tag) => tag.replace(new RegExp(config.blogTagPattern), ''))
    .filter(Boolean)
    .filter((tag) => tag !== 'published');
}

export function convertToMarkdown(post: PostData): {
  filename: string;
  markdown: string;
} {
  console.log(`> Converting "${post.title}" to MDX`);

  const filename = slugger.slug(post.title);

  return {
    filename,
    markdown: `---
layout: '${config.defaultLayout}'
title: ${post.title}
publishDate: ${post.publishDate}
tags: [${post.tags?.join(', ')}]
---
${pipe(
  post.markdown?.trim() || '',
  stripNoteTitle,
  stripBearTags,
  rewriteImageRefs(filename),
).trim()}
`,
  };
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
  return markdown.replace(/(?<!`)\B#[\w\/-]+\b/gm, '');
}

export function extractImageFilenames(imageFilenames: Set<string>) {
  return (post: { filename: string; markdown: string }) => {
    // matches the URL in a markdown image tag like `![alt text](<url>)`
    const pattern = /^!\[.*\]\((?<filename>.+\.\w+)\)$/gm;
    let result;

    while ((result = pattern.exec(post.markdown)) !== null) {
      if (!result?.groups?.filename) {
        console.error(
          `[!] Failed to extract image filename for "${post.filename}"`,
        );
        continue;
      }

      // convert the asset URL into an absolute path on disk
      // e.g. /assets/images/2021-09-13/image.png => /Users/solomonhawk/Code/Personal/solomonhawk.github.io/public/assets/2021-09-13/image.png
      imageFilenames.add(
        path.join(process.cwd(), 'public', result.groups.filename),
      );
    }

    return post;
  };
}

/**
 * Converts Bear's image references with markdown to render a local image file
 * from the Astro assets.
 *
 * @param {string} markdown Markdown string with possible embedded image refs
 * @returns Markdown with image refs transformed to image tags
 */
function rewriteImageRefs(filename: string): (markdown: string) => string {
  return (markdown: string) => {
    return markdown.replace(
      /!\[.*\]\((.+)\.(\w+)\)$/gm,
      `![$1](${path.join(config.assetsUrl, filename)}/$1.$2)`,
    );
  };
}

export function writePostAsMarkdown({
  filename,
  markdown,
}: {
  filename: string;
  markdown: string;
}): void {
  const relPath = path.join('./', config.postsPath, `${filename}.mdx`);
  const fullPath = path.resolve(__dirname, '../../', relPath);

  console.log(`> Writing ${relPath}`);

  fs.writeFileSync(fullPath, markdown);
}

export async function copyFilesToAssets(filenames: Set<string>): Promise<void> {
  const fileInfos: FileInfoMap = collectFileInfos(filenames);

  for (const searchDir of config.imageSearchPaths) {
    for await (const file of streamMatches(searchDir, fileInfos)) {
      updateFileInfos(fileInfos, file);
    }
  }

  for (const entry in fileInfos) {
    if (!fileInfos[entry].found || !fileInfos[entry].path) {
      console.error(`[!] Failed to find "${entry}" in search paths`);
      continue;
    }

    try {
      // ensure the destination directory exists for this post before copying
      await fs.promises.mkdir(fileInfos[entry].info.dir, { recursive: true });
      await fs.promises.copyFile(
        fileInfos[entry].path!,
        fileInfos[entry].filename,
      );
      console.log(`> Copied "${entry}" to "${fileInfos[entry].info.dir}"`);
    } catch (err) {
      console.error(`[!] Failed to copy "${entry}" to assets`);
    }
  }
}

function collectFileInfos(filenames: Set<string>): FileInfoMap {
  return Object.fromEntries(
    Array.from(filenames).map((filename) => {
      const info = path.parse(filename);
      return [info.base, { filename, info, found: false, path: null }];
    }),
  );
}

function streamMatches(
  dir: string,
  fileInfos: FileInfoMap,
): NodeJS.ReadableStream {
  // "$SEARCHDIR/**/*@(file1|file2|file3)", glob match for exactly the files we want
  const pattern = path.join(
    dir,
    '**',
    `@(${Object.keys(fileInfos).join('|')})`,
  );
  return fg.stream(resolveDir(pattern), {
    followSymbolicLinks: false,
    suppressErrors: true,
  });
}

function updateFileInfos(fileInfos: FileInfoMap, file: string | Buffer): void {
  if (typeof file !== 'string') {
    console.warn(`[!] Unexpected file type Buffer: ${file}`);
    return;
  }

  const info = path.parse(file);

  fileInfos[info.base].found = true;
  fileInfos[info.base].path = file;
}

function resolveDir(dir: string): string {
  return dir.replace('~', os.homedir());
}
