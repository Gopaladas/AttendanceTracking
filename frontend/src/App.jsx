import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Attendance from "./pages/employee/Attendance";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/employee/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Employee Routes (Protected) */}
      <Route 
        path="/employee/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
      />
      <Route 
        path="/employee/attendance" 
        element={<ProtectedRoute><Attendance /></ProtectedRoute>} 
      />
      <Route 
        path="/employee/leave-management" 
        element={<ProtectedRoute><LeaveManagement /></ProtectedRoute>} 
      />

      {/* Admin Routes (To be created next) */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;