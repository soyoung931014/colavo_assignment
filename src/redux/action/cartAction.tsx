import { AddCheckItem } from '@src/types/itemList';

export const SAVE_CART = 'SAVE_CART' as const;
export const DELETE_CART = 'DELETE_CART' as const;
export const UPDATE_CART = 'UPDATE_CART' as const;

export const saveCart = (data: AddCheckItem[]) => {
  return {
    type: 'SAVE_CART',
    payload: data,
  };
};

export const deleteCart = (data: AddCheckItem[]) => {
  return {
    type: 'DELETE_CART',
    payload: data,
  };
};

export const updateCart = (data: AddCheckItem[]) => {
  return {
    type: 'UPDATE_CART',
    payload: data,
  };
};

export type cartAction =
  | ReturnType<typeof saveCart>
  | ReturnType<typeof deleteCart>
  | ReturnType<typeof updateCart>;
