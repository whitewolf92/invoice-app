import axios from "axios";

const BACKEND_BASE_URL = `${process.env.REACT_APP_SERVER_BASE_API_URL}`;

const superagentXendit = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 20000,
});

const Invoice = {
  create: (params) => superagentXendit.post(`/invoices`, params),
  getById: (params) =>
    superagentXendit.get("/invoices", {
      params,
    }),
};

const apiAgent = {
  Invoice,
};

export default apiAgent;
