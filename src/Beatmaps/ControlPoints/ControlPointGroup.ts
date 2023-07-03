import { ControlPoint } from './ControlPoint';

/**
 * A group of control points.
 */
export class ControlPointGroup {
  /**
   * A list of control points.
   */
  controlPoints: ControlPoint[] = [];

  /**
   * The time at which group starts.
   */
  startTime: number;

  /**
   * Creates a new group of control points.
   * @param time The time at which group starts.
   * @constructor
   */
  constructor(time: number) {
    this.startTime = time;
  }

  /**
   * Adds a new control point to a group.
   * @param point A control point.
   */
  add(point: ControlPoint): void {
    const existing = this.controlPoints.find((p) => {
      return p.pointType === point.pointType;
    });

    if (existing) {
      this.remove(existing);
    }

    point.attachGroup(this);

    this.controlPoints.push(point);

    if (this.onItemAdd) this.onItemAdd(point);
  }

  /**
   * Removes a control point from a group.
   * @param point A control point.
   */
  remove(point: ControlPoint): void {
    const index = this.controlPoints.findIndex((p) => {
      return p.pointType === point.pointType;
    });

    if (index !== -1) {
      this.controlPoints.splice(index, 1);

      point.dettachGroup();

      if (this.onItemRemove) this.onItemRemove(point);
    }
  }

  /**
   * Optional listener that will fire when a new control point will be add to this group.
   */
  onItemAdd: ((controlPoint: ControlPoint) => void) | null = null;

  /**
   * Optional listener that will fire when a control point will be removed from this group.
   */
  onItemRemove: ((controlPoint: ControlPoint) => void) | null = null;
}
