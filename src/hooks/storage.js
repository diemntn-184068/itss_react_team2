import { useState, useEffect } from 'react';

const STORAGE_KEY = 'shopping-cart';

function useStorage() {
    const [cartItems, setCartItems] = useState([]);

    /* 副作用を使う */
    useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        } else {
            setCartItems(JSON.parse(data));
        }
    }, []);

    const putCartItems = items => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        setCartItems(items);
    };

    const clearCartItems = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        setCartItems([]);
    };

    return [cartItems, putCartItems, clearCartItems];
}

export default useStorage;