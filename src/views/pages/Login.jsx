/**
 * VIEW — pages/Login.jsx
 * Renders the auth form (sign in / register).
 * All logic comes from useAuthController.
 */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthController } from "../../controllers/useAuthController";
import EyeIcon from "../components/EyeIcon";

/* ─── Scoped CSS injected once ─────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #fdf6ee; --white: #ffffff;
    --primary: #800020; --primary-light: #fce8ed;
    --secondary: #c9922a; --accent: #d4a017; --accent-soft: #fef3d0;
    --teal: #8b5e00; --teal-soft: #fff3cc;
    --text: #111111; --muted: #222222;
    --border: #f0ddc8; --input-bg: #fffaf4;
    --shadow-lg: 0 20px 60px rgba(128,0,32,0.16);
    --error: #ef4444; --success: #10b981;
  }

  body { font-family: 'Plus Jakarta Sans', sans-serif; }

  .auth-root {
    min-height: 100vh; background: var(--bg);
    display: flex; align-items: center; justify-content: center;
    padding: 40px 20px; position: relative; overflow: hidden;
  }

  .blob { position: fixed; border-radius: 50%; filter: blur(70px); opacity: 0.45; pointer-events: none; z-index: 0; }
  .blob-1 { width:500px; height:500px; background: radial-gradient(circle,#d4869a,#a0002a); top:-120px; left:-100px; animation: blobFloat 12s ease-in-out infinite alternate; }
  .blob-2 { width:380px; height:380px; background: radial-gradient(circle,#f5d27a,#c9922a); bottom:-80px; right:-60px; animation: blobFloat 14s ease-in-out infinite alternate-reverse; }
  .blob-3 { width:260px; height:260px; background: radial-gradient(circle,#f7e0a0,#d4a017); top:40%; right:10%; animation: blobFloat 10s ease-in-out infinite alternate; }

  @keyframes blobFloat { from{transform:translate(0,0) scale(1);} to{transform:translate(30px,20px) scale(1.06);} }

  .dots-grid { position:fixed; top:0; left:0; right:0; bottom:0; background-image:radial-gradient(circle,rgba(128,0,32,0.10) 1.5px,transparent 1.5px); background-size:36px 36px; z-index:0; pointer-events:none; }

  .card-wrap { position:relative; z-index:2; width:100%; max-width:460px; }

  .card { background:var(--white); border-radius:28px; box-shadow:var(--shadow-lg); padding:44px 44px 40px; border:1px solid rgba(255,255,255,0.9); animation:cardRise 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }

  @keyframes cardRise { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }

  .logo-row { display:flex; align-items:center; gap:12px; margin-bottom:30px; }
  .logo-mark { width:46px; height:46px; border-radius:14px; background:linear-gradient(135deg,#800020,#d4a017); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 16px rgba(128,0,32,0.3); }
  .logo-text { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:#111; letter-spacing:-0.02em; }

  .back-btn { background:none; border:none; cursor:pointer; color:var(--muted); font-size:13px; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:16px; display:flex; align-items:center; gap:6px; padding:0; }
  .back-btn:hover { color:var(--primary); }

  .tab-row { display:flex; background:var(--bg); border-radius:14px; padding:5px; margin-bottom:32px; border:1px solid var(--border); }
  .tab-btn { flex:1; padding:10px 16px; border:none; background:transparent; color:var(--muted); font-family:'Plus Jakarta Sans',sans-serif; font-size:13.5px; font-weight:600; cursor:pointer; border-radius:10px; transition:all 0.22s ease; }
  .tab-btn.active { background:var(--white); color:var(--primary); box-shadow:0 2px 10px rgba(128,0,32,0.12); }

  .form-title { font-family:'Fraunces',serif; font-size:28px; font-weight:700; color:var(--text); margin-bottom:6px; letter-spacing:-0.02em; line-height:1.2; }
  .form-title em { font-style:italic; color:var(--primary); }
  .form-sub { font-size:14px; color:var(--muted); margin-bottom:28px; font-weight:300; }

  .field { margin-bottom:18px; }
  .field label { display:block; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.07em; color:var(--muted); margin-bottom:7px; }
  .field-wrap { position:relative; }
  .field-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); font-size:16px; pointer-events:none; z-index:1; }
  .field-wrap input { width:100%; background:var(--input-bg); border:1.5px solid var(--border); border-radius:12px; padding:13px 44px; color:var(--text); font-family:'Plus Jakarta Sans',sans-serif; font-size:14.5px; outline:none; transition:border-color 0.2s,box-shadow 0.2s,background 0.2s; }
  .field-wrap input::placeholder { color:#bbb8cc; }
  .field-wrap input:focus { border-color:var(--primary); box-shadow:0 0 0 3px rgba(128,0,32,0.12); background:#fff; }
  .field-wrap input.err { border-color:var(--error); box-shadow:0 0 0 3px rgba(239,68,68,0.1); }
  .eye-btn { position:absolute; right:13px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#aaa; padding:4px; display:flex; align-items:center; transition:color 0.2s; }
  .eye-btn:hover { color:var(--primary); }
  .err-msg { font-size:12px; color:var(--error); margin-top:5px; padding-left:2px; display:flex; align-items:center; gap:4px; }

  .check-row { display:flex; align-items:center; gap:10px; margin-bottom:22px; margin-top:4px; }
  .check-row input[type="checkbox"] { width:17px; height:17px; accent-color:var(--primary); cursor:pointer; }
  .check-row label { font-size:13px; color:var(--muted); cursor:pointer; }
  .check-row a { color:var(--primary); text-decoration:underline; text-underline-offset:2px; }

  .submit-btn { width:100%; padding:15px; border:none; border-radius:14px; background:linear-gradient(135deg,#800020 0%,#c9922a 100%); color:white; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:700; letter-spacing:0.02em; cursor:pointer; transition:transform 0.18s,box-shadow 0.18s,opacity 0.18s; box-shadow:0 6px 24px rgba(128,0,32,0.28); margin-top:4px; }
  .submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 32px rgba(128,0,32,0.35); }
  .submit-btn:active:not(:disabled) { transform:translateY(0); }
  .submit-btn:disabled { opacity:0.65; cursor:not-allowed; }

  .spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.4); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; vertical-align:middle; margin-right:8px; }
  @keyframes spin { to{transform:rotate(360deg);} }

  .switch-link { text-align:center; font-size:13.5px; color:var(--muted); margin-top:20px; }
  .switch-link button { background:none; border:none; color:var(--primary); cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:13.5px; font-weight:600; padding:0; margin-left:4px; text-decoration:underline; text-underline-offset:2px; }

  .success-card { text-align:center; padding:20px 0 10px; animation:cardRise 0.4s ease forwards; }
  .success-icon { font-size:52px; margin-bottom:16px; display:block; }
  .success-title { font-family:'Fraunces',serif; font-size:24px; color:var(--text); margin-bottom:8px; font-weight:700; }
  .success-msg { font-size:14px; color:var(--muted); margin-bottom:24px; }
  .success-pill { display:inline-block; background:var(--teal-soft); color:var(--teal); border-radius:100px; padding:8px 22px; font-size:13px; font-weight:600; }
  .success-back { margin-top:20px; background:none; border:none; color:var(--primary); font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:600; cursor:pointer; text-decoration:underline; }

  .fade-in { animation:cardRise 0.32s cubic-bezier(0.22,1,0.36,1) forwards; }
  .footer-note { text-align:center; margin-top:20px; font-size:12px; color:var(--muted); position:relative; z-index:2; }

  @media (max-width:520px) { .card { padding:32px 24px 28px; } }
`;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // If navigated from Register button → open register tab; default is login
  const initialTab = location.state?.tab || "login";

  const {
    mode, fields, errors, showP, showC, agreed, loading, success,
    setMode, setShowP, setShowC,
    handleFieldChange, handleAgreeChange, handleSubmit,
  } = useAuthController(initialTab);

  return (
    <>
      <style>{styles}</style>

      <div className="auth-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="dots-grid" />

        <div className="card-wrap">

          {/* Back to home */}
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>

          <div className="card">

            {/* Logo */}
            <div className="logo-row">
              <div className="logo-mark">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="white" />
                  <path d="M5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z" fill="rgba(255,255,255,0.75)" />
                </svg>
              </div>
              <div className="logo-text">Kalvi Thervu</div>
            </div>

            {/* Tabs */}
            {/* <div className="tab-row">
              <button className={`tab-btn ${mode === "login" ? "active" : ""}`} onClick={() => setMode("login")}>
                Sign In
              </button>
              <button className={`tab-btn ${mode === "register" ? "active" : ""}`} onClick={() => setMode("register")}>
                Create Account
              </button>
            </div> */}

            {/* Success State */}
            {success ? (
              <div className="success-card fade-in">
                <span className="success-icon">{mode === "login" ? "🎉" : "🌸"}</span>
                <div className="success-title">{mode === "login" ? "Welcome back!" : "You're all set!"}</div>
                <p className="success-msg">
                  {mode === "login"
                    ? "You've signed in successfully. Enjoy your experience!"
                    : "Your account has been created. Start exploring now!"}
                </p>
                <span className="success-pill">✔ {mode === "login" ? "Signed in" : "Account created"}</span>
                <br />
                <button className="success-back" onClick={() => navigate("/")}>← Go to Home</button>
              </div>
            ) : (

              /* Form */
              <div className="fade-in" key={mode}>
                <div className="form-title">
                  {mode === "login" ? <>Welcome <em>back</em></> : <>Create your <em>account</em></>}
                </div>
                <p className="form-sub">
                  {mode === "login" ? "Sign in to continue your journey with us." : ""}
                </p>

                {/* Name (register only) */}
                {mode === "register" && (
                  <div className="field">
                    <label>Name</label>
                    <div className="field-wrap">
                      <span className="field-icon">👤</span>
                      <input
                        placeholder="Your full name"
                        value={fields.firstName}
                        onChange={handleFieldChange("firstName")}
                        className={errors.firstName ? "err" : ""}
                      />
                    </div>
                    {errors.firstName && <div className="err-msg">⚠ {errors.firstName}</div>}
                  </div>
                )}

                {/* Email */}
                <div className="field">
                  <label>Email Address</label>
                  <div className="field-wrap">
                    <span className="field-icon">✉️</span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={fields.email}
                      onChange={handleFieldChange("email")}
                      className={errors.email ? "err" : ""}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <div className="err-msg">⚠ {errors.email}</div>}
                </div>

                {/* Password */}
                <div className="field">
                  <label>Password</label>
                  <div className="field-wrap">
                    <span className="field-icon">🔑</span>
                    <input
                      type={showP ? "text" : "password"}
                      placeholder="••••••••"
                      value={fields.password}
                      onChange={handleFieldChange("password")}
                      className={errors.password ? "err" : ""}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                    <button className="eye-btn" onClick={() => setShowP((s) => !s)} type="button">
                      <EyeIcon open={showP} />
                    </button>
                  </div>
                  {errors.password && <div className="err-msg">⚠ {errors.password}</div>}
                </div>

                {/* Confirm Password (register only) */}
                {mode === "register" && (
                  <div className="field">
                    <label>Confirm Password</label>
                    <div className="field-wrap">
                      <span className="field-icon">🔑</span>
                      <input
                        type={showC ? "text" : "password"}
                        placeholder="••••••••"
                        value={fields.confirm}
                        onChange={handleFieldChange("confirm")}
                        className={errors.confirm ? "err" : ""}
                        autoComplete="new-password"
                      />
                      <button className="eye-btn" onClick={() => setShowC((s) => !s)} type="button">
                        <EyeIcon open={showC} />
                      </button>
                    </div>
                    {errors.confirm && <div className="err-msg">⚠ {errors.confirm}</div>}
                  </div>
                )}

                {/* Terms (register only) */}
                {mode === "register" && (
                  <div className="check-row">
                    <input type="checkbox" id="terms" checked={agreed} onChange={handleAgreeChange} />
                    <label htmlFor="terms">
                      I agree to the <a href="#">Terms of Service</a> &amp; <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                )}
                {errors.terms && (
                  <div className="err-msg" style={{ marginTop: "-12px", marginBottom: "14px" }}>
                    ⚠ {errors.terms}
                  </div>
                )}

                {/* Submit */}
                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <><span className="spinner" />{mode === "login" ? "Signing in…" : "Creating account…"}</>
                  ) : (
                    mode === "login" ? "Sign In →" : "Create My Account →"
                  )}
                </button>

                {/* Switch mode */}
                <div className="switch-link">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                  <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
                    {mode === "login" ? "Sign up free" : "Sign in"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="footer-note">🔒 Your data is safe &amp; never shared with third parties.</div>
        </div>
      </div>
    </>
  );
}
