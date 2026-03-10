import { C } from "../../utils/constants";

export default function Logo({ size = 40 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}>
      <svg viewBox="0 0 44 44" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Book pages */}
        <rect x="5"  y="20" width="34" height="16" rx="2" fill={C.gold} opacity="0.85"/>
        {/* Book spine */}
        <path d="M5 22 Q22 12 39 22" stroke={C.goldLight} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Candle stick */}
        <rect x="20" y="7" width="4" height="14" rx="1.5" fill={C.goldLight}/>
        {/* Flame */}
        <ellipse cx="22" cy="6.5" rx="3" ry="4.5" fill={C.gold}/>
        <ellipse cx="22" cy="7"   rx="1.5" ry="2.5" fill={C.goldLight} opacity="0.8"/>
        {/* Glow */}
        <circle cx="22" cy="6" r="5" fill={C.goldLight} opacity="0.15"/>
        {/* Base line */}
        <line x1="5" y1="36" x2="39" y2="36" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>

      <div style={{ lineHeight: 1.1 }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: size * 0.38,
          color: C.goldLight,
          letterSpacing: "0.07em",
        }}>KALVI</div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 400,
          fontSize: size * 0.29,
          color: C.gold,
          letterSpacing: "0.12em",
        }}>THAERVU</div>
      </div>
    </div>
  );
}
