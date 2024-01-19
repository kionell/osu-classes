import { ControlPointGroup } from './ControlPointGroup';
import { ControlPointType } from '../Enums/ControlPointType';

/**
 * A control point of a beatmap.
 */
export abstract class ControlPoint {
  /**
   * Use `instanceof` operator to check control point type.
   * @deprecated
   */
  abstract pointType: ControlPointType;

  /**
   * The group to which a control point belongs.
   * Use control point info to get access to the groups
   * @deprecated
   */
  group: ControlPointGroup | null;

  /**
   * The time at which this control point starts.
   */
  startTime = 0;

  /**
   * Creates a new instance of a control point.
   * @param group A group of this control point.
   * @constructor
   */
  constructor(group?: ControlPointGroup) {
    this.group = group || null;
    this.startTime = group?.startTime ?? 0;
  }

  /**
   * Attaches this control point to a specific group by its start time.
   * @param group A control point group.
   */
  attachGroup(group: ControlPointGroup): void {
    this.group = group;
    this.startTime = group.startTime;
  }

  /**
   * Dettaches a group from this control point.
   * Remove control points directrly from the group.
   * @deprecated
   */
  dettachGroup(): void {
    this.group = null;
  }

  /**
   * Copies properties from other control point.
   * @param other Other difficulty control point.
   */
  copyFrom(other: ControlPoint): void {
    this.startTime = other.startTime;
  }

  /**
   * @param other Other difficulty control point.
   * @returns If two control points are equal.
   */
  equals(other: ControlPoint): boolean {
    return other instanceof ControlPoint && this.startTime === other.startTime;
  }

  /**
   * Determines whether this {@link ControlPoint} results 
   * in a meaningful change when placed alongside another.
   * @param existing An existing control point to compare with.
   * @returns Whether this {@link ControlPoint} is redundant when placed alongside existing one.
   */
  abstract isRedundant(existing: ControlPoint | null): boolean;
}
