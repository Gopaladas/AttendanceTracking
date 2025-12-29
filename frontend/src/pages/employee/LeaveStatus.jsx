import React, { useState, useEffect } from "react";
import api from "../../services/api";

const LeaveStatus = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leave/my-leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error("Failed to fetch leave history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700 border-green-200";
      case "Rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading leave history...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Leave Requests</h2>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Total Requests: {leaves.length}
        </span>
      </div>

      {leaves.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">No leave applications found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leaves.map((leave) => (
            <div key={leave._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-gray-800">{leave.leaveType} Leave</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(leave.status)}`}>
                    {leave.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(leave.startDate).toLocaleDateString()} — {new Date(leave.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2 italic">"{leave.reason}"</p>
              </div>
              
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Applied On</p>
                <p className="text-xs text-gray-600">{new Date(leave.appliedOn).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveStatus;