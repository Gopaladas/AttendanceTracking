const ManageEmployees = () => {   //hardcoded data for demonstration
  const employees = [
    { id: "EMP001", name: "John Doe", role: "Software Engineer", dept: "IT" },
    { id: "EMP002", name: "Sarah Smith", role: "HR Manager", dept: "HR" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Employee Directory</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Add Employee
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">ID</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Name</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Role</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4 text-slate-600">{emp.id}</td>
                <td className="p-4 font-medium text-slate-800">{emp.name}</td>
                <td className="p-4 text-slate-600">{emp.role}</td>
                <td className="p-4 text-slate-600">{emp.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageEmployees;

//dynamic version below

// // src/pages/hr/ManageEmployees.jsx
// import React, { useState } from 'react';
// import { Search, Trash2, UserPlus } from 'lucide-react';

// const ManageEmployees = () => {
//   // 1. Dynamic State for the employee list
//   const [employees, setEmployees] = useState([
//     { id: "EMP001", name: "John Doe", role: "Software Engineer", dept: "IT" },
//     { id: "EMP002", name: "Sarah Smith", role: "HR Manager", dept: "HR" },
//     { id: "EMP003", name: "Mike Ross", role: "Legal Counsel", dept: "Legal" },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");

//   // 2. Logic to delete an employee dynamically
//   const deleteEmployee = (id) => {
//     setEmployees(employees.filter(emp => emp.id !== id));
//   };

//   // 3. Logic for real-time searching
//   const filteredEmployees = employees.filter(emp => 
//     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     emp.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-slate-800">Employee Directory</h2>
//         <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all">
//           <UserPlus size={18} /> Add Employee
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//         <input 
//           type="text"
//           placeholder="Search by name or ID..."
//           className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-slate-50 border-b border-slate-200">
//             <tr>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase">Employee</th>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase">Role/Dept</th>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {filteredEmployees.map(emp => (
//               <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
//                 <td className="p-4">
//                   <div className="font-semibold text-slate-800">{emp.name}</div>
//                   <div className="text-xs text-slate-500">{emp.id}</div>
//                 </td>
//                 <td className="p-4">
//                   <div className="text-sm text-slate-700">{emp.role}</div>
//                   <div className="text-xs text-indigo-600 font-medium">{emp.dept}</div>
//                 </td>
//                 <td className="p-4 text-right">
//                   <button 
//                     onClick={() => deleteEmployee(emp.id)}
//                     className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEmployees;