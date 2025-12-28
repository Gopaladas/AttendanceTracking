// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import Attendance from "./pages/employee/Attendance";
// import NotFound from "./pages/NotFound";
// import Dashboard from "./pages/employee/Dashboard";
// import LeaveManagement from "./pages/employee/LeaveManagement";

// import StatusTracker from "./pages/employee/StatusTracker";
// import LeaveStatus from "./pages/employee/LeaveStatus";
// import EmployeeLayout from "./pages/employee/EmployeeLayout";

// // A simple helper to check if user is logged in
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />

//       {/* Auth Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       {/* Employee Routes (Direct Access) */}
//       <Route path="/employee/dashboard" element={<Dashboard />} />
//       <Route path="/employee/attendance" element={<Attendance />} />
//       <Route path="/employee/leave-management" element={<LeaveManagement />} />
//       <Route path="/employee/status-tracker" element={<StatusTracker />} />
//       <Route path="/employee/leave-status" element={<LeaveStatus />} />
//       <Route path="/employee/layout" element={<EmployeeLayout />} />

//       {/* 404 Route - Always keep this at the bottom */}

//       {/* Employee Routes (Protected) */}
//       <Route
//         path="/employee/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/employee/attendance"
//         element={
//           <ProtectedRoute>
//             <Attendance />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/employee/leave-management"
//         element={
//           <ProtectedRoute>
//             <LeaveManagement />
//           </ProtectedRoute>
//         }
//       />

//       {/* Admin Routes (To be created next) */}
//       {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Attendance from "./pages/employee/Attendance";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/employee/Dashboard";
import LeaveManagement from "./pages/employee/LeaveManagement";
import StatusTracker from "./pages/employee/StatusTracker";
import LeaveStatus from "./pages/employee/LeaveStatus";
import EmployeeLayout from "./pages/employee/EmployeeLayout";

import AdminDashboard from "./pages/hr/AdminDashboard";
import ManageEmployees from "./pages/hr/ManageEmployees";
import LeaveApprovals from "./pages/hr/LeaveApprovals";
import HolidaySettings from "./pages/hr/HolidaySettings";
import AdminSettings from "./pages/hr/AdminSettings";
import AdminLayout from "./pages/hr/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* EMPLOYEE ROUTES (Direct Access - No ProtectedRoute)
          The Sidebar is in EmployeeLayout. 
          The children below will appear beside it.
      */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leave-management" element={<LeaveManagement />} />
        <Route path="status-tracker" element={<StatusTracker />} />
        <Route path="leave-status" element={<LeaveStatus />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<ManageEmployees />} />
        <Route path="approvals" element={<LeaveApprovals />} />
        <Route path="holidays" element={<HolidaySettings />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;