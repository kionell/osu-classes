import {
  BeatmapProcessor,
  BeatmapConverter,
  RulesetBeatmap,
  IBeatmap,
} from '../Beatmaps';

import {
  DifficultyAttributes,
  DifficultyCalculator,
  PerformanceCalculator,
} from '../Difficulty';

import { IScoreInfo } from '../Scoring';
import { ModCombination } from '../Mods/ModCombination';

/**
 * A ruleset.
 */
export interface IRuleset {
  /**
   * Ruleset ID.
   */
  id: number;

  /**
   * Applies ruleset to a beatmap.
   * @param beatmap The beatmap.
   * @returns A new instance of the beatmap with applied ruleset.
   */
  applyToBeatmap(beatmap: IBeatmap): RulesetBeatmap;

  /**
   * Applies ruleset and mods to a beatmap.
   * @param beatmap The beatmap.
   * @param mods Mod combination.
   * @returns A new beatmap with applied mods.
   */
  applyToBeatmapWithMods(beatmap: IBeatmap, mods?: ModCombination): RulesetBeatmap;

  /**
   * Resets a mod combination from a beatmap.
   * @param beatmap The beatmap.
   * @returns The same beatmap.
   */
  resetMods(beatmap: RulesetBeatmap): RulesetBeatmap;

  /**
   * Creates a new mod combination by converting legacy mod bitwise or string acronyms.
   * @param input Mod bitwise or string acronyms.
   * @returns A new mod combination.
   */
  createModCombination(input?: number | string): ModCombination;

  /**
   * @returns A new beatmap processor.
   */
  createBeatmapProcessor(): BeatmapProcessor;

  /**
   * @returns A new beatmap converter.
   */
  createBeatmapConverter(): BeatmapConverter;

  /**
   * @param beatmap The beatmap for which the calculation will be done.
   * @returns A new difficulty calculator.
   */
  createDifficultyCalculator(beatmap: IBeatmap): DifficultyCalculator;

  /**
   * @param attributes The difficulty attributes.
   * @param score Score information.
   * @returns A new performance calculator.
   */
  createPerformanceCalculator(attributes?: DifficultyAttributes, score?: IScoreInfo): PerformanceCalculator;
}
