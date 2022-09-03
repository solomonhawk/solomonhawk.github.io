import { pipe } from 'fp-ts/lib/function';
import * as ra from 'fp-ts/ReadonlyArray';
import { readJSONFromStdIn, convertToMarkdown, parsePost, writePostAsMarkdown } from './lib';

async function main() {
  pipe(
    await readJSONFromStdIn(),
    ra.filterMap(parsePost),
    ra.map(convertToMarkdown),
    ra.map(writePostAsMarkdown)
  );

  console.log('> Finished processing JSON.');
}

main();
