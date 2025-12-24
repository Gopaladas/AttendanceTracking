import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const[message,setMessage]=useState("");
  const [error,setError]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    setMessage("");

    try{
      const res=await api.post("/auth/forgot-password", {email});
      setMessage(res.data.message);
    } catch(err){
      setError(err.response?.data?.message || "An error occurred");
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Enter your registered email to receive a password reset link.
        </p>

        <form className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="reset-email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label
              htmlFor="reset-email"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                         peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                         peer-focus:-top-2.5 peer-focus:text-sm cursor-text"
            >
              Enter your email address
            </label>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Remember your password?
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;