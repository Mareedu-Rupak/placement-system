import { useState } from "react";

const mockStudents = [
  { id: 1, name: "Priya Sharma", rollNumber: "21CS045", branch: "CSE", cgpa: 6.8, skills: ["Data Structures", "Algorithms", "Web Development"], leetcode: 456, gfg: 312, total: 768, email: "21cs045@college.edu", phone: "9876543210" },
  { id: 2, name: "Rahul Verma", rollNumber: "21CS023", branch: "CSE", cgpa: 9.2, skills: ["Web Development", "Database"], leetcode: 12, gfg: 8, total: 20, email: "21cs023@college.edu", phone: "9876543211" },
  { id: 3, name: "Anita Reddy", rollNumber: "21IT034", branch: "IT", cgpa: 7.5, skills: ["AI/ML", "Data Science", "Algorithms"], leetcode: 320, gfg: 180, total: 500, email: "21it034@college.edu", phone: "9876543212" },
  { id: 4, name: "Kiran Kumar", rollNumber: "21CS056", branch: "CSE", cgpa: 8.1, skills: ["DevOps", "Cloud Computing", "Web Development"], leetcode: 280, gfg: 150, total: 430, email: "21cs056@college.edu", phone: "9876543213" },
  { id: 5, name: "Sneha Patel", rollNumber: "21IT012", branch: "IT", cgpa: 7.2, skills: ["Data Science", "AI/ML"], leetcode: 390, gfg: 210, total: 600, email: "21it012@college.edu", phone: "9876543214" },
  { id: 6, name: "Arjun Nair", rollNumber: "21CS078", branch: "CSE", cgpa: 6.5, skills: ["Algorithms", "Data Structures", "Mobile Development"], leetcode: 510, gfg: 290, total: 800, email: "21cs078@college.edu", phone: "9876543215" },
];

const ALL_SKILLS = ["Data Structures", "Algorithms", "Web Development", "AI/ML", "Data Science", "Database", "DevOps", "Cloud Computing", "Mobile Development"];

