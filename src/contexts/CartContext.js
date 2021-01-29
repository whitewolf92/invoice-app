import React, { createContext, useReducer } from "react";
import { CartReducer, calculateTotal } from "./CartReducer";

export const CartContext = createContext();

const storageCartItems = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: [];

const initialState = {
	cartItems: storageCartItems,
	...calculateTotal(storageCartItems),
	checkoutInProgress: false
};

const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	const addItem = payload => {
		dispatch({ type: "ADD_ITEM", payload });
	};

	const removeItem = payload => {
		dispatch({ type: "REMOVE_ITEM", payload });
	};

	const increaseQty = payload => {
		dispatch({ type: "INCREASE_QTY", payload });
	};

	const decreaseQty = payload => {
		dispatch({ type: "DECREASE_QTY", payload });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR" });
	};

	const handleCheckout = () => {
		dispatch({ type: "CHECKOUT" });
	};

	const handlePaymentStatus = payload => {
		dispatch({ type: "PAYMENT_STATUS", payload });
	};

	return (
		<CartContext.Provider
			value={{
				addItem,
				removeItem,
				increaseQty,
				decreaseQty,
				clearCart,
				handleCheckout,
				handlePaymentStatus,
				...state
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
