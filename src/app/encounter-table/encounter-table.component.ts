import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { DiceTypes } from '../models/dice.model';
import { TableOfEventsService } from '../service/table-of-events.service';
import { RecordParameters, RecordParameterOptions, RecordData } from '../models/record.model';

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
  recordsAvailable: boolean = false;

  records: RecordData;

  diceTypes = DiceTypes;

  displayedColumns: string[] = ['order', 'Name', 'Rarity', 'Hostility'];

  recordParameterOptions = RecordParameterOptions;

  rarityFormControl = new FormControl();

  tableParameters : RecordParameters = {
    tableSize: 6,
    hostility:
    {
      Friendly: true,
      Neutral: true,
      Hostile: true,
    },
    rarity: {
      Common: true,
      Uncommon: true,
      Rare: true,
      'Very Rare': true,
    },
  };

  constructor(
    private tableOfEventsService: TableOfEventsService,
  ) {}

  ngOnInit(): void {
    this.tableOfEventsService.getRecords().subscribe((data) => {
      const processedRecords = this.tableOfEventsService
        .getFormattedRecords(data, this.tableParameters);
      this.recordsAvailable = true;
      this.records = processedRecords || [];
    });
  }

  tableResize(newSize: number): void {
    this.recordsAvailable = false;
    this.tableParameters.tableSize = newSize;
    this.tableOfEventsService.getRecords().subscribe((data) => {
      const processedRecords = this.tableOfEventsService
        .getFormattedRecords(data, this.tableParameters);
      this.records = processedRecords || [];
      this.recordsAvailable = true;
    });
  }
}
