import { useState } from "react";

const mockStudent = {
  name: "Priya Sharma",
  rollNumber: "21CS045",
  branch: "CSE",
  year: "4th Year",
  collegeEmail: "21cs045@college.edu",
  skills: ["Data Structures", "Algorithms", "Web Development", "AI/ML"],
  leetcode: { solved: 456, easy: 180, medium: 220, hard: 56 },
  gfg: { solved: 312, school: 80, basic: 100, easy: 90, medium: 42 },
  streak: 23,
  github: "priya-sharma",
};

export default function StudentDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");

  const totalSolved = mockStudent.leetcode.solved + mockStudent.gfg.solved;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={{ fontSize: "24px" }}>🎓</span>
          <span style={styles.logoText}>PlaceWise</span>
        </div>

        <div style={styles.navItems}>
          {[
            { id: "overview", icon: "📊", label: "Overview" },
            { id: "coding", icon: "💻", label: "Coding Stats" },
            { id: "skills", icon: "🎯", label: "My Skills" },
            { id: "profile", icon: "👤", label: "Profile" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {}),
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <button onClick={onLogout} style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === "overview" && "Overview"}
              {activeTab === "coding" && "Coding Stats"}
              {activeTab === "skills" && "My Skills"}
              {activeTab === "profile" && "Profile"}
            </h1>
            <p style={styles.pageSubtitle}>Welcome back, {mockStudent.name}! 👋</p>
          </div>
          <div style={styles.streakBadge}>
            🔥 {mockStudent.streak} day streak
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>💻</div>
                <div style={styles.statValue}>{totalSolved}</div>
                <div style={styles.statLabel}>Total Problems Solved</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>⚡</div>
                <div style={{ ...styles.statValue, color: "#22d3ee" }}>
                  {mockStudent.leetcode.solved}
                </div>
                <div style={styles.statLabel}>LeetCode Solved</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🟢</div>
                <div style={{ ...styles.statValue, color: "#22c55e" }}>
                  {mockStudent.gfg.solved}
                </div>
                <div style={styles.statLabel}>GFG Solved</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🔥</div>
                <div style={{ ...styles.statValue, color: "#f59e0b" }}>
                  {mockStudent.streak}
                </div>
                <div style={styles.statLabel}>Day Streak</div>
              </div>
            </div>

            {/* Progress Bars */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>LeetCode Progress</h3>
              <div style={styles.progressList}>
                {[
                  { label: "Easy", value: mockStudent.leetcode.easy, total: 300, color: "#22c55e" },
                  { label: "Medium", value: mockStudent.leetcode.medium, total: 400, color: "#f59e0b" },
                  { label: "Hard", value: mockStudent.leetcode.hard, total: 200, color: "#ef4444" },
                ].map((item) => (
                  <div key={item.label} style={styles.progressItem}>
                    <div style={styles.progressHeader}>
                      <span style={{ color: item.color, fontWeight: "600", fontSize: "13px" }}>
                        {item.label}
                      </span>
                      <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                        {item.value} / {item.total}
                      </span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={{
                        ...styles.progressFill,
                        width: `${(item.value / item.total) * 100}%`,
                        background: item.color,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Preview */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>My Skills</h3>
              <div style={styles.skillsRow}>
                {mockStudent.skills.map((skill) => (
                  <span key={skill} style={styles.skillBadge}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CODING STATS TAB */}
        {activeTab === "coding" && (
          <div>
            <div style={styles.codingGrid}>
              {/* LeetCode Card */}
              <div style={styles.platformCard}>
                <div style={styles.platformHeader}>
                  <span style={{ fontSize: "28px" }}>⚡</span>
                  <div>
                    <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: "18px" }}>LeetCode</h3>
                    <p style={{ color: "#64748b", margin: 0, fontSize: "12px" }}>
                      @{mockStudent.github}
                    </p>
                  </div>
                </div>
                <div style={styles.platformTotal}>{mockStudent.leetcode.solved}</div>
                <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 20px 0" }}>
                  Total Problems Solved
                </p>
                <div style={styles.difficultyList}>
                  {[
                    { label: "Easy", value: mockStudent.leetcode.easy, color: "#22c55e" },
                    { label: "Medium", value: mockStudent.leetcode.medium, color: "#f59e0b" },
                    { label: "Hard", value: mockStudent.leetcode.hard, color: "#ef4444" },
                  ].map((d) => (
                    <div key={d.label} style={styles.difficultyItem}>
                      <span style={{ color: "#94a3b8", fontSize: "13px" }}>{d.label}</span>
                      <span style={{ color: d.color, fontWeight: "700", fontSize: "16px" }}>
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GFG Card */}
              <div style={styles.platformCard}>
                <div style={styles.platformHeader}>
                  <span style={{ fontSize: "28px" }}>🟢</span>
                  <div>
                    <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: "18px" }}>
                      GeeksForGeeks
                    </h3>
                    <p style={{ color: "#64748b", margin: 0, fontSize: "12px" }}>
                      @{mockStudent.github}
                    </p>
                  </div>
                </div>
                <div style={{ ...styles.platformTotal, color: "#22c55e" }}>
                  {mockStudent.gfg.solved}
                </div>
                <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 20px 0" }}>
                  Total Problems Solved
                </p>
                <div style={styles.difficultyList}>
                  {[
                    { label: "School", value: mockStudent.gfg.school, color: "#94a3b8" },
                    { label: "Basic", value: mockStudent.gfg.basic, color: "#22c55e" },
                    { label: "Easy", value: mockStudent.gfg.easy, color: "#22d3ee" },
                    { label: "Medium", value: mockStudent.gfg.medium, color: "#f59e0b" },
                  ].map((d) => (
                    <div key={d.label} style={styles.difficultyItem}>
                      <span style={{ color: "#94a3b8", fontSize: "13px" }}>{d.label}</span>
                      <span style={{ color: d.color, fontWeight: "700", fontSize: "16px" }}>
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === "skills" && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>My Skills</h3>
            <div style={styles.skillsGrid}>
              {mockStudent.skills.map((skill) => (
                <div key={skill} style={styles.skillCard}>
                  <span style={{ fontSize: "24px" }}>
                    {skill === "Data Structures" ? "🏗️"
                      : skill === "Algorithms" ? "⚙️"
                      : skill === "Web Development" ? "🌐"
                      : skill === "AI/ML" ? "🤖" : "💡"}
                  </span>
                  <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "500" }}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div style={styles.card}>
            <div style={styles.profileHeader}>
              <div style={styles.avatar}>
                {mockStudent.name.charAt(0)}
              </div>
              <div>
                <h2 style={{ color: "#f1f5f9", margin: "0 0 4px 0" }}>{mockStudent.name}</h2>
                <p style={{ color: "#64748b", margin: 0 }}>{mockStudent.rollNumber} • {mockStudent.branch}</p>
              </div>
            </div>
            <div style={styles.profileDetails}>
              {[
                { label: "College Email", value: mockStudent.collegeEmail },
                { label: "Branch", value: mockStudent.branch },
                { label: "Year", value: mockStudent.year },
                { label: "GitHub", value: `github.com/${mockStudent.github}` },
              ].map((item) => (
                <div key={item.label} style={styles.profileItem}>
                  <span style={styles.profileLabel}>{item.label}</span>
                  <span style={styles.profileValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex", minHeight: "100vh",
    background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  sidebar: {
    width: "240px", background: "rgba(255,255,255,0.03)",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    display: "flex", flexDirection: "column", padding: "24px 16px",
    position: "fixed", height: "100vh",
  },
  sidebarLogo: {
    display: "flex", alignItems: "center", gap: "10px",
    marginBottom: "32px", paddingLeft: "8px",
  },
  logoText: { fontSize: "20px", fontWeight: "800", color: "#e2e8f0" },
  navItems: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  navItem: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "12px 16px", borderRadius: "10px", border: "none",
    background: "transparent", color: "#64748b", cursor: "pointer",
    fontSize: "14px", fontWeight: "500", textAlign: "left", width: "100%",
  },
  navItemActive: {
    background: "rgba(99,102,241,0.15)",
    color: "#818cf8", fontWeight: "600",
  },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "12px 16px", borderRadius: "10px",
    border: "1px solid rgba(239,68,68,0.2)",
    background: "rgba(239,68,68,0.08)", color: "#f87171",
    cursor: "pointer", fontSize: "14px", width: "100%",
  },
  main: { marginLeft: "240px", flex: 1, padding: "32px" },
  topBar: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "28px",
  },
  pageTitle: { color: "#f1f5f9", fontSize: "26px", fontWeight: "700", margin: "0 0 4px 0" },
  pageSubtitle: { color: "#64748b", fontSize: "14px", margin: 0 },
  streakBadge: {
    padding: "10px 18px",
    background: "rgba(245,158,11,0.15)",
    border: "1px solid rgba(245,158,11,0.3)",
    borderRadius: "20px", color: "#f59e0b", fontSize: "14px", fontWeight: "600",
  },
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px",
  },
  statCard: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px", padding: "24px", textAlign: "center",
  },
  statIcon: { fontSize: "28px", marginBottom: "12px" },
  statValue: { fontSize: "32px", fontWeight: "800", color: "#818cf8", marginBottom: "6px" },
  statLabel: { color: "#64748b", fontSize: "12px" },
  card: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px", padding: "24px", marginBottom: "20px",
  },
  cardTitle: { color: "#e2e8f0", fontSize: "16px", fontWeight: "600", margin: "0 0 20px 0" },
  progressList: { display: "flex", flexDirection: "column", gap: "16px" },
  progressItem: { display: "flex", flexDirection: "column", gap: "8px" },
  progressHeader: { display: "flex", justifyContent: "space-between" },
  progressBar: {
    height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: "4px", transition: "width 0.5s ease" },
  skillsRow: { display: "flex", flexWrap: "wrap", gap: "10px" },
  skillBadge: {
    padding: "6px 14px", background: "rgba(99,102,241,0.2)",
    border: "1px solid rgba(99,102,241,0.4)", borderRadius: "20px",
    color: "#818cf8", fontSize: "13px", fontWeight: "500",
  },
  codingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  platformCard: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px", padding: "28px",
  },
  platformHeader: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" },
  platformTotal: {
    fontSize: "48px", fontWeight: "800", color: "#22d3ee", lineHeight: 1, marginBottom: "4px",
  },
  difficultyList: { display: "flex", flexDirection: "column", gap: "12px" },
  difficultyItem: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 14px", background: "rgba(255,255,255,0.04)", borderRadius: "8px",
  },
  skillsGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px",
  },
  skillCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
    padding: "24px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
  },
  profileHeader: { display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" },
  avatar: {
    width: "64px", height: "64px", borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "28px", fontWeight: "700", color: "white",
  },
  profileDetails: { display: "flex", flexDirection: "column", gap: "0px" },
  profileItem: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  profileLabel: { color: "#64748b", fontSize: "13px" },
  profileValue: { color: "#e2e8f0", fontSize: "14px", fontWeight: "500" },
};