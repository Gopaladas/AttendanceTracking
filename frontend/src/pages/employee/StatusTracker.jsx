  import React, { useState, useEffect } from "react";
  import api from "../../services/api";

  const StatusTracker = () => {
    const [status, setStatus] = useState({ state: "OUT", lastTime: null });
    const [loading, setLoading] = useState(true);

    const fetchStatus = async () => {
      try {
        // Calls your backend to get the latest check-in/out record
        const res = await api.get("/attendance/current-status");
        setStatus({
          state: res.data.status, // Expecting "IN" or "OUT"
          lastTime: res.data.lastAction, // Expecting a timestamp
        });
      } catch (err) {
        console.error("Status fetch failed");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchStatus(); 

      // Polling: Updates the UI every 5 seconds
      const interval = setInterval(() => {
        fetchStatus();
      }, 5000); 

      return () => clearInterval(interval); 
    }, []);

    if (loading) return <div className="text-xs text-gray-400">Loading status...</div>;

    return (
      <div className={`mb-4 flex items-center justify-between p-4 rounded-xl border ${
        status.state === "IN" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
      }`}>
        <div className="flex items-center space-x-3">
          {/* Animated pulse dot for active status */}
          <div className={`w-3 h-3 rounded-full ${status.state === "IN" ? "bg-green-500 animate-pulse" : "bg-red-400"}`}></div>
          <span className={`text-sm font-bold ${status.state === "IN" ? "text-green-700" : "text-gray-600"}`}>
            {status.state === "IN" ? "Current Status: Checked In" : "Current Status: Checked Out"}
          </span>
        </div>
        {status.lastTime && (
          <span className="text-[11px] text-gray-500 font-medium">
            Last Active: {new Date(status.lastTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    );
  };

  export default StatusTracker;