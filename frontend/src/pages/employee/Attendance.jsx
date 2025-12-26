import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import api from "../../services/api";
import axios from "axios";

const Attendance = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

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
      const formData = new FormData();
      formData.append("file", imageSrc);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;
      const endpoint = type === "START" ? "/attendance/start" : "/attendance/end";
      
      await api.post(endpoint, {
        image: imageUrl,
        timestamp: new Date().toISOString(),
      });

      setMessage({ 
        type: "success", 
        text: `${type === 'START' ? 'Check-in' : 'Check-out'} recorded!` 
      });
    } catch (err) {
      setMessage({ type: "error", text: "Connection failed." });
    } finally {
      setLoading(false);
    }
  }, [webcamRef, CLOUD_NAME, UPLOAD_PRESET]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-3xl">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#444] mb-1">
            Photo-Verified Attendance
          </h2>
          <p className="text-sm text-gray-400">
            Smile for the camera to verify your session and start tracking hours
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-6 bg-black aspect-video border border-gray-100 shadow-sm">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-white transition-opacity duration-150 ${shutter ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
        </div>

        {message.text && (
          <div className={`p-2 rounded text-xs mb-4 text-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </div>
        )}

        <div className="flex flex-row gap-3 mb-10">
          <button
            onClick={() => captureAndSend("START")}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "..." : "Start Attendance"}
          </button>

          <button
            onClick={() => captureAndSend("END")}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "..." : "End Attendance"}
          </button>
        </div>

        <div className="space-y-3 px-2 mt-6 border-t border-gray-50 pt-4">
          <div className="flex justify-between items-center text-[13px]">
            <div className="flex items-center text-[#666]">
              <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center mr-2">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#777]">Daily Credit: <span className="text-[#aaa] ml-1">Valid Day:</span></span>
            </div>
            <span className="text-[#888] font-medium tracking-tight text-right">
              &ge; 8 Hours
            </span>
          </div>

          <div className="flex justify-between items-center text-[13px]">
            <div className="flex items-center text-[#666]">
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                <span className="text-white text-[10px] font-bold">i</span>
              </div>
              <span className="text-[#777]">Monthly Balance Target</span>
            </div>
            <span className="text-[#888] font-medium tracking-tight text-right">
              9 Hours Avg.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;