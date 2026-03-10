import { useState } from "react";
import Logo    from "../../components/common/Logo";
import Mandala from "../../components/common/Mandala";
import { useAuth } from "../../context/AuthContext";
import { C } from "../../utils/constants";

export default function LoginPage({ setPage }) {
  const { login } = useAuth();
  const [form, setForm]   = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [err, setErr]     = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setErr("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    const result = login(form.username, form.password);
    if (!result.ok) { setErr(result.error); return; }
    setPage(result.role === "admin" ? "admin-dashboard"
          : result.role === "publisher" ? "publisher-dashboard"
          : "dashboard");
  };

  const handleKey = (e) => { if (e.key === "Enter") handle(); };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(155deg, ${C.maroonDeep} 0%, ${C.maroon} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", paddingTop: 64,
    }}>
      <Mandala size={500} style={{ top: -80, left: -80 }} />
      <Mandala size={320} style={{ bottom: 20, right: 20 }} />

      <div className="card page-enter" style={{ width: 430, padding: "44px 38px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Logo size={46} />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: C.maroon, marginTop: 18 }}>
            Welcome Back
          </h2>
          <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 13, marginTop: 4 }}>
            Sign in to your Kalvi Thaervu account
          </p>
        </div>

        {err && (
          <div style={{
            background: "rgba(198,40,40,0.09)", border: `1px solid rgba(198,40,40,0.3)`,
            borderRadius: 10, padding: "11px 14px", color: C.error,
            fontSize: 13, marginBottom: 18, fontFamily: "'Lato',sans-serif",
          }}>{err}</div>
        )}

        {/* Username */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Username / Email
          </label>
          <input className="input-field" placeholder="Enter your username or email"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            onKeyDown={handleKey} />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 12, position: "relative" }}>
          <label style={{ display: "block", fontSize: 12, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Password
          </label>
          <input className="input-field"
            type={showPw ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={handleKey}
            style={{ paddingRight: 48 }}
          />
          <button onClick={() => setShowPw(!showPw)} style={{
            position: "absolute", right: 14, top: 34, background: "none", border: "none",
            cursor: "pointer", color: C.gold, fontSize: 16,
          }}>{showPw ? "🙈" : "👁️"}</button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>
            <input type="checkbox" style={{ accentColor: C.gold }} /> Remember me
          </label>
          <button className="btn-ghost" style={{ color: C.gold, fontSize: 13, fontFamily: "'Lato',sans-serif", fontWeight: 600 }}>
            Forgot password?
          </button>
        </div>

        <button className="btn-gold" style={{ width: "100%", padding: "14px", fontSize: 16 }} onClick={handle} disabled={loading}>
          {loading
            ? <span style={{ display: "inline-block", width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: C.maroonDeep, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            : "Sign In"
          }
        </button>

        <div style={{ textAlign: "center", marginTop: 10, padding: "10px", background: "rgba(201,146,42,0.06)", borderRadius: 8 }}>
          <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: C.textMuted }}>
            Demo: use <strong>admin</strong> → Admin panel · <strong>publisher1</strong> → Publisher · any other → Student
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>
          Don't have an account?{" "}
          <button className="btn-ghost" onClick={() => setPage("register")}
            style={{ color: C.gold, fontWeight: 700, fontSize: 14, fontFamily: "'Lato',sans-serif" }}>
            Register here
          </button>
        </p>
        <p style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>
          Are you a publisher?{" "}
          <button className="btn-ghost" onClick={() => setPage("publisher-login")}
            style={{ color: C.gold, fontSize: 12, fontFamily: "'Lato',sans-serif" }}>
            Publisher Login
          </button>
        </p>
      </div>
    </div>
  );
}
