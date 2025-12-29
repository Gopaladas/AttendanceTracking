import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 flex-shrink-01">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Employee Dashboard
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;