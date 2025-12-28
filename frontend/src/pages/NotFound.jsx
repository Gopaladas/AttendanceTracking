import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';
import NotFoundImg from '../assets/NotFound.jpg';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center">
        
        {/* Left Side: Image with Hover Zoom */}
        {/* Changed h-[500px] to your custom h-125 */}
        <div className="w-full md:w-1/2 h-64 md:h-125 overflow-hidden bg-gray-200">
          <img 
            src={NotFoundImg} 
            alt="404 Illustration" 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-16 text-center md:text-left">
          <div className="relative inline-block mb-4">
            <h1 className="text-8xl font-black text-gray-100 select-none tracking-tighter">404</h1>
            <AlertCircle 
              size={48} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" 
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Lost in Space?
          </h2>
          
          {/* Using your custom dot-bounce animation from tailwind.config.js */}
          <div className="flex gap-1 justify-center md:justify-start mb-6">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-dot-bounce [animation-delay:-0.32s]"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-dot-bounce [animation-delay:-0.16s]"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-dot-bounce"></div>
          </div>

          <p className="text-gray-500 mb-10 leading-relaxed">
            The page you're looking for has vanished into the void. 
            Don't worry, it happens to the best of us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
            >
              <Home size={18} />
              Home
            </Link>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-gray-50 text-gray-600 px-8 py-3 rounded-xl font-semibold transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;