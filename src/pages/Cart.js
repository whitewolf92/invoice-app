import { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";

import "./Cart.css";

const CartItem = ({ product }) => {
  const { increaseQty, decreaseQty, removeItem } = useContext(CartContext);

  const handleIncreaseQty = product => event => {
    event.preventDefault();
    increaseQty(product);
  };

  const handleDecreaseQty = product => event => {
    event.preventDefault();
    decreaseQty(product);
  };

  const handleRemoveItem = product => event => {
    event.preventDefault();
    removeItem(product);
  };

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="w-2/5 flex items-center">
        <img
          className="h-24 mb-5 pr-5"
          alt={product.title}
          src={product.image}
        />
        <span>{product.title}</span>
      </div>
      <div className="w-1/5">
        <span>${product.price} </span>
      </div>
      <div className="w-1/5">
        <span>{product.quantity}</span>
      </div>
      <div className="w-1/5">
        <button
          onClick={handleIncreaseQty(product)}
          className="rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add
        </button>
        &nbsp;&nbsp;
        <button
          onClick={
            product.quantity > 1
              ? handleDecreaseQty(product)
              : handleRemoveItem(product)
          }
          className="rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Deduct
        </button>
      </div>
    </div>
  );
};

const CartBtns = () => {
  const { clearCart } = useContext(CartContext);

  return (
    <Fragment>
      <button
        type="button"
        className="mr-5 rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={clearCart}
      >
        CLEAR
      </button>
      <Link
        to="/checkout"
        type="button"
        className="inline rounded-lg py-2 px-4 text-white shadow-lg text-center
                bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        CHECKOUT
      </Link>
    </Fragment>
  );
};

const ShowSuccessMessage = () => {
  return (
    <div className="rounded-lg py-5 px-4 text-white shadow-lg text-center bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
      Your Payment has been made successfully. An email containing your invoice
      will be send to you.
    </div>
  );
};

const ShowFailureMessage = () => {
  return (
    <div className="rounded-lg py-5 px-4 text-white shadow-lg text-center bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
      Your Payment has failed. Please try again.
    </div>
  );
};

const CartProducts = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Fragment>
      {cartItems.map(product => (
        <CartItem key={product.id} product={product} />
      ))}
    </Fragment>
  );
};

const Cart = () => {
  const { total, cartItems, itemCount, handlePaymentStatus } = useContext(
    CartContext
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("payment_status") === "success") {
      handlePaymentStatus(true);
      setShowSuccess(true);
    } else if (params.get("payment_status") === "fail") {
      handlePaymentStatus(false);
      setShowFailure(true);
    }
  }, [handlePaymentStatus]);

  return (
    <Fragment>
      <div className="container">
        {showSuccess && <ShowSuccessMessage />}
        {showFailure && <ShowFailureMessage />}
        <div className="flex shadow-md my-10 bg-gray-50">
          <div className="w-3/4 p-10">
            <div className="flex justify-between border-b pb-10">
              <h1 className="bold text-2xl">My Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{itemCount} items</h2>
            </div>

            <div className="flex my-10">
              <span className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </span>
              <span className="font-semibold text-gray-600 text-xs uppercase w-1/5">
                Price
              </span>
              <span className="font-semibold text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </span>
              <span className="font-semibold text-gray-600 text-xs uppercase w-1/5">
                Action
              </span>
            </div>

            <section>
              {cartItems.length > 0 ? (
                <CartProducts />
              ) : (
                <div className="text-center text-3xl">Your cart is empty</div>
              )}
            </section>
          </div>
          <div className="w-1/4 px-8 py-10 bg-gray-100">
            <h1 className="bold text-2xl mb-10">Cart Summary</h1>

            <div className="flex justify-between border-b">
              <div className="py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                Total Items
              </div>
              <div className="py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                {itemCount}
              </div>
            </div>

            <div className="flex justify-between border-b mb-10">
              <div className="py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                Grand Total
              </div>
              <div className="py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                ${total}
              </div>
            </div>
            {itemCount > 0 && <CartBtns />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
