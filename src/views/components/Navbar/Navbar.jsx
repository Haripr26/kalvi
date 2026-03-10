/**
 * VIEW — Navbar.jsx
 * Login / Register buttons are directly clickable (navigate on click)
 * AND show a dropdown on hover for role-specific entry.
 */

import React from "react";
import { Link } from "react-router-dom";

const s = {
  navbar: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 80px",
    color: "white",
    position: "relative",
    zIndex: 5,
  },
  logo: { fontSize: "24px", fontWeight: "700", letterSpacing: "1px", color: "white", textDecoration: "none" },
  navLinks: { display: "flex", gap: "40px", fontSize: "16px" },
  navLinkItem: { cursor: "pointer", color: "white", textDecoration: "none" },
  navButtons: { display: "flex", gap: "15px" },
  buttonBase: {
    border: "none",
    padding: "12px 28px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    color: "white",
    fontSize: "15px",
    transition: "all 0.3s ease",
  },
  loginBtn:    { background: "#7a1ee6" },
  registerBtn: { background: "#2433c9" },
  hoverEffect: {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.35)",
  },
  dropdownMenu: {
    position: "absolute",
    top: "52px",
    right: 0,
    background: "rgba(20,0,50,0.97)",
    borderRadius: "10px",
    overflow: "hidden",
    minWidth: "190px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
    zIndex: 100,
  },
  dropdownItem: {
    padding: "13px 18px",
    cursor: "pointer",
    fontSize: "14px",
    color: "white",
    transition: "background 0.2s",
    display: "block",
    textDecoration: "none",
  },
};

export default function Navbar({
  hover, setHover,
  loginMenu, registerMenu,
  openLogin, closeLogin,
  openRegister, closeRegister,
  goToLogin, goToRegister,
}) {
  return (
    <nav style={s.navbar}>

      {/* LOGO */}
      <Link to="/" style={s.logo}>KALVI THERVU</Link>

      {/* NAV LINKS */}
      <div style={s.navLinks}>
        <Link to="/"        style={s.navLinkItem}>Home</Link>
        <Link to="/about"   style={s.navLinkItem}>About</Link>
        <Link to="/courses" style={s.navLinkItem}>Courses</Link>
        <Link to="/contact" style={s.navLinkItem}>Contact</Link>
      </div>

      {/* ACTION BUTTONS */}
      <div style={s.navButtons}>

        {/* ── LOGIN ── */}
        <div style={{ position: "relative" }} onMouseEnter={openLogin} onMouseLeave={closeLogin}>
          <button
            onClick={goToLogin}
            onMouseEnter={() => setHover("login")}
            onMouseLeave={() => setHover("")}
            style={{ ...s.buttonBase, ...s.loginBtn, ...(hover === "login" ? s.hoverEffect : {}) }}
          >
            Login
          </button>

          
        </div>

        {/* ── REGISTER ── */}
        <div style={{ position: "relative" }} onMouseEnter={openRegister} onMouseLeave={closeRegister}>
          <button
            onClick={goToRegister}
            onMouseEnter={() => setHover("register")}
            onMouseLeave={() => setHover("")}
            style={{ ...s.buttonBase, ...s.registerBtn, ...(hover === "register" ? s.hoverEffect : {}) }}
          >
            Register
          </button>

          
        </div>

      </div>
    </nav>
  );
}