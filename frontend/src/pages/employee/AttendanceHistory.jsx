import React, { useState, useEffect } from "react";
import api from "../../services/api";

const AttendanceHistory = () => {
  const [data, setData] = useState({ summary: {}, history: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/attendance/monthly-summary");
        setData(res.data);
      } catch (err) { console.error("Failed to fetch history"); }
      finally { setLoading(false); }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Report...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Hours" value={data.summary.totalHours} color="blue" />
        <StatCard title="Valid Days" value={data.summary.validDays} color="green" />
        <StatCard 
          title="Net Balance" 
          value={`${data.summary.netBalance}h`} 
          color={data.summary.netBalance >= 0 ? "emerald" : "red"} 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Balance (vs 9h)</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.history.map((rec) => (
              <tr key={rec._id} className="text-sm hover:bg-gray-50">
                <td className="p-4">{rec.date}</td>
                <td className="p-4 font-medium">{rec.workHours}h</td>
                <td className={`p-4 font-bold ${rec.balance >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {rec.balance > 0 ? `+${rec.balance}` : rec.balance}h
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${rec.isValidDay ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {rec.isValidDay ? "VALID" : "INVALID"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-5 rounded-2xl bg-white border-l-4 border-${color}-500 shadow-sm`}>
    <p className="text-xs text-gray-500 font-bold uppercase">{title}</p>
    <p className={`text-2xl font-black text-gray-800 mt-1`}>{value}</p>
  </div>
);

export default AttendanceHistory;