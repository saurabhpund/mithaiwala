import { useState } from "react";
import { Link } from "react-router-dom";
import { PiCookie } from "react-icons/pi";
import {
  FiSearch,
  FiShoppingBag,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";

/* Sample Images */
import Kajukatli from "../assets/kajukatli.jpg";
import Motichoor from "../assets/motichoor.jpg";
import MysorePak from "../assets/gulabjam.jpg";
import Navbar from "../components/Navbar";

export default function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Kaju Katli",
      desc: "1 kg Box (Silver Leaf)",
      price: 850,
      qty: 1,
      img: Kajukatli,
    },
    {
      id: 2,
      name: "Motichoor Ladoo",
      desc: "500g Box (Pure Ghee)",
      price: 210,
      qty: 1,
      img: Motichoor,
    },
    {
      id: 3,
      name: "Ghee Mysore Pak",
      desc: "1 kg Box",
      price: 620,
      qty: 1,
      img: MysorePak,
    },
  ]);

  /* --------- Handlers --------- */
  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  /* --------- Calculations --------- */
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const delivery = 50;
  const tax = Math.round(subtotal * 0.05);
  const discount = 100;
  const total = subtotal + delivery + tax - discount;

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#5d4037]">
      <Navbar />

      {/* MAIN */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 border-b pb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Your Shopping Bag
          </h1>
          <span className="text-sm text-[#8c7b75]">
            {cart.length} items in your bag
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* CART ITEMS */}
          <div className="flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-2xl shadow mb-5 hover:shadow-md transition"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1 w-full">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-[#8c7b75] mb-2">
                    {item.desc}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#be123c] text-sm flex items-center gap-1"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>

                {/* QTY */}
                <div className="flex items-center gap-4 border rounded-full px-4 py-2">
                  <button onClick={() => updateQty(item.id, "dec")}>
                    <FiMinus />
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, "inc")}>
                    <FiPlus />
                  </button>
                </div>

                {/* PRICE */}
                <div className="font-bold text-lg min-w-[80px] text-right">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}

            <Link
              to="/"
              className="flex items-center gap-2 text-[#be123c] font-semibold mt-4"
            >
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="w-full lg:w-[380px] bg-white p-6 rounded-2xl border shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <SummaryRow label="Subtotal" value={subtotal} />
            <SummaryRow label="Delivery" value={delivery} />
            <SummaryRow label="Taxes (5%)" value={tax} />
            <SummaryRow label="Discount" value={-discount} highlight />

            <div className="border my-5" />

            {/* PROMO */}
            <div className="flex gap-2 mb-6">
              <input
                placeholder="Promo code"
                className="flex-1 h-11 px-4 border rounded-full bg-[#fafafa]"
              />
              <button className="px-4 rounded-full bg-[#fff1f2] text-[#be123c] font-semibold">
                Apply
              </button>
            </div>

            <div className="border my-5" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full h-12 rounded-full bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:translate-y-[-2px] transition">
              Checkout <FiArrowRight />
            </button>

            <div className="flex justify-center items-center gap-2 text-sm text-[#8c7b75] mt-4">
              <MdVerified className="text-green-500" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function SummaryRow({ label, value, highlight }) {
  return (
    <div
      className={`flex justify-between mb-3 ${
        highlight ? "text-green-600" : "text-[#8c7b75]"
      }`}
    >
      <span>{label}</span>
      <span className="font-semibold text-[#4a3b32]">
        {value < 0 ? `-₹${Math.abs(value)}` : `₹${value}`}
      </span>
    </div>
  );
}