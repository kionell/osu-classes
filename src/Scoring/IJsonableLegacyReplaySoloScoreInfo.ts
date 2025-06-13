import { IJsonableAPIMod } from '../Mods/IJsonableAPIMod';
import { IJsonableHitStatistics } from './IJsonableHitStatistics';
import { ScoreRank } from './Enums/ScoreRank';

export interface IJsonableLegacyReplaySoloScoreInfo {
  online_id: number;
  mods: IJsonableAPIMod[];
  statistics: IJsonableHitStatistics;
  maximum_statistics: IJsonableHitStatistics;
  client_version: string;
  rank: keyof typeof ScoreRank;
  user_id: number;
  total_score_without_mods: number;
}
