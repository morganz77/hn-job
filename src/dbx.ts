import { Dropbox } from 'dropbox';
import { Item } from './hnutils';
import { DropAccessToken } from './private';
import fetch from 'node-fetch';

const CACHE_FILE = '/hn-job.json';

const dbx = new Dropbox({
  accessToken: DropAccessToken,
  fetch: fetch,
});

async function read(): Promise<number[]> {
  try {
    const db = await dbx.filesDownload({ path: CACHE_FILE });
    const buffer: Buffer = (<any>db.result).fileBinary;
    const records: number[] = JSON.parse(buffer.toString('utf8'));
    return records;
  } catch (e) {
    console.error(JSON.stringify(e));
    return [];
  }
}

async function write(itemIds: number[]): Promise<void> {
  await dbx.filesUpload({
    path: CACHE_FILE,
    contents: JSON.stringify(itemIds),
    mode: { '.tag': 'overwrite' },
  });
}

async function filterExisting(items: Item[]): Promise<Item[]> {
  const existing = await read();
  return items.filter((item) => !existing.includes(item.id));
}

async function addToExisting(itemIds: number[]): Promise<void> {
  const existing = await read();
  await write([...existing, ...itemIds]);
}

export { filterExisting, addToExisting };
