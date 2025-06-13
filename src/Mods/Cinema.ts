import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class Cinema extends Mod {
  name = 'Cinema';
  acronym = 'CN';
  bitwise: ModBitwise = ModBitwise.Cinema;
  type: ModType = ModType.Fun;
  multiplier = 1;
  isRanked = false;
  isUserPlayable = false;

  incompatibles: ModBitwise = ModBitwise.NoFail |
    ModBitwise.SuddenDeath |
    ModBitwise.Perfect |
    ModBitwise.Relax |
    ModBitwise.Relax2 |
    ModBitwise.SpunOut |
    ModBitwise.Autoplay;
}
