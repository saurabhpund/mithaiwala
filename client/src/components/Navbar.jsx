import React, { useEffect, useState } from "react";
import { PiCookie } from "react-icons/pi";
import { FiSearch, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isLogin, setLogin] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  };

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setLogin(!!token);
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="h-[70px] sm:h-[80px] flex items-center justify-between px-4 sm:px-6 lg:px-12 bg-[#fffdf7]/95 backdrop-blur shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-bold text-[#be123c]">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#ff9933] to-[#f43f5e] rounded-lg flex items-center justify-center text-white">
            <PiCookie size={16} />
          </div>
          Mithai Wala
        </div>

        <div className="hidden md:flex gap-8">
          <Link to={"/"} className="cursor-pointer hover:text-[#e11d48]">
            Home
          </Link>
          <Link to={"/menu"} className="cursor-pointer hover:text-[#e11d48]">
            Menu
          </Link>
          <Link to={"/gifting"} className="cursor-pointer hover:text-[#e11d48]">
            Gifting
          </Link>
          <Link
            to={"/about-us"}
            className="cursor-pointer hover:text-[#e11d48]"
          >
            About Us
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to={"/cart"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center hover:bg-[#fff1f2]"
          >
            <FiShoppingBag />
          </Link>

          {isLogin ? (
            <Link
              to="/profile"
              className=" w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center hover:bg-[#fff1f2]"
            >
              <FaUser />
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base bg-gradient-to-br from-[#ff9933] to-[#f43f5e] text-white rounded-full flex items-center"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
