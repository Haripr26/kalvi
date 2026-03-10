import { useExam }  from "../../context/ExamContext";
import { SAMPLE_QUESTIONS, C } from "../../utils/constants";
import { calculateScore, getSectionBreakdown, getGrade } from "../../utils/scoreCalc";

export default function ResultPage({ setPage }) {
  const { answers } = useExam();
  const questions   = SAMPLE_QUESTIONS;
  const stats       = calculateScore(questions, answers);
  const sections    = getSectionBreakdown(questions, answers);
  const grade       = getGrade(stats.percent);

  // Mock data to augment the real stats
  const rank        = 234;
  const totalUsers  = 4821;
  const timeTaken   = "01:48:22";

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,#3A0A15,${C.maroon})`, paddingTop: 64 }}>
      <div className="page-enter" style={{ maxWidth: 820, margin: "0 auto", padding: "44px 20px 60px" }}>

        <h1 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", fontSize: 34, color: C.goldLight, marginBottom: 6 }}>
          Exam Results
        </h1>
        <p style={{ textAlign: "center", color: "rgba(245,230,200,0.55)", fontFamily: "'Lato',sans-serif", marginBottom: 36 }}>
          TNPSC Group 2 — General Studies Full Mock
        </p>

        {/* ── Score Hero ── */}
        <div className="card" style={{ padding: 36, textAlign: "center", marginBottom: 22 }}>
          <div style={{ position: "relative", width: 150, height: 150, margin: "0 auto 22px" }}>
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="62" fill="none" stroke="rgba(201,146,42,0.14)" strokeWidth="12"/>
              <circle cx="75" cy="75" r="62" fill="none" stroke={C.gold} strokeWidth="12"
                strokeDasharray={`${2*Math.PI*62*stats.percent/100} ${2*Math.PI*62*(1-stats.percent/100)}`}
                strokeLinecap="round" transform="rotate(-90 75 75)"/>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: C.maroon }}>{stats.percent}%</div>
              <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>{stats.score}/{stats.total}</div>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: grade.color, marginBottom: 4 }}>
            {grade.emoji} {grade.label} Performance
          </h2>
          <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 13 }}>
            Rank <strong style={{ color: C.maroon }}>#{rank}</strong> out of {totalUsers.toLocaleString()} candidates · Time taken: {timeTaken}
          </p>

          {/* Quick Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 28 }}>
            {[
              ["✅", "Correct",   stats.correct,  C.success],
              ["❌", "Wrong",     stats.wrong,    C.error],
              ["⏭",  "Skipped",   stats.skipped,  C.gold],
              ["🏆", "Your Rank", `#${rank}`,     C.maroon],
            ].map(([ic, lb, vl, col]) => (
              <div key={lb} style={{ background: "rgba(201,146,42,0.06)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{ic}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: col }}>{vl}</div>
                <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lb}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section Breakdown ── */}
        <div className="card" style={{ padding: 28, marginBottom: 22 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: C.maroon, marginBottom: 22 }}>
            Section-Wise Performance
          </h3>
          {sections.map(s => (
            <div key={s.name} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</span>
                <span style={{
                  fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700,
                  color: s.percent >= 70 ? C.success : s.percent >= 50 ? C.gold : C.error,
                }}>
                  {s.score}/{s.max} ({s.percent}%)
                </span>
              </div>
              <div style={{ height: 8, background: "rgba(201,146,42,0.1)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${s.percent}%`, height: "100%", borderRadius: 4,
                  background: s.percent >= 70
                    ? `linear-gradient(90deg,${C.success},#4CAF50)`
                    : s.percent >= 50
                    ? `linear-gradient(90deg,${C.gold},${C.goldLight})`
                    : `linear-gradient(90deg,${C.error},#EF5350)`,
                  transition: "width 1.2s ease",
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Answer Review ── */}
        <div className="card" style={{ padding: 28, marginBottom: 28 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: C.maroon, marginBottom: 18 }}>
            Answer Review
          </h3>
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const correct = userAns === q.correct;
            const skipped = userAns === undefined;
            return (
              <div key={q.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(201,146,42,0.1)" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                    background: skipped ? "rgba(201,146,42,0.2)" : correct ? "rgba(46,125,50,0.15)" : "rgba(198,40,40,0.15)",
                    border: `2px solid ${skipped ? C.gold : correct ? C.success : C.error}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11,
                  }}>
                    {skipped ? "−" : correct ? "✓" : "✗"}
                  </span>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: C.text, lineHeight: 1.6, fontWeight: 500 }}>
                    <strong style={{ color: C.gold }}>Q{i + 1}.</strong> {q.q}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 14, marginLeft: 34, flexWrap: "wrap" }}>
                  {userAns !== undefined && (
                    <span style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: correct ? C.success : C.error }}>
                      Your answer: <strong>{q.opts[userAns]}</strong>
                    </span>
                  )}
                  {!correct && (
                    <span style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: C.success }}>
                      Correct: <strong>{q.opts[q.correct]}</strong>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Actions ── */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-gold" style={{ padding: "12px 36px" }} onClick={() => setPage("exams")}>
            Try Another Exam
          </button>
          <button className="btn-outline" onClick={() => setPage("dashboard")}>
            Go to Dashboard
          </button>
          <button className="btn-outline" style={{ fontSize: 13 }}>
            📥 Download Report
          </button>
        </div>
      </div>
    </div>
  );
}
