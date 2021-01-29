import { useState, useContext, Fragment } from "react";

import { CartContext } from "../contexts/CartContext";
import apiAgent from "../api/apiAgent";

const convertToIndo = amount => (amount * 14000).toFixed(0);

function isEmail(val) {
	let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (regEmail.test(val)) {
		return true;
	}
}

const Checkout = () => {
	const { total, itemCount, checkoutInProgress, handleCheckout } = useContext(
		CartContext
	);
	const [payerEmail, setPayerEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleChange = event => {
		event.preventDefault();
		setPayerEmail(event.target.value);
	};

	const handlePayment = async event => {
		event.preventDefault();

		if (!isEmail(payerEmail)) {
			setMessage("Invalid Email. Please enter again.");
			return;
		} else {
			setMessage("");
		}

		const params = {
			externalID: `cart-${Date.now()}`,
			payerEmail: payerEmail,
			description: "Shopping Cart Description",
			amount: convertToIndo(total),
			successRedirectURL: "http://localhost:3000/cart?payment_status=success",
			failureRedirectURL: "http://localhost:3000/cart?payment_status=fail"
		};

		handleCheckout();
		const result = await apiAgent.Invoice.create(params);
		const data = result.data;

		if (data && data.invoice_url) {
			window.location = data.invoice_url;
		} else {
			setMessage("There is an issue with the server. Please try again later.");
		}
	};

	return (
		<Fragment>
			<div className="flex shadow-md my-10 bg-gray-50 w-2/4 mx-auto">
				<div className="w-full px-8 py-10 bg-gray-100">
					<h1 className="bold text-2xl mb-10 text-center">Payment Details</h1>

					<div className="flex justify-between border-b">
						<div className="py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
							Total Items
						</div>
						<div className="py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
							{itemCount}
						</div>
					</div>

					<div className="flex justify-between border-b">
						<div className="py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
							Grand Total (USD)
						</div>
						<div className="py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
							${total}
						</div>
					</div>

					<div className="flex justify-between border-b">
						<div className="py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
							Grand Total (IDR)
						</div>
						<div className="py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
							${convertToIndo(total)}
						</div>
					</div>

					{message && message.length > 0 && (
						<div className="block text-pink-600 pt-3 pb-0 text-center">
							{message}
						</div>
					)}

					<div className="flex justify-between items-center border-b mb-10">
						<div className="flex-30pc py-2 m-2 text-lg text-xl font-bold text-gray-800">
							Email
						</div>
						<div className="flex-70pc py-2 m-2">
							<input
								className="appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
								type="text"
								label="payerEmail"
								value={payerEmail}
								onChange={handleChange}
							/>
						</div>
					</div>
					<button
						onClick={handlePayment}
						disabled={checkoutInProgress}
						className="block mx-auto rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
					>
						{checkoutInProgress ? "Please wait..." : "Proceed to Payment"}
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default Checkout;
