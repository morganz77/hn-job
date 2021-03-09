import PushBullet = require('pushbullet');
import { topNItems, generateNotes } from './hnutils';
import { DeviceId, PushBulletApiKey } from './private';

(async () => {
  const items = await topNItems(100);
  const sorted = items
    .filter((i) => i.score > 80)
    .sort((i1, i2) => i2.score - i1.score)
    .slice(0, 15);

  const notes = generateNotes(sorted);

  const pb = new PushBullet(PushBulletApiKey);
  pb.note(DeviceId, 'hn', notes);
})();
