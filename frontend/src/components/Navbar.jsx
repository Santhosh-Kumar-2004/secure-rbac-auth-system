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

        <NavLink 
          to="/user" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          User Panel
        </NavLink>

        <NavLink 
          to="/admin" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Admin Panel
        </NavLink>

        <NavLink 
          to="/chef" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Chef Panle
        </NavLink>
        <NavLink 
          to="/waiter" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Waiter Panle
        </NavLink>
      </div>

      <div className="nav-user-controls">
        <button className="logout-trigger">Sign Out</button>
      </div>
    </nav>
  );
}