import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import api from "../../services/api";
import axios from "axios";
import StatusTracker from "./StatusTracker";

const Attendance = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentStatus, setCurrentStatus] = useState("OUT");

  // Vite environment variables
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  // Function to sync status from backend to show correct buttons
  const fetchCurrentStatus = async () => {
    try {
      const res = await api.get("/attendance/current-status");
      setCurrentStatus(res.data.status);
    } catch (err) {
      console.error("Status sync failed");
    }
  };

  useEffect(() => {
    fetchCurrentStatus();
  }, []);

  const captureAndSend = useCallback(async (type) => {
    setShutter(true);
    setTimeout(() => setShutter(false), 150);

    setLoading(true);
    setMessage({ type: "", text: "" });

    const imageSrc = webcamRef.current?.getScreenshot();

    if (!imageSrc) {
      setMessage({ type: "error", text: "Camera capture failed." });
      setLoading(false);
      return;
    }

    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", imageSrc);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // 2. Send to Backend
      const endpoint = type === "START" ? "/attendance/start" : "/attendance/end";
      
      await api.post(endpoint, {
        image: imageUrl,
        timestamp: new Date().toISOString(),
      });

      setMessage({ 
        type: "success", 
        text: `${type === 'START' ? 'Check-in' : 'Check-out'} Recorded Successfully!` 
      });

      // Update local status to swap buttons
      fetchCurrentStatus();

    } catch (err) {
      const errorText = err.response?.data?.message || "Connection failed.";
      setMessage({ type: "error", text: errorText });
    } finally {
      setLoading(false);
    }
  }, [webcamRef, CLOUD_NAME, UPLOAD_PRESET]);

  const DotsSpinner = () => (
    <div className="flex items-center justify-center space-x-1">
      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
        
        {/* Dynamic Status Bar */}
        <StatusTracker />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Photo-Verified Attendance
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Capture your photo to record your live attendance.
          </p>
        </div>

        <div className="relative rounded-lg overflow-hidden border-4 border-gray-200 mb-6 bg-black aspect-video shadow-inner">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
          <div 
            className={`absolute inset-0 bg-white z-50 transition-opacity duration-150 ${
              shutter ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          ></div>
        </div>

        {message.text && (
          <div className={`p-3 rounded-lg mb-4 font-medium text-sm border ${
            message.type === "success" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {currentStatus === "OUT" ? (
            <button
              onClick={() => captureAndSend("START")}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? <DotsSpinner /> : "Start Attendance (Check-In)"}
            </button>
          ) : (
            <button
              onClick={() => captureAndSend("END")}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? <DotsSpinner /> : "End Attendance (Check-Out)"}
            </button>
          )}
        </div>

        {/* Policy Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-left">
              <p className="text-[10px] text-green-600 font-bold uppercase">Daily Minimum</p>
              <p className="text-lg font-black text-green-800">8 Hours</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-left">
              <p className="text-[10px] text-blue-600 font-bold uppercase">Target Average</p>
              <p className="text-lg font-black text-blue-800">9 Hours</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-4 italic">
            Note: Captured photos are stored for administrative verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;