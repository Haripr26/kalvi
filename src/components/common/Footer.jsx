import Logo from "./Logo";
import { C } from "../../utils/constants";

const COLS = [
  {
    title: "Quick Links",
    links: [["home","Home"],["exams","Exams"],["about","About Us"],["register","Register"]],
  },
  {
    title: "For Publishers",
    links: [["publisher-login","Publisher Login"],["publisher-dashboard","Dashboard"],["about","Revenue Model"]],
  },
  {
    title: "Support",
    links: [["about","Help Center"],["about","Terms & Conditions"],["about","Privacy Policy"],["about","Contact Us"]],
  },
];

export default function Footer({ setPage }) {
  return (
    <footer style={{
      background: C.maroonDeep,
      borderTop: `1px solid rgba(201,146,42,0.18)`,
      padding: "48px 48px 24px",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36, marginBottom: 36 }}>
        {/* Brand */}
        <div>
          <Logo size={38} />
          <p style={{
            color: "rgba(245,230,200,0.45)", fontSize: 12,
            fontFamily: "'Lato',sans-serif", marginTop: 14, lineHeight: 1.85,
          }}>
            AI-enabled mock test platform for TNPSC, UPSC, Banking & SSC aspirants.
            Authentic exam simulation for serious preparation.
            A product of <strong style={{ color: "rgba(245,230,200,0.65)" }}>Sharpened Mind Tech & Solutions Pvt. Ltd.</strong>
          </p>
        </div>

        {/* Nav Columns */}
        {COLS.map(col => (
          <div key={col.title}>
            <div style={{
              color: C.goldLight, fontFamily: "'Playfair Display',serif",
              fontWeight: 700, fontSize: 13, marginBottom: 14,
            }}>{col.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {col.links.map(([pg, label]) => (
                <button
                  key={label}
                  onClick={() => setPage(pg)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(245,230,200,0.5)", fontFamily: "'Lato',sans-serif",
                    fontSize: 12, textAlign: "left", transition: "color 0.2s",
                    padding: 0,
                  }}
                  onMouseEnter={e => e.target.style.color = C.goldLight}
                  onMouseLeave={e => e.target.style.color = "rgba(245,230,200,0.5)"}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(201,146,42,0.12)", paddingTop: 22,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ color: "rgba(245,230,200,0.35)", fontSize: 11, fontFamily: "'Lato',sans-serif" }}>
          © 2025 Sharpened Mind Tech & Solutions Private Limited. All rights reserved.
          Directed by <strong style={{ color: "rgba(245,230,200,0.55)" }}>Durga Devi M</strong>, Director & CEO.
        </span>
        <span style={{ color: C.gold, fontSize: 11, fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>
          "Excellence Today, Bright Future Tomorrow."
        </span>
      </div>
    </footer>
  );
}
