import { C } from "../../utils/constants";

export default function AdPlayer({ timeLeft, status }) {
  const pct = Math.round(((30 - timeLeft) / 30) * 100);

  if (status === "watching") return (
    <div style={{
      background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonDark})`,
      borderRadius: 14, padding: "28px 24px",
      border: `1px solid rgba(201,146,42,0.3)`,
      textAlign: "center",
    }}>
      <div style={{ color: C.goldPale, fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        📺 Advertisement Playing
      </div>
      <p style={{ color: "rgba(245,230,200,0.5)", fontSize: 11, fontFamily: "'Lato',sans-serif", marginBottom: 20 }}>
        Do not switch tabs or close this window
      </p>

      {/* Progress ring */}
      <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 16px" }}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
          <circle cx="45" cy="45" r="38" fill="none" stroke={C.goldLight} strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 38 * pct / 100} ${2 * Math.PI * 38 * (1 - pct / 100)}`}
            strokeLinecap="round" transform="rotate(-90 45 45)"/>
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: C.goldLight }}>{timeLeft}</div>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 9, color: "rgba(245,230,200,0.5)", textTransform: "uppercase" }}>secs</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: `linear-gradient(90deg,${C.gold},${C.goldLight})`,
          borderRadius: 2, transition: "width 1s linear",
        }}/>
      </div>
    </div>
  );

  if (status === "done") return (
    <div style={{
      background: "rgba(46,125,50,0.1)",
      border: "1px solid rgba(46,125,50,0.35)",
      borderRadius: 14, padding: 24, textAlign: "center",
    }}>
      <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
      <div style={{ fontFamily: "'Playfair Display',serif", color: C.success, fontSize: 18, fontWeight: 600 }}>
        Ad Watched — Test Unlocked!
      </div>
      <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 13, marginTop: 6 }}>
        You're good to go. Start the test now.
      </p>
    </div>
  );

  return null;
}
