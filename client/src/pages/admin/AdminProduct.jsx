import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/user/Navbar";
import EditProductModal from "./EditProductModal";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  //   if (user.role !== "ADMIN") {
  //     return <Navigate to="/" />;
  //   }

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    await API.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("name", form.name);
    data.append("price_per_unit", form.price_per_unit);
    data.append("description", form.description);
    if (image) data.append("image", image);

    await API.put(`/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <Navbar />
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSuccess={fetchProducts}
        />
      )}
      <section className="p-10">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="px-2 cursor-pointer py rounded-full bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white font-semibold"
          >
            + Add Product
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={p.image_url}
                alt={p.name}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="font-bold mt-2">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.description}</p>

              <p className="font-semibold mt-2">
                ₹{p.price_per_unit} / {p.unit}
              </p>

              <div className="flex gap-2 mt-3">
                <button className="text-blue-500" onClick={() => setSelectedProduct(p)}>Edit</button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
