import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Menu from "./pages/MenuPage";
import ProductPage from "./pages/ProductPage";
import AdminProducts from "./admin/page/AdminProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit/:id" element={<AdminProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
