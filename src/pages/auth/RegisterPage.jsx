import { useState } from "react";
import Logo    from "../../components/common/Logo";
import Mandala from "../../components/common/Mandala";
import { C } from "../../utils/constants";

const FIELDS = [
  { key: "name",     label: "Full Name",       placeholder: "Your full name",           span: 2 },
  { key: "email",    label: "Email Address",   placeholder: "email@example.com"                  },
  { key: "phone",    label: "Phone Number",    placeholder: "10-digit mobile number"             },
  { key: "password", label: "Password",        placeholder: "Min 8 characters", type: "password" },
  { key: "confirm",  label: "Confirm Password",placeholder: "Re-enter password",  type: "password" },
];

export default function RegisterPage({ setPage }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"", confirm:"", role:"student" });
  const [step, setStep] = useState("form"); // form | success
  const [err,  setErr]  = useState("");

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.password) return "All fields are required.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    return null;
  };

  const handle = async () => {
    const e = validate();
    if (e) { setErr(e); return; }
    setErr("");
    setStep("loading");
    await new Promise(r => setTimeout(r, 1000));
    setStep("success");
    setTimeout(() => setPage("login"), 2000);
  };

  if (step === "success") return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg,${C.maroonDeep},${C.maroon})`, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 64 }}>
      <div className="card page-enter" style={{ padding: 48, textAlign: "center", width: 400 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: C.maroon, marginBottom: 8 }}>Account Created!</h2>
        <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 14 }}>Redirecting you to login...</p>
        <div style={{ width: 40, height: 40, border: `4px solid rgba(201,146,42,0.2)`, borderTopColor: C.gold, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "20px auto 0" }}/>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(155deg,${C.maroonDeep} 0%,${C.maroon} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "80px 16px 40px", position: "relative", overflow: "hidden",
    }}>
      <Mandala size={400} style={{ top: 0, right: -60 }} />

      <div className="card page-enter" style={{ width: 500, padding: "40px 38px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Logo size={38} />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: C.maroon, marginTop: 14 }}>Create Your Account</h2>
          <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 13, marginTop: 4 }}>Join thousands of government exam aspirants</p>
        </div>

        {/* Role Toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 22, background: "rgba(201,146,42,0.08)", borderRadius: 10, padding: 4 }}>
          {[["student","🎓 Student"],["publisher","📚 Publisher"]].map(([r, l]) => (
            <button key={r} onClick={() => setForm({ ...form, role: r })} style={{
              flex: 1, padding: "9px", borderRadius: 8,
              background: form.role === r ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : "transparent",
              border: "none",
              color: form.role === r ? C.maroonDeep : C.textMuted,
              cursor: "pointer", fontFamily: "'Lato',sans-serif",
              fontSize: 13, fontWeight: form.role === r ? 700 : 500,
              transition: "all 0.2s",
            }}>{l}</button>
          ))}
        </div>

        {err && (
          <div style={{ background: "rgba(198,40,40,0.09)", border: `1px solid rgba(198,40,40,0.3)`, borderRadius: 10, padding: "11px 14px", color: C.error, fontSize: 13, marginBottom: 16, fontFamily: "'Lato',sans-serif" }}>{err}</div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {FIELDS.map(f => (
            <div key={f.key} style={{ gridColumn: f.span === 2 ? "span 2" : "span 1" }}>
              <label style={{ display: "block", fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label>
              <input className="input-field" type={f.type || "text"} placeholder={f.placeholder}
                value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          ))}
        </div>

        <button className="btn-gold" style={{ width: "100%", padding: "13px", fontSize: 15, marginTop: 22 }}
          onClick={handle} disabled={step === "loading"}>
          {step === "loading"
            ? <span style={{ display: "inline-block", width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: C.maroonDeep, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            : `Create ${form.role === "publisher" ? "Publisher" : "Student"} Account`
          }
        </button>

        <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>
          Already have an account?{" "}
          <button className="btn-ghost" onClick={() => setPage("login")} style={{ color: C.gold, fontWeight: 700, fontSize: 13, fontFamily: "'Lato',sans-serif" }}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
