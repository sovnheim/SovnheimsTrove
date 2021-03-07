/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import { DiceTypes } from '../models/dice.model';
import { TableOfEventsService } from '../service/table-of-events.service';

@Component({
  selector: 'app-table-generator',
  templateUrl: './table-generator.component.html',
  styleUrls: ['./table-generator.component.scss'],
})
export class TableGeneratorComponent implements OnInit {
  records: any;

  constructor(private tableOfEventsService: TableOfEventsService) {}

  ngOnInit(): void {
    this.records = this.tableOfEventsService.getRecords(10);
  }

  tableResize(newSize: number): any {
    this.records = this.tableOfEventsService.getRecords(newSize);
  }

  diceTypes = DiceTypes;

  displayedColumns: string[] = ['Roll', 'Encounter Name', 'Encounter Description', 'Encounter Type', 'Rarity'];
}
