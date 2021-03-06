import { Vector2 } from '../../../Utils';

import { IMovableX } from './IMovableX';
import { IMovableY } from './IMovableY';

/**
 * A storyboard command that moves elements.
 */
export interface IMovable extends IMovableX, IMovableY {
  /**
   * The position at which element starts.
   */
  startPosition: Vector2;

  /**
   * The position at which element ends.
   */
  endPosition: Vector2;
}
