import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Fetch cart
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Add to cart
  const addToCart = async (product_id, quantity = 250) => {
    try {
      await API.post(
        "/cart",
        { product_id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchCart(); // sync UI
    } catch (err) {
      console.error(err);
    }
  };

  const updateCart = async (product_id, quantity) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      "/cart",
      { product_id, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCart(); // refresh cart after update
  } catch (err) {
    console.error(err);
  }
};

  // 🔹 Remove item
  const removeFromCart = async (product_id) => {
    try {
      await API.delete(`/cart/${product_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart((prev) =>
        prev.filter((item) => item.product_id !== product_id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() =>{
    if (token) {
        fetchCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);