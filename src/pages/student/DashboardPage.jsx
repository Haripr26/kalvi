import { useAuth } from "../../context/AuthContext";
import { C } from "../../utils/constants";

const RECENT = [
  { title: "TNPSC Group 2 Full Mock",    score: 74, date: "Mar 8, 2025",  rank: 234 },
  { title: "TNPSC Group 4 Tamil & GK",  score: 82, date: "Mar 5, 2025",  rank: 89  },
  { title: "IBPS PO Preliminary",        score: 68, date: "Mar 1, 2025",  rank: 512 },
  { title: "SSC-CGL Tier I Mock",        score: 71, date: "Feb 25, 2025", rank: 318 },
];

const SUGGEST = [
  { topic: "Indian Polity — Fundamental Rights",  score: 42, target: 75 },
  { topic: "Current Affairs Jan–Mar 2025",         score: 55, target: 80 },
  { topic: "Quantitative Aptitude — Data Interp.", score: 48, target: 70 },
];

export default function DashboardPage({ setPage }) {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg,${C.maroonDeep},#1E0810)`, paddingTop: 64 }}>
      <div className="page-enter" style={{ maxWidth: 1040, margin: "0 auto", padding: "44px 24px" }}>

        {/* Welcome Banner */}
        <div style={{
          background: `linear-gradient(135deg,${C.maroon},${C.maroonDark})`,
          borderRadius: 16, padding: "26px 32px", marginBottom: 28,
          border: `1px solid rgba(201,146,42,0.25)`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: C.goldLight, marginBottom: 5 }}>
              Welcome back, {user?.name || "Aspirant"}! 👋
            </h1>
            <p style={{ color: "rgba(245,230,200,0.6)", fontFamily: "'Lato',sans-serif", fontSize: 14 }}>
              Keep up the momentum. Your next exam is waiting.
            </p>
          </div>
          <button className="btn-gold" onClick={() => setPage("exams")} style={{ padding: "12px 28px" }}>
            + Start New Exam
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 26 }}>
          {[
            ["🎯","Tests Taken","12"],
            ["📊","Average Score","74%"],
            ["🏆","Best Rank","#89"],
            ["⏱","Total Study Time","48 hrs"],
          ].map(([ic,lb,vl]) => (
            <div key={lb} className="stat-card">
              <div className="stat-icon">{ic}</div>
              <div className="stat-value">{vl}</div>
              <div className="stat-label">{lb}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22 }}>

          {/* Recent Tests */}
          <div className="card" style={{ padding: 26 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: C.maroon }}>
                Recent Tests
              </h3>
              <button className="btn-ghost" style={{ color: C.gold, fontSize: 13, fontFamily: "'Lato',sans-serif" }}
                onClick={() => setPage("exams")}>View All →</button>
            </div>
            {RECENT.map(r => (
              <div key={r.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(201,146,42,0.1)" }}>
                <div>
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 3 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>
                    Rank #{r.rank} · {r.date}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700,
                    color: r.score >= 75 ? C.success : r.score >= 50 ? C.gold : C.error,
                  }}>{r.score}%</div>
                  <button className="btn-ghost" style={{ color: C.gold, fontSize: 11, fontFamily: "'Lato',sans-serif" }}
                    onClick={() => setPage("result")}>
                    View Report →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Accuracy Ring */}
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: C.maroon, marginBottom: 18 }}>
                Overall Accuracy
              </h3>
              <div style={{ position: "relative", width: 110, height: 110, margin: "0 auto 14px" }}>
                <svg width="110" height="110" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r="44" fill="none" stroke="rgba(201,146,42,0.13)" strokeWidth="11"/>
                  <circle cx="55" cy="55" r="44" fill="none" stroke={C.gold} strokeWidth="11"
                    strokeDasharray={`${2*Math.PI*44*0.74} ${2*Math.PI*44*0.26}`}
                    strokeLinecap="round" transform="rotate(-90 55 55)"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: C.maroon }}>74%</div>
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>
                Across 12 tests · 2,400 questions
              </div>
            </div>

            {/* Suggestions */}
            <div className="card" style={{ padding: 22 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: C.maroon, marginBottom: 16 }}>
                💡 Focus Areas
              </h3>
              {SUGGEST.map(s => (
                <div key={s.topic} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", flex: 1, lineHeight: 1.4 }}>{s.topic}</span>
                    <span style={{ fontSize: 11, color: C.error, fontFamily: "'Lato',sans-serif", fontWeight: 700, marginLeft: 8 }}>{s.score}%</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(201,146,42,0.1)", borderRadius: 3 }}>
                    <div style={{ width: `${s.score}%`, height: "100%", background: `linear-gradient(90deg,${C.error},#EF5350)`, borderRadius: 3 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    <span style={{ fontSize: 10, color: "rgba(127,90,72,0.6)", fontFamily: "'Lato',sans-serif" }}>Current</span>
                    <button className="btn-ghost" style={{ fontSize: 10, color: C.gold, fontFamily: "'Lato',sans-serif" }}
                      onClick={() => setPage("exams")}>Practice →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
