import { IHitObject } from './IHitObject';
import { IHasDuration } from './Types/IHasDuration';

/**
 * Use {@link IHasDuration} to differentiante 
 * between spinnable object and other type of hit object.
 * Creating this wasn't the best idea because it isn't robust 
 * at all and sometimes can't be applied to every ruleset.
 * This will be removed soon.
 * @deprecated
 */
export interface ISpinnableObject extends IHitObject, IHasDuration {}
