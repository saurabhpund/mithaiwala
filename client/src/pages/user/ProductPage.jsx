import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 gap-12">
        {/* LEFT - IMAGE */}
        <div className="bg-[#fff1f2] rounded-2xl h-[400px] overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* RIGHT - DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <p className="text-[#8c7b75] mb-6">Delicious traditional sweet</p>

          <div className="text-2xl font-bold mb-6">
            ₹{product.price_per_unit} / {product.unit}
          </div>

          {/* Quantity selector (reuse logic) */}
          {/* Add to cart button */}
        </div>
      </div>
    </div>
  );
}
