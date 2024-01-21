import { BinarySearch } from '../../Utils';
import { ControlPointType } from '../Enums/ControlPointType';
import { ControlPointGroup } from './ControlPointGroup';
import { ControlPoint } from './ControlPoint';
import { DifficultyPoint } from './DifficultyPoint';
import { EffectPoint } from './EffectPoint';
import { SamplePoint } from './SamplePoint';
import { TimingPoint } from './TimingPoint';

/**
 * The information about control points.
 */
export class ControlPointInfo {
  /**
   * All groups of control points.
   */
  groups: ControlPointGroup[] = [];

  /**
   * All difficulty points.
   */
  difficultyPoints: DifficultyPoint[] = [];

  /**
   * All effect points.
   */
  effectPoints: EffectPoint[] = [];

  /**
   * All sample points.
   */
  samplePoints: SamplePoint[] = [];

  /**
   * All timing points.
   */
  timingPoints: TimingPoint[] = [];

  /**
   * All control points.
   */
  get allPoints(): ControlPoint[] {
    const points: ControlPoint[] = [];

    this.groups.forEach((g) => points.push(...g.controlPoints));

    return points;
  }

  /**
   * Finds a group at the specified time.
   * @param time The time.
   * @returns A group at the specified time.
   */
  groupAt(time: number): ControlPointGroup {
    const groupIndex = BinarySearch.findInsertionIndex(
      this.groups,
      (g) => g.startTime - time,
    );

    if (groupIndex >= 0) {
      return this.groups[groupIndex];
    }

    const group = new ControlPointGroup(time);

    group.onItemAdd = this.onGroupItemAdded;
    group.onItemRemove = this.onGroupItemRemoved;

    this.groups.splice(~groupIndex, 0, group);

    return group;
  }

  /**
   * Finds a difficulty point at the specified time.
   * @param time The time.
   * @returns A difficulty point at the specified time.
   */
  difficultyPointAt(time: number): DifficultyPoint {
    const point = BinarySearch.findControlPoint(this.difficultyPoints, time);
    const fallback = DifficultyPoint.DEFAULT;

    return (point as DifficultyPoint) || fallback;
  }

  /**
   * Finds a effect point at the specified time.
   * @param time The time.
   * @returns A effect point at the specified time.
   */
  effectPointAt(time: number): EffectPoint {
    const point = BinarySearch.findControlPoint(this.effectPoints, time);
    const fallback = EffectPoint.DEFAULT;

    return (point as EffectPoint) || fallback;
  }

  /**
   * Finds a sample point at the specified time.
   * @param time The time.
   * @returns A sample point at the specified time.
   */
  samplePointAt(time: number): SamplePoint {
    const point = BinarySearch.findControlPoint(this.samplePoints, time);
    const fallback = this.samplePoints[0] || SamplePoint.DEFAULT;

    return (point as SamplePoint) || fallback;
  }

  /**
   * Finds a timing point at the specified time.
   * @param time The time.
   * @returns A timing point at the specified time.
   */
  timingPointAt(time: number): TimingPoint {
    const point = BinarySearch.findControlPoint(this.timingPoints, time);
    const fallback = this.timingPoints[0] || TimingPoint.DEFAULT;

    return (point as TimingPoint) || fallback;
  }

  /**
   * Adds a new unique control point to the group at the specified time.
   * @param point A control point.
   * @param time The time.
   * @returns Whether the control point has been added to the group.
   */
  add(point: ControlPoint, time: number): boolean {
    if (this.checkAlreadyExisting(time, point)) {
      return false;
    }

    this.groupAt(time).add(point);

    return true;
  }

  getCurrentList(newPoint: ControlPoint): ControlPoint[] {
    if (newPoint instanceof DifficultyPoint) {
      return this.difficultyPoints;
    }

    if (newPoint instanceof EffectPoint) {
      return this.effectPoints;
    }

    if (newPoint instanceof SamplePoint) {
      return this.samplePoints;
    }

    if (newPoint instanceof TimingPoint) {
      return this.timingPoints;
    }

    throw new TypeError(`Unknown control point type: ${newPoint}!`);
  }

  checkAlreadyExisting(time: number, newPoint: ControlPoint): boolean {
    let existing = null;

    if (newPoint instanceof EffectPoint) {
      existing = this.effectPointAt(time);
    }
    
    if (newPoint instanceof TimingPoint) {
      existing = BinarySearch.findControlPoint(this.timingPoints, time);
    }

    return newPoint?.isRedundant(existing);
  }

  /**
   * Removes a control point from the group at the specified time.
   * @param point A control point.
   * @param time The time.
   * @returns Whether the control point has been removed from the group.
   */
  remove(point: ControlPoint, time: number): boolean {
    this.groupAt(time).remove(point);

    return true;
  }

  /**
   * Removes a group from the list and dettaches all control points from it.
   * @param group A group.
   */
  removeGroup(group: ControlPointGroup): void {
    group.controlPoints.forEach((item) => group.remove(item));

    group.onItemAdd = null;
    group.onItemRemove = null;

    const groupIndex = this.groups.findIndex((g) => g.equals(group));

    if (groupIndex >= 0) {
      this.groups.splice(groupIndex, 1);
    }
  }

  onGroupItemAdded(controlPoint: ControlPoint): void {
    const list = this.getCurrentList(controlPoint);

    const itemIndex = BinarySearch.findInsertionIndex(
      list,
      (c) => c.startTime - controlPoint.startTime,
    );

    if (itemIndex >= 0) return;

    list.splice(~itemIndex, 0, controlPoint);
  }

  onGroupItemRemoved(controlPoint: ControlPoint): void {
    const list = this.getCurrentList(controlPoint);

    const itemIndex = list.findIndex((c) => c.equals(controlPoint));

    if (itemIndex >= 0) {
      list.splice(itemIndex, 1);
    }
  }

  /**
   * Removes all control points.
   */
  clear(): void {
    this.groups.length = 0;
    this.difficultyPoints.length = 0;
    this.effectPoints.length = 0;
    this.samplePoints.length = 0;
    this.timingPoints.length = 0;
  }

  /**
   * Creates a copy of this information about control points.
   * Non-primitive properties will be copied via their own clone() method.
   * @returns A copied information about control points.
   */
  clone(): ControlPointInfo {
    const cloned = new ControlPointInfo();

    cloned.groups = this.groups;
    cloned.difficultyPoints = this.difficultyPoints;
    cloned.effectPoints = this.effectPoints;
    cloned.samplePoints = this.samplePoints;
    cloned.timingPoints = this.timingPoints;

    return cloned;
  }
}
