export interface HairList {
  items: Item;
  discounts: Discount;
  currency_code: string;
}

export interface Item {
  [key: string]: {
    count: number;
    name: string;
    price: number;
  };
}
export interface Discount {
  [key: string]: {
    name: string;
    rate: number;
  };
}
