import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import apiAgent from "../api/apiAgent";

import "./Main.css";

const ProductItem = ({ id, title, price, image }) => {
	return (
		<div className="product-list-item">
			<img src={image} />
			<span className="title">{title}</span>
			<span className="price">${price}</span>
			<Link className="btn" to={`/product/${id}`}>
				View Details
			</Link>
		</div>
	);
};

const ProductList = ({ products }) => {
	return (
		<div className="product-list">
			{products.map(item => (
				<ProductItem key={item.id} {...item} />
			))}
		</div>
	);
};

const Main = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setLoading(true);

		const getProducts = async () => {
			const resp = await apiAgent.Product.getAll();

			setProducts(resp.data);
			setLoading(false);
		};
		getProducts();
	}, []);

	if (loading) {
		return <div>Loading Products in Progress</div>;
	}

	return <ProductList products={products} />;
};

export default Main;
