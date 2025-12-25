import React, { useState, useEffect } from "react";
import api from "../../services/api";

const StatusTracker = () => {
  const [status, setStatus] = useState({ state: "OUT", lastTime: null });
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      // Backend controller setup cheyalsi untundi
      const res = await api.get("/attendance/current-status");
      setStatus({
        state: res.data.status, // "IN" or "OUT"
        lastTime: res.data.lastAction,
      });
    } catch (err) {
      console.error("Status fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) return <div className="text-xs text-gray-400">Loading status...</div>;

  return (
    <div className={`mb-4 flex items-center justify-between p-3 rounded-lg border ${
      status.state === "IN" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
    }`}>
      <div className="flex items-center space-x-2">
        <div className={`w-2.5 h-2.5 rounded-full ${status.state === "IN" ? "bg-green-500 animate-pulse" : "bg-red-400"}`}></div>
        <span className={`text-sm font-bold ${status.state === "IN" ? "text-green-700" : "text-gray-600"}`}>
          {status.state === "IN" ? "Checked In" : "Checked Out"}
        </span>
      </div>
      {status.lastTime && (
        <span className="text-[10px] text-gray-400 italic">
          Last Active: {new Date(status.lastTime).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export default StatusTracker;