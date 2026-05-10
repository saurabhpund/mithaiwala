import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import API from "../../api/axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price_per_unit: "",
    unit: "GRAM",
    description: "",
    min_order_quantity: 1,
    is_available: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);

  /* -------- Handle Input -------- */
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });

      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* Cleanup preview */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* -------- Submit -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price_per_unit", form.price_per_unit);
      formData.append("unit", form.unit);
      formData.append("description", form.description);
      formData.append("min_order_quantity", form.min_order_quantity);
      formData.append("is_available", form.is_available);
      formData.append("image", form.image);

      await API.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <Navbar />

      <div className="max-w-[600px] mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Product</h2>

          <button
            onClick={() => navigate(-1)}
            className="text-[#e11d48] text-sm font-medium"
          >
            ← Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price_per_unit"
            placeholder="Price"
            value={form.price_per_unit}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
            required
          />

          {/* Unit */}
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          >
            <option value="GRAM">GRAM</option>
            <option value="KG">KG</option>
            <option value="PIECE">PIECE</option>
            <option value="BOX">BOX</option>
          </select>

          {/* Min Order */}
          <input
            type="number"
            name="min_order_quantity"
            placeholder="Minimum Order Quantity"
            value={form.min_order_quantity}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
            min={1}
          />

          {/* Availability */}
          <div className="flex items-center justify-between border px-4 py-3 rounded-xl">
            <span className="text-sm font-medium">Available</span>
            <input
              type="checkbox"
              name="is_available"
              checked={form.is_available}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
            rows={4}
            required
          />

          {/* Image Upload */}
          <div className="border-2 border-dashed border-[#f3e5d8] rounded-xl p-6 text-center bg-[#fffdf7] hover:bg-[#fff7ed] transition cursor-pointer relative">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />

            {preview ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">{form.image?.name}</p>

                <img
                  src={preview}
                  alt="preview"
                  className="mx-auto h-32 object-cover rounded-lg shadow"
                />

                <p className="text-xs text-[#8c7b75]">
                  Click to change image
                </p>
              </div>
            ) : (
              <div className="text-[#8c7b75] text-sm">
                <p className="font-medium">Click to upload image</p>
                <p className="text-xs">PNG, JPG up to 2MB</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-1">
                Adding
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                </span>
              </span>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}