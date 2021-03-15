export type AirtableData = {
  records: {
    id: string;
    fields: {
      'Encounter Type': string;
      Tag: string[];
      Rarity: string;
      'Encounter Description': string;
      'Event Type': string[];
      'Encounter Name': string;
    };
    createdTime: string;
  };
};
