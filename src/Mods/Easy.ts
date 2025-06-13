import { BeatmapDifficultySection } from '../Beatmaps/Sections/BeatmapDifficultySection';
import { IApplicableToDifficulty } from './Types/IApplicableToDifficulty';
import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class Easy extends Mod implements IApplicableToDifficulty {
  name = 'Easy';
  acronym = 'EZ';
  bitwise: ModBitwise = ModBitwise.Easy;
  type: ModType = ModType.DifficultyReduction;
  multiplier = 0.5;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.HardRock;

  applyToDifficulty(difficulty: BeatmapDifficultySection): void {
    difficulty.circleSize = Math.fround(difficulty.circleSize * 0.5);
    difficulty.approachRate = Math.fround(difficulty.approachRate * 0.5);
    difficulty.drainRate = Math.fround(difficulty.drainRate * 0.5);
    difficulty.overallDifficulty = Math.fround(difficulty.overallDifficulty * 0.5);
  }
}
