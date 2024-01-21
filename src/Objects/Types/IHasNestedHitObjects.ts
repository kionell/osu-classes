import { IHitObject } from '../IHitObject';

/**
 * A hit object that has nested hit objects.
 */
export interface IHasNestedHitObjects {
  /**
   * Nested objects of the hit object.
   */
  nestedHitObjects: IHitObject[];
}
