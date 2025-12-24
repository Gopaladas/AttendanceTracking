import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import api from "../../services/api";
import axios from "axios";

const Attendance = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Environment Variables for Cloudinary
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const captureAndSend = useCallback(async (type) => {
    // 1. Visual Feedback
    setShutter(true);
    setTimeout(() => setShutter(false), 150);
    setLoading(true);
    setMessage({ type: "", text: "" });

    // 2. Capture Image
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      setMessage({ type: "error", text: "Camera capture failed." });
      setLoading(false);
      return;
    }

    try {
      // 3. Upload to Cloudinary (Keeps your DB light)
      const formData = new FormData();
      formData.append("file", imageSrc);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;
      const endpoint = type === "START" ? "/attendance/start" : "/attendance/end";
      
      // 4. Send URL to your Backend
      await api.post(endpoint, {
        image: imageUrl,
        timestamp: new Date().toISOString(),
      });

      setMessage({ 
        type: "success", 
        text: `${type === 'START' ? 'Check-in' : 'Check-out'} recorded successfully!` 
      });
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Connection failed. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  }, [webcamRef, CLOUD_NAME, UPLOAD_PRESET]);

  // UI Component: Loading Dots
  const DotsSpinner = () => (
    <div className="flex items-center justify-center space-x-1">
      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-2xl">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#444] mb-1">
            Photo-Verified Attendance
          </h2>
          <p className="text-sm text-gray-400">
            Smile for the camera to verify your session and start tracking hours
          </p>
        </div>

        {/* Camera Display */}
        <div className="relative rounded-xl overflow-hidden mb-6 bg-black aspect-video border border-gray-100 shadow-sm">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-white transition-opacity duration-150 z-10 ${shutter ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
        </div>

        {/* Status Messages */}
        {message.text && (
          <div className={`p-3 rounded-lg mb-4 text-sm text-center font-medium border ${
            message.type === "success" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
          }`}>
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => captureAndSend("START")}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 min-h-[52px] flex items-center justify-center"
          >
            {loading ? <DotsSpinner /> : "Start Attendance"}
          </button>

          <button
            onClick={() => captureAndSend("END")}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 min-h-[52px] flex items-center justify-center"
          >
            {loading ? <DotsSpinner /> : "End Attendance"}
          </button>
        </div>

        {/* Policy Info Section */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center text-gray-600">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <span>Daily Credit (Valid Day)</span>
            </div>
            <span className="font-bold text-gray-700">≥ 8 Hours</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center text-gray-600">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <span>Monthly Balance Target</span>
            </div>
            <span className="font-bold text-gray-700">9 Hours Avg.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;