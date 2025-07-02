import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = (props) => {
    const VITE_API_URL = import.meta.env.VITE_BASE_URL;

    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(`${VITE_API_URL}/api/cart/add`, { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(`${VITE_API_URL}/api/cart/remove`, { itemId }, { headers: { token } })
        }
    }

    const subTotal = () => {
        let totalAmount = 0;

        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                } else {
                    // console.warn(`Product with ID ${item} not found in food_list`);
                }
            }
        }

        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${VITE_API_URL}/api/food/list`);

            if (response.data.data) {
                setFood_list(response.data.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${VITE_API_URL}/api/cart/get`, {}, { headers: { token } });
            setCartItem(response.data.cartData);

        } catch (error) {
            console.log("something went wrong");
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItem,
        subTotal,
        setCartItem,
        addToCart,
        removeFromCart,
        token,
        setToken,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};

export default StoreContextProvider;