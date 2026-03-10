import { useState } from "react";
import Mandala from "../../components/common/Mandala";
import { EXAM_CATEGORIES, MOCK_EXAMS, C } from "../../utils/constants";

export default function ExamsPage({ setPage, setCurrentExam }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_EXAMS.filter(e =>
    (filter === "all" || e.cat === filter) &&
    (search === "" || e.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg,${C.maroonDeep} 0%,#200A12 100%)`, paddingTop: 64 }}>
      <Mandala size={400} style={{ top: 30, right: -60 }} />

      {/* Header */}
      <div style={{ textAlign: "center", padding: "48px 20px 0", position: "relative", zIndex: 1 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, color: C.goldLight, marginBottom: 8 }}>
          Choose Your Exam
        </h1>
        <p style={{ color: "rgba(245,230,200,0.55)", fontFamily: "'Lato',sans-serif", fontSize: 14, marginBottom: 32 }}>
          Authentic mock tests for all major government exams — free first attempt with ads
        </p>

        {/* Search bar */}
        <div style={{ maxWidth: 420, margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
          <input className="input-field" placeholder="Search exams..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 42, background: "rgba(253,246,236,0.95)" }}/>
        </div>
      </div>

      {/* Category Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, padding: "32px 48px 0", position: "relative", zIndex: 1 }}>
        {EXAM_CATEGORIES.map(cat => (
          <div key={cat.id} onClick={() => setFilter(filter === cat.id ? "all" : cat.id)}
            className="card"
            style={{
              padding: 22, textAlign: "center", cursor: "pointer",
              border: `2px solid ${filter === cat.id ? C.gold : "rgba(201,146,42,0.2)"}`,
              transform: filter === cat.id ? "scale(1.04)" : "scale(1)",
              transition: "all 0.22s",
            }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>{cat.icon}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: C.maroon, fontSize: 15 }}>{cat.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", marginTop: 4 }}>{cat.sub}</div>
            <div style={{ marginTop: 10, display: "inline-block", background: "rgba(201,146,42,0.1)", borderRadius: 20, padding: "3px 12px", fontSize: 11, color: C.gold, fontFamily: "'Lato',sans-serif", fontWeight: 700 }}>{cat.count} Tests</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 10, padding: "24px 48px 16px", alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        {[["all","All Exams"],["tnpsc","TNPSC"],["upsc","UPSC / IAS"],["banking","Banking / SSC"],["state","State & Central"]].map(([k, v]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: "7px 20px", borderRadius: 22,
            background: filter === k ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : "rgba(255,255,255,0.06)",
            border: `1px solid ${filter === k ? C.gold : "rgba(201,146,42,0.25)"}`,
            color: filter === k ? C.maroonDeep : "rgba(245,230,200,0.7)",
            cursor: "pointer", fontFamily: "'Lato',sans-serif",
            fontSize: 12, fontWeight: filter === k ? 700 : 500,
          }}>{v}</button>
        ))}
        <span style={{ marginLeft: "auto", color: "rgba(245,230,200,0.4)", fontFamily: "'Lato',sans-serif", fontSize: 12 }}>
          {filtered.length} exam{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Exam Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, padding: "0 48px 60px", position: "relative", zIndex: 1 }}>
        {filtered.map(exam => (
          <div key={exam.id} className="card" style={{ padding: 26, display: "flex", flexDirection: "column", gap: 14, transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: C.maroon, lineHeight: 1.4, flex: 1 }}>{exam.title}</h3>
              <span className={`badge ${exam.free ? "badge-free" : "badge-premium"}`}>
                {exam.free ? "🆓 Free" : "🔒 Premium"}
              </span>
            </div>

            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {[["📝", `${exam.questions} Questions`], ["⏱", `${exam.time} mins`], ["👥", `${exam.attempts.toLocaleString()} attempted`]].map(([ic, lb]) => (
                <span key={lb} style={{ fontSize: 12, color: C.textMuted, fontFamily: "'Lato',sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                  <span>{ic}</span>{lb}
                </span>
              ))}
            </div>

            {/* Progress bar (mock: popularity) */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "'Lato',sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>Popularity</span>
                <span style={{ fontSize: 10, color: C.gold, fontFamily: "'Lato',sans-serif", fontWeight: 700 }}>{Math.min(100, Math.round(exam.attempts / 80))}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(201,146,42,0.12)", borderRadius: 2 }}>
                <div style={{ width: `${Math.min(100, Math.round(exam.attempts / 80))}%`, height: "100%", background: `linear-gradient(90deg,${C.gold},${C.goldLight})`, borderRadius: 2 }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button className="btn-gold" style={{ flex: 1, padding: "10px 16px", fontSize: 14 }}
                onClick={() => { setCurrentExam(exam); setPage("exam-detail"); }}>
                Start Test
              </button>
              <button className="btn-outline" style={{ padding: "10px 18px", fontSize: 13 }}
                onClick={() => { setCurrentExam(exam); setPage("exam-detail"); }}>
                Details
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ gridColumn: "span 2", textAlign: "center", padding: "60px 0", color: "rgba(245,230,200,0.4)", fontFamily: "'Lato',sans-serif" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p>No exams found. Try a different filter or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
