export type Attribute = {
  name: string;
  value: string | number;
};

export interface GameItemData {
  title: string;
  attributes: Attribute[];
  power: number;
}
