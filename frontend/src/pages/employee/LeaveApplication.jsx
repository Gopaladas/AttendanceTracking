import React, { useState } from "react";
import api from "../../services/api";

const LeaveApplication = () => {
  const [formData, setFormData] = useState({
    leaveType: "Sick",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/leave/apply", formData);
      setMsg("Leave applied successfully!");
      setFormData({ leaveType: "Sick", startDate: "", endDate: "", reason: "" });
    } catch (err) {
      setMsg("Failed to apply for leave.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Apply for Leave</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Leave Type</label>
          <select 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.leaveType}
            onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
          >
            <option>Sick</option>
            <option>Casual</option>
            <option>Paid</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Date</label>
            <input 
              type="date" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">End Date</label>
            <input 
              type="date" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Reason</label>
          <textarea 
            rows="3"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            placeholder="Why are you taking leave?"
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            required
          ></textarea>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {msg && <p className="text-center text-sm font-medium text-indigo-600 mt-2">{msg}</p>}
      </form>
    </div>
  );
};

export default LeaveApplication;