const statusStyles = {
  PLACED: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CONFIRM: "bg-blue-100 text-blue-700 border-blue-200",
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}