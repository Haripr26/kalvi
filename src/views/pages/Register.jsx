/**
 * VIEW — pages/Register.jsx
 * Register page ONLY. No tab switcher. No link to Login.
 */

import React from "react";
import { useRegisterController } from "../../controllers/useRegisterController";
import EyeIcon from "../components/EyeIcon";
import { authCSS } from "../styles/authStyles";

export default function Register() {
  const {
    fields, errors, showP, showC, agreed, loading, success,
    setShowP, setShowC,
    handleFieldChange,
    handleAgreeChange,
    handleSubmit,
    goHome,
  } = useRegisterController();

  return (
    <>
      <style>{authCSS}</style>

      <div className="auth-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="dots-grid" />

        <div className="card-wrap">

          <button className="back-btn" onClick={goHome}>← Back to Home</button>

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

            {success ? (
              <div className="success-card">
                <span className="success-icon">🌸</span>
                <div className="success-title">You're all set!</div>
                <p className="success-msg">Your account has been created. Start exploring now!</p>
                <span className="success-pill">✔ Account created</span>
                <br />
                <button className="success-back" onClick={goHome}>← Go to Home</button>
              </div>
            ) : (
              <>
                <div className="form-title">Create your <em>account</em></div>
                <p className="form-sub">Join Kalvi Thervu and start your learning journey today.</p>

                {/* Full Name */}
                <div className="field">
                  <label>Full Name</label>
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
                      autoComplete="new-password"
                    />
                    <button className="eye-btn" onClick={() => setShowP((s) => !s)} type="button">
                      <EyeIcon open={showP} />
                    </button>
                  </div>
                  {errors.password && <div className="err-msg">⚠ {errors.password}</div>}
                </div>

                {/* Confirm Password */}
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

                {/* Terms */}
                <div className="check-row">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={handleAgreeChange}
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="#">Terms of Service</a> &amp; <a href="#">Privacy Policy</a>
                  </label>
                </div>
                {errors.terms && (
                  <div className="err-msg" style={{ marginTop: "-12px", marginBottom: "14px" }}>
                    ⚠ {errors.terms}
                  </div>
                )}

                {/* Submit */}
                <button className="submit-btn register-color" onClick={handleSubmit} disabled={loading}>
                  {loading ? <><span className="spinner" />Creating account…</> : "Create My Account →"}
                </button>
              </>
            )}
          </div>

          <div className="footer-note">🔒 Your data is safe &amp; never shared with third parties.</div>
        </div>
      </div>
    </>
  );
}