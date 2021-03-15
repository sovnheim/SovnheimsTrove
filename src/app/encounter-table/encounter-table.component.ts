/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';

import { DiceTypes } from '../models/dice.model';
import { TableOfEventsService } from '../service/table-of-events.service';

@Component({
  selector: 'app-encounter-table',
  templateUrl: './encounter-table.component.html',
  styleUrls: ['./encounter-table.component.scss'],
})
export class EncounterTableComponent implements OnInit {
  records: any;

  diceTypes = DiceTypes;

  displayedColumns: string[] = ['Roll', 'Encounter Name', 'Encounter Description', 'Encounter Type', 'Rarity'];

  constructor(
    private tableOfEventsService: TableOfEventsService,
  ) {}

  ngOnInit(): void {
    this.tableOfEventsService.getRecords().subscribe((data) => {
      const processedRecords = this.tableOfEventsService.getFormattedRecords(data, 10);
      this.records = processedRecords || [];
    });
  }

  tableResize(newSize: number): any {
    this.tableOfEventsService.getRecords().subscribe((data) => {
      const processedRecords = this.tableOfEventsService.getFormattedRecords(data, newSize);
      this.records = processedRecords || [];
    });
  }
}
