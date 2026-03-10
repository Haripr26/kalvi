import { useState } from "react";
import Logo from "../../components/common/Logo";
import { C } from "../../utils/constants";

const SIDEBAR = [
  ["overview","📊","Overview"],
  ["content", "✅","Content Review"],
  ["users",   "👥","Users"],
  ["payout",  "💸","Payouts"],
];

const PENDING = [
  { publisher: "Rajan Kumar",        exam: "TNPSC History Set",       count: 12, status: "Pending" },
  { publisher: "Priya Publications", exam: "UPSC Economy MCQs",       count: 25, status: "Pending" },
  { publisher: "Tamil Academy",      exam: "Banking Aptitude Set",    count: 40, status: "Review"  },
  { publisher: "StudyEdge",          exam: "Current Affairs Mar 2025",count: 18, status: "Pending" },
];

const ACTIVITY = [
  { name: "Priya K.",  exam: "TNPSC Group 2", score: "78%", time: "2 min ago"  },
  { name: "Ramu S.",   exam: "Banking Prelims", score: "65%", time: "8 min ago"  },
  { name: "Anitha M.", exam: "UPSC Prelims",    score: "71%", time: "15 min ago" },
  { name: "Karthik R.",exam: "TNPSC Group 4",  score: "83%", time: "22 min ago" },
];

const PAYOUTS = [
  { publisher: "Rajan Kumar",        attempts: "2,400", amount: "₹1,200", status: "eligible"  },
  { publisher: "Priya Publications", attempts: "3,200", amount: "₹1,600", status: "eligible"  },
  { publisher: "StudyEdge",          attempts: "1,100", amount: "₹550",   status: "eligible"  },
  { publisher: "Tamil Academy",      attempts: "820",   amount: "₹0",     status: "below"     },
];

const USERS = [
  { name: "Priya K.",    email: "priya@mail.com",   role: "student",   joined: "Mar 1, 2025",  status: "active"    },
  { name: "Ramu S.",     email: "ramu@mail.com",    role: "student",   joined: "Feb 22, 2025", status: "active"    },
  { name: "Rajan Kumar", email: "rajan@pub.com",    role: "publisher", joined: "Jan 15, 2025", status: "active"    },
  { name: "Test User",   email: "test@mail.com",    role: "student",   joined: "Mar 8, 2025",  status: "suspended" },
];

