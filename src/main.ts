import PushBullet = require('pushbullet');
import { topNItems, generateNotes, Item } from './hnutils';
import { DeviceId, PushBulletApiKey } from './private';
import * as dbx from './dbx';

(async () => {
  const items = await topNItems(100);
  const sorted = items
    .filter((i) => i.score > 80)
    .sort((i1, i2) => i2.score - i1.score);
  const filtered = await dbx.filterExisting(sorted);
  const final = filtered.slice(0, 15);

  const notes = generateNotes(final);

  const pb = new PushBullet(PushBulletApiKey);
  pb.note(DeviceId, 'hn', notes);

  await dbx.addToExisting(final.map((item) => item.id));
})();
