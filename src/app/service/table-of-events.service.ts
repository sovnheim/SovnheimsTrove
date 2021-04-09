import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirtableData } from '../models/airtableData.model';
import { RecordsParameters } from '../models/record.model';
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

    const records = this.httpClient
      .get<AirtableData>('https://api.airtable.com/v0/appTQAkQPNQqFsIJS/Encounters?maxRecords=100&view=Full%20Table',
      options);
    return records;
  }

  getRecordsFromCookies(airTableData: any, tableIds: string[]): any[] {
    let records = airTableData.records.filter((record) => tableIds.includes(record.id));

    // flatten
    records = records.map((record) => ({
      ...record.fields,
      recordId: record.id,
    }));

    records = records.map((record) => ({
      ...record,
      rarityValue: this.rarityValues[record.Rarity],
    }));

    // adding order value
    records = records.map((record, index) => ({
      ...record,
      order: index + 1,
    }));

    return records;
  }

  getFormattedRecords(airTableData: any, tableParameters: RecordsParameters): any[] {
    let records = shuffleArray(airTableData.records);

    // flatten
    records = records.map((record) => ({
      ...record.fields,
      recordId: record.id,
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
