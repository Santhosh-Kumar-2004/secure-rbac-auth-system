import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon">🍴</div>
          <h1>KitchenPro</h1>
          <p>Sign in to manage your restaurant</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email"
              placeholder="name@restaurant.com" 
              required
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Login to Dashboard
          </button>
        </form>

        <div className="login-footer">
          <p>Forgot password? Contact your Administrator</p>
        </div>
      </div>
    </div>
  );
}