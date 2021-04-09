export type RecordData = {
  Description: string;
  Hostility: string;
  Location: string[];
  Name: string;
  Rarity: string;
  order: number;
  rarityValue: number;
  recordId: string;
}[];

export type RecordsParameters = {
  tableSize: number;
  hostility: {};
  rarity: {};
};

export const RecordParameterOptions = {
  tableSize: [4, 6, 8, 10, 12, 20, 100],
  hostility: ['Friendly', 'Neutral', 'Hostile'],
  rarity: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
};

export const RecordDefaultParameters = {
  tableSize: 10,
  hostility:
  {
    Friendly: true,
    Neutral: true,
    Hostile: true,
  },
  rarity: {
    Common: true,
    Uncommon: true,
    Rare: true,
    'Very Rare': true,
  },
};
