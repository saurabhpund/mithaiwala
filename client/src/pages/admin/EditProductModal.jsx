import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function EditProductModal({ product, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price_per_unit: "",
    unit: "KG",
    description: "",
    min_order_quantity: 1,
    is_available: true,
    image: null,
  });

  /* Pre-fill form */
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price_per_unit: product.price_per_unit || "",
        unit: product.unit || "KG",
        description: product.description || "",
        min_order_quantity: product.min_order_quantity || 1,
        is_available: product.is_available ?? true,
        image: null,
      });
    }
  }, [product]);

  /* Handle change */
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* Submit */
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

      if (form.image) {
        formData.append("image", form.image);
      }

      await API.put(`/products/${product.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden animate-[fadeIn_.2s_ease]">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold">Edit Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Image Section */}
          <div className="space-y-3">
            <div className="w-full aspect-square border rounded-xl overflow-hidden">
              <img
                src={
                  form.image
                    ? URL.createObjectURL(form.image)
                    : product.image_url
                }
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="block text-center border border-dashed rounded-lg py-2 cursor-pointer text-sm hover:bg-gray-50">
              Change Image
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">

            {/* Name */}
            <div className="col-span-2">
              <label className="text-sm">Product Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm">Price</label>
              <input
                type="number"
                name="price_per_unit"
                value={form.price_per_unit}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </div>

            {/* Unit */}
            <div>
              <label className="text-sm">Unit</label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="KG">KG</option>
                <option value="GRAM">GRAM</option>
                <option value="PIECE">PIECE</option>
                <option value="BOX">BOX</option>
              </select>
            </div>

            {/* Min Order */}
            <div>
              <label className="text-sm">Min Order</label>
              <input
                type="number"
                name="min_order_quantity"
                value={form.min_order_quantity}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            {/* Availability */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                />
                Available
              </label>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="text-sm">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="col-span-3 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-full bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white flex items-center gap-2"
            >
              {loading ? (
                <>
                  Saving
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  </span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}