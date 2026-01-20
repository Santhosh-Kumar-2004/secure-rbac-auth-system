import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "../components/Navbar"
import useIdleLogout from "../hooks/useIdleLogout";
import IdleTimerDisplay from "../components/IdleTimerDisplay";

export default function Home() {
  const { remainingTime } = useIdleLogout();
  return (
    <>
        <Navbar />
    <div className="home-portal-wrapper">
      <div className="home-content-card">
        <header className="home-header">
          <div className="system-logo">🛡️</div>
          <h1>Identity Access Portal</h1>
          <p>Secure Role-Based Access Control (RBAC) Gateway</p>
        </header>

        <section className="home-hero-section">
          <div className="feature-grid">
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <p>Encrypted Auth</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔑</span>
              <p>Role Logic</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <p>Audit Trails</p>
            </div>
          </div>

          <div className="home-actions">
          <IdleTimerDisplay remainingTime={remainingTime} />

          </div>
        </section>

        <footer className="home-footer">
          <p>System Version 1.0.4 • Protected by Enterprise Security</p>
        </footer>
        </div>
      </div>
      </>
  )
}