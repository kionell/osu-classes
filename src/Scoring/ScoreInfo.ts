import { ScoreRank } from './Enums/ScoreRank';
import { IHitStatistics } from './IHitStatistics';
import { IScoreInfo } from './IScoreInfo';
import { IJsonableScoreInfo, JsonableScoreInfo } from './IJsonableScoreInfo';
import { LegacyScoreExtensions } from './LegacyScoreExtensions';
import { IBeatmapInfo } from '../Beatmaps';
import { IRuleset } from '../Rulesets';
import { ModCombination } from '../Mods';
import { calculateAccuracy, calculateRank } from './ScoreUtils';

/**
 * A score information.
 */
export class ScoreInfo extends LegacyScoreExtensions implements IScoreInfo {
  /**
   * A score ID.
   */
  id = 0;

  /**
   * Total score of the play.
   */
  totalScore = 0;

  /**
   * The performance of the play.
   */
  pp: number | null = null;

  /**
   * Max combo of the play.
   */
  maxCombo = 0;

  /**
   * Whether the map was passed or not.
   */
  passed = false;

  /**
   * Perfect combo or not?
   */
  perfect = false;

  private _accuracy: number | null = null;
  private _rank: keyof typeof ScoreRank | null = null;
  private _ruleset: IRuleset | null = null;
  private _rulesetId = 0;
  private _mods: ModCombination | null = null;
  private _rawMods: string | number = 0;

  /**
   * Score accuracy.
   */
  get accuracy(): number {
    return this._accuracy ?? calculateAccuracy(this);
  }

  set accuracy(value: number | null) {
    this._accuracy = value;
  }

  /**
   * Score rank.
   */
  get rank(): keyof typeof ScoreRank {
    return this._rank ?? calculateRank(this);
  }

  set rank(value: keyof typeof ScoreRank | null) {
    this._rank = value;
  }

  /**
   * Ruleset instance.
   */
  get ruleset(): IRuleset | null {
    return this._ruleset;
  }

  set ruleset(value: IRuleset | null) {
    this._ruleset = value;
    this._mods = this.ruleset?.createModCombination(this.rawMods) ?? null;
  }

  /**
   * Ruleset ID of the play.
   */
  get rulesetId(): number {
    return this.ruleset?.id ?? this._rulesetId;
  }

  set rulesetId(value: number) {
    this._rulesetId = value;
  }

  /**
   * Mods of the play.
   */
  get mods(): ModCombination | null {
    return this._mods;
  }

  set mods(value: ModCombination | null) {
    this._mods = value;
    this._rawMods = value?.bitwise ?? 0;
  }

  /**
   * Raw mods of the play that are neutral to any of the rulesets.
   * {@link ScoreInfo} can't work with mod combinations without an actual ruleset instance.
   * TODO: Implement it in a better way???
   */
  get rawMods(): string | number {
    return this._rawMods;
  }

  set rawMods(value: string | number) {
    if (this._rawMods === value) return;

    this._rawMods = value;
    this._mods = this.ruleset?.createModCombination(value) ?? null;
  }

  /**
   * Username of the player who set this play.
   */
  username = '';

  /**
   * User ID of the player who set this play.
   */
  userId = 0;

  /**
   * Beatmap of the play.
   */
  beatmap: IBeatmapInfo | null = null;

  /**
   * Beatmap ID.
   */
  beatmapId = 0;

  /**
   * The date when this play was set.
   */
  date: Date = new Date();

  /**
   * Hit statistics.
   */
  statistics: IHitStatistics = {
    none: 0,
    miss: 0,
    meh: 0,
    ok: 0,
    good: 0,
    great: 0,
    perfect: 0,
    smallTickMiss: 0,
    smallTickHit: 0,
    largeTickMiss: 0,
    largeTickHit: 0,
    smallBonus: 0,
    largeBonus: 0,
    ignoreMiss: 0,
    ignoreHit: 0,
  };

  /**
   * Beatmap MD5 hash.
   */
  beatmapHashMD5 = '';

  /**
   * Creates a new instance of score information.
   * @param options The score information options.
   */
  constructor(options: Partial<IScoreInfo> = {}) {
    super();

    Object.assign(this, options);
  }

  /**
   * Converts this score information to JSON.
   * @returns Score information convertable to JSON.
   */
  toJSON(): IJsonableScoreInfo {
    const partial: Partial<this> = {};
    const deselect = ['beatmap', 'ruleset', 'rawMods', 'mods'];

    for (const key in this) {
      if (key.startsWith('_')) continue;
      if (deselect.includes(key)) continue;

      partial[key] = this[key];
    }

    return {
      ...partial as JsonableScoreInfo,
      beatmap: this.beatmap?.toJSON() ?? null,
      mods: this.mods?.toString() ?? 'NM',
      rulesetId: this.rulesetId,
      countGeki: this.countGeki,
      count300: this.count300,
      countKatu: this.countKatu,
      count100: this.count100,
      count50: this.count50,
      countMiss: this.countMiss,
      totalHits: this.totalHits,
    };
  }

  /**
   * Creates a deep copy of the score info.
   * @returns Cloned score info.
   */
  clone(): this {
    const ScoreInfo = this.constructor as new (params?: Partial<IScoreInfo>) => this;

    const cloned = new ScoreInfo();

    cloned.id = this.id;
    cloned.totalScore = this.totalScore;
    cloned.maxCombo = this.maxCombo;
    cloned.rulesetId = this.rulesetId;
    cloned.passed = this.passed;
    cloned.perfect = this.perfect;
    cloned.ruleset = this.ruleset;
    cloned.mods = this.mods;
    cloned.username = this.username;
    cloned.userId = this.userId;
    cloned.beatmap = this.beatmap;
    cloned.beatmapId = this.beatmapId;
    cloned.beatmapHashMD5 = this.beatmapHashMD5;
    cloned.date = this.date;

    if (this.pp) cloned.pp = this.pp;

    cloned.statistics = { ...this.statistics };

    return cloned;
  }

  /**
   * @param other Other score info.
   * @returns If two scores are equal.
   */
  equals(other: IScoreInfo): boolean {
    if (!other) return false;

    if (this.id !== 0 && other.id !== 0) {
      return this.id === other.id;
    }

    return false;
  }
}
