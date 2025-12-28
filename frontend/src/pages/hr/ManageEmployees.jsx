const ManageEmployees = () => {
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