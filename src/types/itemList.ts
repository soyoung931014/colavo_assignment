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
  id: number;
  check: boolean;
}

export interface fetchProps {
  fetchCartInfo: (cartList: AddCheckItem[]) => void;
  fetchDiscountInfo: (discountList: AddCheckDiscount[]) => void;
}

export interface Info {
  count: number;
  name: string;
  price: number;
}
