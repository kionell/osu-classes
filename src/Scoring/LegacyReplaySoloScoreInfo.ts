import { APIMod } from '../Mods/APIMod';
import { ScoreRank } from './Enums/ScoreRank';
import { HitStatistics } from './HitStatistics';
import { IJsonableLegacyReplaySoloScoreInfo } from './IJsonableLegacyReplaySoloScoreInfo';
import { IScoreInfo } from './IScoreInfo';

/**
 * A minified version of SoloScoreInfo retrofit onto the end of legacy replay files (.osr),
 * containing the minimum data required to support storage of non-legacy replays.
 */
export class LegacyReplaySoloScoreInfo {
  onlineId: number;
  mods: APIMod[];
  statistics: HitStatistics;
  maximumStatistics: HitStatistics;
  clientVersion: string;
  rank: keyof typeof ScoreRank;
  userId: number;
  totalScoreWithoutMods: number;

  constructor(data?: Partial<LegacyReplaySoloScoreInfo>) {
    this.onlineId = data?.onlineId ?? -1;
    this.mods = data?.mods ?? [];
    this.statistics = data?.statistics ?? new HitStatistics();
    this.maximumStatistics = data?.maximumStatistics ?? new HitStatistics();
    this.clientVersion = data?.clientVersion ?? '';
    this.rank = data?.rank ?? 'F';
    this.userId = data?.userId ?? -1;
    this.totalScoreWithoutMods = data?.totalScoreWithoutMods ?? 0;
  }

  static fromScore(score: IScoreInfo): LegacyReplaySoloScoreInfo {
    return new LegacyReplaySoloScoreInfo({
      onlineId: score.id,
      mods: score.apiMods,
      statistics: score.statistics,
      maximumStatistics: score.maximumStatistics,
      clientVersion: score.clientVersion,
      rank: score.rank,
      userId: score.userId,
      totalScoreWithoutMods: 0,
    });
  }

  static fromJSON(score: IJsonableLegacyReplaySoloScoreInfo): LegacyReplaySoloScoreInfo {
    return new LegacyReplaySoloScoreInfo({
      onlineId: score.online_id,
      mods: score.mods.map((m) => APIMod.fromJSON(m)),
      statistics: HitStatistics.fromJSON(score.statistics),
      maximumStatistics: HitStatistics.fromJSON(score.maximum_statistics),
      clientVersion: score.client_version,
      rank: score.rank,
      userId: score.user_id,
      totalScoreWithoutMods: score.total_score_without_mods,
    });
  }

  toJSON(): IJsonableLegacyReplaySoloScoreInfo {
    return {
      online_id: this.onlineId,
      mods: this.mods,
      statistics: this.statistics.toJSON(),
      maximum_statistics: this.maximumStatistics.toJSON(),
      client_version: this.clientVersion,
      rank: this.rank,
      user_id: this.userId,
      total_score_without_mods: this.totalScoreWithoutMods,
    };
  }
}
