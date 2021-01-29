import axios from "axios"; // use later

const API_BASE_URL = "https://fakestoreapi.com";

const superagent = axios.create({
	baseURL: API_BASE_URL,
	timeout: 20000
});

const Product = {
	getAll: () => superagent.get("/products?limit=6"),
	getById: id => superagent.get(`/products/${id}`)
};

const apiAgent = {
	Product
};

export default apiAgent;
