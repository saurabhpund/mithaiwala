import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Kajukatli from "../assets/kajukatli.jpg";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { name, price_per_unit, unit } = product;
  const {addToCart} = useCart();
  const [qty, setQty] = useState(250);
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-xl p-4 hover:shadow-lg transition">
      {/* Image */}
      <div className="h-[160px] rounded mb-3 overflow-hidden relative">
        <img
          src={product.image_url || Kajukatli} // temporary fallback
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[15px]" onClick={() => navigate(`/product/${product.id}`)}> {name}</h3>

      {/* Description */}
      <p className="text-xs text-[#8c7b75] mb-3">Delicious traditional sweet</p>

      {/* Price + Button */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">₹{price_per_unit}</p>
          <p className="text-xs text-[#8c7b75]">{unit}</p>
        </div>

        <button
          onClick={() => addToCart(product.id)}
          className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-[#e11d48] hover:text-white transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
