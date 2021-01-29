import { useContext, Fragment } from "react";

import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

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
    <div className="product-item">
      <div className="col-img">
        <img alt={product.title} src={product.image} className="" />
      </div>
      <div className="col-detail">
        <h3>{product.title}</h3>
        <span>Price: ${product.price} </span>
      </div>
      <div className="col-qty">
        <span>Qty: {product.quantity}</span>
      </div>
      <div className="col-action">
        <button onClick={handleIncreaseQty(product)} className="btn">
          Add
        </button>
        &nbsp;&nbsp;
        <button
          onClick={
            product.quantity > 1
              ? handleDecreaseQty(product)
              : handleRemoveItem(product)
          }
          className="btn btn-danger"
        >
          Deduct
        </button>
      </div>
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
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout
  } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h1 className="title">Cart</h1>

      <div className="cart">
        {cartItems.length > 0 ? (
          <CartProducts />
        ) : (
          <div>Your cart is empty</div>
        )}

        {checkout && (
          <div className="">
            <p>Checkout successfull</p>
            <Link to="/" className="btn">
              BUY MORE
            </Link>
          </div>
        )}
      </div>

      <div className="cart-checkout-details">
        <p className="label">Total Items</p>
        <p className="label-content">{itemCount}</p>
        <p className="label">Grand Total</p>
        <p className="label-content">${total}</p>
        <hr />
        <button type="button" className="btn" onClick={clearCart}>
          CLEAR
        </button>
        <br />
        <br />
        <button type="button" className="btn" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
