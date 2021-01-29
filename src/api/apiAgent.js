import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const superagent = axios.create({
	baseURL: API_BASE_URL,
	timeout: 20000
});

const Product = {
	getAll: ({ limit }) => superagent.get(`/products?limit=${limit}`),
	getById: id => superagent.get(`/products/${id}`)
};

const apiAgent = {
	Product
};

export default apiAgent;
