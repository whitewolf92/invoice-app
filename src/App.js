import { useContext } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { CartContext } from "./contexts/CartContext";

import "./App.css";

import Main from "./pages/Main";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const ContentYield = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/product/:id" component={Product} />
    <Route exact path="/cart" component={Cart} />
  </Switch>
);

const App = () => {
  const { itemCount, clearCart } = useContext(CartContext);

  const handleClearCart = event => {
    event.preventDefault();
    clearCart();
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <Link to="/">View Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({itemCount})</Link>
            </li>
          </ul>
        </header>
        <main>
          <ContentYield />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
