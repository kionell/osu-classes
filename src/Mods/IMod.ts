import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';

export interface IMod {
  /**
   * The name of this mod.
   */
  name: string;

  /**
   * The shortened name of this mod.
   */
  acronym: string;

  /**
   * Bitwise number of this mod.
   */
  bitwise: ModBitwise;

  /**
   * The type of this mod.
   */
  type: ModType;

  /**
   * The score multiplier of this mod.
   */
  multiplier: number;

  /**
   * Whether scores with this mod active can give performance points.
   */
  isRanked: boolean;

  /**
   * Whether this mod can be played by a real human user.
   * Non-user-playable mods are not viable for single-player score submission.
   * 
   * For example: Double Time is user-playable and Autoplay is not user-playable. 
   */
  isUserPlayable: boolean;

  /**
   * Incompatible mods.
   */
  incompatibles: ModBitwise;
}
