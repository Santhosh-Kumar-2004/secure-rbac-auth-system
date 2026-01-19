import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Template Data - Change these for different roles
  const stats = [
    { label: "Total Users", value: "24", icon: "👥" },
    { label: "Active Sessions", value: "12", icon: "🔑" },
    { label: "System Health", value: "99.9%", icon: "🛡️" },
    { label: "Pending Logs", value: "5", icon: "📂" },
  ];

  const quickActions = [
    { label: "Manage Users", route: "/admin/users", icon: "⚙️", color: "#6366f1" },
    { label: "Role Permissions", route: "/admin/rbac", icon: "🔐", color: "#10b981" },
    { label: "Audit Logs", route: "/admin/logs", icon: "📋", color: "#f59e0b" },
    { label: "System Settings", route: "/admin/settings", icon: "🛠️", color: "#64748b" },
  ];

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="welcome-section">
            <h1>System Control Panel</h1>
            <p>Welcome back, <span className="user-name">{user?.name || "Admin"}</span>. You have <strong>Full Access</strong> privileges.</p>
          </div>
          <div className="role-badge">Role: {user?.role?.toUpperCase()}</div>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Action Grid */}
        <section className="main-content-area">
          <div className="action-section">
            <h3>Quick Management Actions</h3>
            <div className="action-grid">
              {quickActions.map((action, index) => (
                <button 
                  key={index} 
                  className="action-card"
                  onClick={() => navigate(action.route)}
                >
                  <span className="action-icon" style={{ backgroundColor: action.color }}>
                    {action.icon}
                  </span>
                  <span className="action-label">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Placeholder */}
          <div className="activity-section">
            <h3>Recent Security Events</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="time">10:45 AM</span>
                <p>New user <strong>Sarah Miller</strong> registered as <em>Editor</em>.</p>
              </div>
              <div className="activity-item">
                <span className="time">09:12 AM</span>
                <p>Role permissions updated for <strong>Service Operator</strong>.</p>
              </div>
              <div className="activity-item">
                <span className="time">Yesterday</span>
                <p>System backup completed successfully.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}