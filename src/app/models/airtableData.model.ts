export type AirtableData = {
  records: {
    id: string;
    fields: {
      Name: string;
      Description: string;
      Location: string;
      Rarity: string;
      Tag: string[];
    };
    createdTime: string;
  };
};
