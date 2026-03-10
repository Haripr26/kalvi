import Mandala   from "../../components/common/Mandala";
import AdPlayer  from "../../components/ads/AdPlayer";
import { useAdUnlock } from "../../hooks/useAdUnlock";
import { useAuth }     from "../../context/AuthContext";
import { C } from "../../utils/constants";

const RULES = [
  "Full-screen mode is enforced — switching tabs or minimising terminates the exam.",
  "Keyboard shortcuts are disabled (Alt+Tab, Ctrl+C/V, Windows key).",
  "One device per session — multiple logins will cancel your session.",
  "The timer auto-submits your responses when time expires.",
  "Mouse-only navigation is required during the test.",
  "Any malpractice results in immediate account suspension.",
];

const INFO_ITEMS = (exam) => [
  ["📝", "Questions",    `${exam?.questions || 200}`],
  ["⏱",  "Duration",    `${exam?.time || 180} minutes`],
  ["➖", "Neg. Marking", "0.33 marks per wrong answer"],
  ["🔄", "Attempts",    "1 free (Watch ad / Pay for more)"],
  ["📊", "Sections",    "4 (GS · Tamil · Aptitude · Current)"],
  ["🌐", "Language",    "English & Tamil"],
];

export default function ExamDetailPage({ exam, setPage }) {
  const { user }                   = useAuth();
  const { status, timeLeft, startAd, isUnlocked } = useAdUnlock();

  const ex = exam || { title: "TNPSC Group 2 — General Studies Full Mock", questions: 200, time: 180, free: true };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(155deg,${C.maroonDeep},${C.maroon})`,
      paddingTop: 64, position: "relative", overflow: "hidden",
    }}>
      <Mandala size={400} style={{ top: 0, right: 0 }} />

      <div className="page-enter" style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 60px", position: "relative", zIndex: 1 }}>

        {/* Breadcrumb */}
        <div style={{ color: "rgba(245,230,200,0.5)", fontSize: 13, fontFamily: "'Lato',sans-serif", marginBottom: 22 }}>
          <button className="btn-ghost" onClick={() => setPage("exams")} style={{ color: C.gold, fontSize: 13, fontFamily: "'Lato',sans-serif" }}>
            ← Back to Exams
          </button>
        </div>

        <div className="card" style={{ padding: 38 }}>
          {/* Title */}
          <div style={{ marginBottom: 26 }}>
            <span className={`badge ${ex.free ? "badge-free" : "badge-premium"}`} style={{ marginBottom: 10 }}>
              {ex.free ? "🆓 Free Attempt" : "🔒 Premium"}
            </span>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: C.maroon, lineHeight: 1.4, marginTop: 8 }}>
              {ex.title}
            </h1>
          </div>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 30 }}>
            {INFO_ITEMS(ex).map(([ic, lb, vl]) => (
              <div key={lb} style={{ background: "rgba(201,146,42,0.06)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{ic}</div>
                <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{lb}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.maroon, fontFamily: "'Lato',sans-serif", marginTop: 3 }}>{vl}</div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{ background: "rgba(198,40,40,0.05)", border: "1px solid rgba(198,40,40,0.18)", borderRadius: 12, padding: 22, marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: C.maroon, marginBottom: 14 }}>
              📋 Exam Integrity Rules — Read Carefully
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {RULES.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: C.error, fontSize: 13, marginTop: 1, flexShrink: 0 }}>⚠</span>
                  <span style={{ fontSize: 13, color: C.textMuted, fontFamily: "'Lato',sans-serif", lineHeight: 1.6 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Unlock Flow */}
          {!user ? (
            <div style={{ background: "rgba(201,146,42,0.07)", borderRadius: 12, padding: 22, marginBottom: 22, textAlign: "center" }}>
              <p style={{ fontFamily: "'Lato',sans-serif", color: C.textMuted, fontSize: 14, marginBottom: 14 }}>
                Please sign in to attempt this test.
              </p>
              <button className="btn-gold" onClick={() => setPage("login")}>Sign In to Continue</button>
            </div>
          ) : status === "idle" ? (
            <div style={{ background: "rgba(201,146,42,0.07)", borderRadius: 12, padding: 22, marginBottom: 22, textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", color: C.maroon, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Unlock Your Free Attempt</p>
              <p style={{ fontFamily: "'Lato',sans-serif", color: C.textMuted, fontSize: 13, marginBottom: 18 }}>
                Watch a 30-second ad to unlock this test for free
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button className="btn-gold" onClick={startAd}>▶ Watch Ad & Unlock</button>
                <button className="btn-outline" style={{ fontSize: 13 }}>Pay ₹29 (Skip Ads)</button>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: 22 }}>
              <AdPlayer status={status} timeLeft={timeLeft} />
            </div>
          )}

          <button
            className="btn-gold"
            style={{ width: "100%", padding: "15px", fontSize: 16 }}
            onClick={() => setPage("exam-room")}
            disabled={!user || (status === "idle") || status === "watching"}
          >
            {!user
              ? "Sign In to Start"
              : status === "idle"
              ? "Watch Ad to Unlock"
              : status === "watching"
              ? "Please wait for ad to finish..."
              : "🚀 Start Exam Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
