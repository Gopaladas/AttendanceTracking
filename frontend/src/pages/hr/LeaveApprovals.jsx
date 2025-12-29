// src/pages/hr/LeaveApprovals.jsx  //hardcoded data for demonstration
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


//dynamic version below

// // src/pages/hr/LeaveApprovals.jsx
// import React, { useState } from 'react';

// const LeaveApprovals = () => {
//   const [requests, setRequests] = useState([
//     { id: 1, name: "Alice Cooper", type: "Sick Leave", date: "28 Dec 2025" },
//     { id: 2, name: "Bob Marley", type: "Casual Leave", date: "30 Dec 2025" },
//   ]);

//   const handleAction = (id) => {
//     // Remove the item from the list once it's acted upon
//     setRequests(requests.filter(item => item.id !== id));
//     alert("Action recorded successfully!");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-slate-800">Leave Requests</h2>
//         <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
//           {requests.length} Pending
//         </span>
//       </div>

//       {requests.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
//           <p className="text-slate-400">No pending requests to show.</p>
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {requests.map(req => (
//             <div key={req.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
//               <div>
//                 <h4 className="font-bold text-slate-800">{req.name}</h4>
//                 <p className="text-sm text-slate-500">{req.type} • {req.date}</p>
//               </div>
//               <div className="flex gap-3">
//                 <button onClick={() => handleAction(req.id)} className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all">
//                   Approve
//                 </button>
//                 <button onClick={() => handleAction(req.id)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all">
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveApprovals;