import { ParameterCommand } from './ParameterCommand';
import { ParameterType } from '../Enums/ParameterType';

/**
 * The horizontal flip command.
 */
export class HorizontalFlipCommand extends ParameterCommand {
  parameter: ParameterType = ParameterType.HorizontalFlip;

  /**
   * The parameter acronym of the horizontal flip command.
   */
  get parameterAcronym(): string {
    return 'H';
  }
}
