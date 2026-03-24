import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "", rollNumber: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) { setError("Please fill all fields"); return; }
    if (role === "student" && !formData.rollNumber) { setError("Enter Roll Number"); return; }
    setLoading(true);
    setTimeout(() => {
      if (role === "student") {
        if (formData.email === "21cs045@college.edu" && formData.password === "student123") {
          onLogin({ role: "student", name: "Priya", rollNumber: "21CS045" });
        } else { setError("Wrong credentials. Demo: 21cs045@college.edu / student123"); }
      } else {
        if (formData.email === "officer@college.edu" && formData.password === "officer123") {
          onLogin({ role: "officer", name: "Placement Officer" });
        } else { setError("Wrong credentials. Demo: officer@college.edu / officer123"); }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />
      <div style={styles.container}>

        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <div style={styles.logo}>
            <span style={{ fontSize: "34px" }}>🎓</span>
            <span style={styles.logoText}>PlaceWise</span>
          </div>
          <h2 style={styles.tagline}>
            Skills speak,<br />
            <span style={styles.taglineAccent}>We listen.</span>
          </h2>
          <p style={styles.taglineDesc}>
            Not your CGPA — your coding skills get you placed.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "⚡", text: "Real-time LeetCode & GFG tracking" },
              { icon: "🎯", text: "Skill-based company matching" },
              { icon: "📊", text: "Progress dashboard & streaks" },
              { icon: "📁", text: "One-click Excel export" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <span style={{ color: "#cbd5e1", fontSize: "13px" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <h3 style={styles.formTitle}>Welcome Back</h3>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
            Login to your account
          </p>

          {/* Role Toggle */}
          <div style={styles.roleToggle}>
            {["student", "officer"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setError(""); setFormData({ email: "", password: "", rollNumber: "" }); }}
                style={{ ...styles.roleBtn, ...(role === r ? styles.roleBtnActive : {}) }}
              >
                {r === "student" ? "🎓 Student" : "🏢 Officer"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {role === "student" && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Roll Number</label>
                <input name="rollNumber" type="text" placeholder="e.g. 21CS045"
                  value={formData.rollNumber} onChange={handleChange} style={styles.input} />
              </div>
            )}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input name="email" type="email"
                placeholder={role === "student" ? "21cs045@college.edu" : "officer@college.edu"}
                value={formData.email} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={{ position: "relative" }}>
                <input name="password" type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password} onChange={handleChange}
                  style={{ ...styles.input, paddingRight: "48px" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && <div style={styles.errorBox}>⚠️ {error}</div>}

            <button type="submit" disabled={loading} style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}>
              {loading ? "⏳ Logging in..." : `Login as ${role === "student" ? "Student" : "Officer"}`}
            </button>
          </form>

          {/* Demo hint */}
          <div style={styles.demoHint}>
            <p style={{ color: "#22d3ee", fontSize: "12px", fontWeight: "600", margin: "0 0 4px 0" }}>
              🧪 Demo Credentials:
            </p>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0, fontFamily: "monospace" }}>
              {role === "student" ? "21cs045@college.edu / student123" : "officer@college.edu / officer123"}
            </p>
          </div>

          <p style={{ marginTop: "16px", textAlign: "center", color: "#64748b", fontSize: "13px" }}>
            New student?{" "}
            <span style={{ color: "#818cf8", cursor: "pointer", fontWeight: "600" }}>
              Register here →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "20px", fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: "relative", overflow: "hidden",
  },
  bgCircle1: {
    position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
    top: "-150px", right: "-150px", pointerEvents: "none",
  },
  bgCircle2: {
    position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
    bottom: "-100px", left: "-100px", pointerEvents: "none",
  },
  container: {
    display: "flex", width: "100%", maxWidth: "900px",
    background: "rgba(255,255,255,0.03)", borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)",
    overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
    position: "relative", zIndex: 1,
  },
  leftPanel: {
    flex: 1, padding: "48px 40px",
    background: "linear-gradient(160deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 100%)",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    display: "flex", flexDirection: "column", gap: "28px",
  },
  logoText: { fontSize: "26px", fontWeight: "800", color: "#e2e8f0", letterSpacing: "-0.5px" },
  tagline: { fontSize: "27px", fontWeight: "700", color: "#e2e8f0", lineHeight: "1.3", margin: 0 },
  taglineAccent: {
    background: "linear-gradient(90deg, #818cf8, #22d3ee)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  taglineDesc: { color: "#94a3b8", fontSize: "14px", lineHeight: "1.7", margin: 0 },
  featureIcon: {
    fontSize: "17px", width: "38px", height: "38px",
    background: "rgba(255,255,255,0.08)", borderRadius: "10px",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  rightPanel: { flex: 1, padding: "48px 40px", display: "flex", flexDirection: "column" },
  formTitle: { color: "#f1f5f9", fontSize: "26px", fontWeight: "700", margin: "0 0 6px 0" },
  roleToggle: {
    display: "flex", background: "rgba(255,255,255,0.05)",
    borderRadius: "12px", padding: "5px", gap: "5px", marginBottom: "26px",
  },
  roleBtn: {
    flex: 1, padding: "11px", border: "none", borderRadius: "8px",
    background: "transparent", color: "#64748b", cursor: "pointer",
    fontSize: "13px", fontWeight: "500",
  },
  roleBtnActive: {
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "white", fontWeight: "600",
    boxShadow: "0 4px 14px rgba(99,102,241,0.45)",
  },
  inputGroup: { display: "flex", flexDirection: "column", gap: "7px", marginBottom: "16px" },
  label: { color: "#94a3b8", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.6px" },
  input: {
    padding: "13px 16px", background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
    color: "#e2e8f0", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
    background: "transparent", border: "none", cursor: "pointer", fontSize: "16px",
  },
  errorBox: {
    background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px", padding: "11px 15px", color: "#fca5a5",
    fontSize: "13px", marginBottom: "16px",
  },
  submitBtn: {
    width: "100%", padding: "14px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    border: "none", borderRadius: "12px", color: "white",
    fontSize: "15px", fontWeight: "600", cursor: "pointer",
    boxShadow: "0 4px 18px rgba(99,102,241,0.45)",
  },
  demoHint: {
    marginTop: "18px", padding: "13px 15px",
    background: "rgba(34,211,238,0.08)",
    border: "1px solid rgba(34,211,238,0.2)", borderRadius: "8px",
  },
};