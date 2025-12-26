import React, { useState } from "react";
import LeaveApplication from "./LeaveApplication";
import LeaveStatus from "./LeaveStatus";

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("apply");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
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
            }`}
          >
            My History
          </button>
        </div>

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
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;