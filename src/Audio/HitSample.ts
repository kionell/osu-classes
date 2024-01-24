/**
 * Describes a gameplay hit sample.
 */
export class HitSample {
  /**
   * The default instance of a hit sample.
   */
  static readonly DEFAULT = new HitSample();

  static readonly HIT_NORMAL = 'hitnormal';
  static readonly HIT_WHISTLE = 'hitwhistle';
  static readonly HIT_FINISH = 'hitfinish';
  static readonly HIT_CLAP = 'hitclap';

  static readonly BANK_NORMAL = 'normal';
  static readonly BANK_SOFT = 'soft';
  static readonly BANK_DRUM = 'drum';

  /**
   * New sample used exclusively by taiko for now.
   */
  static readonly HIT_FLOURISH = 'hitflourish';

  /**
   * New bank used exclusively by taiko for now.
   */
  static readonly BANK_STRONG = 'strong';

  /**
   * All valid sample addition constants.
   */
  static readonly allAdditions: string[] = [
    HitSample.HIT_WHISTLE,
    HitSample.HIT_FINISH,
    HitSample.HIT_CLAP,
  ];

  /**
   * All valid bank constants.
   */
  static readonly allBanks: string[] = [
    HitSample.BANK_NORMAL,
    HitSample.BANK_SOFT,
    HitSample.BANK_DRUM,
  ];

  /**
   * The name of the sample to load.
   */
  name: string;

  /**
   * The bank to load the sample from.
   */
  bank: string;

  /**
   * An optional suffix to provide priority lookup.
   * Falls back to non-suffixed name.
   */
  suffix: string;

  /**
   * The sample volume.
   */
  volume: number;

  /**
   * Whether a bank was specified locally to the relevant hitobject.
   * If `false`, a bank will be retrieved from the closest control point.
   */
  bankSpecified = false;

  /**
   * Custom sample bank index.
   */
  customSampleBank: number;

  /**
   * Whether this hit sample is layered.
   * Layered hit samples are automatically added in all modes (except osu!mania), 
   * but can be disabled skin config option.
   */
  isLayered: boolean;

  /**
   * The filename of this hit sample.
   */
  filename: string;

  /**
   * The bank to load the sample from.
   * Use {@link bank} instead.
   * @deprecated
   */
  get sampleSet(): string {
    return this.bank;
  }

  /**
   * @deprecated
   */
  set sampleSet(value: string) {
    this.bank = value;
  }

  /**
   * Hit sound data.
   * Use {@link name} instead.
   * @deprecated
   */
  get hitSound(): string {
    return this.name;
  }

  /**
   * @deprecated
   */
  set hitSound(value: string) {
    this.name = value;
  }

  constructor(options?: Partial<HitSample>) {
    this.name = options?.name ?? '';
    this.bankSpecified = typeof options?.bank === 'string'
      && options.bank.length > 0
      && options.bank !== 'none';

    this.bank = this.bankSpecified
      ? options?.bank as string
      : HitSample.BANK_NORMAL;

    this.customSampleBank = options?.customSampleBank ?? 0;
    this.suffix = options?.suffix ?? '';

    if (this.customSampleBank >= 2) {
      this.suffix = this.customSampleBank.toString();
    }

    this.volume = options?.volume ?? 100;
    this.isLayered = options?.isLayered ?? false;
    this.filename = options?.filename ?? '';
  }

  /**
   * Custom index of hit sample.
   * Use {@link customSampleBank} instead.
   * @deprecated
   */
  get customIndex(): number {
    return this.customSampleBank;
  }

  /**
   * @deprecated
   */
  set customIndex(value: number) {
    this.customSampleBank = value;
  }

  /**
   * Creates a new {@link HitSample} with overridden values.
   * @param options Values that will be overridden.
   * @returns The new {@link HitSample}.
   */
  with(options: Partial<HitSample>): HitSample {
    return new HitSample({
      name: this.name,
      bank: this.bank,
      suffix: this.suffix,
      volume: this.volume,
      customSampleBank: this.customSampleBank,
      isLayered: this.isLayered,
      ...options,
    });
  }

  /**
   * Creates a copy of this hit sample.
   * Non-primitive properties will be copied via their own clone() method.
   * @returns A copied hit sample.
   */
  clone(): HitSample {
    return new HitSample(this);
  }

  /**
   * @param other Other hit sample.
   * @returns If two hit samples are the same.
   */
  equals(other: HitSample): boolean {
    return other instanceof HitSample
      && this.name === other.name
      && this.bank === other.bank
      && this.suffix === other.suffix
      && this.customSampleBank === other.customSampleBank
      && this.isLayered === other.isLayered;
  }
}
