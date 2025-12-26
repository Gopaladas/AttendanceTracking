import React, { useState } from "react";
<<<<<<< HEAD
import api from "../../services/api";
import LeaveStatus from "./LeaveStatus"; // Keep this separate as it's a large component

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("apply");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    leaveType: "Sick",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleApply = async (e) => {
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
=======
import LeaveApplication from "./LeaveApplication";
import LeaveStatus from "./LeaveStatus";

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("apply");
>>>>>>> 2aae2ab426209b57fd4ce410be167c9a6dec1979

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
<<<<<<< HEAD
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Leave Management</h1>
          <p className="text-gray-500 text-sm">Request time off and track approval status.</p>
        </header>

        {/* Tab System UI */}
        <div className="flex space-x-2 bg-gray-200 p-1.5 rounded-2xl mb-8 w-fit">
          <button
            onClick={() => setActiveTab("apply")}
            className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${
              activeTab === "apply" ? "bg-white text-indigo-600 shadow-md" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            New Request
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${
              activeTab === "status" ? "bg-white text-indigo-600 shadow-md" : "text-gray-600 hover:text-gray-900"
=======
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800">Leave Management</h1>
          <p className="text-gray-500 text-sm">Request time off and track your application status.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-xl mb-8 w-fit">
          <button
            onClick={() => setActiveTab("apply")}
            className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === "apply" 
              ? "bg-white text-indigo-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Apply for Leave
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === "status" 
              ? "bg-white text-indigo-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
>>>>>>> 2aae2ab426209b57fd4ce410be167c9a6dec1979
            }`}
          >
            My History
          </button>
        </div>

<<<<<<< HEAD
        {/* Conditional UI Rendering */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
          {activeTab === "apply" ? (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Apply for Leave</h2>
              <form onSubmit={handleApply} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Leave Type</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">From</label>
                    <input type="date" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">To</label>
                    <input type="date" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Reason</label>
                  <textarea rows="3" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none resize-none" placeholder="Details about your leave..." onChange={(e) => setFormData({...formData, reason: e.target.value})} required></textarea>
                </div>

                <button disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all disabled:opacity-50">
                  {loading ? "Submitting..." : "Send Application"}
                </button>
                {msg && <p className="text-center text-sm font-bold text-indigo-600 animate-pulse">{msg}</p>}
              </form>
            </div>
          ) : (
            <LeaveStatus />
=======
        {/* Conditional Content */}
        <div className="transition-all duration-300">
          {activeTab === "apply" ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
               <LeaveApplication />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
               <LeaveStatus />
            </div>
>>>>>>> 2aae2ab426209b57fd4ce410be167c9a6dec1979
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;