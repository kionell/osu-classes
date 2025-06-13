import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class Hidden extends Mod {
  name = 'Hidden';
  acronym = 'HD';
  bitwise: ModBitwise = ModBitwise.Hidden;
  type: ModType = ModType.DifficultyIncrease;
  multiplier = 1.06;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.None;
}
