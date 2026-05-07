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
import ProtectedRoute from "./components/ProtectedRoutes";
import AddProduct from "./admin/page/AddProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductPage />} />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <ProtectedRoute role="admin">
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute role="admin">
                <AddProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
