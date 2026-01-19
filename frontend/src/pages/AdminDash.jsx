import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      
      <div className="dashboard-container">
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="welcome-section">
            <h1>System Administrator</h1>
            <p>Role-Based Access Control (RBAC) Management Portal</p>
          </div>
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            System Online
          </div>
        </header>

        {/* Stats Section */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-icon">👤</span>
            <div className="stat-text">
              <span className="stat-num">150+</span>
              <span className="stat-label">Total Users</span>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">🛡️</span>
            <div className="stat-text">
              <span className="stat-num">5</span>
              <span className="stat-label">Active Roles</span>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">📡</span>
            <div className="stat-text">
              <span className="stat-num">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="dashboard-grid">
          {/* Action Hub */}
          <section className="action-hub">
            <h3>Quick Management Actions</h3>
            <div className="hub-grid">
              <div className="hub-item">
                <span className="hub-emoji">⚙️</span>
                <p>Edit Config</p>
              </div>
              <div className="hub-item">
                <span className="hub-emoji">📝</span>
                <p>User Logs</p>
              </div>
              <div className="hub-item">
                <span className="hub-emoji">🔒</span>
                <p>Security</p>
              </div>
              <div className="hub-item">
                <span className="hub-emoji">📈</span>
                <p>Analytics</p>
              </div>
            </div>
          </section>

          {/* Activity Feed Placeholder */}
          <aside className="activity-feed">
            <h3>Recent System Logs</h3>
            <div className="log-entry">
              <strong>Admin</strong> updated permissions for <em>Chef</em>.
            </div>
            <div className="log-entry">
              <strong>System</strong> auto-archived logs (24h).
            </div>
            <div className="log-entry">
              <strong>Waiter</strong> login attempt from new IP.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;