import GaintLogo from "../assets/Gaint_logo.png";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from  "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [form,setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);   

        try{
            const res=await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Role-based redirect
      if (res.data.role === "Employee") navigate("/employee/dashboard");
      if (res.data.role === "Manager") navigate("/manager/dashboard");
      if (res.data.role === "HR") navigate("/hr/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <img src={GaintLogo} alt="Gaint Logo" className="h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">Attendance System Login</h2>

        <form className="space-y-6">
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

          <p className="text-right text-sm">
            <Link to="/forgot-password" size="reset" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </p>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?
          <Link to="/signup" className="text-blue-600 ml-1 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;