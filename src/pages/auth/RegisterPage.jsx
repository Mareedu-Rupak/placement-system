import { useState } from "react";

const SKILLS = [
  "Data Structures", "Algorithms", "Web Development", "Data Science",
  "AI/ML", "Database", "DevOps", "Mobile Development", "Cybersecurity", "Cloud Computing"
];

const BRANCHES = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];

export default function RegisterPage({ onRegister, onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: "", rollNumber: "", branch: "", year: "4",
    // Step 2
    collegeEmail: "", personalEmail: "", phone: "",
    // Step 3
    skills: [], projectLink: "",
    // Step 4
    leetcodeUsername: "", gfgUsername: "", githubUsername: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const toggleSkill = (skill) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updated });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.rollNumber || !formData.branch)
        return "Please fill all fields";
    }
    if (step === 2) {
      if (!formData.collegeEmail || !formData.personalEmail || !formData.phone)
        return "Please fill all fields";
      if (!formData.collegeEmail.includes("@college.edu"))
        return "Use your college email (@college.edu)";
    }
    if (step === 3) {
      if (formData.skills.length === 0)
        return "Select at least one skill";
    }
    if (step === 4) {
      if (!formData.leetcodeUsername && !formData.gfgUsername)
        return "Enter at least one coding profile";
    }
    return "";
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");
    if (step < 4) setStep(step + 1);
    else onRegister && onRegister(formData);
  };

  const stepTitles = [
    "Personal Details",
    "Contact Details",
    "Skills & Projects",
    "Coding Profiles",
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={{ fontSize: "28px" }}>🎓</span>
            <span style={styles.logoText}>PlaceWise</span>
          </div>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Step {step} of 4 — {stepTitles[step - 1]}</p>

          {/* Progress Bar */}
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${(step / 4) * 100}%` }} />
          </div>

          {/* Step indicators */}
          <div style={styles.stepIndicators}>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{
                  ...styles.stepDot,
                  background: s <= step ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(255,255,255,0.1)",
                  border: s === step ? "2px solid #818cf8" : "2px solid transparent",
                }}>
                  {s < step ? "✓" : s}
                </div>
                <span style={{ color: s <= step ? "#818cf8" : "#475569", fontSize: "10px" }}>
                  {stepTitles[s - 1].split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div style={styles.body}>

          {/* STEP 1 — Personal Details */}
          {step === 1 && (
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input name="name" type="text" placeholder="e.g. Priya Sharma"
                  value={formData.name} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Roll Number</label>
                <input name="rollNumber" type="text" placeholder="e.g. 21CS045"
                  value={formData.rollNumber} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Branch</label>
                <select name="branch" value={formData.branch}
                  onChange={handleChange} style={styles.input}>
                  <option value="">Select Branch</option>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Year</label>
                <select name="year" value={formData.year}
                  onChange={handleChange} style={styles.input}>
                  <option value="4">4th Year</option>
                  <option value="3">3rd Year</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 — Contact Details */}
          {step === 2 && (
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>College Email</label>
                <input name="collegeEmail" type="email" placeholder="21cs045@college.edu"
                  value={formData.collegeEmail} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Personal Email</label>
                <input name="personalEmail" type="email" placeholder="priya@gmail.com"
                  value={formData.personalEmail} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input name="phone" type="tel" placeholder="9876543210"
                  value={formData.phone} onChange={handleChange} style={styles.input} />
              </div>
            </div>
          )}

          {/* STEP 3 — Skills & Projects */}
          {step === 3 && (
            <div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Select Your Skills</label>
                <div style={styles.skillsGrid}>
                  {SKILLS.map((skill) => (
                    <button key={skill} type="button"
                      onClick={() => toggleSkill(skill)}
                      style={{
                        ...styles.skillChip,
                        ...(formData.skills.includes(skill) ? styles.skillChipActive : {})
                      }}>
                      {formData.skills.includes(skill) ? "✓ " : ""}{skill}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ ...styles.inputGroup, marginTop: "20px" }}>
                <label style={styles.label}>Project Link (Optional)</label>
                <input name="projectLink" type="url" placeholder="https://github.com/yourproject"
                  value={formData.projectLink} onChange={handleChange} style={styles.input} />
              </div>
            </div>
          )}

          {/* STEP 4 — Coding Profiles */}
          {step === 4 && (
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>LeetCode Username</label>
                <div style={styles.profileInput}>
                  <span style={styles.profilePrefix}>leetcode.com/</span>
                  <input name="leetcodeUsername" type="text" placeholder="your_username"
                    value={formData.leetcodeUsername} onChange={handleChange}
                    style={{ ...styles.input, borderRadius: "0 10px 10px 0", borderLeft: "none" }} />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>GeeksForGeeks Username</label>
                <div style={styles.profileInput}>
                  <span style={styles.profilePrefix}>auth.gfg.com/</span>
                  <input name="gfgUsername" type="text" placeholder="your_username"
                    value={formData.gfgUsername} onChange={handleChange}
                    style={{ ...styles.input, borderRadius: "0 10px 10px 0", borderLeft: "none" }} />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>GitHub Username</label>
                <div style={styles.profileInput}>
                  <span style={styles.profilePrefix}>github.com/</span>
                  <input name="githubUsername" type="text" placeholder="your_username"
                    value={formData.githubUsername} onChange={handleChange}
                    style={{ ...styles.input, borderRadius: "0 10px 10px 0", borderLeft: "none" }} />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button type="button"
              onClick={() => step === 1 ? onBack && onBack() : setStep(step - 1)}
              style={styles.backBtn}>
              ← {step === 1 ? "Back to Login" : "Previous"}
            </button>
            <button type="button" onClick={handleNext} style={styles.nextBtn}>
              {step === 4 ? "🎉 Register" : "Next →"}
            </button>
          </div>
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
    width: "100%", maxWidth: "600px",
    background: "rgba(255,255,255,0.03)", borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)",
    overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
    position: "relative", zIndex: 1,
  },
  header: {
    padding: "36px 40px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "linear-gradient(160deg, rgba(99,102,241,0.15) 0%, transparent 100%)",
  },
  logo: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
  logoText: { fontSize: "22px", fontWeight: "800", color: "#e2e8f0" },
  title: { color: "#f1f5f9", fontSize: "24px", fontWeight: "700", margin: "0 0 4px 0" },
  subtitle: { color: "#64748b", fontSize: "13px", margin: "0 0 16px 0" },
  progressBar: {
    height: "4px", background: "rgba(255,255,255,0.08)",
    borderRadius: "2px", marginBottom: "20px", overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #22d3ee)",
    borderRadius: "2px", transition: "width 0.4s ease",
  },
  stepIndicators: {
    display: "flex", justifyContent: "space-between", padding: "0 10px",
  },
  stepDot: {
    width: "32px", height: "32px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "white", fontSize: "12px", fontWeight: "700",
    transition: "all 0.3s",
  },
  body: { padding: "32px 40px" },
  formGrid: { display: "flex", flexDirection: "column", gap: "0px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "7px", marginBottom: "18px" },
  label: { color: "#94a3b8", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.6px" },
  input: {
    padding: "13px 16px", background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
    color: "#e2e8f0", fontSize: "14px", outline: "none", width: "100%",
    boxSizing: "border-box",
  },
  skillsGrid: {
    display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px",
  },
  skillChip: {
    padding: "8px 16px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px",
    color: "#94a3b8", cursor: "pointer", fontSize: "13px",
    transition: "all 0.2s",
  },
  skillChipActive: {
    background: "rgba(99,102,241,0.25)",
    border: "1px solid rgba(99,102,241,0.6)",
    color: "#818cf8", fontWeight: "600",
  },
  profileInput: { display: "flex" },
  profilePrefix: {
    padding: "13px 12px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", borderRight: "none",
    borderRadius: "10px 0 0 10px", color: "#475569", fontSize: "13px",
    whiteSpace: "nowrap",
  },
  errorBox: {
    background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px", padding: "11px 15px", color: "#fca5a5",
    fontSize: "13px", marginBottom: "16px",
  },
  btnRow: { display: "flex", gap: "12px", marginTop: "8px" },
  backBtn: {
    flex: 1, padding: "13px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
    color: "#94a3b8", cursor: "pointer", fontSize: "14px",
  },
  nextBtn: {
    flex: 2, padding: "13px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    border: "none", borderRadius: "12px", color: "white",
    fontSize: "14px", fontWeight: "600", cursor: "pointer",
    boxShadow: "0 4px 18px rgba(99,102,241,0.45)",
  },
};