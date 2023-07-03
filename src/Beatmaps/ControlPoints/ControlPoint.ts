import { ControlPointGroup } from './ControlPointGroup';
import { ControlPointType } from '../Enums/ControlPointType';

/**
 * A control point of a beatmap.
 */
export abstract class ControlPoint {
  abstract pointType: ControlPointType;

  /**
   * The group to which a control point belongs.
   * Use control point info to get access to the groups
   * @deprecated Since 3.1.0
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
   * @deprecated Since 3.1.0
   */
  dettachGroup(): void {
    this.group = null;
  }

  /**
   * The time at which control point starts.
   */
  get startTime(): number {
    if (this.group) {
      return (this.group as ControlPointGroup).startTime;
    }

    return 0;
  }

  abstract isRedundant(existing: ControlPoint | null): boolean;
}
