export default function OrderItems({ items }) {
  return (
    <div className="bg-[#fffdf9] border border-[#f8ede3] rounded-2xl p-5">
      <h3 className="font-semibold text-[#4a3b32] mb-4">
        Ordered Items
      </h3>

      <div className="space-y-4">
        {items?.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-[#f8ede3] rounded-2xl p-3"
          >
            {/* Product Image */}
            <img
              src={item.product?.image_url}
              alt={item.product?.name}
              className="w-20 h-20 rounded-xl object-cover border border-[#f3e5d8]"
            />

            {/* Product Details */}
            <div className="flex-1">
              <h4 className="font-semibold text-[#4a3b32]">
                {item.product?.name}
              </h4>

              <p className="text-sm text-[#8c7b75] mt-1">
                Quantity: {item.quantity}
              </p>

              <p className="text-sm text-[#8c7b75]">
                Price Per Unit: ₹{item.price_per_unit}
              </p>
            </div>

            {/* Total */}
            <div className="text-right">
              <p className="font-bold text-[#4a3b32]">
                ₹
                {item.quantity * item.price_per_unit}
              </p>
            </div>
          </div>
        ))}

        {items?.length === 0 && (
          <div className="text-center py-8 text-[#8c7b75] text-sm">
            No order items found
          </div>
        )}
      </div>
    </div>
  );
}