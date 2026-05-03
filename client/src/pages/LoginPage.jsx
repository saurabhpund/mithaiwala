import { useState } from "react";
import { PiCookie } from "react-icons/pi";
import { GiCandyCanes, GiIceCreamCone, GiCroissant } from "react-icons/gi";
import { GiPartyPopper } from "react-icons/gi";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#ff9966] to-[#e11d48]">
      {/* Login card */}
      <div className="relative z-10 w-full max-w-[440px] mx-4 bg-[#fffdf8] rounded-3xl shadow-2xl px-12 py-12 flex flex-col items-center animate-slide-up">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff9966] to-[#ff5e62] flex items-center justify-center text-white shadow-[0_4px_10px_rgba(232,93,4,0.3)]">
            <PiCookie size={24} strokeWidth={1.8} />
          </div>
          <span className="font-nunito text-[24px] font-bold text-[#bf360c] tracking-tight">
            Mithai Wala
          </span>
        </div>

        <h1 className="font-nunito text-[18px] font-semibold text-[#4a3b32] mb-2 text-center">
          Welcome Back!
        </h1>
        <p className="text-[14px] text-[#8c7b75] mb-8 text-center">
          Log in to manage your sweet shop
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          {/* Email */}
          <div className="flex flex-col gap-2 mb-5">
            <label
              htmlFor="email"
              className="text-[13px] font-medium text-[#4a3b32]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@mithaiwala.com"
              className="h-11 px-4 rounded-xl border border-[#e8dccf] bg-[#fafafa] text-[14px] text-[#4a3b32] placeholder:text-[#c4b0a8] outline-none transition-all duration-200 focus:border-[#e85d04] focus:bg-white focus:ring-2 focus:ring-[#e85d04]/10"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-5">
            <label
              htmlFor="password"
              className="text-[13px] font-medium text-[#4a3b32]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 px-4 rounded-xl border border-[#e8dccf] bg-[#fafafa] text-[14px] text-[#4a3b32] placeholder:text-[#c4b0a8] outline-none transition-all duration-200 focus:border-[#e85d04] focus:bg-white focus:ring-2 focus:ring-[#e85d04]/10"
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="hidden"
              />
              <div
                onClick={() => setRemember(!remember)}
                className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                  remember
                    ? "bg-[#e85d04] border-[#e85d04]"
                    : "bg-white border-[#e8dccf]"
                }`}
              >
                {remember && (
                  <BsCheck size={12} color="white" strokeWidth={3} />
                )}
              </div>
              <span className="text-[13px] text-[#8c7b75]">Remember me</span>
            </label>

            <a
              href="#"
              className="text-[13px] font-medium text-[#e85d04] hover:opacity-75 transition-opacity"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-br from-[#ff9966] to-[#e85d04] text-white text-[15px] font-semibold shadow-[0_4px_12px_rgba(232,93,4,0.3)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(232,93,4,0.42)] active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="w-full h-px bg-[#f0eae6] my-8" />

        {/* Footer */}
        <p className="text-[14px] text-[#8c7b75]">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-[#e85d04] font-semibold hover:opacity-75 transition-opacity"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
