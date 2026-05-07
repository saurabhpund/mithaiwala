import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center hover:bg-[#fff1f2]"
      >
        <FaUser />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
          
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#fff7ed]"
          >
            <FaUser size={14} /> Profile
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#fff7ed]"
          >
            <FiSettings size={14} /> Settings
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-[#fff1f2]"
          >
            <FiLogOut size={14} /> Logout
          </button>

        </div>
      )}
    </div>
  );
}