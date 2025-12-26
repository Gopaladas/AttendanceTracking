import React from "react";
import GaintLogo from "../assets/Gaint_logo.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <img src={GaintLogo} alt="Gaint Logo" className="h-14 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />


          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />


          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />


          <input
            type="text"
            placeholder="Department (e.g. IT, Sales, HR)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <button className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors mt-2">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;