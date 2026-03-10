import { useState } from "react";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";
import { NAV_LINKS, C } from "../../utils/constants";

export default function Navbar({ page, setPage }) {
  const { user, logout } = useAuth();
  const [hovered, setHovered] = useState(null);

  const handleLogout = () => { logout(); setPage("home"); };

  const dashPage = user?.role === "admin" ? "admin-dashboard"
                 : user?.role === "publisher" ? "publisher-dashboard"
                 : "dashboard";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(42,10,18,0.96)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid rgba(201,146,42,0.18)`,
      padding: "0 40px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <div style={{ cursor: "pointer" }} onClick={() => setPage("home")}>
        <Logo size={36} />
      </div>

      {/* Center Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {NAV_LINKS.map(link => (
          <button
            key={link.id}
            onClick={() => setPage(link.id)}
            onMouseEnter={() => setHovered(link.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
              fontSize: 14,
              fontWeight: page === link.id ? 700 : 400,
              color: page === link.id ? C.goldLight : hovered === link.id ? "rgba(245,230,200,0.9)" : "rgba(245,230,200,0.6)",
              borderBottom: page === link.id ? `2px solid ${C.gold}` : "2px solid transparent",
              paddingBottom: 3,
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right: Auth */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <>
            <button
              onClick={() => setPage(dashPage)}
              style={{
                background: "rgba(201,146,42,0.12)", border: `1px solid rgba(201,146,42,0.3)`,
                borderRadius: 30, padding: "6px 16px", cursor: "pointer",
                color: C.goldPale, fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              <span style={{ fontSize: 16 }}>👤</span>
              {user.name}
              <span style={{
                fontSize: 10, padding: "2px 7px", borderRadius: 20,
                background: "rgba(201,146,42,0.25)", color: C.goldLight, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>{user.role}</span>
            </button>
            <button className="btn-outline" onClick={handleLogout}
              style={{ padding: "7px 20px", fontSize: 13 }}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className="btn-ghost" onClick={() => setPage("login")}
              style={{ color: "rgba(245,230,200,0.7)", fontSize: 14, fontFamily: "'Playfair Display',serif" }}>
              Sign In
            </button>
            <button className="btn-gold" onClick={() => setPage("register")}
              style={{ padding: "8px 24px", fontSize: 14 }}>
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
