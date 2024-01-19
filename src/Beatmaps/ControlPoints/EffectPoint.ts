import { clamp } from '../../Utils/MathUtils';
import { ControlPointType } from '../Enums/ControlPointType';
import { ControlPoint } from './ControlPoint';

/**
 * An effect point.
 */
export class EffectPoint extends ControlPoint {
  /**
   * The default instance of an effect point.
   */
  static readonly DEFAULT = new EffectPoint();

  /**
   * The default instance of an effect point.
   * Use {@link DEFAULT} instead.
   * @deprecated
   */
  static get default(): EffectPoint {
    return EffectPoint.DEFAULT;
  }

  /**
   * The type of an effect point.
   */
  pointType = ControlPointType.EffectPoint;

  /**
   * Whether this control point enables kiai mode.
   */
  kiai = false;

  /**
   * Whether the first bar line of this control point is ignored.
   * This property was moved to timing points.
   * @deprecated
   */
  omitFirstBarLine = false;

  /**
   * The relative scroll speed at this control point.
   */
  private _scrollSpeed = 1;

  get scrollSpeed(): number {
    return this._scrollSpeed;
  }

  set scrollSpeed(value: number) {
    this._scrollSpeed = clamp(value, 0.1, 10);
  }

  /**
   * Checks if this effect point is redundant to an another one.
   * @param existing The another effect point.
   * @returns Whether the effect point is redundant.
   */
  isRedundant(existing: EffectPoint | null): boolean {
    return existing instanceof EffectPoint
      && this.kiai === existing.kiai
      && this.scrollSpeed === existing.scrollSpeed;
  }

  copyFrom(other: EffectPoint): void {
    super.copyFrom(other);

    this.kiai = other.kiai;
    this.scrollSpeed = other.scrollSpeed;
    this.omitFirstBarLine = other.omitFirstBarLine;
  }

  equals(other: EffectPoint): boolean {
    return super.equals(other)
      && other instanceof EffectPoint
      && this.kiai === other.kiai
      && this.scrollSpeed === other.scrollSpeed;
  }
}
