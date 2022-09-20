export interface HairList {
  items: {
    [key: string]: Item;
  };
  discounts: {
    [key: string]: Discount;
  };
  currency_code: string;
}

export interface Item {
  count: number;
  name: string;
  price: number;
}
export interface Discount {
  name: string;
  rate: number;
}
