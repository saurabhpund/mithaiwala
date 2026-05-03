import React from "react";
import { FiUser, FiMapPin, FiCreditCard, FiSettings, FiLogOut } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#f6e4d1] text-[#4a3b32]">
      
      {/* Header */}
      <div className="px-6 md:px-16 pt-10 pb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-[#8c7b75] mt-1">Welcome back, Rohan!</p>
      </div>

      {/* Layout */}
      <div className="px-6 md:px-16 pb-16 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-[280px] bg-white rounded-2xl p-5 shadow-sm">
          <SidebarItem icon={FiUser} label="Personal Info" active />
          <SidebarItem icon={MdOutlineInventory2} label="Order History" />
          <SidebarItem icon={FiMapPin} label="Addresses" />
          <SidebarItem icon={FiCreditCard} label="Payment Methods" />
          <SidebarItem icon={FiSettings} label="Settings" />

          <div className="mt-6 border-t pt-4">
            <button className="flex items-center gap-2 text-red-500 text-sm font-medium">
              <FiLogOut /> Log Out
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-6">
          
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <button className="text-sm text-[#e11d48] font-medium">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <InfoItem label="First Name" value="Rohan" />
              <InfoItem label="Last Name" value="Sharma" />
              <InfoItem label="Email Address" value="rohan.sharma@example.com" />
              <InfoItem label="Phone Number" value="+91 98765 43210" />
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <button className="text-sm text-[#e11d48] font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              <OrderItem id="#ORD-8472" date="Oct 24, 2023" price="₹1,240" />
              <OrderItem id="#ORD-8391" date="Oct 12, 2023" price="₹850" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function SidebarItem({ icon: Icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm mb-2 transition ${
        active
          ? "bg-[#fff1f2] text-[#e11d48] font-semibold"
          : "hover:bg-[#fff7ed]"
      }`}
    >
      <Icon size={16} />
      {label}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase text-[#8c7b75] mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function OrderItem({ id, date, price }) {
  return (
    <div className="flex items-center justify-between bg-[#fffdf7] border border-[#f3e5d8] rounded-xl p-4">
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#fff1f2] rounded-lg flex items-center justify-center">
          📦
        </div>

        <div>
          <p className="font-medium text-sm">Order {id}</p>
          <p className="text-xs text-[#8c7b75]">Placed on {date}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
          Delivered
        </span>
        <span className="font-semibold">{price}</span>
        <span className="text-[#8c7b75]">{">"}</span>
      </div>
    </div>
  );
}