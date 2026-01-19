import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

return (
    <div className="login-page-wrapper">
        <div className="login-card">
            <div className="login-header">
                <div className="logo-icon">🔐</div>
                <h1>SecureAuth</h1>
                <p>Sign in to your account</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email Address</label>
                    <input 
                        type="email"
                        placeholder="your.email@company.com" 
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
                    Sign In
                </button>
            </form>

            <div className="login-footer">
                <p>Forgot password? Contact your System Administrator</p>
            </div>

            <div className="auth-footer">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    </div>
);
}