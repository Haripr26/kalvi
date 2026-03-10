/**
 * ROUTER — AppRouter.jsx
 * Central place for all application routes.
 * Add new routes here — never in App.jsx or individual pages.
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home  from "../views/pages/Home";
import Login from "../views/pages/Login";
import Register from "../views/pages/Register";


// Placeholder pages for nav links
const About   = () => <div style={{ padding: "80px", fontFamily: "Inter, sans-serif" }}><h1>About Page</h1><p>Coming soon…</p></div>;
const Courses = () => <div style={{ padding: "80px", fontFamily: "Inter, sans-serif" }}><h1>Courses Page</h1><p>Coming soon…</p></div>;
const Contact = () => <div style={{ padding: "80px", fontFamily: "Inter, sans-serif" }}><h1>Contact Page</h1><p>Coming soon…</p></div>;
const NotFound = () => <div style={{ padding: "80px", fontFamily: "Inter, sans-serif" }}><h1>404 — Page Not Found</h1></div>;

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"        element={<Home />}    />
      <Route path="/login"   element={<Login />}   />
      <Route path="/register"   element={<Register />}   />
      <Route path="/about"   element={<About />}   />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*"        element={<NotFound />} />
    </Routes>
  );
}
