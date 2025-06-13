import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class SuddenDeath extends Mod {
  name = 'Sudden Death';
  acronym = 'SD';
  bitwise: ModBitwise = ModBitwise.SuddenDeath;
  type: ModType = ModType.DifficultyIncrease;
  multiplier = 1;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.NoFail |
    ModBitwise.Perfect |
    ModBitwise.Autoplay |
    ModBitwise.Cinema |
    ModBitwise.Relax |
    ModBitwise.Relax2;
}
