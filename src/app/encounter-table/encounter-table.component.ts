import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { DiceTypes } from '../models/dice.model';
import { TableOfEventsService } from '../service/table-of-events.service';
import {
  RecordsParameters, RecordParameterOptions, RecordData, RecordDefaultParameters,
} from '../models/record.model';

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

  recordsParameters: RecordsParameters = RecordDefaultParameters;

  diceTypes = DiceTypes;

  rarityFormControl = new FormControl();

  recordParameterOptions = RecordParameterOptions;

  displayedColumns: string[] = ['order', 'Name', 'Rarity', 'Hostility'];

  constructor(
    private tableOfEventsService: TableOfEventsService,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    if (this.cookieService.check('encounterTableCookie')) {
      const savedRecordsIds = JSON.parse(this.cookieService.get('encounterTableCookie'));

      this.tableOfEventsService.getRecords().subscribe((data) => {
        this.records = this.tableOfEventsService
          .getRecordsFromCookies(data, savedRecordsIds);
        this.recordsAvailable = true;
      });
    } else {
      this.tableOfEventsService.getRecords().subscribe((data) => {
        this.records = this.tableOfEventsService
          .getFormattedRecords(data, RecordDefaultParameters);
        this.recordsAvailable = true;
        this.saveTableToCookies();
      });
    }
  }

  setTableSize(newSize: number): void {
    this.recordsParameters.tableSize = newSize;
    this.reloadTable();
  }

  saveTableToCookies(): void {
    const tableRecordsIds = [];
    this.records.forEach((record) => tableRecordsIds.push(record.recordId));

    this.cookieService.set('encounterTableCookie', JSON.stringify(tableRecordsIds));
  }

  reloadTable(): void {
    this.recordsAvailable = false;
    this.tableOfEventsService
      .getRecords()
      .subscribe((data) => {
        this.records = this.tableOfEventsService
          .getFormattedRecords(data, this.recordsParameters);
        this.recordsAvailable = true;
        this.saveTableToCookies();
      });
  }
}
