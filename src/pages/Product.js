import { Fragment, useState, useEffect, useContext } from "react";
import apiAgent from "../api/apiAgent";

import { CartContext } from "../contexts/CartContext";

import "./Product.css";

const Product = props => {
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState([]);

	const { addItem, cartItems, increaseQty } = useContext(CartContext);

	useEffect(() => {
		setLoading(true);

		const getProduct = async () => {
			const resp = await apiAgent.Product.getById(props.match.params.id);

			setProduct(resp.data);
			setLoading(false);
		};
		getProduct();
	}, []);

	const existInCart = product =>
		!!cartItems.find(item => item.id === product.id);

	const handleIncrease = product => event => {
		event.preventDefault();
		increaseQty(product);
	};

	const handleAddProduct = product => event => {
		event.preventDefault();
		addItem(product);
	};

	if (loading) {
		return (
			<div className="block text-center text-xl">
				Loading Product in Progress
			</div>
		);
	}

	return (
		<div className="text-center mx-auto w-80">
			<img className="mx-auto mb-10 max-h-40" src={product.image} />
			<span className="block mb-5 text-xl">{product.title}</span>
			<span className="block mb-5 text-lg">${product.price}</span>
			<span className="block mb-5">{product.description}</span>
			<button
				onClick={
					existInCart(product)
						? handleIncrease(product)
						: handleAddProduct(product)
				}
				className="rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
			>
				Add to cart
			</button>
		</div>
	);
};

export default Product;
