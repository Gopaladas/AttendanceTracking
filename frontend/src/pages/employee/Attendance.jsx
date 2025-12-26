import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import api from "../../services/api";

const Attendance = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentStatus, setCurrentStatus] = useState("OUT");

  // Camera Settings
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
    // Shutter animation effect
    setShutter(true);
    setTimeout(() => setShutter(false), 150);

    setLoading(true);
    setMessage({ type: "", text: "" });

    // 1. Capture base64 image from webcam
    const imageSrc = webcamRef.current?.getScreenshot();

    if (!imageSrc) {
      setMessage({
        type: "error",
        text: "Camera capture failed. Please try again.",
      });
      setLoading(false);
      return;
    }

    try {
      // 2. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", imageSrc);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;
      console.log("Cloudinary Upload Success:", imageUrl);

      // 3. Send URL and Type to Backend
      const endpoint = type === "START" ? "/attendance/start" : "/attendance/end";
      await api.post(endpoint, {
        image: imageUrl, // Now sending the web link
        timestamp: new Date().toISOString(),
      });

      setMessage({ 
        type: "success", 
        text: `${type === 'START' ? 'Check-in' : 'Check-out'} Recorded Successfully!` 
      });

    } catch (err) {
      console.error("Processing Error:", err);
      // Detailed error message handling
      const errorText = err.response?.data?.error?.message || 
                        err.response?.data?.message || 
                        "Connection failed. Check your internet.";
      
      setMessage({
        type: "error",
        text: errorText,
      });
    } finally {
      setLoading(false);
    }
  }, [webcamRef]);

  // Spinner UI Component
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
        <StatusTracker />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Photo-Verified Attendance
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Capture your photo to record your attendance.
          </p>
        </div>

        {/* Camera Display */}
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

        {/* Status Message */}
        {message.text && (
          <div className={`p-3 rounded-lg mb-4 font-medium text-sm border ${
            message.type === "success" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => captureAndSend("START")}
            disabled={loading}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg min-h-12 disabled:opacity-70 transition-all active:scale-95 shadow-md"
          >
            {loading ? <DotsSpinner /> : "Start Attendance"}
          </button>

          <button
            onClick={() => captureAndSend("END")}
            disabled={loading}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg min-h-12 disabled:opacity-70 transition-all active:scale-95 shadow-md"
          >
            {loading ? <DotsSpinner /> : "End Attendance"}
          </button>
        </div>

        {/* Policy Information Section */}
        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between bg-green-50 p-2.5 rounded-lg border border-green-100">
              <div className="flex items-center text-green-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Daily Credit (Valid Day)</span>
              </div>
              <span className="font-bold text-green-800">≥ 8 Hours</span>
            </div>

            <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded-lg border border-blue-100">
              <div className="flex items-center text-blue-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Monthly Balance Target</span>
              </div>
              <span className="font-bold text-blue-800">9 Hours Avg.</span>
            </div>

            <p className="text-[10px] text-gray-400 text-center italic">
              * Days under 8 hours are marked as{" "}
              <span className="text-red-500 font-semibold uppercase tracking-wider">Invalid</span>.
            </p>
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