export default function OfficerDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [filter, setFilter] = useState({ skill: "", minProblems: 0, minCgpa: 0, branch: "" });
  const [filtered, setFiltered] = useState(null);

  const totalStudents = mockStudents.length;
  const avgProblems = Math.round(mockStudents.reduce((a, b) => a + b.total, 0) / totalStudents);
  const top300 = mockStudents.filter((s) => s.total >= 300).length;

  const applyFilter = () => {
    let result = mockStudents;
    if (filter.skill) result = result.filter((s) => s.skills.includes(filter.skill));
    if (filter.minProblems) result = result.filter((s) => s.total >= Number(filter.minProblems));
    if (filter.minCgpa) result = result.filter((s) => s.cgpa >= Number(filter.minCgpa));
    if (filter.branch) result = result.filter((s) => s.branch === filter.branch);
    setFiltered(result);
    setActiveTab("filter");
  };

  const exportCSV = () => {
    const data = filtered || mockStudents;
    const headers = ["Name", "Roll Number", "Branch", "CGPA", "LeetCode", "GFG", "Total", "Email", "Phone"];
    const rows = data.map((s) => [s.name, s.rollNumber, s.branch, s.cgpa, s.leetcode, s.gfg, s.total, s.email, s.phone]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eligible_students.csv";
    a.click();
  };

  const displayStudents = filtered !== null ? filtered : mockStudents;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={{ fontSize: "24px" }}>🏢</span>
          <span style={styles.logoText}>PlaceWise</span>
        </div>
        <div style={styles.navItems}>
          {[
            { id: "overview", icon: "📊", label: "Overview" },
            { id: "students", icon: "👥", label: "All Students" },
            { id: "filter", icon: "🔍", label: "Smart Filter" },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ ...styles.navItem, ...(activeTab === item.id ? styles.navItemActive : {}) }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <button onClick={onLogout} style={styles.logoutBtn}>🚪 Logout</button>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === "overview" && "Overview"}
              {activeTab === "students" && "All Students"}
              {activeTab === "filter" && "Smart Filter"}
            </h1>
            <p style={styles.pageSubtitle}>Placement Officer Dashboard</p>
          </div>
          <button onClick={exportCSV} style={styles.exportBtn}>
            📁 Export CSV
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <div style={styles.statsGrid}>
              {[
                { icon: "👥", value: totalStudents, label: "Total Students", color: "#818cf8" },
                { icon: "💻", value: avgProblems, label: "Avg Problems Solved", color: "#22d3ee" },
                { icon: "🏆", value: top300, label: "Students with 300+", color: "#22c55e" },
                { icon: "📊", value: "6", label: "Branches", color: "#f59e0b" },
              ].map((s, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={styles.statIcon}>{s.icon}</div>
                  <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Top Students */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🏆 Top Coders</h3>
              {[...mockStudents].sort((a, b) => b.total - a.total).slice(0, 3).map((s, i) => (
                <div key={s.id} style={styles.topStudentRow}>
                  <div style={styles.rank}>#{i + 1}</div>
                  <div style={styles.studentInfo}>
                    <span style={styles.studentName}>{s.name}</span>
                    <span style={styles.studentMeta}>{s.rollNumber} • {s.branch}</span>
                  </div>
                  <div style={styles.problemCount}>{s.total} problems</div>
                </div>
              ))}
            </div>

            {/* Quick Filter */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>⚡ Quick Filter</h3>
              <div style={styles.filterRow}>
                <select value={filter.skill} onChange={(e) => setFilter({ ...filter, skill: e.target.value })} style={styles.select}>
                  <option value="">All Skills</option>
                  {ALL_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="number" placeholder="Min Problems" value={filter.minProblems}
                  onChange={(e) => setFilter({ ...filter, minProblems: e.target.value })}
                  style={styles.input} />
                <input type="number" placeholder="Min CGPA" step="0.1" value={filter.minCgpa}
                  onChange={(e) => setFilter({ ...filter, minCgpa: e.target.value })}
                  style={styles.input} />
                <select value={filter.branch} onChange={(e) => setFilter({ ...filter, branch: e.target.value })} style={styles.select}>
                  <option value="">All Branches</option>
                  {["CSE", "IT", "ECE", "EEE"].map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <button onClick={applyFilter} style={styles.filterBtn}>🔍 Filter</button>
              </div>
            </div>
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === "students" && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>All Students ({mockStudents.length})</h3>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Name", "Roll No", "Branch", "CGPA", "LeetCode", "GFG", "Total", "Skills"].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map((s) => (
                    <tr key={s.id} style={styles.tr}>
                      <td style={styles.td}>{s.name}</td>
                      <td style={styles.td}>{s.rollNumber}</td>
                      <td style={styles.td}>{s.branch}</td>
                      <td style={styles.td}>{s.cgpa}</td>
                      <td style={{ ...styles.td, color: "#22d3ee" }}>{s.leetcode}</td>
                      <td style={{ ...styles.td, color: "#22c55e" }}>{s.gfg}</td>
                      <td style={{ ...styles.td, color: "#818cf8", fontWeight: "700" }}>{s.total}</td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          {s.skills.slice(0, 2).map((sk) => (
                            <span key={sk} style={styles.skillBadge}>{sk}</span>
                          ))}
                          {s.skills.length > 2 && (
                            <span style={styles.skillBadge}>+{s.skills.length - 2}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FILTER TAB */}
        {activeTab === "filter" && (
          <div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🔍 Filter Students</h3>
              <div style={styles.filterRow}>
                <select value={filter.skill} onChange={(e) => setFilter({ ...filter, skill: e.target.value })} style={styles.select}>
                  <option value="">All Skills</option>
                  {ALL_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="number" placeholder="Min Problems" value={filter.minProblems}
                  onChange={(e) => setFilter({ ...filter, minProblems: e.target.value })}
                  style={styles.input} />
                <input type="number" placeholder="Min CGPA" step="0.1" value={filter.minCgpa}
                  onChange={(e) => setFilter({ ...filter, minCgpa: e.target.value })}
                  style={styles.input} />
                <select value={filter.branch} onChange={(e) => setFilter({ ...filter, branch: e.target.value })} style={styles.select}>
                  <option value="">All Branches</option>
                  {["CSE", "IT", "ECE", "EEE"].map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <button onClick={applyFilter} style={styles.filterBtn}>🔍 Apply</button>
              </div>
            </div>

            {filtered !== null && (
              <div style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={styles.cardTitle}>
                    Results: {filtered.length} students found
                  </h3>
                  <button onClick={exportCSV} style={styles.exportBtn}>📁 Export CSV</button>
                </div>
                {filtered.length === 0 ? (
                  <p style={{ color: "#64748b", textAlign: "center", padding: "40px" }}>
                    No students match the filter criteria.
                  </p>
                ) : (
                  <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          {["Name", "Roll No", "Branch", "CGPA", "Total Problems", "Email", "Phone"].map((h) => (
                            <th key={h} style={styles.th}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((s) => (
                          <tr key={s.id} style={styles.tr}>
                            <td style={styles.td}>{s.name}</td>
                            <td style={styles.td}>{s.rollNumber}</td>
                            <td style={styles.td}>{s.branch}</td>
                            <td style={styles.td}>{s.cgpa}</td>
                            <td style={{ ...styles.td, color: "#818cf8", fontWeight: "700" }}>{s.total}</td>
                            <td style={styles.td}>{s.email}</td>
                            <td style={styles.td}>{s.phone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  sidebar: { width: "240px", background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", padding: "24px 16px", position: "fixed", height: "100vh" },
  sidebarLogo: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", paddingLeft: "8px" },
  logoText: { fontSize: "20px", fontWeight: "800", color: "#e2e8f0" },
  navItems: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer", fontSize: "14px", fontWeight: "500", textAlign: "left", width: "100%" },
  navItemActive: { background: "rgba(99,102,241,0.15)", color: "#818cf8", fontWeight: "600" },
  logoutBtn: { display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.08)", color: "#f87171", cursor: "pointer", fontSize: "14px", width: "100%" },
  main: { marginLeft: "240px", flex: 1, padding: "32px" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" },
  pageTitle: { color: "#f1f5f9", fontSize: "26px", fontWeight: "700", margin: "0 0 4px 0" },
  pageSubtitle: { color: "#64748b", fontSize: "14px", margin: 0 },
  exportBtn: { padding: "10px 20px", background: "linear-gradient(135deg, #22c55e, #16a34a)", border: "none", borderRadius: "10px", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" },
  statCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", textAlign: "center" },
  statIcon: { fontSize: "28px", marginBottom: "12px" },
  statValue: { fontSize: "32px", fontWeight: "800", marginBottom: "6px" },
  statLabel: { color: "#64748b", fontSize: "12px" },
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", marginBottom: "20px" },
  cardTitle: { color: "#e2e8f0", fontSize: "16px", fontWeight: "600", margin: "0 0 20px 0" },
  topStudentRow: { display: "flex", alignItems: "center", gap: "16px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  rank: { width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "13px", fontWeight: "700", flexShrink: 0 },
  studentInfo: { flex: 1, display: "flex", flexDirection: "column", gap: "2px" },
  studentName: { color: "#e2e8f0", fontSize: "14px", fontWeight: "600" },
  studentMeta: { color: "#64748b", fontSize: "12px" },
  problemCount: { color: "#818cf8", fontSize: "14px", fontWeight: "700" },
  filterRow: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" },
  select: { padding: "10px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e2e8f0", fontSize: "13px", outline: "none" },
  input: { padding: "10px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e2e8f0", fontSize: "13px", outline: "none", width: "130px" },
  filterBtn: { padding: "10px 20px", background: "linear-gradient(135deg, #6366f1, #4f46e5)", border: "none", borderRadius: "8px", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", color: "#64748b", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { padding: "14px 16px", color: "#cbd5e1", fontSize: "13px" },
  skillBadge: { padding: "3px 8px", background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "10px", color: "#818cf8", fontSize: "11px" },
};