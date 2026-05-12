import { useEffect, useState } from "react";
import API from "../../api/axios";

function Cart() {
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setItems(res.data));
  }, []);

  const placeOrder = async () => {
    await API.post(
      "/orders",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Order placed!");
  };

  return (
    <div>
      <h2>Cart</h2>

      {items.map((item) => (
        <div key={item.id}>
          {item.name} - {item.quantity} {item.unit}
        </div>
      ))}

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Cart;