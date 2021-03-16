import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirtableData } from '../models/airtableData.model';
import { shuffleArray } from '../utils/array.utils';

@Injectable({
  providedIn: 'root',
})
export class TableOfEventsService {
  private defaultTableSize: 20;

  private rarityValues = {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    'Very Rare': 4,
  };

  constructor(
    private httpClient: HttpClient,
  ) {}

  getRecords(): Observable<AirtableData> {
    const options = {
      headers: {
        Authorization: 'Bearer key8sQAW2BwXD4bpi',
      },
    };

    return this.httpClient
      .get<AirtableData>('https://api.airtable.com/v0/appTQAkQPNQqFsIJS/Encounter%20Table?maxRecords=100&view=Full%20Table',
      options);
  }

  getFormattedRecords(airTableData: any, tableSize: number): any[] {
    const nbRecords = tableSize || this.defaultTableSize;

    // getting records from Airtable
    const records = shuffleArray(airTableData.records);

    // resize table on nbRecords
    const trimmedRecords = records.slice(0, nbRecords);

    const mappedRecords = trimmedRecords.map((record) => ({
      ...record.fields,
      rarityValue: this.rarityValues[record.fields.Rarity],
    }));

    const orderedRecords = mappedRecords.sort((a, b) => a.rarityValue - b.rarityValue);

    // adding order value
    const finalRecords = orderedRecords.map((record, index) => ({
      ...record,
      order: index + 1,
    }));

    return finalRecords;
  }
}
