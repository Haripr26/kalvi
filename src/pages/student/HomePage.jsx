import Mandala from "../../components/common/Mandala";
import Logo    from "../../components/common/Logo";
import { C }  from "../../utils/constants";

const FEATURES = [
  { icon: "🛡️", title: "Real Exam Simulation",    desc: "Full-screen secure mode, tab-lock detection, keyboard disable & auto-submit — exactly like the real government exam." },
  { icon: "📊", title: "Deep Performance Analytics", desc: "Section-wise scores, time-per-question analysis, rank among all peers, and AI-powered improvement suggestions." },
  { icon: "🎯", title: "Official Syllabus Only",    desc: "All MCQs verified against TNPSC / UPSC official syllabi by certified publisher network before going live." },
  { icon: "💰", title: "Free First Attempt",        desc: "Your first attempt is always free with a 30-second ad. Re-attempts via ads or affordable premium subscription." },
  { icon: "🌐", title: "Multi-Language Support",    desc: "Full bilingual support in Tamil and English across all exam categories, UI, and question content." },
  { icon: "📱", title: "Any Device, Secure Session",desc: "Attempt on mobile, tablet, or desktop. One-device login policy ensures session security and exam integrity." },
];

const STATS = [
  { value: "10,000+", label: "Active Students"     },
  { value: "500+",    label: "Mock Tests Available" },
  { value: "₹0.50",  label: "Earned Per Attempt"   },
  { value: "98%",     label: "Syllabus Coverage"    },
];

export default function HomePage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg, ${C.maroonDeep} 0%, ${C.maroon} 55%, ${C.maroonDark} 100%)`, position: "relative", overflow: "hidden", paddingTop: 64 }}>
      <Mandala size={600} style={{ top: -120, left: -120 }} />
      <Mandala size={360} style={{ bottom: 60, right: -60 }} />

      {/* ── HERO ── */}
      <div className="page-enter" style={{ display: "flex", alignItems: "center", minHeight: "calc(100vh - 64px)", padding: "48px 60px", gap: 60 }}>

        {/* Left copy */}
        <div style={{ flex: 1, maxWidth: 580 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,146,42,0.14)",
            border: `1px solid rgba(201,146,42,0.3)`,
            borderRadius: 30, padding: "6px 20px", marginBottom: 26,
          }}>
            <span style={{ color: C.goldLight, fontSize: 12, fontFamily: "'Lato',sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
              TNPSC · UPSC · SSC · BANKING · RAILWAYS
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 58, fontWeight: 900,
            color: C.goldLight, lineHeight: 1.15, marginBottom: 14,
          }}>
            Kalvi Thaervu
          </h1>
          <p style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 22, color: C.goldPale, marginBottom: 18, fontStyle: "italic",
          }}>
            Your First Step Towards a Government Career
          </p>
          <p style={{
            color: "rgba(245,230,200,0.65)", fontSize: 15,
            fontFamily: "'Lato',sans-serif", lineHeight: 1.85, marginBottom: 40,
          }}>
            Authentic mock tests with real exam discipline — full-screen mode, timers, negative marking, 
            and instant performance analytics. Built for serious aspirants in Tamil Nadu and across India.
          </p>


          {/* Stats */}
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: C.goldLight }}>{value}</div>
                <div style={{ fontSize: 11, color: "rgba(245,230,200,0.55)", fontFamily: "'Lato',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ background: "rgba(0,0,0,0.35)", padding: "64px 60px", borderTop: `1px solid rgba(201,146,42,0.12)` }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, color: C.goldLight, marginBottom: 10 }}>
            Why Choose Kalvi Thaervu?
          </h2>
          <p style={{ color: "rgba(245,230,200,0.55)", fontFamily: "'Lato',sans-serif", fontSize: 14 }}>
            Everything a serious government exam aspirant needs — in one platform.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, maxWidth: 960, margin: "0 auto" }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card" style={{ padding: 26, transition: "transform 0.22s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: 34, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: C.maroon, fontSize: 15, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: C.textMuted, fontSize: 13, fontFamily: "'Lato',sans-serif", lineHeight: 1.75 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BAND ── */}
      <div style={{
        background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonDark})`,
        padding: "56px 60px", textAlign: "center",
        borderTop: `1px solid rgba(201,146,42,0.15)`,
      }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: C.goldLight, marginBottom: 10 }}>
          Ready to Start Your Preparation?
        </h2>
        <p style={{ color: "rgba(245,230,200,0.6)", fontFamily: "'Lato',sans-serif", fontSize: 14, marginBottom: 32 }}>
          Join 10,000+ aspirants already preparing on Kalvi Thaervu. It's free to get started.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button className="btn-gold" onClick={() => setPage("register")} style={{ fontSize: 16, padding: "14px 44px" }}>
            Start Free Today
          </button>
          <button className="btn-outline" onClick={() => setPage("exams")}>
            View All Exams
          </button>
        </div>
      </div>
    </div>
  );
}
