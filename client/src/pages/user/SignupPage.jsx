import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { PiCookie } from "react-icons/pi";
import { Link } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import API from "../api/axios";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    handleSignup();
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await API.post("/auth/signup", {
        name: fullName,
        email,
        password,
      });

      console.log(response.status);
      if (response.status !== 200) {
        setErrors((prev) => ({
          ...prev,
          api: response.data.message || "Signup failed",
        }));
      } else {
        console.log("Signup successful:", response.data);
        setErrors({});
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      setErrors((prev) => ({ ...prev, api: message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#ff9966_0%,#e11d48_100%)] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-12 flex flex-col items-center">
        <Logo />

        <h1 className="text-[18px] font-semibold text-[#4a3b32] text-center mb-2">
          Create Account
        </h1>

        <p className="text-[14px] text-[#8c7b75] text-center mb-4">
          Order your favorite sweets in just a few clicks
        </p>

        {errors.api && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.api}</p>
        )}

        <form className="w-full" onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            type="text"
            placeholder="Ramesh Kumar"
            value={fullName}
            onChange={(val) => {
              setFullName(val);
              setErrors((prev) => ({ ...prev, fullName: "" }));
            }}
            error={errors.fullName}
          />

          <FormField
            label="Email Address"
            type="email"
            placeholder="owner@mithaiwala.com"
            value={email}
            onChange={(val) => {
              setEmail(val);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            error={errors.email}
          />

          <FormField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(val) => {
              setPassword(val);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            showToggle
            togglePassword={() => setShowPassword((prev) => !prev)}
            isVisible={showPassword}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[linear-gradient(135deg,#ff9966_0%,#e85d04_100%)] text-white font-semibold shadow-md hover:brightness-105 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-1">
                Creating
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                </span>
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="w-full h-px bg-[#f0eae6] my-8" />

        <p className="text-[14px] text-[#8c7b75]">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#e85d04] font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Logo() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#ff9966,#ff5e62)] flex items-center justify-center text-white shadow-md">
        <PiCookie size={24} strokeWidth={1.8} />
      </div>
      <span className="text-[24px] font-bold text-[#bf360c] tracking-tight">
        Mithai Wala
      </span>
    </div>
  );
}

function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  showToggle,
  togglePassword,
  isVisible,
  error,
}) {
  const id = label.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-[#4a3b32] mb-2"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-11 px-4 pr-12 border rounded-xl bg-[#fafafa] text-[14px] text-[#4a3b32] focus:outline-none focus:bg-white ${
            error ? "border-red-500" : "border-[#e8dccf] focus:border-[#e85d04]"
          }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {showToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c7b75] hover:text-[#4a3b32]"
          >
            {isVisible ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
