import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class Relax extends Mod {
  name = 'Relax';
  acronym = 'RX';
  bitwise: ModBitwise = ModBitwise.Relax;
  type: ModType = ModType.Automation;
  multiplier = 1;
  isRanked = false;

  incompatibles: ModBitwise = ModBitwise.NoFail |
    ModBitwise.SuddenDeath |
    ModBitwise.Perfect |
    ModBitwise.Autoplay |
    ModBitwise.Cinema |
    ModBitwise.Relax2;
}
