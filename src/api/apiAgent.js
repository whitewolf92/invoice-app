import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const BACKEND_BASE_URL = `${process.env.REACT_APP_SERVER_BASE_API_URL}`;

const superagent = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

const superagentXendit = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 20000,
});

const Product = {
  getAll: ({ limit }) => superagent.get(`/products?limit=${limit}`),
  getById: (id) => superagent.get(`/products/${id}`),
};

const Invoice = {
  create: (params) => superagentXendit.post(`/invoices`, params),
  get: (params) =>
    superagentXendit.get("/invoices", {
      params,
    }),
};

const apiAgent = {
  Product,
  Invoice,
};

export default apiAgent;
