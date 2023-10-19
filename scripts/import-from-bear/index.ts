import { pipe } from 'fp-ts/lib/function';
import * as ra from 'fp-ts/ReadonlyArray';

import {
  convertToMarkdown,
  copyFilesToAssets,
  extractImageFilenames,
  parsePost,
  readJSONFromStdIn,
  writePostAsMarkdown,
} from './lib';

async function main() {
  const imageFilenames = new Set<string>();

  pipe(
    await readJSONFromStdIn(),
    ra.filterMap(parsePost),
    ra.map(convertToMarkdown),
    ra.map(extractImageFilenames(imageFilenames)),
    ra.map(writePostAsMarkdown),
  );

  await copyFilesToAssets(imageFilenames);

  console.log('> Finished processing JSON.');
}

main();
