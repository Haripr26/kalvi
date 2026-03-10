import Logo    from "../../components/common/Logo";
import Mandala from "../../components/common/Mandala";
import { C } from "../../utils/constants";

const PILLARS = [
  { icon: "🎯", title: "Our Mission",      text: "Provide affordable, authentic exam preparation to rural and Tier 2/3 students across Tamil Nadu and India — levelling the playing field for all aspirants." },
  { icon: "🌟", title: "Our Vision",       text: "Scale · Quality · Trust. Build India's most trusted digital ecosystem for government exam preparation, connecting students, publishers, and recruiters." },
  { icon: "🎓", title: "For Students",     text: "Free first attempt via ads. Real exam discipline with secure browser mode. Instant performance analytics. Personalised improvement path powered by AI." },
  { icon: "📚", title: "For Publishers",   text: "Upload quality MCQs and earn ₹0.50 per completed attempt after the 1,000 attempts threshold. Monthly payouts, transparent earnings dashboard." },
];

const ROADMAP = [
  { phase: "Phase 1", status: "Live",     items: ["TNPSC Mock Engine","Publisher Dashboard","Ad Unlock System","Real Exam Simulation"] },
  { phase: "Phase 2", status: "Soon",     items: ["AI Performance Analysis","Personalised Weak-Area Practice","Leaderboards","Regional Language Support"] },
  { phase: "Phase 3", status: "Planned",  items: ["Offline Mode","College Partnerships","Government Coaching Tie-Ups","Recruiter Access"] },
];

export default function AboutPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${C.maroonDeep},${C.maroon})`, paddingTop: 64, position: "relative", overflow: "hidden" }}>
      <Mandala size={500} style={{ top: 0, right: -100 }} />
      <Mandala size={300} style={{ bottom: 100, left: -60 }} />

      <div className="page-enter" style={{ maxWidth: 840, margin: "0 auto", padding: "56px 24px 64px", position: "relative", zIndex: 1 }}>

        <h1 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", fontSize: 38, color: C.goldLight, marginBottom: 8 }}>About Us</h1>
        <p style={{ textAlign: "center", color: "rgba(245,230,200,0.55)", fontFamily: "'Lato',sans-serif", marginBottom: 48, fontSize: 14 }}>
          Kalvi Thaervu &amp; Sharpened Mind Tech &amp; Solutions Pvt. Ltd.
        </p>

        {/* Brand Card */}
        <div className="card" style={{ padding: 36, marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 22 }}>
            <Logo size={58} />
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: C.maroon }}>Kalvi Thaervu</h2>
              <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 13, marginTop: 3 }}>
                A proprietary product of <strong>Sharpened Mind Tech &amp; Solutions Pvt. Ltd.</strong>
              </p>
            </div>
          </div>
          <p style={{ fontFamily: "'Lato',sans-serif", color: C.text, lineHeight: 1.85, fontSize: 14, marginBottom: 14 }}>
            Kalvi Thaervu is an AI-enabled government exam mock test platform designed to simulate real TNPSC, UPSC, Banking, and SSC exam environments. We connect aspirants, content publishers, and recruiters in a comprehensive digital examination ecosystem.
          </p>
          <p style={{ fontFamily: "'Lato',sans-serif", color: C.textMuted, lineHeight: 1.85, fontSize: 14 }}>
            Our platform is not just a mock test website — it is a carefully architected digital examination ecosystem built on three pillars: <strong>Scale</strong>, <strong>Quality</strong>, and <strong>Trust</strong>. Every feature, from real exam simulation to publisher revenue sharing, is designed with the aspirant's success in mind.
          </p>
        </div>

        {/* Mission / Vision / For Students / For Publishers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 26 }}>
          {PILLARS.map(p => (
            <div key={p.title} className="card" style={{ padding: 26, transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: 34, marginBottom: 12 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: C.maroon, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: C.textMuted, fontSize: 13, fontFamily: "'Lato',sans-serif", lineHeight: 1.75 }}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="card" style={{ padding: 30, marginBottom: 26 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: C.maroon, marginBottom: 24 }}>
            Product Roadmap
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {ROADMAP.map(r => {
              const statusColor = r.status==="Live" ? C.success : r.status==="Soon" ? C.gold : C.textMuted;
              return (
                <div key={r.phase} style={{ background: "rgba(201,146,42,0.05)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: C.maroon, fontSize: 14 }}>{r.phase}</span>
                    <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: `${statusColor}18`, color: statusColor, fontFamily: "'Lato',sans-serif", fontWeight: 700, border: `1px solid ${statusColor}44` }}>{r.status}</span>
                  </div>
                  <ul style={{ listStyle: "none" }}>
                    {r.items.map(item => (
                      <li key={item} style={{ fontSize: 12, color: C.textMuted, fontFamily: "'Lato',sans-serif", lineHeight: 1.6, display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 5 }}>
                        <span style={{ color: r.status==="Live" ? C.success : C.gold, marginTop: 2, flexShrink: 0 }}>{r.status==="Live" ? "✓" : "○"}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ownership */}
        <div className="card" style={{ padding: 28, textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: C.maroon, marginBottom: 12 }}>Ownership &amp; IP</h3>
          <p style={{ fontFamily: "'Lato',sans-serif", color: C.textMuted, fontSize: 13, lineHeight: 1.9 }}>
            Kalvi Thaervu is a proprietary product of <strong style={{ color: C.maroon }}>Sharpened Mind Tech &amp; Solutions Private Limited</strong>.<br/>
            Directed by <strong style={{ color: C.maroon }}>Durga Devi M</strong>, Director &amp; CEO.<br/>
            All intellectual property, platform logic, and monetisation rights remain solely with Sharpened Mind Tech.<br/>
            Built on the <strong>MERN Stack</strong> (MongoDB · Express · React · Node.js).
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 24 }}>
            <button className="btn-gold" onClick={() => setPage("register")}>Get Started Free</button>
            <button className="btn-outline" onClick={() => setPage("exams")}>Browse Exams</button>
          </div>
        </div>
      </div>
    </div>
  );
}
