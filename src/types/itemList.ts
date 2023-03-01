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

export interface AddCheckItem extends Item {
  id: number;
  check: boolean;
}

export interface AddCheckDiscount extends Discount {
  map(arg0: (discount: any) => JSX.Element): import('react').ReactNode;
  id: number;
  check: boolean;
}
