import { SampleSet } from './Enums/SampleSet';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { HitSample } from './HitSample';

export class SampleBank {
  /**
   * An optional overriding filename which causes all 
   * bank/sample specifications to be ignored.
   */
  filename = '';

  /**
   * Hit sample volume (0-100).
   * See {@link HitSample.volume}.
   */
  volume = 100;

  /**
   * The bank identifier to use for the base ("hitnormal") sample.
   * Transferred to the bank of a hit sample when appropriate.
   */
  normalSet: SampleSet = SampleSet.None;

  /**
   * The bank identifier to use for additions ("hitwhistle", "hitfinish", "hitclap").
   * Transferred to the bank of a hit sample when appropriate.
   */
  additionSet: SampleSet = SampleSet.None;

  /**
   * The index of the custom sample bank. Is only used if 2 or above for "reasons".
   * This will add a suffix to lookups, allowing extended bank lookups (ie. "normal-hitnormal-2").
   * See {@link HitSample.suffix}.
   */
  customIndex = 0;

  /**
   * Creates a copy of this sample bank.
   * Non-primitive properties will be copied via their own clone() method.
   * @returns A copied sample bank.
   */
  clone(): SampleBank {
    return Object.assign(new SampleBank(), this);
  }
}
