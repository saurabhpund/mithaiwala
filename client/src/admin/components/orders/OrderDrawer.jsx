export default function OrderDrawer({
  selectedOrder,
  setSelectedOrder,
  updateOrderStatus,
  saving,
}) {
  if (!selectedOrder) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setSelectedOrder(null)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white z-50 shadow-2xl transition-transform duration-300 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#f3e5d8]">
            <div>
              <h2 className="text-xl font-bold text-[#4a3b32]">
                Order #{selectedOrder.id}
              </h2>

              <p className="text-sm text-[#8c7b75] mt-1">
                {new Date(selectedOrder.created_at).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-10 h-10 rounded-full hover:bg-[#fff1f2] text-[#8c7b75] hover:text-[#be123c] transition"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 space-y-6">
            {/* Customer */}
            <div className="bg-[#fffdf7] border border-[#f3e5d8] rounded-2xl p-5">
              <h3 className="font-semibold text-[#4a3b32] mb-4">
                Customer Details
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#8c7b75]">Name</p>

                  <p className="font-medium text-[#4a3b32]">
                    {selectedOrder.customer_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#8c7b75]">Email</p>

                  <p className="font-medium text-[#4a3b32]">
                    {selectedOrder.customer_email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#8c7b75]">Address</p>

                  <p className="font-medium text-[#4a3b32]">
                    {selectedOrder.delivery_address || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-[#fffdf7] border border-[#f3e5d8] rounded-2xl p-5">
              <h3 className="font-semibold text-[#4a3b32] mb-4">
                Order Items
              </h3>

              <div className="space-y-4">
                {selectedOrder.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-medium text-[#4a3b32]">
                          {item.name}
                        </p>

                        <p className="text-xs text-[#8c7b75]">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-[#4a3b32]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-[#fffdf7] border border-[#f3e5d8] rounded-2xl p-5">
              <h3 className="font-semibold text-[#4a3b32] mb-4">
                Payment Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8c7b75]">
                    Payment Method
                  </span>

                  <span className="font-medium text-[#4a3b32]">
                    {selectedOrder.payment_method || "COD"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#8c7b75]">
                    Payment Status
                  </span>

                  <span className="font-medium text-green-600">
                    {selectedOrder.payment_status || "PAID"}
                  </span>
                </div>

                <div className="border-t border-[#f3e5d8] pt-3 flex justify-between">
                  <span className="font-semibold text-[#4a3b32]">
                    Total Amount
                  </span>

                  <span className="font-bold text-lg text-[#be123c]">
                    ₹{selectedOrder.total_amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-[#fffdf7] border border-[#f3e5d8] rounded-2xl p-5">
              <h3 className="font-semibold text-[#4a3b32] mb-4">
                Update Order Status
              </h3>

              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    status: e.target.value,
                  })
                }
                className="w-full border border-[#f3e5d8] rounded-xl px-4 py-3 outline-none focus:border-[#ff9933]"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PREPARING">Preparing</option>
                <option value="OUT_FOR_DELIVERY">
                  Out For Delivery
                </option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#f3e5d8] bg-white">
            <button
              onClick={updateOrderStatus}
              disabled={saving}
              className="w-full py-3 rounded-full bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white font-semibold disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}