import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class NoFail extends Mod {
  name = 'No Fail';
  acronym = 'NF';
  bitwise: ModBitwise = ModBitwise.NoFail;
  type: ModType = ModType.DifficultyReduction;
  multiplier = 0.5;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.SuddenDeath |
    ModBitwise.Perfect |
    ModBitwise.Autoplay |
    ModBitwise.Cinema |
    ModBitwise.Relax |
    ModBitwise.Relax2;
}
