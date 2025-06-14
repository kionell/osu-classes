import { ScoreRank } from './Enums/ScoreRank';
import { HitStatistics } from './HitStatistics';
import { LegacyScoreExtensions } from './LegacyScoreExtensions';
import { Accuracy, Rank } from './Utils';
import { IScoreInfo } from './IScoreInfo';
import { IJsonableScoreInfo, JsonableScoreInfo } from './IJsonableScoreInfo';
import { BeatmapInfo } from '../Beatmaps/BeatmapInfo';
import { IBeatmapInfo } from '../Beatmaps/IBeatmapInfo';
import { IRuleset } from '../Rulesets';
import { ModCombination } from '../Mods';
import { APIMod } from '../Mods/APIMod';

/**
 * A score information.
 */
export class ScoreInfo extends LegacyScoreExtensions implements IScoreInfo {
  /**
   * A score ID.
   */
  id = -1;

  /**
   * Total score of the play.
   */
  totalScore = 0;

  /**
   * The version of processing applied to calculate total score as stored in the database.
   * If this does not match latest total score version in the score encoder
   * the total score has not yet been updated to reflect the current scoring values.
   * This may not match the version stored in the replay files.
   */
  totalScoreVersion = 0;

  /**
   * The performance of the play.
   */
  totalPerformance: number | null = null;

  /**
   * Max combo of the play.
   */
  maxCombo = 0;

  /**
   * Whether the map was passed or not.
   * Score rank will always be `F` on `passed = false`.
   */
  passed = false;

  /**
   * Perfect combo or not?
   */
  perfect = false;

  /**
   * The version of the client this score was set using.
   * Sourced from version of the game at the point of score submission.
   */
  clientVersion = '';

  /**
   * Whether this {@link ScoreInfo} represents a legacy (osu!stable) score.
   */
  isLegacyScore = false;

  private _ruleset: IRuleset | null = null;
  private _rulesetId = 0;
  private _mods: ModCombination | null = null;
  private _apiMods: APIMod[] | null = null;
  private _rawMods: string | number = 0;
  private _accuracy: number | null = null;
  private _rank: keyof typeof ScoreRank | null = null;

  /**
   * Score accuracy.
   */
  get accuracy(): number {
    return this._accuracy ?? Accuracy.calculate(this);
  }

  set accuracy(value: number) {
    this._accuracy = value;
  }

  /**
   * Score rank.
   */
  get rank(): keyof typeof ScoreRank {
    return this._rank ?? Rank.calculate(this);
  }

  set rank(value: keyof typeof ScoreRank) {
    this._rank = value;
    this.passed = value !== 'F';
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
   * Mods of the play in the form compatible with osu! api.
   */
  get apiMods(): APIMod[] {
    if (this._apiMods !== null) {
      return this._apiMods;
    }

    if (this._mods !== null) {
      return this._mods.acronyms.map((a) => new APIMod({ acronym: a }));
    }

    return [];
  }

  set apiMods(mods: APIMod[] | null) {
    this._apiMods = mods;
  }

  /**
   * Mods of the play.
   * This will always be `null` if {@link ruleset} is not set.
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
   * This can be either bitwise or stringified mod combination.
   * TODO: Implement it in a better way???
   * @deprecated Edit {@link apiMods} instead.
   * Parsing a {@link ScoreInfo} requires an actual ruleset instance.
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
   * Creates a deep copy of the score info.
   * @returns Cloned score info.
   */
  clone(): this {
    const ScoreInfo = this.constructor as new (params?: Partial<IScoreInfo>) => this;

    const cloned = new ScoreInfo();

    Object.assign(cloned, this);

    cloned.statistics = new HitStatistics(this.statistics);

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

  /**
   * Converts this score information to a plain object convertible to JSON.
   * @returns Score information convertible to JSON.
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
      statistics: this.statistics.toJSON(),
      beatmap: this.beatmap?.toJSON() ?? null,
      mods: this.mods?.toString() ?? 'NM',
      date: this.date.getTime() / 1000,
      accuracy: this.accuracy,
      rank: this.rank,
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
   * Converts raw JSON score information to an instance of {@link ScoreInfo}.
   * @param json Raw JSON score information.
   * @returns Adapted instance of {@link ScoreInfo} class.
   */
  static fromJSON(json: IJsonableScoreInfo): ScoreInfo {
    return new ScoreInfo({
      ...json as JsonableScoreInfo,
      rawMods: json.mods,
      beatmap: json.beatmap ? BeatmapInfo.fromJSON(json.beatmap) : null,
      statistics: HitStatistics.fromJSON(json.statistics),
      date: new Date(json.date * 1000),
    });
  }
}
