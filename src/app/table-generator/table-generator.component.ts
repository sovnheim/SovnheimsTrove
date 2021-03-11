/* eslint-disable class-methods-use-this */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiceTypes } from '../models/dice.model';
import { TableOfEventsService } from '../service/table-of-events.service';

@Component({
  selector: 'app-table-generator',
  templateUrl: './table-generator.component.html',
  styleUrls: ['./table-generator.component.scss'],
})
export class TableGeneratorComponent implements OnInit {
  records: any;

  recordstest: any;

  constructor(private httpClient: HttpClient, private tableOfEventsService: TableOfEventsService) {}

  ngOnInit(): void {
    this.records = this.tableOfEventsService.getRecords(10);
  }

  tableResize(newSize: number): any {
    this.records = this.tableOfEventsService.getRecords(newSize);
  }

  getAirtableData(): Observable<any> {
    const options = {
      headers: {
        Authorization: 'Bearer key8sQAW2BwXD4bpi',
      },
    };

    let observable;

    this.httpClient
      .get<any[]>('https://api.airtable.com/v0/appTQAkQPNQqFsIJS/Encounter%20Table?maxRecords=10&view=Full%20Table', options);

    return observable;
  }

  diceTypes = DiceTypes;

  displayedColumns: string[] = ['Roll', 'Encounter Name', 'Encounter Description', 'Encounter Type', 'Rarity'];
}
