import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import api from "../../services/api";

const Attendance = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Camera Settings
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const captureAndSend = useCallback(async (type) => {
    // 1. Trigger Shutter Visual Effect
    setShutter(true);
    setTimeout(() => setShutter(false), 150);
    setLoading(true);
    setMessage({ type: "", text: "" });

    // 1. Capture base64 image from webcam
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      setMessage({
        type: "error",
        text: "Failed to capture photo. Please try again.",
      });
      setLoading(false);
      return;
    }

    // 3. Send to Backend
    try {
      const endpoint = type === "START" ? "/attendance/start" : "/attendance/end";
      await api.post(endpoint, {
        image: imageSrc,
        timestamp: new Date().toISOString(),
      });
      setMessage({ type: "success", text: `${type} Recorded Successfully!` });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Server Connection Error.",
      });
    } finally {
      setLoading(false);
    }
  }, [webcamRef, CLOUD_NAME, UPLOAD_PRESET]);

  // Loading Animation Component
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
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Photo-Verified Attendance
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Smile for the camera to verify your session and start tracking hours.
          </p>
        </div>

        {/* Camera Display with Shutter Overlay */}
        <div className="relative rounded-lg overflow-hidden border-4 border-gray-200 mb-6 bg-black aspect-video shadow-inner">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
          
          {/* Shutter Effect Overlay */}
          <div 
            className={`absolute inset-0 bg-white z-50 transition-opacity duration-150 ${
              shutter ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          ></div>
        </div>

        {/* Alert Messages */}
        {message.text && (
          <div className={`p-3 rounded-lg mb-4 text-sm text-center font-medium border ${
            message.type === "success" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
          }`}>
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => captureAndSend("START")}
            disabled={loading}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg min-h-12 disabled:opacity-70 transition-all active:scale-95"
          >
            {loading ? <DotsSpinner /> : "Start Attendance"}
          </button>

          <button
            onClick={() => captureAndSend("END")}
            disabled={loading}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg min-h-12 disabled:opacity-70 transition-all active:scale-95"
          >
            {loading ? <DotsSpinner /> : "End Attendance"}
          </button>
        </div>

        {/* Module 3: Policy Information Box */}
        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-3 text-xs">
            
            {/* Daily Credit Rule */}
            <div className="flex items-center justify-between bg-green-50 p-2.5 rounded-lg border border-green-100">
              <div className="flex items-center text-green-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Daily Credit (Valid Day)</span>
              </div>
              <span>Daily Credit (Valid Day)</span>
            </div>
            <span className="font-bold text-gray-700">≥ 8 Hours</span>
          </div>

            {/* Monthly Balancing Target */}
            <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded-lg border border-blue-100">
              <div className="flex items-center text-blue-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Monthly Balance Target</span>
              </div>
              <span>Monthly Balance Target</span>
            </div>

            {/* Invalid Day Warning */}
            <p className="text-[10px] text-gray-400 text-center italic">
              * Days under 8 hours are marked as{" "}
              <span className="text-red-500 font-semibold uppercase tracking-wider">Invalid</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;