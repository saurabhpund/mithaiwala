import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FiTruck, FiAward } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import CollegeImage from "../assets/college.png";
import Rasmalai from "../assets/rasmalai.jpg";
import Motichoor from "../assets/motichoor.jpg";
import Gulabjam from "../assets/gulabjam.jpg";
import Kajukatli from "../assets/kajukatli.jpg";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#5d4037] font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="flex items-center px-12 min-h-[680px] relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, #fff1f2 0%, #fffdf7 60%)",
        }}
      >
        <div className="max-w-[600px] z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fef3c7] text-[#b45309] rounded-full text-sm font-semibold mb-6">
            ✨ Deepavali Specials Available Now
          </div>

          <h1 className="text-5xl font-extrabold mb-6 text-[#4a3b32] leading-tight">
            Fresh Traditional <span className="text-[#e11d48]">Sweets</span>{" "}
            Delivered to Your Doorstep
          </h1>

          <p className="text-[#8c7b75] mb-10">
            Experience the authentic taste of handcrafted Indian mithai, made
            with pure ghee and premium ingredients.
          </p>

          <div className="flex gap-4">
            <button className="h-14 px-8 bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white rounded-full flex items-center gap-2 shadow-md">
              Shop Now <FiArrowRight />
            </button>

            <Link to={"/menu"} className="h-14 px-8 border rounded-full grid items-center cursor-pointer hover:bg-[#fff7ed]">
              View Menu
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-end">
          <img
            src={CollegeImage}
            alt="sweets"
            className="w-[600px] h-[500px] object-fit rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#fff1f2] py-16 flex justify-around">
        <Feature
          icon={FiTruck}
          title="Fast Delivery"
          desc="Same-day delivery for city orders"
        />

        <Feature
          icon={FiAward}
          title="Premium Quality"
          desc="Made with 100% pure ghee"
        />

        <Feature
          icon={MdVerified}
          title="Hygienic Packing"
          desc="Safe and secure packaging"
        />
      </section>

      {/* Products */}
      <section className="px-12 py-20 bg-white">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Bestselling Delicacies</h2>
            <p className="text-[#8c7b75]">Our customers' favorite picks</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <SweetCard name="Kaju Katli" price="₹850/kg" imageSrc={Kajukatli} />
          <SweetCard
            name="Motichoor Ladoo"
            price="₹420/kg"
            imageSrc={Motichoor}
          />
          <SweetCard name="Rasmalai" price="₹550/kg" imageSrc={Rasmalai} />
          <SweetCard name="Mysore Pak" price="₹620/kg" imageSrc={Gulabjam} />
        </div>
      </section>
    </div>
  );
}

/* ---------- Components ---------- */

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col items-center gap-3 max-w-[250px] text-center">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow text-[#e11d48]">
        <Icon size={28} />
      </div>

      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-[#8c7b75]">{desc}</p>
    </div>
  );
}

function SweetCard({ name, price, imageSrc }) {
  return (
    <div className="bg-[#fffdf7] rounded-xl p-4 hover:shadow-lg transition">
      <div className="h-[200px] bg-[#fff1f2] rounded-lg mb-4 overflow-hidden">
        <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
      </div>

      <h3 className="font-bold">{name}</h3>
      <p className="text-sm text-[#8c7b75] mb-3">Delicious traditional sweet</p>

      <div className="flex justify-between items-center">
        <span className="font-bold">{price}</span>
        <button className="w-10 h-10 bg-[#fff1f2] cursor-pointer rounded-full hover:bg-[#e11d48] hover:text-white">
          +
        </button>
      </div>
    </div>
  );
}
