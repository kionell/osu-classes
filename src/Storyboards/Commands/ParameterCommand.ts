import { Command } from './Command';
import { CommandType } from '../Enums/CommandType';
import { ParameterType } from '../Enums/ParameterType';

/**
 * The parameter command.
 */
export abstract class ParameterCommand extends Command {
  type: CommandType = CommandType.Parameter;

  /**
   * The parameter type of the parameter command.
   */
  parameter: ParameterType = ParameterType.None;

  /**
   * The acronym of the parameter command.
   */
  get acronym(): string {
    return 'P';
  }

  abstract get parameterAcronym(): string;
}
