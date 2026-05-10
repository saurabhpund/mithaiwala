import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import API from "../../api/axios";

import OrdersHeader from "../../components/admin/orders/OrdersHeader";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import OrderDrawer from "../../components/admin/orders/OrderDrawer";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await API.patch(
        `/orders/${selectedOrder.id}/status`,
        {
          status: selectedOrder.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? {
                ...order,
                status: selectedOrder.status,
              }
            : order
        )
      );

      setSelectedOrder(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <OrdersHeader />

        <OrdersTable
          orders={orders}
          setSelectedOrder={setSelectedOrder}
        />
      </div>

      <OrderDrawer
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        updateOrderStatus={updateOrderStatus}
        saving={saving}
      />
    </div>
  );
}