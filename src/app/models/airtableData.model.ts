export type AirtableData = {
  records: AirtableEntry[]
};

export type AirtableEntry = {
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
