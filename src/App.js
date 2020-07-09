import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Shop from "./pages/shop/shop";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import Product from "./pages/product/product";
import Category from "./pages/category/category";
import ForgotPassword from "./pages/login/forgotPassword";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import firebase, { FirebaseContext } from "./firebase";
import useAuth from "./hooks/useAuth";
import useCart from "./hooks/useCart";
import Admin from "./pages/admin/admin";
import InventoryContext from "./data/inventoryContext";

function App() {
  const user = useAuth();
  const cartObject = useCart(firebase.db);

  return (
    <Router>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <InventoryContext.Provider value={{ ...cartObject }}>
          <div className="h-screen flex flex-col w-screen">
            <Header />
            <main className="flex-1">
              <Route path="/" exact component={Shop} />
              <Route path="/login/:next?" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/cart" component={Cart} />
              <Route path="/product/:id" component={Product} />
              <Route path="/category/:id" component={Category} />
              <Route path="/admin" component={Admin} />
            </main>
            <Footer />
          </div>
        </InventoryContext.Provider>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
