/**
 * VIEW — pages/Home.jsx
 * Composes Navbar + HeroSection.
 * Gets all state/handlers from useHomeController.
 */

import React from "react";
import { useHomeController } from "../../controllers/useHomeController";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";

const pageStyle = {
  width: "100%",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

export default function Home() {
  const controller = useHomeController();

  return (
    <div style={pageStyle}>
      <HeroSection
        hover={controller.hover}
        setHover={controller.setHover}
        onGetStarted={controller.goToLogin}
      >
        {/* Navbar lives inside HeroSection's z-stacked area */}
        <Navbar {...controller} />
      </HeroSection>
    </div>
  );
}