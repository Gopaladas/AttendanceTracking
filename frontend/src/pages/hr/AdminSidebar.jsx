// src/components/layout/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  CalendarRange, 
  Settings,
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "HR Overview", path: "/admin/dashboard" },
    { icon: <Users size={20} />, label: "Manage Employees", path: "/admin/employees" },
    { icon: <FileCheck size={20} />, label: "Leave Approvals", path: "/admin/approvals" },
    { icon: <CalendarRange size={20} />, label: "Holiday Calendar", path: "/admin/holidays" },
    { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen w-64 bg-indigo-950 text-white flex flex-col sticky top-0">
      <div className="p-6 border-b border-indigo-900">
        <h1 className="text-xl font-bold text-indigo-300">AttendancePro</h1>
        <p className="text-xs text-indigo-400">HR Management Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40" 
                  : "text-indigo-300 hover:bg-indigo-900 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-indigo-900">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-indigo-300 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;