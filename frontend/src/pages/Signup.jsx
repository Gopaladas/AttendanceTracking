import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import GaintLogo from "../assets/Gaint_logo.png";
const Signup = () => {
    const navigate = useNavigate();

    const [form,setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        role: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try{
            await api.post("/auth/signup", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
        
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <img src={GaintLogo} alt="Gaint Logo" className="h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-5">
          <div className="relative">
            <input
              type="text"
              id="fullname"
              placeholder=" "
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label
              htmlFor="fullname"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                         peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                         peer-focus:-top-2.5 peer-focus:text-sm cursor-text"
            >
              Enter Your Full Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                         peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                         peer-focus:-top-2.5 peer-focus:text-sm cursor-text"
            >
              Enter Your Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                         peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                         peer-focus:-top-2.5 peer-focus:text-sm cursor-text"
            >
              Enter Your Password
            </label>
          </div>

          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white text-gray-600">
            <option value="" disabled selected>Select Role</option>
            <option>Employee</option>
            <option>Manager</option>
            <option>HR</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;