import { Injectable } from '@angular/core';
import { shuffleArray } from '../utils/array.utils';
import { TableData } from '../../assets/data/tabledata';

@Injectable({
  providedIn: 'root',
})
export class TableOfEventsService {
  defaultTableSize: 20;

  getRecords(tableSize: number): any {
    const nbRecords = tableSize || this.defaultTableSize;

    // getting records from Airtable
    const records = shuffleArray(TableData.records);

    // adding order & size
    const finalRecords = records.slice(0, nbRecords).map((record, index) => ({
      ...record,
      order: index + 1,
    }));

    return finalRecords;
  }
}
