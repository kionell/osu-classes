import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class Perfect extends Mod {
  name = 'Perfect';
  acronym = 'PF';
  bitwise: ModBitwise = ModBitwise.Perfect;
  type: ModType = ModType.DifficultyIncrease;
  multiplier = 1;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.NoFail |
    ModBitwise.SuddenDeath |
    ModBitwise.Autoplay |
    ModBitwise.Cinema |
    ModBitwise.Relax |
    ModBitwise.Relax2;
}
