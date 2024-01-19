import { ControlPointType } from '../Enums/ControlPointType';
import { ControlPoint } from './ControlPoint';
import { SampleSet, HitSample } from '../../Audio';

/**
 * A sample point.
 */
export class SamplePoint extends ControlPoint {
  /**
   * The default sample bank for all sample points.
   */
  static readonly DEFAULT_BANK = HitSample.BANK_NORMAL;

  /**
   * The default instance of a sample point.
   */
  static readonly DEFAULT = new SamplePoint();

  /**
   * The default instance of a sample point.
   * Use {@link DEFAULT} instead.
   * @deprecated
   */
  static get default(): SamplePoint {
    return SamplePoint.DEFAULT;
  }

  /**
   * The type of a sample point.
   */
  pointType = ControlPointType.SamplePoint;

  /**
   * The default sample bank at this control point.
   */
  bank = SamplePoint.DEFAULT_BANK;

  /**
   * The default sample volume at this control point.
   */
  volume = 100;

  /**
   * The index of the custom sample bank. Is only used if 2 or above for "reasons".
   * This will add a suffix to lookups, allowing extended bank lookups (ie. "normal-hitnormal-2").
   */
  customBankIndex = 0;

  /**
   * The custom index of this sample point.
   * @deprecated
   */
  get customIndex(): number {
    return this.customBankIndex;
  }

  /**
   * @deprecated
   */
  set customIndex(value: number) {
    this.customBankIndex = value;
  }

  /**
   * The sample bank of this sample point.
   * Use {@link sampleBank} instead.
   * @deprecated
   */
  sampleSet: string = SampleSet[SampleSet.Normal];

  /**
   * Creates a {@link HitSample} based on the sample settings in this control point.
   * @param sampleName The name of the sample.
   * @returns A populated {@link HitSample}.
   */
  getSampleInfo(sampleName = HitSample.HIT_NORMAL): HitSample {
    return new HitSample({
      name: sampleName,
      bank: this.bank,
      volume: this.volume,
      customBankIndex: this.customBankIndex,
    });
  }

  /**
   * Applies {@link bank} and {@link volume} to a {@link HitSample} if necessary.
   * @param hitSample The {@link HitSample}. This will not be modified.
   * @returns A new {@link HitSample} with modified values.
   */
  applyTo(hitSample: HitSample): HitSample {
    return hitSample.with({
      bank: hitSample.bank || this.bank,
      volume: hitSample.volume > 0 ? hitSample.volume : this.volume,
      customBankIndex: hitSample.customBankIndex > 0
        ? hitSample.customBankIndex
        : this.customBankIndex,
    });
  }

  /**
   * Checks if this sample point is redundant to an another one.
   * @param existing The another sample point.
   * @returns Whether the sample point is redundant.
   */
  isRedundant(existing: SamplePoint | null): boolean {
    return existing instanceof SamplePoint
      && this.bank === existing.bank
      && this.volume === existing.volume
      && this.customBankIndex === existing.customBankIndex;
  }

  copyFrom(other: SamplePoint): void {
    super.copyFrom(other);

    this.bank = other.bank;
    this.volume = other.volume;
    this.customBankIndex = other.customBankIndex;
  }

  equals(other: SamplePoint): boolean {
    return super.equals(other)
      && other instanceof SamplePoint
      && this.bank === other.bank
      && this.volume === other.volume
      && this.customBankIndex === other.customBankIndex;
  }
}
