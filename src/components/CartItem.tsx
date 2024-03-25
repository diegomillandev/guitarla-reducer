import { Dispatch } from 'react';
import { CartItem as CartItemtypes } from '../types';
import { CartActions } from '../reducers/cart-reducer';

type CartItemProps = {
    item: CartItemtypes;
    dispatch: Dispatch<CartActions>;
};

export const CartItem = ({ item, dispatch }: CartItemProps) => {
    const { image, name, price, quantity, id } = item;
    return (
        <tr>
            <td>
                <img
                    className="img-fluid"
                    src={`/img/${image}.jpg`}
                    alt="imagen guitarra"
                />
            </td>
            <td>{name}</td>
            <td className="fw-bold">${price}</td>
            <td className="flex align-items-start gap-4">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() =>
                        dispatch({ type: 'decrease-quantity', payload: { id } })
                    }
                >
                    -
                </button>
                {quantity}
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() =>
                        dispatch({ type: 'increase-quantity', payload: { id } })
                    }
                >
                    +
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() =>
                        dispatch({ type: 'remove-item-cart', payload: { id } })
                    }
                >
                    X
                </button>
            </td>
        </tr>
    );
};
