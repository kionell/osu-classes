import { HitResult } from './Enums/HitResult';
import { IJsonableHitStatistics } from './IJsonableHitStatistics';

/**
 * A special case of a map structure for storing hit statistics.
 */
export class HitStatistics extends Map<HitResult, number> {
  /**
   * Whether a {@link HitResult} increases the combo.
   */
  static increasesCombo(result: HitResult): boolean {
    return this.affectsCombo(result) && this.isHit(result);
  }

  /**
   * Whether a {@link HitResult} breaks the combo and resets it back to zero.
   */
  static breaksCombo(result: HitResult): boolean {
    return this.affectsCombo(result) && !this.isHit(result);
  }

  /**
   * Whether a {@link HitResult} increases or breaks the combo.
   */
  static affectsCombo(result: HitResult): boolean {
    switch (result) {
      case HitResult.Miss:
      case HitResult.Meh:
      case HitResult.Ok:
      case HitResult.Good:
      case HitResult.Great:
      case HitResult.Perfect:
      case HitResult.LargeTickHit:
      case HitResult.LargeTickMiss:
      case HitResult.LegacyComboIncrease:
      case HitResult.ComboBreak:
      case HitResult.SliderTailHit:
        return true;

      default:
        return false;
    }
  }

  /**
   * Whether a {@link HitResult} affects the accuracy portion of the score.
   */
  static affectsAccuracy(result: HitResult): boolean {
    switch (result) {
      // LegacyComboIncrease is a special non-gameplay type 
      // which is neither a basic, tick, bonus, or accuracy-affecting result.
      case HitResult.LegacyComboIncrease:
        return false;

      // ComboBreak is a special type that only affects combo. 
      // It cannot be considered as basic, tick, bonus, or accuracy-affecting.
      case HitResult.ComboBreak:
        return false;

      default:
        return this.isScorable(result) && !this.isBonus(result);
    }
  }

  /**
   * Whether a {@link HitResult} is a non-tick and non-bonus result.
   */
  static isBasic(result: HitResult): boolean {
    switch (result) {
      // LegacyComboIncrease is a special non-gameplay type 
      // which is neither a basic, tick, bonus, or accuracy-affecting result.
      case HitResult.LegacyComboIncrease:
        return false;

      // ComboBreak is a special type that only affects combo. 
      // It cannot be considered as basic, tick, bonus, or accuracy-affecting.
      case HitResult.ComboBreak:
        return false;

      default:
        return this.isScorable(result) && !this.isTick(result) && !this.isBonus(result);
    }
  }

  /**
   * Whether a {@link HitResult} should be counted as a tick.
   */
  static isTick(result: HitResult): boolean {
    switch (result) {
      case HitResult.LargeTickHit:
      case HitResult.LargeTickMiss:
      case HitResult.SmallTickHit:
      case HitResult.SmallTickMiss:
      case HitResult.SliderTailHit:
        return true;

      default:
        return false;
    }
  }

  /**
   * Whether a {@link HitResult} should be counted as bonus score.
   */
  static isBonus(result: HitResult): boolean {
    switch (result) {
      case HitResult.SmallBonus:
      case HitResult.LargeBonus:
        return true;

      default:
        return false;
    }
  }

  /**
   * Whether a {@link HitResult} represents a miss of any type.
   * Of note, both {@link isMiss} and {@link isHit} return `false` for {@link HitResult.None}.
   */
  static isMiss(result: HitResult): boolean {
    switch (result) {
      case HitResult.IgnoreMiss:
      case HitResult.Miss:
      case HitResult.SmallTickMiss:
      case HitResult.LargeTickMiss:
      case HitResult.ComboBreak:
        return true;

      default:
        return false;
    }
  }

  /**
   * Whether a {@link HitResult} represents a successful hit.
   * Of note, both {@link isMiss} and {@link isHit} return `false` for {@link HitResult.None}.
   */
  static isHit(result: HitResult): boolean {
    switch (result) {
      case HitResult.None:
      case HitResult.IgnoreMiss:
      case HitResult.Miss:
      case HitResult.SmallTickMiss:
      case HitResult.LargeTickMiss:
      case HitResult.ComboBreak:
        return false;

      default:
        return true;
    }
  }

  /**
   * Whether a {@link HitResult} is scorable.
   */
  static isScorable(result: HitResult): boolean {
    switch (result) {
      // LegacyComboIncrease is not actually scorable 
      // (in terms of usable by rulesets for that purpose), 
      // but needs to be defined as such to be correctly included in statistics output.
      case HitResult.LegacyComboIncrease:
        return true;

      // ComboBreak is its own type that affects score via combo.
      case HitResult.ComboBreak:
        return true;

      case HitResult.SliderTailHit:
        return true;

      default:
        // Note that IgnoreHit and IgnoreMiss are excluded as they do not affect score.
        return result >= HitResult.Miss && result < HitResult.IgnoreMiss;
    }
  }

  /**
   * Whether a {@link HitResult} is valid within a given {@link HitResult} range.
   * @param result The {@link HitResult} to check.
   * @param minResult The minimum {@link HitResult}.
   * @param maxResult The maximum {@link HitResult}.
   * @returns Whether {@link HitResult} falls between {@link minResult} and {@link maxResult}.
   */
  static isValidHitResult(result: HitResult, minResult: HitResult, maxResult: HitResult): boolean {
    if (result === HitResult.None) {
      return false;
    }

    if (result === minResult || result === maxResult) {
      return true;
    }

    return result > minResult && result < maxResult;
  }

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
      case HitResult.ComboBreak: return 'combo_break';
      case HitResult.SliderTailHit: return 'slider_tail_hit';
      case HitResult.LegacyComboIncrease: return 'legacy_combo_increase';
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
      case 'combo_break': return HitResult.ComboBreak;
      case 'slider_tail_hit': return HitResult.SliderTailHit;
      case 'legacy_combo_increase': return HitResult.LegacyComboIncrease;
    }
  }
}
