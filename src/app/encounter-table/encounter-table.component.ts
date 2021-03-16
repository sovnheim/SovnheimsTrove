/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';

import { DiceTypes } from '../models/dice.model';
import { TableOfEventsService } from '../service/table-of-events.service';

@Component({
  selector: 'app-encounter-table',
  templateUrl: './encounter-table.component.html',
  styleUrls: ['./encounter-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EncounterTableComponent implements OnInit {
  records: any;

  diceTypes = DiceTypes;

  displayedColumns: string[] = ['order', 'Name', 'Rarity', 'Hostility'];

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
