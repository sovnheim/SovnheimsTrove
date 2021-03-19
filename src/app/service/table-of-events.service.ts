import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirtableData } from '../models/airtableData.model';
import { RecordParameters } from '../models/record.model';
import { shuffleArray } from '../utils/array.utils';

@Injectable({
  providedIn: 'root',
})
export class TableOfEventsService {
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
      .get<AirtableData>('https://api.airtable.com/v0/appTQAkQPNQqFsIJS/Encounters?maxRecords=100&view=Full%20Table',
      options);
  }

  getFormattedRecords(airTableData: any, tableParameters: RecordParameters): any[] {
    // getting records from Airtable
    let records = shuffleArray(airTableData.records);

    // flatten
    records = records.map((record) => ({
      ...record.fields,
    }));

    // apply filters
    records = records.filter((record) => tableParameters.hostility[record.Hostility]);
    records = records.filter((record) => tableParameters.rarity[record.Rarity]);

    // resize table on nbRecords
    records = records.slice(0, tableParameters.tableSize);

    records = records.map((record) => ({
      ...record,
      rarityValue: this.rarityValues[record.Rarity],
    }));

    records = records.sort((a, b) => a.rarityValue - b.rarityValue);

    // adding order value
    records = records.map((record, index) => ({
      ...record,
      order: index + 1,
    }));

    return records;
  }
}
