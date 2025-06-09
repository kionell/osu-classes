import { HitResult } from './Enums/HitResult';
import { IJsonableHitStatistics } from './IJsonableHitStatistics';

/**
 * A special case of a map structure for storing hit statistics.
 */
export class HitStatistics extends Map<HitResult, number> {
  /**
   * Gets the number of hit results by their type.
   * If hit result is not present sets it to default value and returns it.
   * @param key Hit result type.
   * @returns The number of hit results of this type.
   */
  get(key: HitResult): number {
    if (!super.has(key)) super.set(key, 0);

    return super.get(key) as number;
  }

  /**
   * Converts this map to a readable JSON format.
   */
  toJSON(): IJsonableHitStatistics {
    const result: IJsonableHitStatistics = {};

    this.forEach((value, key) => {
      result[HitStatistics._getJsonableKeyFromHitResult(key)] = value;
    });

    return result;
  }

  static fromJSON(json: IJsonableHitStatistics): HitStatistics {
    const statistics = new HitStatistics();
    const entries = Object.entries(json);

    entries.forEach((entry) => {
      const key = entry[0] as keyof IJsonableHitStatistics;
      const value = entry[1] as number;

      statistics.set(this._getHitResultFromJsonableKey(key), value);
    });

    return statistics;
  }

  private static _getJsonableKeyFromHitResult(result: HitResult): keyof IJsonableHitStatistics {
    switch (result) {
      case HitResult.None: return 'none';
      case HitResult.Miss: return 'miss';
      case HitResult.Meh: return 'meh';
      case HitResult.Ok: return 'ok';
      case HitResult.Good: return 'good';
      case HitResult.Great: return 'great';
      case HitResult.Perfect: return 'perfect';
      case HitResult.SmallTickMiss: return 'small_tick_miss';
      case HitResult.SmallTickHit: return 'small_tick_hit';
      case HitResult.LargeTickMiss: return 'large_tick_miss';
      case HitResult.LargeTickHit: return 'large_tick_hit';
      case HitResult.SmallBonus: return 'small_bonus';
      case HitResult.LargeBonus: return 'large_bonus';
      case HitResult.IgnoreMiss: return 'ignore_miss';
      case HitResult.IgnoreHit: return 'ignore_hit';
    }
  }

  private static _getHitResultFromJsonableKey(key: keyof IJsonableHitStatistics): HitResult {
    switch (key) {
      case 'none': return HitResult.None;
      case 'miss': return HitResult.Miss;
      case 'meh': return HitResult.Meh;
      case 'ok': return HitResult.Ok;
      case 'good': return HitResult.Good;
      case 'great': return HitResult.Great;
      case 'perfect': return HitResult.Perfect;
      case 'small_tick_miss': return HitResult.SmallTickMiss;
      case 'small_tick_hit': return HitResult.SmallTickHit;
      case 'large_tick_miss': return HitResult.LargeTickMiss;
      case 'large_tick_hit': return HitResult.LargeTickHit;
      case 'small_bonus': return HitResult.SmallBonus;
      case 'large_bonus': return HitResult.LargeBonus;
      case 'ignore_miss': return HitResult.IgnoreMiss;
      case 'ignore_hit': return HitResult.IgnoreHit;
    }
  }
}
