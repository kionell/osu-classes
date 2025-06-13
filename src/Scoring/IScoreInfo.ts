import { ScoreRank } from './Enums/ScoreRank';
import { IJsonableScoreInfo } from './IJsonableScoreInfo';
import { HitStatistics } from './HitStatistics';
import { IBeatmapInfo } from '../Beatmaps/IBeatmapInfo';
import { IRuleset } from '../Rulesets/IRuleset';
import { ModCombination } from '../Mods/ModCombination';
import { APIMod } from '../Mods/APIMod';

/**
 * A score information.
 */
export interface IScoreInfo {
  /**
   * A score ID.
   */
  id: number;

  /**
   * A rank of the play.
   */
  rank: keyof typeof ScoreRank;

  /**
   * Total score of the play.
   */
  totalScore: number;

  /**
   * The version of processing applied to calculate total score as stored in the database.
   * If this does not match latest total score version in the score encoder
   * the total score has not yet been updated to reflect the current scoring values.
   * This may not match the version stored in the replay files.
   */
  totalScoreVersion: number;

  /**
   * Total accuracy of the play.
   */
  accuracy: number;

  /**
   * The performance of the play.
   */
  totalPerformance: number | null;

  /**
   * Max combo of the play.
   */
  maxCombo: number;

  /**
   * Whether the map was passed or not.
   */
  passed: boolean;

  /**
   * Perfect combo or not?
   */
  perfect: boolean;

  /**
   * The version of the client this score was set using.
   * Sourced from version of the game at the point of score submission.
   */
  clientVersion: string;

  /**
   * Whether this {@link ScoreInfo} represents a legacy (osu!stable) score.
   */
  isLegacyScore: boolean;

  /**
   * Ruleset instance.
   */
  ruleset: IRuleset | null;

  /**
   * Ruleset ID of the play.
   */
  rulesetId: number;

  /**
   * Mods of the play in the form compatible with osu! api.
   */
  apiMods: APIMod[];

  /**
   * Mods of the play.
   */
  mods: ModCombination | null;

  /**
   * Raw mods of the play.
   */
  rawMods: string | number;

  /**
   * Username of the player who set this play.
   */
  username: string;

  /**
   * User ID of the player who set this play.
   */
  userId: number;

  /**
   * Beatmap of the play.
   */
  beatmap: IBeatmapInfo | null;

  /**
   * Beatmap ID.
   */
  beatmapId: number;

  /**
   * The date when this play was set.
   */
  date: Date;

  /**
   * Hit statistics.
   */
  statistics: HitStatistics;

  /**
   * Maximum hit statistics.
   */
  maximumStatistics: HitStatistics;

  /**
   * Beatmap MD5 hash.
   */
  beatmapHashMD5: string;

  /**
   * Number of Gekis in standard, Max 300s in mania.
   */
  countGeki: number;

  /**
   * Number of 300s.
   */
  count300: number;

  /**
   * Number of Katus in standard, 200s in mania.
   */
  countKatu: number;

  /**
   * Number of 100s in standard, 150s in Taiko, 100s in CTB, 100s in mania.
   */
  count100: number;

  /**
   * Number of 50s in standard, small fruit in CTB, 50s in mania.
   */
  count50: number;

  /**
   * Number of misses.
   */
  countMiss: number;

  /**
   * Total hits of a score.
   */
  totalHits: number;

  /**
   * Converts this score information to JSON.
   * @returns Score information convertible to JSON.
   */
  toJSON(): IJsonableScoreInfo;
}
