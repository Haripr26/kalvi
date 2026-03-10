/**
 * VIEW — HeroSection.jsx
 * Pure presentational component for the landing hero area.
 */

import React from "react";
import bg from "../../../assets/bg.png";

const styles = {
  hero: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0, left: 0,
    width: "55%",
    height: "100%",
    background:
      "linear-gradient(90deg,rgba(45,0,60,0.9),rgba(45,0,60,0.6),transparent)",
  },
  heroWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  heroContent: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "0 80px",
    display: "flex",
    alignItems: "center",
    color: "white",
    position: "relative",
    zIndex: 3,
  },
  heroText: { maxWidth: "520px" },
  title: {
    fontSize: "56px",
    fontWeight: "700",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "35px",
    lineHeight: "1.6",
  },
  startBtn: {
    border: "none",
    padding: "16px 40px",
    fontSize: "18px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    color: "white",
    background: "#8b5cf6",
    transition: "all 0.3s ease",
  },
  startBtnHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
  },
};

export default function HeroSection({ hover, setHover, onGetStarted, children }) {
  return (
    <div style={styles.hero}>
      <div style={styles.overlay} />
      {/* Navbar slot */}
      {children}

      <div style={styles.heroWrapper}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <div style={styles.title}>
              Learn Skills That Shape Your Future
            </div>
            <div style={styles.subtitle}>
              Discover high-quality learning resources, interactive exams, and
              performance analytics designed to help students achieve academic
              success.
            </div>
            <button
              onMouseEnter={() => setHover("start")}
              onMouseLeave={() => setHover("")}
              onClick={onGetStarted}
              style={{
                ...styles.startBtn,
                ...(hover === "start" ? styles.startBtnHover : {}),
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
