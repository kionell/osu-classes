import { HitType } from './Enums/HitType';
import { HitSound, HitSample } from '../Audio';
import { HitWindows } from '../Scoring';

/**
 * A hit object.
 */
export interface IHitObject {
  /**
   * The time at which hit object starts.
   */
  startTime: number;

  /**
   * Hit type data of this hit object.
   */
  hitType: HitType;

  /**
   * Hit sound data of this hit object.
   * Use {@link samples} to work with hitsound data.
   * @deprecated
   */
  hitSound: HitSound;

  /**
   * Samples of this hit object.
   */
  samples: HitSample[];

  /**
   * Hit windows of this hit object.
   * Not every type of hit objects has hit windows.
   * This will be removed soon.
   * @deprecated
   */
  hitWindows: HitWindows;

  /**
   * Creates a new copy of this hit object.
   * @returns a copy of this hit object.
   */
  clone(): IHitObject;
}
