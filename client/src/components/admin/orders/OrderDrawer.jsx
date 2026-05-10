import { FiX } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItems from "./OrderItems";

const allowedTransitions = {
  PLACED: ["CONFIRM", "CANCELLED"],
  CONFIRM: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

export default function OrderDrawer({
  selectedOrder,
  setSelectedOrder,
  updateOrderStatus,
  saving,
}) {
  if (!selectedOrder) return null;

  const availableStatuses =
    allowedTransitions[selectedOrder.status] || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      {/* Drawer */}
      <div className="w-full sm:w-[500px] h-screen bg-white shadow-2xl overflow-y-auto animate-[slideIn_.25s_ease]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#f3e5d8] px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-[#4a3b32]">
              Order #{selectedOrder.id}
            </h2>

            <p className="text-sm text-[#8c7b75] mt-1">
              Manage customer order details
            </p>
          </div>

          <button
            onClick={() => setSelectedOrder(null)}
            className="w-10 h-10 rounded-full hover:bg-[#fff1f2] flex items-center justify-center transition"
          >
            <FiX className="text-xl text-[#5d4037]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-[#fffdf9] border border-[#f8ede3] rounded-2xl p-5">
            <h3 className="font-semibold text-[#4a3b32] mb-4">
              Customer Information
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[#8c7b75]">Customer Name</p>

                <p className="font-medium text-[#4a3b32]">
                  {selectedOrder.customer_name}
                </p>
              </div>

              <div>
                <p className="text-[#8c7b75]">Email</p>

                <p className="font-medium text-[#4a3b32]">
                  {selectedOrder.customer_email}
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-[#fffdf9] border border-[#f8ede3] rounded-2xl p-5">
            <h3 className="font-semibold text-[#4a3b32] mb-4">
              Order Details
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#8c7b75]">
                  Total Amount
                </span>

                <span className="font-semibold text-[#4a3b32]">
                  ₹{selectedOrder.total_amount}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#8c7b75]">
                  Current Status
                </span>

                <OrderStatusBadge
                  status={selectedOrder.status}
                />
              </div>

              <div className="flex justify-between">
                <span className="text-[#8c7b75]">
                  Order Date
                </span>

                <span className="text-[#4a3b32] text-sm">
                  {new Date(
                    selectedOrder.created_at
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          {availableStatuses.length > 0 && (
            <div className="bg-[#fffdf9] border border-[#f8ede3] rounded-2xl p-5">
              <h3 className="font-semibold text-[#4a3b32] mb-4">
                Update Status
              </h3>

              <div className="space-y-4">
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#f3e5d8] outline-none focus:border-[#f59e0b]"
                >
                  <option value={selectedOrder.status}>
                    {selectedOrder.status}
                  </option>

                  {availableStatuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  onClick={updateOrderStatus}
                  disabled={saving}
                  className="w-full py-3 rounded-full bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white font-semibold flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {saving ? (
                    <span className="flex items-center gap-1">
                      Saving
                      <span className="flex gap-1 ml-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />

                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />

                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                      </span>
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Order Items */}
          <OrderItems items={selectedOrder.order_items} />
        </div>
      </div>

      
    </div>
  );
}