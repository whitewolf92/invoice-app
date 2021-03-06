const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

const result = dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
if (result.error) {
  throw result.error;
}

const Xendit = require("xendit-node");
const xendit = new Xendit({
  secretKey: `${process.env.XENDIT_SECRET_KEY}`,
});

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.get("/invoices", async (req, res) => {
  const { Invoice } = xendit;
  const invoiceSpecificOptions = {};
  const inv = new Invoice(invoiceSpecificOptions);

  const { invoiceID } = req.query;

  try {
    const response = await inv.getInvoice({
      invoiceID,
    });

    return res.json(response);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.listen(process.env.PORT || 8080);
