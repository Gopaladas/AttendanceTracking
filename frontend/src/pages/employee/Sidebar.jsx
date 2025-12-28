import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  CalendarDays, 
  ClipboardCheck, 
  LogOut,
  User
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/employee/dashboard" },
    { icon: <Clock size={20} />, label: "Attendance", path: "/employee/attendance" },
    { icon: <CalendarDays size={20} />, label: "Leave Requests", path: "/employee/leave-management" },
    { icon: <ClipboardCheck size={20} />, label: "Status Tracker", path: "/employee/status-tracker" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col sticky top-0">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-blue-400">AttendancePro</h1>
        <p className="text-xs text-slate-400">Employee Portal</p>
      </div>

   
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>


      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;