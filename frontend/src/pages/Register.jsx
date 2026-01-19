import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🛡️</div>
          <h2>Create Identity</h2>
          <p>Register a new account with specific access privileges.</p>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <div className="input-field">
            <label>Full Name</label>
            <input 
              placeholder="e.g. John Doe" 
              required
              onChange={e => setForm({...form, name: e.target.value})} 
            />
          </div>

          <div className="input-field">
            <label>Work Email</label>
            <input 
              type="email"
              placeholder="name@organization.com" 
              required
              onChange={e => setForm({...form, email: e.target.value})} 
            />
          </div>

          <div className="input-field">
            <label>Security Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              onChange={e => setForm({...form, password: e.target.value})} 
            />
          </div>

          <div className="input-field">
            <label>System Role (RBAC)</label>
            <select 
              className="role-select"
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value})}
            >
              <option value="user">Standard User</option>
              <option value="admin">System Administrator</option>
              <option value="chef">Technical Lead (Chef)</option>
              <option value="waiter">Service Operator (Waiter)</option>
              <option value="manager">Operations Manager</option>
            </select>
            <small className="helper-text">This determines your access level across the platform.</small>
          </div>

          <button type="submit" className="register-btn">
            Initialize Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}