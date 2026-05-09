import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderTableRow({
  order,
  setSelectedOrder,
}) {
  return (
    <tr className="border-t border-[#f8ede3] hover:bg-[#fffdf9] transition">
      <td className="px-6 py-5 font-semibold text-[#4a3b32]">
        #{order.id}
      </td>

      <td className="px-6 py-5">
        <div>
          <p className="font-medium text-[#4a3b32]">
            {order.customer_name}
          </p>

          <p className="text-xs text-[#8c7b75]">
            {order.customer_email}
          </p>
        </div>
      </td>

      <td className="px-6 py-5 font-semibold text-[#4a3b32]">
        ₹{order.total_amount}
      </td>

      <td className="px-6 py-5">
        <OrderStatusBadge status={order.status} />
      </td>

      <td className="px-6 py-5 text-sm text-[#8c7b75]">
        {new Date(order.created_at).toLocaleDateString()}
      </td>

      <td className="px-6 py-5">
        <button
          onClick={() => setSelectedOrder(order)}
          className="px-4 py-2 rounded-full bg-[#fff1f2] text-[#be123c] text-sm font-semibold hover:bg-[#ffe4e6] transition"
        >
          View
        </button>
      </td>
    </tr>
  );
}