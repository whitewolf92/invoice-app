const setStorage = cartItems => {
	localStorage.setItem(
		"cart",
		JSON.stringify(Array.isArray(cartItems) ? cartItems : [])
	);
};

export const calculateTotal = cartItems => {
	const itemCount = cartItems.reduce(
		(total, product) => total + product.quantity,
		0
	);
	const total = cartItems
		.reduce((total, product) => total + product.price * product.quantity, 0)
		.toFixed(2);
	return { itemCount, total };
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			if (!state.cartItems.find(item => item.id === action.payload.id)) {
				state.cartItems.push({
					...action.payload,
					quantity: 1
				});
			}
			setStorage(state.cartItems);
			return {
				...state,
				...calculateTotal(state.cartItems),
				cartItems: [...state.cartItems]
			};
		case "REMOVE_ITEM":
			const cartItems = state.cartItems.filter(
				item => item.id !== action.payload.id
			);
			setStorage(state.cartItems);
			return {
				...state,
				...calculateTotal(cartItems),
				cartItems: [...cartItems]
			};
		case "INCREASE_QTY":
			state.cartItems[
				state.cartItems.findIndex(item => item.id === action.payload.id)
			].quantity++;

			setStorage(state.cartItems);
			return {
				...state,
				...calculateTotal(state.cartItems),
				cartItems: [...state.cartItems]
			};
		case "DECREASE_QTY":
			state.cartItems[
				state.cartItems.findIndex(item => item.id === action.payload.id)
			].quantity--;

			setStorage(state.cartItems);
			return {
				...state,
				...calculateTotal(state.cartItems),
				cartItems: [...state.cartItems]
			};
		case "CHECKOUT":
			setStorage(state.cartItems);
			return {
				...state,
				...calculateTotal(state.cartItems),
				checkoutInProgress: true
			};
		case "PAYMENT_STATUS":
			setStorage([]);
			return {
				...calculateTotal([]),
				checkoutInProgress: false,
				cartItems: []
			};
		case "CLEAR":
			setStorage([]);
			return {
				...calculateTotal([]),
				checkoutInProgress: false,
				cartItems: []
			};
		default:
			return state;
	}
};
