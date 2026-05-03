import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { PiCookie } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleSignup();
  }

  const handleSignup =  async() =>{
    try {
      const response = await API.post("/auth/signup", {
        fullName,
        email,
        password
      });
      console.log("Signup successful:", response.data);
    } catch(err){
      console.log(err);
    }
  }

  useEffect(() =>{

  }, [handleSubmit]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#ff9966_0%,#e11d48_100%)] px-4">
      
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-12 flex flex-col items-center">
        
        <Logo />

        <h1 className="text-[18px] font-semibold text-[#4a3b32] text-center mb-2">
          Create Account
        </h1>

        <p className="text-[14px] text-[#8c7b75] text-center mb-8">
          Order your favorite sweets in just a few clicks
        </p>

        <form className="w-full" onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            type="text"
            placeholder="Ramesh Kumar"
            value = {fullName}
            onChange = {e => setFullName(e.target.value)}
          />

          <FormField
            label="Email Address"
            type="email"
            placeholder="owner@mithaiwala.com"
            value = {email}
            onChange = {e => setEmail(e.target.value)}
          />

          <FormField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange= {e => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full h-[48px] rounded-[12px] bg-[linear-gradient(135deg,#ff9966_0%,#e85d04_100%)] text-white font-semibold shadow-md active:scale-[0.98] transition"
          >
            Create Account
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

function FormField({ label, type, placeholder }) {
  const id = label.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-[#4a3b32] mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full h-[44px] px-4 border border-[#e8dccf] rounded-[12px] bg-[#fafafa] text-[14px] text-[#4a3b32] focus:outline-none focus:border-[#e85d04] focus:bg-white"
      />
    </div>
  );
}