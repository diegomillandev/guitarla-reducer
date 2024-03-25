import { useEffect, useReducer } from 'react';
import { Footer, Guitar, Header } from './components';
import { cartReducer, initialState } from './reducers/cart-reducer';

export const App = () => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem('itemsCart', JSON.stringify(state.itemsCart));
    }, [state.itemsCart]);

    return (
        <>
            <Header state={state} dispatch={dispatch} />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {state.itemsdb.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            dispatch={dispatch}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
};
