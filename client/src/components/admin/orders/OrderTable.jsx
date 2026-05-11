import OrderTableRow from "./OrderTableRow";
import EmptyOrders from "./EmptyOrders";

export default function OrdersTable({
  orders,
  setSelectedOrder,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#f3e5d8] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#fff7ed]">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-semibold text-[#5d4037]">
                Order ID
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-[#5d4037]">
                Customer
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-[#5d4037]">
                Amount
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-[#5d4037]">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-[#5d4037]">
                Date
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-[#5d4037]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <OrderTableRow
                key={order.id}
                order={order}
                setSelectedOrder={setSelectedOrder}
              />
            ))}
          </tbody>
        </table>

        {orders.length === 0 && <EmptyOrders />}
      </div>
    </div>
  );
}