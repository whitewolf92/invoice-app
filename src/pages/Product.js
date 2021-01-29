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
		return <div>Loading Product in Progress</div>;
	}

	return (
		<div className="product">
			<img src={product.image} />
			<h1>{product.title}</h1>
			<h2>${product.price}</h2>
			<h3>{product.description}</h3>
			<button
				onClick={
					existInCart(product)
						? handleIncrease(product)
						: handleAddProduct(product)
				}
				className="btn"
			>
				Add to cart
			</button>
		</div>
	);
};

export default Product;
