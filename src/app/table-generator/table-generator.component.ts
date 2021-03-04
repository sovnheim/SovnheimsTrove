/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import { TableOfEvents } from '../service/tableOfEvents.service';
import { DiceTypes } from '../models/dice.model';

@Component({
  selector: 'app-table-generator',
  templateUrl: './table-generator.component.html',
  styleUrls: ['./table-generator.component.scss'],
})
export class TableGeneratorComponent implements OnInit {
  tableOfEvents: TableOfEvents;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    this.tableOfEvents = new TableOfEvents();
  }

  ngOnInit(): void {
  }

  // tableResize(tableSize: number): void {
  //   this.tableSize = tableSize;
  //   console.log(this.tableSize);
  // }

  diceTypes = DiceTypes;

  displayedColumns: string[] = ['Roll', 'Encounter Name', 'Encounter Description', 'Rarity', 'Encounter Type'];
}
