import { shuffleArray } from '../utils/array.utils';
import { TableData } from './tabledata';

export class TableOfEvents {
  records: any[];

  constructor(tableSize: number) {
    // getting records from Airtable
    this.records = shuffleArray(TableData.records);

    // implement table size limit
    this.records.length = tableSize;

    // add order value
    this.records = TableOfEvents.setRecordsOrder(this.records);
  }

  static setRecordsOrder(records: any[]): any[] {
    const orderedRecords = [];
    let order = 0;
    records.forEach(
      (record) => {
        order += 1;
        orderedRecords.push({
          fields: record.fields,
          order,
        });
      },
    );
    return orderedRecords;
  }
}
