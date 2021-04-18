import { IMod } from './IMod';

import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';

export abstract class Cinema implements IMod {
  name = 'Cinema';

  acronym = 'CN';

  bitwise: ModBitwise = ModBitwise.Cinema;

  type: ModType = ModType.Fun;

  multiplier = 1;

  isRanked = false;

  incompatibles: ModBitwise = ModBitwise.Autoplay;
}
