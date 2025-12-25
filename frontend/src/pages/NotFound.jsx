import React from 'react';
import { useNavigate } from 'react-router-dom';

import notFoundImg from '../assets/NotFound.jpg'; 

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12 font-sans overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">

        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <div className="absolute w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
          
          <img 
            src={notFoundImg} 
            alt="Mike Wazowski" 
            className="relative w-72  h-auto object-contain transform -rotate-3 transition-transform duration-500 hover:rotate-0"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter uppercase">
              Oops!
            </h1>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 uppercase tracking-tight">
              Page Not Found.
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-md leading-relaxed">
            You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => navigate('/')}
              className="bg-[#0063e5] hover:bg-[#0455c1] text-white text-lg font-bold py-4 px-12 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 tracking-widest uppercase"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 border-10 border-gray-50 rounded-full opacity-50"></div>
      
      <div className="absolute bottom-10 left-10 text-[10px] text-gray-300 font-mono tracking-widest uppercase rotate-90">
        Err: 404_Lost_In_Monstropolis
      </div>
    </div>
  );
};

export default NotFound;