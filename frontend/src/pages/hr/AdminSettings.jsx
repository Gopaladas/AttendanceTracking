const AdminSettings = () => {
  return (
    <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">System Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Office Start Time</label>
          <input type="time" defaultValue="09:00" className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Work Days</label>
          <div className="flex gap-2">
            {['M','T','W','T','F'].map(day => (
              <span key={day} className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold">{day}</span>
            ))}
          </div>
        </div>
        <button className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg">Save Configuration</button>
      </div>
    </div>
  );
};
export default AdminSettings;