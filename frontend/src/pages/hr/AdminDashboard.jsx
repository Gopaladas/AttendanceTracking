import React from 'react';
import { Users, Clock, CalendarCheck, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: "Total Employees", value: "124", icon: <Users className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "On Leave Today", value: "8", icon: <CalendarCheck className="text-purple-600" />, bg: "bg-purple-50" },
    { label: "Present Now", value: "112", icon: <Clock className="text-green-600" />, bg: "bg-green-50" },
    { label: "Late Arrivals", value: "4", icon: <AlertCircle className="text-amber-600" />, bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Recent Attendance Activity</h3>
        <p className="text-slate-500 text-sm italic underline">Attendance chart/graph will appear here...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;