import { Component } from '@angular/core';
import { DiceRoll, DICE_COMMAND_REGEX } from '../service/dice-roll.service';

@Component({
  selector: 'app-dice-box',
  templateUrl: './dice-box.component.html',
  styleUrls: ['./dice-box.component.scss'],
})
export class DiceBoxComponent {
  d: DiceRoll;

  rollStatus: string;

  constructor() {
    this.d = new DiceRoll();
    this.rollStatus = 'Roll';
  }

  onClick(): void {
    this.validateDiceRequest();
  }

  onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.validateDiceRequest();
    }
  }

  validateDiceRequest(): void {
    this.d.validCommand = DICE_COMMAND_REGEX.test(this.d.diceCommand);
    if (this.d.validCommand) {
      this.rollStatus = 'Re-Roll';
      this.d.executeDiceRoll();
    }
  }
}
