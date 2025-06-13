import { IJsonableAPIMod } from './IJsonableAPIMod';
import { IMod } from './IMod';

/**
 * A class that represents an mod compatible with osu! api.
 * This can be found in score information (online scores or replays). 
 */
export class APIMod {
  acronym: string;

  constructor(data?: Partial<APIMod>) {
    this.acronym = data?.acronym ?? '';
  }

  static fromMod(mod: IMod): APIMod {
    return new APIMod({
      acronym: mod.acronym,
      // TODO: Add support for mod settings.
    });

  }

  static fromJSON(mod: IJsonableAPIMod): APIMod {
    return new APIMod({
      acronym: mod.acronym,
      // TODO: Add support for mod settings.
    });
  }

  toString(): string {
    return this.acronym;
  }

  toJSON(): IJsonableAPIMod {
    return {
      acronym: this.acronym,
      // TODO: Add support for mod settings
    };
  }
}
