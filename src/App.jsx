import { useState, useEffect, useRef } from "react";

const UPI_ID = "krishna798307@okaxis";
const UPI_NAME = "Krishna Vouchers";

const certs = [
  {
    id: "ccp", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational",
    price: 5000, color: "#FF9900", accent: "#FFB84D", icon: "☁️", badge: "ENTRY",
    desc: "Start your AWS journey. Validate cloud fluency and foundational AWS knowledge.",
    topics: ["Cloud Concepts", "Security", "Technology", "Billing & Pricing"],
  },
  {
    id: "saa", code: "SAA-C03", name: "Solutions Architect", level: "Associate",
    price: 7000, color: "#00A1C9", accent: "#4DC8E8", icon: "🏗️", badge: "ASSOCIATE",
    desc: "Design resilient, high-performing architectures on AWS at scale.",
    topics: ["Architecture Design", "Compute", "Storage", "Databases"],
  },
  {
    id: "devops", code: "DOP-C02", name: "DevOps Engineer", level: "Professional",
    price: 7000, color: "#E84855", accent: "#FF7B84", icon: "⚙️", badge: "PRO",
    desc: "Implement and manage continuous delivery pipelines on AWS.",
    topics: ["CI/CD", "Monitoring", "Infrastructure as Code", "Policies"],
  },
  {
    id: "aip", code: "AIF-C01", name: "AI Practitioner", level: "Foundational",
    price: 5000, color: "#8B5CF6", accent: "#A78BFA", icon: "🤖", badge: "NEW",
    desc: "Understand AI/ML concepts and AWS AI services fundamentals.",
    topics: ["Generative AI", "ML Concepts", "AWS AI Services", "Responsible AI"],
  },
];

function QRCanvas({ data, size = 200 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    import("qrcode").then((QRCode) => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, data, {
          width: size, margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        });
      }
    });
  }, [data, size]);
  return (
    <div style={{ padding: 14, background: "#fff", borderRadius: 18, border: "3px solid rgba(255,153,0,0.4)", boxShadow: "0 0 50px rgba(255,153,0,0.2)", display: "inline-block" }}>
      <canvas ref={canvasRef} style={{ display: "block", borderRadius: 8 }} />
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy} style={{
      background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
      border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.12)"}`,
      color: copied ? "#22C55E" : "rgba(255,255,255,0.5)",
      borderRadius: 8, padding: "5px 12px", cursor: "pointer",
      fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, transition: "all 0.2s",
    }}>
      {copied ? "✓ Copied!" : "Copy UPI ID"}
    </button>
  );
}

