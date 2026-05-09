import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import API from "../../api/axios";

import OrdersTable from "../components/orders/OrderTable";
import OrderDrawer from "../components/orders/OrderDrawer";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  const updateOrderStatus = async (updatedStatus) => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await API.patch(
        `/orders/${selectedOrder.id}/status`,
        {
          status: updatedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: updatedStatus }
            : order,
        ),
      );

      setSelectedOrder((prev) => ({
        ...prev,
        status: updatedStatus,
      }));
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4a3b32]">
            Orders Management
          </h1>

          <p className="text-sm text-[#8c7b75] mt-1">
            Manage customer orders and update delivery status
          </p>
        </div>

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