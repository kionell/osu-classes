import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class NoMod extends Mod {
  name = 'No Mod';
  acronym = 'NM';
  bitwise: ModBitwise = ModBitwise.None;
  type: ModType = ModType.System;
  multiplier = 1;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.None;
}
