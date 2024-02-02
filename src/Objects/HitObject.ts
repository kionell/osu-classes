import { HitType } from './Enums/HitType';
import { IHitObject } from './IHitObject';
import { BeatmapDifficultySection } from '../Beatmaps/Sections';
import { ControlPointInfo } from '../Beatmaps/ControlPoints';
import { HitWindows } from '../Scoring/HitWindows';
import { Vector2 } from '../Types';
import { HitSound, HitSample } from '../Audio';

/**
 * An object of a parsed beatmap.
 */
export abstract class HitObject implements IHitObject {
  /**
   * The status of kiai mode at the current hit object.
   */
  kiai: boolean;

  /**
   * Nested objects of the hit object.
   */
  nestedHitObjects: HitObject[];

  /**
   * The time at which the hit object starts.
   */
  startTime: number;

  /**
   * Parsed hit type data of a hit object.
   */
  hitType: HitType;

  /**
   * Parsed hit sound data of a hit object.
   * Use {@link samples} to work with hitsound data.
   * @deprecated
   */
  hitSound: HitSound;

  /**
   * The samples to be played when this hit object is hit.
   */
  samples: HitSample[];

  /**
   * The position at which the hit object starts.
   */
  startPosition: Vector2;

  /**
   * Hit windows of this hit object.
   */
  hitWindows: HitWindows = new HitWindows();

  constructor(options?: Partial<HitObject>) {
    this.startPosition = options?.startPosition ?? new Vector2();
    this.startTime = options?.startTime ?? 0;
    this.hitType = options?.hitType ?? HitType.Normal;
    this.hitSound = options?.hitSound ?? HitSound.Normal;
    this.samples = options?.samples ?? [];
    this.kiai = options?.kiai ?? false;
    this.nestedHitObjects = options?.nestedHitObjects ?? [];
  }

  /**
   * The starting X-position of this hit object.
   */
  get startX(): number {
    return this.startPosition.x;
  }

  set startX(value: number) {
    this.startPosition.x = value;
  }

  /**
   * The starting Y-position of this hit object.
   */
  get startY(): number {
    return this.startPosition.y;
  }

  set startY(value: number) {
    this.startPosition.y = value;
  }

  /**
   * Generates a list of nested hit objects.
   */
  createNestedHitObjects(): void {
    this.nestedHitObjects = [];
  }

  /**
   * Applies default values to the hit object.
   * @param controlPoints Beatmap control points.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyDefaultsToSelf(controlPoints: ControlPointInfo, difficulty: BeatmapDifficultySection): void {
    this.kiai = controlPoints.effectPointAt(this.startTime + 1).kiai;
    this.hitWindows?.setDifficulty(difficulty.overallDifficulty);
  }

  /**
   * Applies default values to the nested hit objects.
   * @param controlPoints Beatmap control points.
   * @param difficulty Beatmap Difficulty.
   */
  applyDefaultsToNested(controlPoints: ControlPointInfo, difficulty: BeatmapDifficultySection): void {
    this.nestedHitObjects.forEach((n) => {
      n.applyDefaults(controlPoints, difficulty);
    });
  }

  /**
   * Applies default values to the hit object and it's nested hit objects.
   * @param controlPoints Beatmap control points.
   * @param difficulty Beatmap Difficulty.
   */
  applyDefaults(controlPoints: ControlPointInfo, difficulty: BeatmapDifficultySection): void {
    this.applyDefaultsToSelf(controlPoints, difficulty);

    this.nestedHitObjects = [];

    this.createNestedHitObjects();

    this.nestedHitObjects.sort((a, b) => a.startTime - b.startTime);

    this.applyDefaultsToNested(controlPoints, difficulty);
  }

  /**
   * Create a new copy of a hit object. 
   * @returns A clone of this hit object.
   */
  clone(): this {
    const HitObject = this.constructor as new () => this;

    const cloned = new HitObject();

    cloned.startPosition = this.startPosition.clone();
    cloned.startTime = this.startTime;
    cloned.hitType = this.hitType;
    cloned.hitSound = this.hitSound;
    cloned.samples = this.samples.map((s) => s.clone());
    cloned.kiai = this.kiai;
    cloned.nestedHitObjects = this.nestedHitObjects.map((n) => n.clone());

    return cloned;
  }
}
