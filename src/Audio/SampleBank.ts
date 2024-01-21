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
  bankForNormal: Lowercase<keyof typeof SampleSet> = 'none';

  /**
   * The bank identifier to use for the base ("hitnormal") sample.
   * Transferred to the bank of a hit sample when appropriate.
   * Use {@link bankForNormal} instead.
   * @deprecated
   */
  get normalSet(): SampleSet {
    switch (this.bankForNormal) {
      case 'none': return SampleSet.None;
      case 'normal': return SampleSet.Normal;
      case 'soft': return SampleSet.Soft;
      case 'drum': return SampleSet.Drum;
    }

    return SampleSet.None;
  }

  set normalSet(value: SampleSet) {
    this.bankForNormal = SampleSet[value].toLowerCase() as Lowercase<keyof typeof SampleSet>;
  }

  /**
   * The bank identifier to use for additions ("hitwhistle", "hitfinish", "hitclap").
   * Transferred to the bank of a hit sample when appropriate.
   */
  bankForAddition: Lowercase<keyof typeof SampleSet> = 'none';

  /**
   * The bank identifier to use for additions ("hitwhistle", "hitfinish", "hitclap").
   * Transferred to the bank of a hit sample when appropriate.
   * Use {@link bankForAddition} instead.
   * @deprecated
   */
  get additionSet(): SampleSet {
    switch (this.bankForAddition) {
      case 'none': return SampleSet.None;
      case 'normal': return SampleSet.Normal;
      case 'soft': return SampleSet.Soft;
      case 'drum': return SampleSet.Drum;
    }
  }

  set additionSet(value: SampleSet) {
    this.bankForAddition = SampleSet[value].toLowerCase() as Lowercase<keyof typeof SampleSet>;
  }

  /**
   * The index of the custom sample bank. Is only used if 2 or above for "reasons".
   * This will add a suffix to lookups, allowing extended bank lookups (ie. "normal-hitnormal-2").
   * See {@link HitSample.suffix}.
   */
  customSampleBank = 0;

  /**
   * The index of the custom sample bank. Is only used if 2 or above for "reasons".
   * This will add a suffix to lookups, allowing extended bank lookups (ie. "normal-hitnormal-2").
   * See {@link HitSample.suffix}.
   * Use {@link customSampleBank} instead.
   * @deprecated
   */
  get customIndex(): number {
    return this.customSampleBank;
  }

  set customIndex(value: number) {
    this.customSampleBank = value;
  }

  /**
   * Creates a copy of this sample bank.
   * Non-primitive properties will be copied via their own clone() method.
   * @returns A copied sample bank.
   */
  clone(): SampleBank {
    return Object.assign(new SampleBank(), this);
  }
}
