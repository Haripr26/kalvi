import { useState } from "react";
import NavigationPalette from "../../components/exam/NavigationPalette";
import { useExamTimer }  from "../../hooks/useExamTimer";
import { useExam }       from "../../context/ExamContext";
import { SAMPLE_QUESTIONS, C } from "../../utils/constants";
import Logo from "../../components/common/Logo";

export default function ExamRoomPage({ setPage }) {
  const { answers, saveAnswer, clearAnswer, flagged, toggleFlag, setResult } = useExam();
  const [current,     setCurrent]     = useState(0);
  const [submitted,   setSubmitted]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const questions = SAMPLE_QUESTIONS;

  const handleSubmit = () => {
    setSubmitted(true);
    setResult({ answers: { ...answers } });
    setTimeout(() => setPage("result"), 1200);
  };

  const { formatted, isUrgent, stop } = useExamTimer(10800, handleSubmit);

  const q        = questions[current];
  const answered = Object.keys(answers).filter(k => answers[k] !== undefined).length;

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: C.maroonDeep, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
      <div style={{ width: 58, height: 58, border: `5px solid rgba(255,255,255,0.15)`, borderTopColor: C.goldLight, borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
      <div style={{ color: C.goldPale, fontFamily: "'Playfair Display',serif", fontSize: 20 }}>Submitting your exam...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.maroonDeep, display: "flex", flexDirection: "column" }}>

      {/* ── Top Bar ── */}
      <div style={{
        background: C.maroon, borderBottom: `2px solid ${C.gold}`,
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Logo size={28} />

        <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: C.goldPale, maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          TNPSC Group 2 — General Studies Full Mock
        </div>

        <div style={{
          fontFamily: "'Courier New', monospace", fontSize: 20, fontWeight: 700,
          color: isUrgent ? "#FF5252" : C.goldLight,
          background: "rgba(0,0,0,0.35)", padding: "5px 16px", borderRadius: 8,
          animation: isUrgent ? "pulse 1s ease infinite" : "none",
          minWidth: 110, textAlign: "center",
        }}>⏱ {formatted}</div>

        <button className="btn-gold" style={{ padding: "8px 22px", fontSize: 13 }} onClick={() => setShowConfirm(true)}>
          Submit Exam ({answered}/{questions.length})
        </button>
      </div>

      <div style={{ display: "flex", flex: 1 }}>

        {/* ── Question Area ── */}
        <div style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>

          {/* Progress info */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ color: "rgba(245,230,200,0.5)", fontSize: 12, fontFamily: "'Lato',sans-serif" }}>
              Question {current + 1} of {questions.length} · Section: {q.section}
            </span>
            <span style={{ fontSize: 11, color: flagged.has(q.id) ? "#FF9800" : "rgba(245,230,200,0.3)", fontFamily: "'Lato',sans-serif" }}>
              {flagged.has(q.id) ? "🚩 Flagged for review" : ""}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 28 }}>
            <div style={{
              width: `${((current + 1) / questions.length) * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg,${C.gold},${C.goldLight})`,
              borderRadius: 2, transition: "width 0.4s ease",
            }} />
          </div>

          {/* Question card */}
          <div className="card" style={{ padding: 30 }}>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 16, color: C.text, lineHeight: 1.8, marginBottom: 26, fontWeight: 500 }}>
              <span style={{ color: C.gold, fontWeight: 800, marginRight: 10, fontFamily: "'Playfair Display',serif" }}>
                Q{current + 1}.
              </span>
              {q.q}
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {q.opts.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <div key={i}
                    className={`exam-option ${selected ? "selected" : ""}`}
                    onClick={() => saveAnswer(q.id, i)}
                  >
                    <div className="option-circle">{String.fromCharCode(65 + i)}</div>
                    {opt}
                  </div>
                );
              })}
            </div>

            {/* Action row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(201,146,42,0.15)" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-outline" style={{ fontSize: 12, padding: "8px 18px" }}
                  onClick={() => toggleFlag(q.id)}>
                  {flagged.has(q.id) ? "🚩 Unflag" : "⚑ Flag for Review"}
                </button>
                <button className="btn-outline" style={{ fontSize: 12, padding: "8px 16px" }}
                  onClick={() => clearAnswer(q.id)}>
                  Clear Answer
                </button>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                {current > 0 && (
                  <button className="btn-outline" onClick={() => setCurrent(p => p - 1)} style={{ padding: "8px 20px" }}>
                    ← Previous
                  </button>
                )}
                {current < questions.length - 1 ? (
                  <button className="btn-gold" onClick={() => setCurrent(p => p + 1)} style={{ padding: "8px 26px" }}>
                    Next →
                  </button>
                ) : (
                  <button className="btn-gold" onClick={() => setShowConfirm(true)} style={{ padding: "8px 26px" }}>
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigator Palette ── */}
        <NavigationPalette
          questions={questions}
          current={current}
          answers={answers}
          flagged={flagged}
          onSelect={setCurrent}
        />
      </div>

      {/* ── Confirm Modal ── */}
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div className="card page-enter" style={{ width: 400, padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>📋</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: C.maroon, marginBottom: 8 }}>
              Submit Exam?
            </h3>
            <div style={{ background: "rgba(201,146,42,0.07)", borderRadius: 10, padding: "14px 18px", margin: "14px 0 22px", fontFamily: "'Lato',sans-serif", fontSize: 13, color: C.textMuted }}>
              <div>Answered: <strong style={{ color: C.maroon }}>{answered}</strong> / {questions.length}</div>
              <div>Flagged for review: <strong style={{ color: "#FF9800" }}>{flagged.size}</strong></div>
              <div>Unanswered: <strong style={{ color: C.error }}>{questions.length - answered}</strong></div>
            </div>
            <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 13, marginBottom: 24 }}>
              Once submitted, you <strong>cannot</strong> change your answers.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowConfirm(false)}>
                Continue Exam
              </button>
              <button className="btn-gold" style={{ flex: 1 }} onClick={() => { stop(); handleSubmit(); }}>
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
