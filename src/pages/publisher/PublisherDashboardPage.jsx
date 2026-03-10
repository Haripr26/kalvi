import { useState } from "react";
import Logo from "../../components/common/Logo";
import { C } from "../../utils/constants";

const SIDEBAR = [
  ["dashboard","📊","Dashboard"],
  ["upload",   "📤","Upload Questions"],
  ["exams",    "📋","My Exams"],
  ["earnings", "💰","Earnings"],
];

const MY_EXAMS = [
  { title: "TNPSC Group 2 — Indian History",  attempts: 2400, status: "live",   earned: "₹1,200" },
  { title: "TNPSC Group 4 — Tamil Language",  attempts: 3200, status: "live",   earned: "₹1,600" },
  { title: "Aptitude Practice Set Vol.1",      attempts: 820,  status: "review", earned: "₹0"      },
  { title: "Current Affairs Jan 2025",         attempts: 1001, status: "live",   earned: "₹500"    },
];

function Overview({ setTab }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 26 }}>
        {[["📝","Questions Uploaded","342"],["🎯","Exams Created","14"],["👥","Total Attempts","8,421"],["💰","Total Earned","₹4,210"]].map(([ic,lb,vl])=>(
          <div key={lb} className="stat-card"><div className="stat-icon">{ic}</div><div className="stat-value">{vl}</div><div className="stat-label">{lb}</div></div>
        ))}
      </div>
      <div className="card" style={{ padding: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: C.maroon }}>My Exams Overview</h3>
          <button className="btn-gold" style={{ padding: "7px 18px", fontSize: 12 }} onClick={() => setTab("upload")}>+ New Exam</button>
        </div>
        <table className="data-table">
          <thead><tr>{["Exam Title","Attempts","Status","Earned","Action"].map(h=><th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {MY_EXAMS.map(e=>(
              <tr key={e.title}>
                <td style={{ fontWeight: 500 }}>{e.title}</td>
                <td>{e.attempts.toLocaleString()}</td>
                <td><span className={`badge badge-${e.status}`}>{e.status === "live" ? "✅ Live" : "🔄 Under Review"}</span></td>
                <td style={{ fontWeight: 700, color: C.success }}>{e.earned}</td>
                <td><button className="btn-ghost" style={{ color: C.gold, fontSize: 12, fontFamily: "'Lato',sans-serif" }}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 18, background: "rgba(46,125,50,0.07)", border: "1px solid rgba(46,125,50,0.22)", borderRadius: 10, padding: "12px 16px", fontFamily: "'Lato',sans-serif", fontSize: 13, color: C.textMuted }}>
          💡 Minimum <strong>1,000 completed attempts</strong> required per exam for payout · <strong style={{ color: C.maroon }}>₹0.50 per attempt</strong>
        </div>
      </div>
    </>
  );
}

function UploadQuestions() {
  const [method, setMethod] = useState("manual");
  const [form, setForm] = useState({ question: "", opts: ["","","",""], correct: 0, category: "TNPSC Group 2", section: "General Studies" });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: C.goldLight, marginBottom: 22 }}>Upload Questions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 26 }}>
        {[["⌨️","Type Manually","manual"],["📷","OCR Scan","ocr"],["📁","Bulk CSV/Excel","bulk"],["🖼️","Image MCQ","image"]].map(([ic,t,k])=>(
          <div key={k} className="card" style={{ padding: 20, cursor: "pointer", textAlign: "center", border: `2px solid ${method===k ? C.gold : "rgba(201,146,42,0.2)"}`, transition: "all 0.2s" }}
            onClick={() => setMethod(k)}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>{ic}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: C.maroon, fontSize: 14 }}>{t}</div>
          </div>
        ))}
      </div>
      {method === "manual" && (
        <div className="card" style={{ padding: 30 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: C.maroon, marginBottom: 20 }}>Add Question Manually</h3>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Question Text</label>
            <textarea className="input-field" rows={3} placeholder="Enter the question here..." value={form.question} onChange={e => setForm({...form, question: e.target.value})} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Answer Options</label>
            {["A","B","C","D"].map((l,i)=>(
              <div key={l} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: form.correct===i ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : "rgba(201,146,42,0.1)", border: `2px solid ${form.correct===i ? C.gold : "rgba(201,146,42,0.25)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 13, color: form.correct===i ? C.maroonDeep : C.gold, flexShrink: 0, cursor: "pointer" }} onClick={() => setForm({...form, correct: i})}>{l}</div>
                <input className="input-field" placeholder={`Option ${l}`} value={form.opts[i]} onChange={e => { const o=[...form.opts]; o[i]=e.target.value; setForm({...form,opts:o}); }} />
                {form.correct===i && <span style={{ color: C.success, fontSize: 12, fontFamily: "'Lato',sans-serif", whiteSpace: "nowrap" }}>✓ Correct</span>}
              </div>
            ))}
            <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif" }}>Click the letter circle to mark the correct answer.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            {[["Exam Category","category",["TNPSC Group 1","TNPSC Group 2","TNPSC Group 4","UPSC","Banking","SSC"]],["Section","section",["General Studies","Indian History","Geography","Tamil","Current Affairs","Aptitude","Polity"]]].map(([lb,k,opts])=>(
              <div key={k}>
                <label style={{ display: "block", fontSize: 11, color: C.textMuted, fontFamily: "'Lato',sans-serif", fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lb}</label>
                <select className="input-field" value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button className="btn-gold" style={{ width: "100%", padding: "12px" }} onClick={save}>
            {saved ? "✅ Question Saved!" : "+ Save Question"}
          </button>
        </div>
      )}
      {method !== "manual" && (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>{method==="ocr"?"📷":method==="bulk"?"📁":"🖼️"}</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: C.maroon, marginBottom: 8 }}>
            {method==="ocr"?"OCR Question Scanner":method==="bulk"?"Bulk Upload (CSV/Excel)":"Image-Based MCQ Upload"}
          </h3>
          <p style={{ color: C.textMuted, fontFamily: "'Lato',sans-serif", fontSize: 14, marginBottom: 22 }}>This feature is available in the full deployment. Drag & drop your files here.</p>
          <div style={{ border: `2px dashed rgba(201,146,42,0.35)`, borderRadius: 12, padding: "32px 40px", background: "rgba(201,146,42,0.04)" }}>
            <p style={{ color: C.gold, fontFamily: "'Lato',sans-serif", fontSize: 14 }}>📂 Drag files here or click to upload</p>
          </div>
        </div>
      )}
    </>
  );
}

function Earnings() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 24 }}>
        {[["💰","Total Earned","₹4,210"],["⏳","Pending Payout","₹1,200"],["✅","Paid Out","₹3,010"]].map(([ic,lb,vl])=>(
          <div key={lb} className="stat-card"><div className="stat-icon">{ic}</div><div className="stat-value">{vl}</div><div className="stat-label">{lb}</div></div>
        ))}
      </div>
      <div className="card" style={{ padding: 28 }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: C.maroon, marginBottom: 18 }}>Revenue Breakdown</h3>
        <table className="data-table">
          <thead><tr>{["Exam","Attempts","Rate","Earned"].map(h=><th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {MY_EXAMS.filter(e=>e.status==="live").map(e=>(
              <tr key={e.title}>
                <td style={{fontWeight:500}}>{e.title}</td>
                <td>{e.attempts.toLocaleString()}</td>
                <td>₹0.50/attempt</td>
                <td style={{fontWeight:700,color:C.success}}>{e.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 18, background: "rgba(201,146,42,0.07)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: 10, padding: "14px 18px" }}>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: C.text, marginBottom: 6, fontWeight: 600 }}>💡 Publisher Revenue Model</div>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
            Earn <strong>₹0.50 per completed user attempt</strong> after minimum 1,000 attempts per exam.<br/>
            Payouts processed on the 1st of every month via bank transfer / UPI.<br/>
            Sharpened Mind Tech earns via ad revenue and platform margin.
          </div>
        </div>
      </div>
    </>
  );
}

export default function PublisherDashboardPage({ setPage }) {
  const [tab, setTab] = useState("dashboard");

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg,${C.maroonDeep},#200A12)`, paddingTop: 64, display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 224, background: "rgba(0,0,0,0.45)", borderRight: `1px solid rgba(201,146,42,0.2)`, padding: "28px 14px", flexShrink: 0 }}>
        <div style={{ marginBottom: 28 }}><Logo size={30} /></div>
        <div style={{ fontSize: 10, color: "rgba(245,230,200,0.35)", fontFamily: "'Lato',sans-serif", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Publisher Panel</div>
        {SIDEBAR.map(([k,ic,lb]) => (
          <button key={k} className={`sidebar-btn ${tab===k?"active":""}`} onClick={() => setTab(k)}>
            <span style={{ fontSize: 16 }}>{ic}</span> {lb}
          </button>
        ))}
        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <button className="btn-ghost" onClick={() => setPage("home")}
            style={{ color: "rgba(245,230,200,0.4)", fontSize: 12, fontFamily: "'Lato',sans-serif", width: "100%", textAlign: "left", padding: "8px 14px" }}>
            ← Back to Site
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "36px 36px", overflowY: "auto" }} className="page-enter">
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: C.goldLight, marginBottom: 26 }}>
          {tab === "dashboard" ? "Publisher Dashboard" : tab === "upload" ? "Upload Questions" : tab === "exams" ? "My Exams" : "Earnings"}
        </h2>
        {tab === "dashboard" && <Overview setTab={setTab} />}
        {tab === "upload"    && <UploadQuestions />}
        {tab === "exams"     && <Overview setTab={setTab} />}
        {tab === "earnings"  && <Earnings />}
      </div>
    </div>
  );
}
