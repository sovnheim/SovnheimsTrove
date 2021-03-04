import { TableData } from './tabledata';

export class TableOfEvents {
  records: any[];

  constructor() {
    this.records = [];
    let order = 0;

    TableData.records.forEach(
      (record) => {
        order += 1;
        this.records.push({
          fields: {
            // adding API data to the records
            ...record.fields,

            // adding calculated data to the records
            order,
          },
        });
      },
    );
  }
}
