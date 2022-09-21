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

export interface Info {
  count: number;
  name: string;
  price: number;
}
// export interface HairList {
//   items: Item;
//   discounts: Discount;
//   currency_code: string;
// }

// export interface Item {
//   [key: string]: {
//     count: number;
//     name: string;
//     price: number;
//   };
// }
// export interface Discount {
//   [key: string]: {
//     name: string;
//     rate: number;
//   };
// }

// export interface Info {
//   count: number;
//   name: string;
//   price: number;
// }
