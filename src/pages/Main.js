import { Fragment, useState } from "react";

import InvoicePdfLink from "../components/InvoicePdf";
import apiAgent from "../api/apiAgent";

const Form = ({ handleSetData }) => {
  const [invoiceID, setInvoiceID] = useState("");
  const [message, setMessage] = useState("");
  const [exportInProgress, setExportInProgress] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setInvoiceID(event.target.value);
  };

  const handleExport = async (event) => {
    event.preventDefault();

    setExportInProgress(true);

    if (invoiceID?.length === 0) {
      setMessage("Invalid Invoice ID. Please enter again.");
      setExportInProgress(false);
      return;
    } else {
      setMessage("");
    }

    const params = {
      invoiceID,
    };

    try {
      const result = await apiAgent.Invoice.getById(params);
      handleSetData(result.data);
      console.log(result.data);
    } catch (error) {
      setMessage("Invoice not found. Please enter again.");
      // console.log(error);
    }

    setExportInProgress(false);
  };

  return (
    <Fragment>
      <div className="flex shadow-md my-10 bg-gray-50 w-2/4 mx-auto">
        <div className="w-full px-8 py-10 bg-gray-100">
          {message && message.length > 0 && (
            <div className="block text-pink-600 pb-0 text-center">
              {message}
            </div>
          )}
          <div className="flex justify-between items-center border-b mb-10">
            <div className="flex-30pc py-2 m-2 text-lg text-xl font-bold text-gray-800">
              Invoice ID
            </div>
            <div className="flex-70pc py-2 m-2">
              <input
                className="appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                aria-label="invoice-id"
                value={invoiceID}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            aria-label="search-btn"
            onClick={handleExport}
            disabled={exportInProgress}
            className="block mx-auto rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {exportInProgress ? "Please wait..." : "Generate Invoice"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const Main = () => {
  const [data, setData] = useState();

  return (
    <Fragment>
      <Form handleSetData={setData} />
      <div className="flex shadow-md my-10 bg-gray-50 w-2/4 mx-auto">
        <div className="w-full px-8 py-10 bg-gray-100">
          <InvoicePdfLink data={data} />
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
