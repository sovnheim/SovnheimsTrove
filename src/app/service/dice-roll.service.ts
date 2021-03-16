export const DICE_COMMAND_REGEX = /^(?<dCount>\d+)[Dd](?<dType>\d+) ?(?<dMod>[+-]\d+)?$/;

export class DiceRoll {
  constructor() {
    this.diceCommand = '';
    this.validCommand = false;
  }

  diceCommand: string;

  validCommand: boolean;

  rollableSet: number[];

  rolledSet: number[];

  modifiers: number[];

  result: number;

  stats: {
    min: number;
    max: number;
    average: number;
    halved: number;
  };

  static rollDie(die: number): number {
    return Math.floor(Math.random() * die) + 1;
  }

  static diceAverage(rollableDice: number[]): number {
    return rollableDice.map((die) => (die + 1) / 2).reduce((a, b) => a + b, 0);
  }

  static getRolledSet(rollable: number[]): number[] {
    return rollable.map((die) => DiceRoll.rollDie(die));
  }

  parseDiceCommand(): void {
    const parsedSet = new RegExp(DICE_COMMAND_REGEX).exec(this.diceCommand);

    this.rollableSet = [];
    this.modifiers = [];

    for (let i = 0; i < Number(parsedSet.groups.dCount); i += 1) {
      this.rollableSet.push(Number(parsedSet.groups.dType));
    }

    if (parsedSet.groups.dMod) {
      this.modifiers.push(Number(parsedSet.groups.dMod));
    }
  }

  updateResult(): void {
    this.result = this.rolledSet.reduce((a, b) => a + b, 0);
    if (this.modifiers) {
      this.result += this.modifiers.reduce((a, b) => a + b, 0);
    }
  }

  static formatModifiers(mods: number[]): string {
    const formattedMods = [];
    mods.forEach((mod) => {
      if (mod < 0) {
        formattedMods.push(mod.toString());
      } else if (mod > 0) {
        formattedMods.push(`+${mod.toString()}`);
      }
    });
    return formattedMods.join(' ');
  }

  executeDiceRoll(): void {
    this.parseDiceCommand();
    this.rolledSet = DiceRoll.getRolledSet(this.rollableSet);
    this.updateResult();
    this.getBasicStats();
  }

  getVerboseResult(): string {
    if (this.modifiers.length > 0) {
      return `${this.rolledSet.join('+')} (${DiceRoll.formatModifiers(
        this.modifiers,
      )}) = ${this.result.toString()}`;
    }

    return `${this.rolledSet.join('+')} = ${this.result.toString()}`;
  }

  getBasicStats(): void {
    this.stats = {
      min: this.rollableSet.length + this.modifiers.reduce((a, b) => a + b, 0),
      max: this.rollableSet.reduce((a, b) => a + b, 0),
      average:
        DiceRoll.diceAverage(this.rollableSet)
        + this.modifiers.reduce((a, b) => a + b, 0),
      halved: this.result / 2,
    };
  }
}
