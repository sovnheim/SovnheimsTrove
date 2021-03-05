import { TableData } from './tabledata';

export class TableOfEvents {
  records: any[];

  constructor(tableSize) {
    this.records = [];
    let order = 0;

    TableData.records.forEach(
      (record) => {
        order += 1;
        if (order <= tableSize) {
          this.records.push({
            fields: record.fields,
            order,
          });
        }
      },
    );
  }
}

export function shuffleArray(array: any[]): any[] {
  const shuffledArray = [];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [array[j], array[i]];
  }
  return shuffledArray;
}
