import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { IMod } from './IMod';

/**
 * The base class for gameplay modifiers.
 */
export abstract class Mod implements IMod {
  abstract name: string;
  abstract acronym: string;

  bitwise: ModBitwise = ModBitwise.None;
  type: ModType = ModType.Fun;

  multiplier = 1;
  isRanked = true;
  isUserPlayable = true;

  /**
   * @deprecated Use {@link incompatibleMods} instead.
   */
  incompatibles: ModBitwise = ModBitwise.None;

  /**
   * The mods this mod cannot be enabled with.
   */
  incompatibleMods: IMod[] = [];
}
