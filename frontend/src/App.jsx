import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import useIdleLogout from "./hooks/useIdleLogout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDash";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDash";
import ChefDashboard from "./pages/ChefDash";
import WaiterDashboard from "./pages/WaiterDash";
// import ManagerDashboard from "./pages/ManagerDash";

function App() {
  useIdleLogout()
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <ProtectedRoute allowedRoles={["admin", "user", "manager", "chef", "waiter"]}>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/chef" element={
            <ProtectedRoute allowedRoles={["chef", "admin"]}>
              <ChefDashboard />
            </ProtectedRoute>
          } />

          <Route path="/waiter" element={
            <ProtectedRoute allowedRoles={["waiter", "admin"]}>
              <WaiterDashboard />
            </ProtectedRoute>
          } />

          {/* <Route path="/manager" element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          } /> */}

          <Route path="/user" element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
