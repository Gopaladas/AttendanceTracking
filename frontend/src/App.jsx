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

// A simple helper to check if user is logged in
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Employee Routes (Direct Access) */}
      <Route path="/employee/dashboard" element={<Dashboard />} />
      <Route path="/employee/attendance" element={<Attendance />} />
      <Route path="/employee/leave-management" element={<LeaveManagement />} />
      <Route path="/employee/status-tracker" element={<StatusTracker />} />
      <Route path="/employee/leave-status" element={<LeaveStatus />} />
      {/* 404 Route - Always keep this at the bottom */}

      {/* Employee Routes (Protected) */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/leave-management"
        element={
          <ProtectedRoute>
            <LeaveManagement />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes (To be created next) */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
