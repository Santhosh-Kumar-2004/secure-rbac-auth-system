import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
          to="/admin" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Admin Panel
        </NavLink>

        <NavLink 
          to="/chef" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Chef Dashboard
        </NavLink>
      </div>

      <div className="nav-user-controls">
        <button className="logout-trigger">Sign Out</button>
      </div>
    </nav>
  );
}