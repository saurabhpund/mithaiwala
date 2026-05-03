import { useState } from "react";
import { Link } from "react-router-dom";
import { PiCookie } from "react-icons/pi";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiTruck,
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import MotichoorImg from "../assets/motichoor.jpg";
import Navbar from "../components/Navbar";

/* -------------------- PAGE -------------------- */

export default function ProductPage() {
  const [weight, setWeight] = useState("1kg");
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-[#fffdf7] text-[#5d4037] min-h-screen">
      <Navbar />

      {/* MAIN */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* PRODUCT HERO */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden bg-[#fff1f2] shadow-md">
            <img
              src={MotichoorImg}
              alt="Motichoor Ladoo"
              className="w-full h-full object-cover hover:scale-[1.02] transition"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-sm text-[#8c7b75] mb-4">
              <span>Menu</span>
              <FiChevronRight />
              <span>Sweets</span>
              <FiChevronRight />
              <span className="text-[#e11d48] font-medium">
                Motichoor Ladoo
              </span>
            </div>

            {/* BADGE */}
            <div className="inline-block px-3 py-1 bg-[#fff7ed] text-[#d97706] rounded-full text-xs font-semibold mb-3 w-fit">
              🔥 Bestseller
            </div>

            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#4a3b32] mb-2">
              Motichoor Ladoo
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex text-[#f59e0b]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <span className="text-sm text-[#8c7b75]">(248 reviews)</span>
            </div>

            {/* PRICE */}
            <div className="flex items-end gap-2 mb-5">
              <span className="text-2xl md:text-3xl font-bold text-[#be123c]">
                ₹420
              </span>
              <span className="text-sm text-[#8c7b75]">/ kg</span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm md:text-base text-[#5d4037] mb-6 leading-relaxed">
              Tiny gram flour pearls fried in pure ghee and soaked in aromatic
              sugar syrup. Garnished with nuts. A melt-in-the-mouth delicacy.
            </p>

            {/* INGREDIENTS */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#8c7b75] mb-2 uppercase">
                Key Ingredients
              </p>

              <div className="flex flex-wrap gap-2">
                {["Gram Flour", "Pure Ghee", "Saffron", "Melon Seeds"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-3 py-1 border rounded-full text-sm bg-white"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* WEIGHT */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#8c7b75] mb-2 uppercase">
                Select Weight
              </p>

              <div className="flex gap-2">
                {["500g", "1kg", "2kg"].map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`flex-1 py-2 rounded-lg border text-sm transition ${
                      weight === w
                        ? "border-[#f59e0b] bg-[#fffbeb] text-[#d97706] font-semibold"
                        : "border-[#f3e5d8] text-[#8c7b75]"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* QTY */}
              <div className="flex items-center justify-between px-4 h-12 border rounded-full w-full sm:w-[140px]">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>
                  <FiMinus />
                </button>
                <span className="font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)}>
                  <FiPlus />
                </button>
              </div>

              {/* BUY */}
              <button className="flex-1 h-12 rounded-full bg-gradient-to-br from-[#ff9933] to-[#ea580c] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:translate-y-[-2px] transition">
                Buy Now <FiArrowRight />
              </button>

              {/* CART */}
              <button className="h-12 w-12 rounded-full bg-[#fff1f2] text-[#be123c] flex items-center justify-center hover:bg-[#ffe4e6]">
                <FiShoppingBag />
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-sm text-[#8c7b75]">
              <Feature icon={MdVerified} text="Quality Assured" />
              <Feature icon={FiTruck} text="Fast Delivery" />
              <Feature icon={FiTruck} text="Fresh within 24hrs" />
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <section className="mt-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <Link className="text-[#e11d48] text-sm font-semibold">
              View all
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Review name="Priya Sharma" text="Absolutely delicious!" />
            <Review name="Rahul Verma" text="Great packaging & freshness." />
            <Review name="Anjali Desai" text="Best ladoos I've had." />
          </div>
        </section>
      </main>
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function Feature({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-green-500" />
      <span>{text}</span>
    </div>
  );
}

function Review({ name, text }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{name}</h4>
        <span className="text-xs text-[#8c7b75]">2 days ago</span>
      </div>

      <div className="flex text-[#f59e0b] mb-2">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      <p className="text-sm text-[#5d4037]">{text}</p>
    </div>
  );
}