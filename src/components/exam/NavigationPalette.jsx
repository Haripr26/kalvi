import { C } from "../../utils/constants";

export default function NavigationPalette({ questions, current, answers, flagged, onSelect }) {
  const legend = [
    { color: C.gold,   label: "Current"      },
    { color: C.success,label: "Answered"     },
    { color: "#FF9800",label: "Flagged"       },
    { color: "rgba(255,255,255,0.1)", label: "Not Visited" },
  ];

  return (
    <div style={{
      width: 220,
      background: "rgba(0,0,0,0.45)",
      borderLeft: `1px solid rgba(201,146,42,0.2)`,
      padding: "22px 16px",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        color: C.goldLight, fontFamily: "'Playfair Display',serif",
        fontSize: 13, fontWeight: 700, marginBottom: 16,
      }}>Question Navigator</div>

      {/* Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {questions.map((q, i) => {
          const isCurrent  = i === current;
          const isAnswered = answers[q.id] !== undefined;
          const isFlagged  = flagged.has(q.id);
          const bg = isCurrent ? C.gold : isFlagged ? "#FF9800" : isAnswered ? C.success : "rgba(255,255,255,0.1)";
          return (
            <button key={i} onClick={() => onSelect(i)} style={{
              width: 34, height: 34, borderRadius: 7,
              background: bg,
              border: isCurrent ? `2px solid ${C.goldLight}` : "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              color: isCurrent || isAnswered || isFlagged ? "white" : "rgba(255,255,255,0.45)",
              fontFamily: "'Lato',sans-serif", fontSize: 12,
              fontWeight: isCurrent ? 700 : 400,
              transition: "all 0.15s",
            }}>{i + 1}</button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: "auto" }}>
        {legend.map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: color, border: "1px solid rgba(255,255,255,0.15)" }}/>
            <span style={{ fontSize: 11, color: "rgba(245,230,200,0.55)", fontFamily: "'Lato',sans-serif" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
