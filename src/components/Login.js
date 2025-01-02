import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login = ({ setToken, setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);

      // Lưu token và role vào localStorage
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("role", response.role);

      // Cập nhật state và điều hướng dựa trên role
      setToken(response.access_token);
      setRole(response.role);

      if (response.role === "admin") {
        navigate("/admin");
      } else if (response.role === "expert") {
        navigate("/expert");
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
    }
  };

  return (
    <div>
      <h1>Đăng nhập</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
