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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/employee/attendance" element={<Attendance />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/employee/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