function PaymentModal({ total, added, onClose }) {
  const note = added.map(id => certs.find(c => c.id === id)?.code).join("+") + " Voucher";
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${total}&cu=INR&tn=${encodeURIComponent(note)}`;
  const apps = [
    { name: "Google Pay", color: "#4285F4", letter: "G", url: upiUrl },
    { name: "PhonePe", color: "#5f259f", letter: "P", url: upiUrl },
    { name: "Paytm", color: "#00B9F1", letter: "₱", url: upiUrl },
    { name: "Any UPI App", color: "#FF9900", letter: "↗", url: upiUrl },
  ];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "'Syne', sans-serif" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg, #0D1120, #111827)", border: "1px solid rgba(255,153,0,0.25)", borderRadius: 28, padding: "28px 20px", maxWidth: 420, width: "100%", position: "relative", boxShadow: "0 0 80px rgba(255,153,0,0.12)", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 3, marginBottom: 6, textTransform: "uppercase" }}>Pay Amount</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#FF9900", fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>₹{total.toLocaleString()}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono',monospace" }}>{UPI_ID}</span>
            <CopyButton text={UPI_ID} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 2 }}>SCAN QR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <QRCanvas data={upiUrl} size={180} />
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "'JetBrains Mono',monospace", marginBottom: 22 }}>
          PhonePe / GPay / Paytm / BHIM — sab kaam karenge
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 2 }}>OR TAP TO OPEN</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
          {apps.map(app => (
            <a key={app.name} href={app.url} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 12px", textDecoration: "none", color: "#fff" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: app.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff" }}>{app.letter}</div>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{app.name}</span>
            </a>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 2, marginBottom: 8 }}>SELECTED VOUCHERS</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {added.map(id => {
              const c = certs.find(c => c.id === id);
              return <span key={id} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, padding: "4px 10px", borderRadius: 20, background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}44` }}>{c.code} — ₹{c.price.toLocaleString()}</span>;
            })}
          </div>
        </div>
        <div style={{ padding: "11px 14px", background: "rgba(255,153,0,0.06)", borderRadius: 10, border: "1px solid rgba(255,153,0,0.12)" }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.7, textAlign: "center" }}>
            💬 Payment ke baad screenshot WhatsApp ya email pe bhejo<br />Voucher 24hrs ke andar milega ✅
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [added, setAdded] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const contactRef = useRef(null);

  const handleAdd = (id) => setAdded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const total = added.reduce((sum, id) => { const c = certs.find(c => c.id === id); return sum + (c ? c.price : 0); }, 0);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", fontFamily: "'Syne', sans-serif", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(rgba(255,153,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.04) 1px, transparent 1px); background-size: 48px 48px; }
        .glow-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }

        /* Navbar */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 150;
          background: rgba(10,14,26,0.85); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 40px; height: 60px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo { display: flex; align-items: center; gap: 10; }
        .nav-links { display: flex; align-items: center; gap: 8px; }
        .nav-link {
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.55); background: none; border: none;
          cursor: pointer; padding: 7px 14px; border-radius: 8px;
          transition: all 0.2s;
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .nav-contact-btn {
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          color: #000; background: linear-gradient(135deg, #FF9900, #FFB84D);
          border: none; cursor: pointer; padding: 8px 18px; border-radius: 9px;
          transition: all 0.2s; letter-spacing: 0.3px;
        }
        .nav-contact-btn:hover { filter: brightness(1.1); transform: scale(1.03); }

        .cert-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; position: relative; overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .cert-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
        .cert-card.active { border-color: rgba(255,153,0,0.4) !important; box-shadow: 0 0 40px rgba(255,153,0,0.1) !important; }
        .add-btn { border: none; cursor: pointer; border-radius: 10px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; transition: all 0.25s ease; padding: 10px 18px; white-space: nowrap; }
        .add-btn:hover { filter: brightness(1.15); transform: scale(1.03); }
        .tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); }
        .pill { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 600; letter-spacing: 1.5px; padding: 3px 8px; border-radius: 20px; }
        .badge-new { background: linear-gradient(135deg, #8B5CF6, #A78BFA); animation: pulse-badge 2s ease-in-out infinite; }
        @keyframes pulse-badge { 0%,100% { opacity:1 } 50% { opacity:0.65 } }
        .topic-chip { font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 4px 10px; border-radius: 20px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.08); }
        .contact-card { display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px 18px; text-decoration: none; color: #fff; transition: all 0.2s ease; }
        .contact-card:hover { background: rgba(255,153,0,0.07); border-color: rgba(255,153,0,0.3); transform: translateY(-2px); }
        .summary-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(10,14,26,0.96); backdrop-filter: blur(20px); border-top: 1px solid rgba(255,153,0,0.2); padding: 14px 20px; z-index: 100; display: flex; align-items: center; justify-content: space-between; gap: 12px; transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .summary-bar.hidden { transform: translateY(100%); }
        .checkout-btn { background: linear-gradient(135deg, #FF9900, #FFB84D); color: #000; border: none; cursor: pointer; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px; letter-spacing: 0.5px; padding: 13px 24px; border-radius: 12px; transition: all 0.25s ease; white-space: nowrap; flex-shrink: 0; }
        .checkout-btn:hover { transform: scale(1.04); filter: brightness(1.1); }
        .price-num { font-family: 'JetBrains Mono', monospace; font-weight: 600; }

        @media (max-width: 600px) {
          .navbar { padding: 0 16px !important; }
          .nav-link { display: none; }
          .main-wrap { padding: 28px 16px 140px !important; margin-top: 60px !important; }
          .header-title { font-size: 30px !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .card-inner { padding: 20px 16px 18px !important; }
          .card-header-row { flex-direction: column !important; gap: 12px !important; }
          .card-price-block { text-align: left !important; }
          .summary-bar { padding: 12px 16px !important; flex-wrap: wrap; }
          .summary-left { flex: 1; min-width: 0; }
          .summary-right { gap: 12px !important; }
          .summary-total { font-size: 22px !important; }
          .checkout-btn { padding: 11px 18px !important; font-size: 13px !important; }
        }
      `}</style>

      <div className="grid-bg" />
      <div className="glow-orb" style={{ width: 600, height: 600, top: -200, right: -100, background: "rgba(255,153,0,0.07)" }} />
      <div className="glow-orb" style={{ width: 400, height: 400, bottom: 100, left: -100, background: "rgba(0,161,201,0.07)" }} />

      {showPayment && <PaymentModal total={total} added={added} onClose={() => setShowPayment(false)} />}

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-logo">
          <div style={{ background: "linear-gradient(135deg, #FF9900, #FFB84D)", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>☁</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#fff", marginLeft: 8 }}>Krishna <span style={{ color: "#FF9900" }}>Vouchers</span></span>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</button>
          <button className="nav-link" onClick={() => document.getElementById("vouchers")?.scrollIntoView({ behavior: "smooth" })}>Vouchers</button>
          <button className="nav-contact-btn" onClick={scrollToContact}>Contact Us</button>
        </div>
      </nav>

      <div className="main-wrap" style={{ position: "relative", zIndex: 1, padding: "60px 40px", maxWidth: 1100, margin: "0 auto", marginTop: 60, paddingBottom: 130 }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 3, color: "#FF9900", textTransform: "uppercase" }}>Voucher Store</span>
          </div>
          <h1 className="header-title" style={{ fontSize: "clamp(28px,5vw,54px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 14 }}>
            AWS Certification<br /><span style={{ color: "#FF9900" }}>Exam Vouchers</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 480, lineHeight: 1.65, fontWeight: 400 }}>
            Official exam vouchers at fixed prices. Select certifications and pay instantly via UPI — QR or tap.
          </p>
        </div>

        {/* Cards */}
        <div id="vouchers" className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,460px),1fr))", gap: 16 }}>
          {certs.map(cert => {
            const isAdded = added.includes(cert.id);
            return (
              <div key={cert.id} className={`cert-card${isAdded ? " active" : ""}`}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${cert.color},${cert.accent})` }} />
                <div className="card-inner" style={{ padding: "28px 28px 24px" }}>
                  <div className="card-header-row" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, fontSize: 22, flexShrink: 0, background: `linear-gradient(135deg,${cert.color}22,${cert.accent}11)`, border: `1px solid ${cert.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>{cert.icon}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center", flexWrap: "wrap" }}>
                          <span className="tag" style={{ color: cert.color, borderColor: `${cert.color}33` }}>{cert.code}</span>
                          <span className={`pill${cert.id === "aip" ? " badge-new" : ""}`} style={{ background: cert.id === "aip" ? undefined : `${cert.color}22`, color: cert.id === "aip" ? "#fff" : cert.color }}>{cert.badge}</span>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: 15 }}>{cert.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>{cert.level}</div>
                      </div>
                    </div>
                    <div className="card-price-block" style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>VOUCHER PRICE</div>
                      <div className="price-num" style={{ fontSize: 26, fontWeight: 700, color: cert.color }}>₹{cert.price.toLocaleString()}</div>
                    </div>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13.5, lineHeight: 1.65, marginBottom: 16 }}>{cert.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                    {cert.topics.map(t => <span key={t} className="topic-chip">{t}</span>)}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono',monospace" }}>In Stock</span>
                    </div>
                    <button className="add-btn" onClick={() => handleAdd(cert.id)} style={{ background: isAdded ? "rgba(255,255,255,0.08)" : `linear-gradient(135deg,${cert.color},${cert.accent})`, color: isAdded ? "rgba(255,255,255,0.55)" : "#000", border: isAdded ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                      {isAdded ? "✓ Added" : "+ Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Note */}
        <div style={{ marginTop: 32, padding: "16px 20px", background: "rgba(255,153,0,0.05)", border: "1px solid rgba(255,153,0,0.12)", borderRadius: 14, display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.65 }}>
            All vouchers valid for <strong style={{ color: "rgba(255,255,255,0.65)" }}>multiple exam attempts</strong>. Prices in INR. Delivered virtually or physically instantly after payment confirmation.
          </p>
        </div>

        {/* Contact Section */}
        <div ref={contactRef} id="contact" style={{ marginTop: 52, scrollMarginTop: 80 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 3, height: 22, background: "linear-gradient(180deg,#FF9900,#FFB84D)", borderRadius: 4 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Contact Us</h2>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "'JetBrains Mono',monospace", marginBottom: 16 }}>
              Vouchers delivered instantly — no 15-day wait! We also help schedule your exam.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["🏫 In College", "📹 Google Meet", "📧 Gmail", "✈️ Telegram", "💬 WhatsApp"].map(m => (
                <span key={m} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: "5px 12px", borderRadius: 20, background: "rgba(255,153,0,0.08)", color: "#FF9900", border: "1px solid rgba(255,153,0,0.2)" }}>{m}</span>
              ))}
            </div>
          </div>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: 12 }}>
            <a href="tel:+917983073011" className="contact-card">
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📞</div>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, marginBottom: 3 }}>CALL / WHATSAPP</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#22C55E" }}>+91 79830 73011</div>
              </div>
            </a>

            <a href="tel:+917906902480" className="contact-card">
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📞</div>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, marginBottom: 3 }}>CALL / WHATSAPP</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#22C55E" }}>+91 79069 02480</div>
              </div>
            </a>

            <a href="mailto:awscloudvouchers@gmail.com" className="contact-card">
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,153,0,0.15)", border: "1px solid rgba(255,153,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✉️</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, marginBottom: 3 }}>EMAIL</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#FF9900", wordBreak: "break-all" }}>awscloudvouchers@gmail.com</div>
              </div>
            </a>

            <a href="mailto:itispdfly@gmail.com" className="contact-card">
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,153,0,0.15)", border: "1px solid rgba(255,153,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✉️</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, marginBottom: 3 }}>EMAIL</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#FF9900", wordBreak: "break-all" }}>itispdfly@gmail.com</div>
              </div>
            </a>

            <a href="https://t.me/awscloudvouchers" target="_blank" rel="noreferrer" className="contact-card">
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(0,136,204,0.15)", border: "1px solid rgba(0,136,204,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✈️</div>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, marginBottom: 3 }}>TELEGRAM GROUP</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#29B6F6" }}>Join our Group →</div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono',monospace" }}>
            © 2025 Krishna Vouchers · AWS Certification Exam Vouchers
          </p>
        </div>
      </div>

      {/* Summary Bar */}
      <div className={`summary-bar${added.length === 0 ? " hidden" : ""}`}>
        <div className="summary-left">
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", marginBottom: 5 }}>{added.length} VOUCHER{added.length > 1 ? "S" : ""} SELECTED</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {added.map(id => { const c = certs.find(c => c.id === id); return <span key={id} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, padding: "3px 8px", borderRadius: 20, background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}44` }}>{c.code}</span>; })}
          </div>
        </div>
        <div className="summary-right" style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono',monospace" }}>TOTAL</div>
            <div className="price-num summary-total" style={{ fontSize: 24, fontWeight: 700, color: "#FF9900" }}>₹{total.toLocaleString()}</div>
          </div>
          <button className="checkout-btn" onClick={() => setShowPayment(true)}>Pay Now →</button>
        </div>
      </div>
    </div>
  );
}
