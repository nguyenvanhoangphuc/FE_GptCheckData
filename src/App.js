import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import ExpertPanel from "./components/ExpertPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // Cập nhật token và role khi đăng nhập
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const logout = () => {
    // Xóa token và role khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute token={token}>
              <AdminPanel token={token} logout={logout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expert"
          element={
            <ProtectedRoute token={token}>
              <ExpertPanel token={token} logout={logout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
