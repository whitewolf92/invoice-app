import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import apiAgent from "../api/apiAgent";

import "./Main.css";

const ProductItem = ({ id, title, price, image }) => {
	return (
		<div className="text-center mb-20 flex-30pc">
			<img className="mx-auto max-h-24" src={image} alt="product" />
			<span className="block text-xl mb-5">{title}</span>
			<span className="block text-lg bold mb-5">${price}</span>
			<Link
				className="rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
				to={`/product/${id}`}
			>
				View Details
			</Link>
		</div>
	);
};

const ProductList = ({ products }) => {
	return (
		<div className="flex flex-wrap justify-between">
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
			const resp = await apiAgent.Product.getAll({ limit: 6 });

			setProducts(resp.data);
			setLoading(false);
		};
		getProducts();
	}, []);

	if (loading) {
		return (
			<div className="block text-center text-xl">
				Loading Products in Progress
			</div>
		);
	}

	return <ProductList products={products} />;
};

export default Main;
