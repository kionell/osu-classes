import { ControlPointType } from '../Enums/ControlPointType';
import { ControlPoint } from './ControlPoint';
import { TimeSignature } from '../Enums/TimeSignature';
import { clamp } from '../../Utils/MathUtils';

/**
 * A timing point.
 */
export class TimingPoint extends ControlPoint {
  /**
   * The default instance of a timing point.
   */
  static readonly DEFAULT = new TimingPoint();

  /**
   * The default instance of a timing point.
   * Use {@link DEFAULT} instead.
   * @deprecated Since 3.1.0
   */
  static get default(): TimingPoint {
    return TimingPoint.DEFAULT;
  }

  /**
   * The type of a timing point.
   */
  pointType = ControlPointType.TimingPoint;

  /**
   * Whether the first bar line of this control point is ignored.
   */
  omitFirstBarLine = false;

  /**
   * The beat length of this timing point. 
   */
  private _beatLength = 1000;

  get beatLength(): number {
    return this._beatLength;
  }

  set beatLength(value: number) {
    this._beatLength = clamp(value, 6, 60000);
  }

  /**
   * The time signature of this timing point.
   */
  timeSignature: TimeSignature = TimeSignature.SimpleQuadruple;

  /**
   * The BPM of this timing point.
   */
  get bpm(): number {
    return 60000 / this.beatLength;
  }

  /**
   * Timing points are never redundant as they can change the time signature.
   */
  isRedundant(): false {
    return false;
  }

  copyFrom(other: TimingPoint): void {
    super.copyFrom(other);

    this.timeSignature = other.timeSignature;
    this.omitFirstBarLine = other.omitFirstBarLine;
    this.beatLength = other.beatLength;
  }

  equals(other: TimingPoint): boolean {
    return super.equals(other)
      && other instanceof TimingPoint
      && this.timeSignature === other.timeSignature
      && this.omitFirstBarLine === other.omitFirstBarLine
      && this.beatLength === other.beatLength;
  }
}
