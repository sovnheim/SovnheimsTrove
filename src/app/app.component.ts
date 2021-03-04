import { Component } from '@angular/core';
import { TableOfEvents, getTableData } from './service/tableOfEvents.service';
import { DiceTypes } from './models/dice.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tableSize: Number;

  constructor() {
    this.tableSize = 10;
  }

  title = 'Sovnheim\'s Trove of Not-So-Random Encounters';

  diceTypes = DiceTypes;

  displayedColumns: string[] = ['Roll', 'Encounter Name', 'Encounter Description', 'Rarity', 'Encounter Type'];

  events = new TableOfEvents(5);

  dataSource = getTableData(7);

  // static onClick(tableSize: number): void {
  //   console.log(tableSize);
  // }
}
