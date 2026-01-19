import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav className="main-navbar">
      <div className="nav-logo">
        <span className="logo-shield">🛡️</span>
        <span className="logo-text">AuthPro</span>
      </div>

      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Home
        </NavLink>

        {(user.role === "user" || user.role === "admin") && (
        <NavLink 
          to="/user" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          User Panel
        </NavLink>
        )}

        {user.role === "admin" && (
        <NavLink 
          to="/admin" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Admin Panel
        </NavLink>
        )}

        {(user.role === "chef" || user.role === "admin") && (
        <NavLink 
          to="/chef" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Chef Panle
        </NavLink>
        )}

        {(user.role === "waiter" || user.role === "admin") && (
        <NavLink 
          to="/waiter" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Waiter Panle
        </NavLink>
        )}
      </div>

      <div className="nav-user-controls">
        <button className="logout-trigger">Sign Out</button>
      </div>
    </nav>
  );
}