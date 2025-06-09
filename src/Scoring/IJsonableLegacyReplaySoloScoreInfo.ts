import { ScoreRank } from './Enums/ScoreRank';
import { IJsonableHitStatistics } from './IJsonableHitStatistics';

export interface IJsonableLegacyReplaySoloScoreInfo {
  online_id: number;
  statistics: IJsonableHitStatistics;
  maximum_statistics: IJsonableHitStatistics;
  client_version: string;
  rank: keyof typeof ScoreRank;
  user_id: number;
  total_score_without_mods: number;
}
