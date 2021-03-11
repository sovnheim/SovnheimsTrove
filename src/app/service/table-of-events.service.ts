import { Injectable } from '@angular/core';
import { shuffleArray } from '../utils/array.utils';
import { TableData } from '../../assets/data/tabledata';

@Injectable({
  providedIn: 'root',
})
export class TableOfEventsService {
  private databaseSize: number;

  private defaultTableSize: 20;

  private rarityValues = {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    'Very Rare': 4,
  };

  getDatabaseSize(): number {
    return this.databaseSize;
  }

  getRecords(tableSize: number): any[] {
    const nbRecords = tableSize || this.defaultTableSize;

    // getting records from Airtable
    const records = shuffleArray(TableData.records);

    // marking database size for future usage
    this.databaseSize = records.length;

    // resize table on nbRecords
    const trimmedRecords = records.slice(0, nbRecords);

    // sorting records by rarity
    const mappedRecords = trimmedRecords.map((record) => ({
      ...record,
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
