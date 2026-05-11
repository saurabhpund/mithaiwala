import { useState } from "react";
import { PiCookie } from "react-icons/pi";
import { GiCandyCanes, GiIceCreamCone, GiCroissant } from "react-icons/gi";
import { GiPartyPopper } from "react-icons/gi";
import { BsCheck } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors((prev) => ({ ...prev, api: "" }));

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(jwtDecode(res.data.token)?.role),
      );

      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";

      setErrors((prev) => ({ ...prev, api: message }));
    } finally {
      setLoading(false);
    }
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

        {errors.api && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.api}</p>
        )}

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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="owner@mithaiwala.com"
              className={`h-11 px-4 rounded-xl border ${
                errors.email ? "border-red-500" : "border-[#e8dccf]"
              } border-[#e8dccf] bg-[#fafafa] text-[14px] text-[#4a3b32] placeholder:text-[#c4b0a8] outline-none transition-all duration-200 focus:border-[#e85d04] focus:bg-white focus:ring-2 focus:ring-[#e85d04]/10`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-5">
            <label
              htmlFor="password"
              className="text-[13px] font-medium text-[#4a3b32]"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                placeholder="••••••••"
                className={`h-11 w-full px-4 pr-12 rounded-xl border bg-[#fafafa] text-[14px] text-[#4a3b32] placeholder:text-[#c4b0a8] outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#e85d04]/10 ${
                  errors.password
                    ? "border-red-500"
                    : "border-[#e8dccf] focus:border-[#e85d04]"
                }`}
              />

              {/* Toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c7b75] hover:text-[#4a3b32]"
              >
                {showPassword ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
              </button>
            </div>

            {/* Error message */}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-8 mt-4">
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
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-br from-[#ff9966] to-[#e85d04] text-white text-[15px] font-semibold shadow-[0_4px_12px_rgba(232,93,4,0.3)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(232,93,4,0.42)] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-1">
                Logging in
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                </span>
              </span>
            ) : (
              "Log In"
            )}
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
