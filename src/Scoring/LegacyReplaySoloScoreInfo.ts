import { HitStatistics, ScoreRank } from 'osu-classes';
import { IJsonableLegacyReplaySoloScoreInfo } from './IJsonableLegacyReplaySoloScoreInfo';

/**
 * A minified version of SoloScoreInfo retrofit onto the end of legacy replay files (.osr),
 * containing the minimum data required to support storage of non-legacy replays.
 */
export class LegacyReplaySoloScoreInfo {
  onlineId: number;
  statistics: HitStatistics;
  maximumStatistics: HitStatistics;
  clientVersion: string;
  rank: keyof typeof ScoreRank;
  userId: number;
  totalScoreWithoutMods: number;

  // TODO: Add support for osu!lazer mods.
  // mods: APIMod[];

  constructor(data?: Partial<LegacyReplaySoloScoreInfo>) {
    this.onlineId = data?.onlineId ?? -1;
    this.statistics = data?.statistics ?? new HitStatistics();
    this.maximumStatistics = data?.maximumStatistics ?? new HitStatistics();
    this.clientVersion = data?.clientVersion ?? '';
    this.rank = data?.rank ?? 'F';
    this.userId = data?.userId ?? -1;
    this.totalScoreWithoutMods = data?.totalScoreWithoutMods ?? 0;
  }

  static fromJSON(score: IJsonableLegacyReplaySoloScoreInfo): LegacyReplaySoloScoreInfo {
    return new LegacyReplaySoloScoreInfo({
      onlineId: score.online_id,
      statistics: HitStatistics.fromJSON(score.statistics),
      maximumStatistics: HitStatistics.fromJSON(score.maximum_statistics),
      clientVersion: score.client_version,
      rank: score.rank,
      userId: score.user_id,
      totalScoreWithoutMods: score.total_score_without_mods,
    });
  }
}
