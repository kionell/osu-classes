import { BeatmapDifficultySection } from '../Beatmaps/Sections/BeatmapDifficultySection';
import { IApplicableToDifficulty } from './Types/IApplicableToDifficulty';
import { ModBitwise } from './Enums/ModBitwise';
import { ModType } from './Enums/ModType';
import { Mod } from './Mod';

export abstract class HalfTime extends Mod implements IApplicableToDifficulty {
  name = 'Half Time';
  acronym = 'HT';
  bitwise: ModBitwise = ModBitwise.HalfTime;
  type: ModType = ModType.DifficultyReduction;
  multiplier = 0.3;
  isRanked = true;

  incompatibles: ModBitwise = ModBitwise.DoubleTime | ModBitwise.Nightcore;

  applyToDifficulty(difficulty: BeatmapDifficultySection): void {
    difficulty.clockRate = 0.75;
  }
}
