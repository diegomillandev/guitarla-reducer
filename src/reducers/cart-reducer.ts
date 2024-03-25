import { Product, CartItem } from '../types';
import { db } from '../db/db';
export type CartActions =
    | { type: 'add-to-cart'; payload: { item: Product } }
    | { type: 'remove-item-cart'; payload: { id: Product['id'] } }
    | { type: 'decrease-quantity'; payload: { id: Product['id'] } }
    | { type: 'increase-quantity'; payload: { id: Product['id'] } }
    | { type: 'unoccupy-cart' };

export type CartState = {
    itemsdb: Product[];
    itemsCart: CartItem[];
};

const localStorageItemCart = (): CartItem[] => {
    const itemsCart = localStorage.getItem('itemsCart');
    return itemsCart ? JSON.parse(itemsCart) : [];
};

export const initialState: CartState = {
    itemsdb: db,
    itemsCart: localStorageItemCart(),
};

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === 'add-to-cart') {
        const findItemIndex: number = state.itemsCart.findIndex(
            (item) => item.id === action.payload.item.id
        );
        if (findItemIndex === -1) {
            return {
                ...state,
                itemsCart: [
                    ...state.itemsCart,
                    { ...action.payload.item, quantity: 1 },
                ],
            };
        } else {
            const updateItems: CartItem[] = state.itemsCart.map((item, index) =>
                index === findItemIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return {
                ...state,
                itemsCart: updateItems,
            };
        }
    }

    if (action.type === 'remove-item-cart') {
        const removeItem: CartItem[] = state.itemsCart.filter(
            (item) => item.id !== action.payload.id
        );

        return {
            ...state,
            itemsCart: removeItem,
        };
    }

    if (action.type === 'increase-quantity') {
        const updateItem: CartItem[] = state.itemsCart.map((item) =>
            item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        return {
            ...state,
            itemsCart: updateItem,
        };
    }

    if (action.type === 'decrease-quantity') {
        const updateItem: CartItem[] = state.itemsCart
            .map((item) => {
                if (item.id === action.payload.id) {
                    item = { ...item, quantity: item.quantity - 1 };
                    return item;
                }
                return item;
            })
            .filter((item) => item.quantity !== 0);

        return {
            ...state,
            itemsCart: updateItem,
        };
    }

    if (action.type === 'unoccupy-cart') {
        return {
            ...state,
            itemsCart: [],
        };
    }

    return state;
};