export default function AdminDashboardPage({ setPage }) {
  const [tab, setTab] = useState("overview");

  const titles = { overview: "Platform Overview", content: "Content Moderation", users: "User Management", payout: "Payout Management" };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg,${C.maroonDeep},#200A12)`, paddingTop: 64, display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 224, background: "rgba(0,0,0,0.5)", borderRight: `1px solid rgba(201,146,42,0.2)`, padding: "28px 14px", flexShrink: 0 }}>
        <div style={{ marginBottom: 28 }}><Logo size={30} /></div>
        <div style={{ fontSize: 10, color: "rgba(245,230,200,0.35)", fontFamily: "'Lato',sans-serif", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Admin Panel</div>
        {SIDEBAR.map(([k,ic,lb]) => (
          <button key={k} className={`sidebar-btn ${tab===k?"active":""}`} onClick={() => setTab(k)}>
            <span style={{ fontSize: 16 }}>{ic}</span> {lb}
          </button>
        ))}
        <div style={{ marginTop: 24 }}>
          <button className="btn-ghost" onClick={() => setPage("home")} style={{ color: "rgba(245,230,200,0.4)", fontSize: 12, fontFamily: "'Lato',sans-serif", width: "100%", textAlign: "left", padding: "8px 14px" }}>← Back to Site</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "36px 36px", overflowY: "auto" }} className="page-enter">
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: C.goldLight, marginBottom: 26 }}>{titles[tab]}</h2>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 26 }}>
              {[["👥","Total Users","12,481"],["📝","Active Exams","186"],["📊","Today's Attempts","2,341"],["💰","Revenue (Mar)","₹18,420"]].map(([ic,lb,vl])=>(
                <div key={lb} className="stat-card"><div className="stat-icon">{ic}</div><div className="stat-value">{vl}</div><div className="stat-label">{lb}</div></div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: C.maroon, marginBottom: 16 }}>Pending Content Reviews</h3>
                {PENDING.slice(0,3).map(p=>(
                  <div key={p.exam} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid rgba(201,146,42,0.1)" }}>
                    <div>
                      <div style={{fontFamily:"'Lato',sans-serif",fontSize:13,fontWeight:600,color:C.text}}>{p.exam}</div>
                      <div style={{fontSize:11,color:C.textMuted,fontFamily:"'Lato',sans-serif"}}>by {p.publisher} · {p.count} questions</div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button style={{background:"rgba(46,125,50,0.1)",border:"1px solid rgba(46,125,50,0.3)",borderRadius:6,padding:"4px 10px",color:C.success,cursor:"pointer",fontSize:11,fontFamily:"'Lato',sans-serif"}}>✅ Approve</button>
                      <button style={{background:"rgba(198,40,40,0.1)",border:"1px solid rgba(198,40,40,0.3)",borderRadius:6,padding:"4px 10px",color:C.error,cursor:"pointer",fontSize:11,fontFamily:"'Lato',sans-serif"}}>❌ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: C.maroon, marginBottom: 16 }}>Live Activity</h3>
                {ACTIVITY.map(a=>(
                  <div key={a.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(201,146,42,0.1)"}}>
                    <div>
                      <div style={{fontFamily:"'Lato',sans-serif",fontSize:13,fontWeight:600,color:C.text}}>{a.name}</div>
                      <div style={{fontSize:11,color:C.textMuted,fontFamily:"'Lato',sans-serif"}}>{a.exam}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:C.gold}}>{a.score}</div>
                      <div style={{fontSize:10,color:"rgba(245,230,200,0.35)",fontFamily:"'Lato',sans-serif"}}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── CONTENT ── */}
        {tab === "content" && (
          <div className="card" style={{ padding: 28 }}>
            <table className="data-table">
              <thead><tr>{["Publisher","Exam","Questions","Status","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {PENDING.map(p=>(
                  <tr key={p.exam}>
                    <td style={{fontWeight:500}}>{p.publisher}</td>
                    <td>{p.exam}</td>
                    <td>{p.count}</td>
                    <td><span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span></td>
                    <td>
                      <div style={{display:"flex",gap:6}}>
                        <button style={{background:"rgba(46,125,50,0.1)",border:"1px solid rgba(46,125,50,0.3)",borderRadius:6,padding:"5px 12px",color:C.success,cursor:"pointer",fontSize:11,fontFamily:"'Lato',sans-serif",fontWeight:600}}>✅ Approve</button>
                        <button style={{background:"rgba(198,40,40,0.1)",border:"1px solid rgba(198,40,40,0.3)",borderRadius:6,padding:"5px 12px",color:C.error,cursor:"pointer",fontSize:11,fontFamily:"'Lato',sans-serif",fontWeight:600}}>❌ Reject</button>
                        <button style={{background:"rgba(201,146,42,0.1)",border:"1px solid rgba(201,146,42,0.3)",borderRadius:6,padding:"5px 12px",color:C.gold,cursor:"pointer",fontSize:11,fontFamily:"'Lato',sans-serif",fontWeight:600}}>👁 Preview</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === "users" && (
          <div className="card" style={{ padding: 28 }}>
            <div style={{ marginBottom: 18 }}>
              <input className="input-field" placeholder="🔍  Search users by name or email..." style={{ maxWidth: 360 }}/>
            </div>
            <table className="data-table">
              <thead><tr>{["Name","Email","Role","Joined","Status","Action"].map(h=><th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {USERS.map(u=>(
                  <tr key={u.email}>
                    <td style={{fontWeight:600}}>{u.name}</td>
                    <td style={{color:C.textMuted}}>{u.email}</td>
                    <td><span className={`badge ${u.role==="publisher"?"badge-premium":"badge-free"}`}>{u.role}</span></td>
                    <td>{u.joined}</td>
                    <td><span className={`badge ${u.status==="active"?"badge-live":"badge-review"}`}>{u.status}</span></td>
                    <td>
                      <button style={{background:"rgba(198,40,40,0.08)",border:"1px solid rgba(198,40,40,0.25)",borderRadius:6,padding:"4px 10px",color:C.error,cursor:"pointer",fontSize:11,fontFamily:"'Lato',sans-serif"}}>
                        {u.status==="suspended"?"Restore":"Suspend"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── PAYOUT ── */}
        {tab === "payout" && (
          <div className="card" style={{ padding: 28 }}>
            <div style={{ marginBottom: 18, background: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.2)", borderRadius: 10, padding: "12px 18px", fontFamily: "'Lato',sans-serif", fontSize: 13, color: C.textMuted }}>
              💰 Publishers with 1,000+ completed attempts are eligible for payout at <strong>₹0.50 per attempt</strong>. Payouts processed on the 1st of every month.
            </div>
            <table className="data-table">
              <thead><tr>{["Publisher","Attempts","Amount","Eligibility","Action"].map(h=><th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {PAYOUTS.map(p=>(
                  <tr key={p.publisher}>
                    <td style={{fontWeight:600}}>{p.publisher}</td>
                    <td>{p.attempts}</td>
                    <td style={{fontWeight:700,color:p.status==="eligible"?C.success:C.textMuted}}>{p.amount}</td>
                    <td>
                      <span className={`badge ${p.status==="eligible"?"badge-live":"badge-review"}`}>
                        {p.status==="eligible"?"✅ Eligible":"Below Threshold"}
                      </span>
                    </td>
                    <td>
                      {p.status==="eligible"
                        ? <button className="btn-gold" style={{padding:"6px 16px",fontSize:12}}>Pay Now</button>
                        : <span style={{color:C.textMuted,fontSize:12,fontFamily:"'Lato',sans-serif"}}>—</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
