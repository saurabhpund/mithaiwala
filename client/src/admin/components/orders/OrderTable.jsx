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
              <th className="px-6 py-4 text-sm font-semibold">
                Order ID
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Amount
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
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