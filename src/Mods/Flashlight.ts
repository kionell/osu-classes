import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class Flashlight extends Mod {
  name = 'Flashlight';
  acronym = 'FL';
  bitwise: ModBitwise = ModBitwise.Flashlight;
  type: ModType = ModType.DifficultyIncrease;
  multiplier = 1.12;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.None;
}
