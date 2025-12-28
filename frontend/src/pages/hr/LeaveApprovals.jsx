// src/pages/hr/LeaveApprovals.jsx
const LeaveApprovals = () => {
  const pendingLeaves = [
    { id: 1, name: "John Doe", type: "Sick Leave", date: "2023-10-25", reason: "Fever" },
    { id: 2, name: "Jane Smith", type: "Annual Leave", date: "2023-11-01", reason: "Vacation" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Pending Leave Approvals</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Employee</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Leave Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {pendingLeaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{leave.name}</td>
                <td className="px-6 py-4 text-slate-600">{leave.type}</td>
                <td className="px-6 py-4 text-slate-600">{leave.date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700">Approve</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveApprovals;