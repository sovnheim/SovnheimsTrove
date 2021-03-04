import { TableData } from './tabledata';

export class TableOfEvents {
  tableSize: number;

  constructor(tableSize: number) {
    this.tableSize = tableSize;
    console.log(tableSize);
  }
}

export function getTableData(size: number) {
  const records = [];
  let order = 0;

  TableData.records.forEach((record) => {
    order += 1;
    if (order <= size) {
      records.push({
        fields: {
          ...record.fields, // original API fields
          order, // calculated fields
        },
      });
    }
  });

  // return formatted table data
  return records;
}
