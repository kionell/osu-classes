import { clamp } from '../../Utils/MathUtils';
import { ControlPointType } from '../Enums/ControlPointType';
import { ControlPoint } from './ControlPoint';

/**
 * A difficulty point.
 */
export class DifficultyPoint extends ControlPoint {
  /**
   * The default instance of a difficulty point.
   */
  static readonly DEFAULT = new DifficultyPoint();

  /**
   * The default instance of a difficulty point.
   * Use {@link DEFAULT} instead.
   * @deprecated Since 3.1.0
   */
  static get default(): DifficultyPoint {
    return DifficultyPoint.DEFAULT;
  }

  /**
   * The type of a difficulty point.
   */
  pointType = ControlPointType.DifficultyPoint;

  /**
   * Whether or not slider ticks should be generated at this control point.
   * This exists for backwards compatibility with maps that abuse 
   * NaN slider velocity behavior on osu!stable (e.g. /b/2628991).
   */
  generateTicks = true;

  /**
   * Indicates whether this difficulty control point should be considered as legacy or not.
   */
  isLegacy = false;

  private _sliderVelocity = 1;

  /**
   * The slider velocity at this difficulty point.
   */
  get sliderVelocity(): number {
    return this._sliderVelocity;
  }

  set sliderVelocity(value: number) {
    // Imitate bindable value with range [0.1, 10].
    this._sliderVelocity = clamp(value, 0.1, 10);
  }

  /**
   * Legacy BPM multiplier that introduces floating-point 
   * errors for rulesets that depend on it.
   * DO NOT USE THIS UNLESS 100% SURE.
   */
  bpmMultiplier = 1;

  /**
   * Checks if this difficulty point is redundant to an another one.
   * @param existing The another difficulty point.
   * @returns Whether the difficulty point is redundant.
   */
  isRedundant(existing: DifficultyPoint | null): boolean {
    return existing !== null
      && existing.sliderVelocity === this.sliderVelocity
      && existing.generateTicks === this.generateTicks;
  }

  copyFrom(other: DifficultyPoint): void {
    super.copyFrom(other);

    this.sliderVelocity = other.sliderVelocity;
  }

  equals(other: DifficultyPoint): boolean {
    return super.equals(other)
      && other instanceof DifficultyPoint
      && this.sliderVelocity === other.sliderVelocity;
  }
}
