import { useEffect, useState } from "react";
import API from "../../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map((o) => (
        <div key={o.id}>
          Order #{o.id} - ₹{o.total_amount} - {o.status}
        </div>
      ))}
    </div>
  );
}

export default Orders;