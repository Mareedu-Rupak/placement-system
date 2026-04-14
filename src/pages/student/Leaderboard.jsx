import { useState } from "react";

const generateStudents = () => {
  const names = ["Priya", "Rahul", "Anita", "Kiran", "Sneha", "Arjun", "Divya", "Suresh", "Meera", "Vikram", "Pooja", "Ravi", "Lakshmi", "Arun", "Deepa", "Sai", "Kavya", "Nikhil", "Swathi", "Harish"];
  const lastNames = ["Sharma", "Verma", "Reddy", "Kumar", "Patel", "Nair", "Menon", "Babu", "Iyer", "Singh", "Rao", "Gupta", "Naidu", "Pillai", "Joshi"];
  const branches = ["CSE", "CSE", "IT", "IT", "ECE", "EEE"];
  const allSkills = ["Data Structures", "Algorithms", "Web Development", "AI/ML", "Data Science", "Database", "DevOps"];

  return Array.from({ length: 150 }, (_, i) => {
    const name = `${names[i % names.length]} ${lastNames[i % lastNames.length]}`;
    const branch = branches[i % branches.length];
    const rollNumber = `21${branch.slice(0, 2)}${String(i + 1).padStart(3, "0")}`;
    const leetcode = Math.floor(Math.random() * 500) + 10;
    const gfg = Math.floor(Math.random() * 300) + 5;
    const streak = Math.floor(Math.random() * 50) + 1;
    const skillCount = Math.floor(Math.random() * 3) + 1;
    const skills = allSkills.sort(() => 0.5 - Math.random()).slice(0, skillCount);

    return {
      id: i + 1, name, rollNumber, branch, skills,
      leetcode, gfg, total: leetcode + gfg, streak,
    };
  }).sort((a, b) => b.total - a.total);
};

const allStudents = generateStudents();

export default function Leaderboard({ currentUser, onBack }) {
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 20;

  const filtered = allStudents.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchBranch = filterBranch ? s.branch === filterBranch : true;
    return matchSearch && matchBranch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((page - 1) * perPage, page * perPage);

  const myRank = allStudents.findIndex((s) => s.rollNumber === "21CS045") + 1;
  const myStats = allStudents.find((s) => s.rollNumber === "21CS045");

  const getRankStyle = (rank) => {
    if (rank === 1) return { color: "#FFD700", icon: "🥇" };
    if (rank === 2) return { color: "#C0C0C0", icon: "🥈" };
    if (rank === 3) return { color: "#CD7F32", icon: "🥉" };
    return { color: "#64748b", icon: `#${rank}` };
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button onClick={onBack} style={styles.backBtn}>← Back</button>
          <div>
            <h1 style={styles.title}>🏆 Leaderboard</h1>
            <p style={styles.subtitle}>Top coders ranked by total problems solved</p>
          </div>
        </div>

        {/* My Rank Badge */}
        {myStats && (
          <div style={styles.myRankCard}>
            <p style={styles.myRankLabel}>Your Rank</p>
            <p style={styles.myRankValue}>#{myRank}</p>
            <p style={styles.myRankProblems}>{myStats.total} problems</p>
          </div>
        )}
      </div>

      {/* Top 3 Podium */}
      <div style={styles.podium}>
        {/* 2nd place */}
        <div style={styles.podiumItem}>
          <div style={styles.podiumAvatar2}>
            {allStudents[1]?.name.charAt(0)}
          </div>
          <p style={styles.podiumName}>{allStudents[1]?.name}</p>
          <p style={styles.podiumBranch}>{allStudents[1]?.branch}</p>
          <div style={{ ...styles.podiumBox, height: "80px", background: "rgba(192,192,192,0.15)", border: "1px solid rgba(192,192,192,0.3)" }}>
            <span style={{ fontSize: "24px" }}>🥈</span>
            <p style={{ color: "#C0C0C0", fontWeight: "700", margin: 0 }}>{allStudents[1]?.total}</p>
          </div>
        </div>

        {/* 1st place */}
        <div style={styles.podiumItem}>
          <div style={styles.podiumAvatar1}>
            {allStudents[0]?.name.charAt(0)}
          </div>
          <p style={styles.podiumName}>{allStudents[0]?.name}</p>
          <p style={styles.podiumBranch}>{allStudents[0]?.branch}</p>
          <div style={{ ...styles.podiumBox, height: "110px", background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.3)" }}>
            <span style={{ fontSize: "28px" }}>🥇</span>
            <p style={{ color: "#FFD700", fontWeight: "700", margin: 0 }}>{allStudents[0]?.total}</p>
          </div>
        </div>

        {/* 3rd place */}
        <div style={styles.podiumItem}>
          <div style={styles.podiumAvatar3}>
            {allStudents[2]?.name.charAt(0)}
          </div>
          <p style={styles.podiumName}>{allStudents[2]?.name}</p>
          <p style={styles.podiumBranch}>{allStudents[2]?.branch}</p>
          <div style={{ ...styles.podiumBox, height: "60px", background: "rgba(205,127,50,0.15)", border: "1px solid rgba(205,127,50,0.3)" }}>
            <span style={{ fontSize: "20px" }}>🥉</span>
            <p style={{ color: "#CD7F32", fontWeight: "700", margin: 0 }}>{allStudents[2]?.total}</p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={styles.filterRow}>
        <input
          type="text"
          placeholder="🔍 Search by name or roll number..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={styles.searchInput}
        />
        <select
          value={filterBranch}
          onChange={(e) => { setFilterBranch(e.target.value); setPage(1); }}
          style={styles.select}
        >
          <option value="">All Branches</option>
          {["CSE", "IT", "ECE", "EEE"].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <span style={styles.resultCount}>{filtered.length} students</span>
      </div>

      {/* Table */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Rank", "Name", "Branch", "LeetCode", "GFG", "Total", "Streak"].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map((s, idx) => {
              const rank = (page - 1) * perPage + idx + 1;
              const globalRank = filtered.indexOf(s) + 1;
              const rs = getRankStyle(globalRank);
              const isMe = s.rollNumber === "21CS045";

              return (
                <tr key={s.id} style={{
                  ...styles.tr,
                  background: isMe ? "rgba(99,102,241,0.1)" : "transparent",
                  border: isMe ? "1px solid rgba(99,102,241,0.3)" : "none",
                }}>
                  <td style={styles.td}>
                    <span style={{ color: rs.color, fontWeight: "700", fontSize: "14px" }}>
                      {rs.icon}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: isMe ? "#818cf8" : "#e2e8f0", fontWeight: isMe ? "700" : "400" }}>
                      {s.name} {isMe && <span style={{ fontSize: "11px", color: "#818cf8" }}>(You)</span>}
                    </span>
                    <br />
                    <span style={{ color: "#475569", fontSize: "11px" }}>{s.rollNumber}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.branchBadge}>{s.branch}</span>
                  </td>
                  <td style={{ ...styles.td, color: "#22d3ee" }}>{s.leetcode}</td>
                  <td style={{ ...styles.td, color: "#22c55e" }}>{s.gfg}</td>
                  <td style={{ ...styles.td, color: "#818cf8", fontWeight: "700" }}>{s.total}</td>
                  <td style={{ ...styles.td, color: "#f59e0b" }}>🔥 {s.streak}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ ...styles.pageBtn, opacity: page === 1 ? 0.4 : 1 }}
        >
          ← Prev
        </button>
        <span style={{ color: "#94a3b8", fontSize: "13px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{ ...styles.pageBtn, opacity: page === totalPages ? 0.4 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", background: "#0f172a",
    fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "32px",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "32px",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "16px" },
  backBtn: {
    padding: "8px 16px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
    color: "#94a3b8", cursor: "pointer", fontSize: "13px",
  },
  title: { color: "#f1f5f9", fontSize: "28px", fontWeight: "700", margin: "0 0 4px 0" },
  subtitle: { color: "#64748b", fontSize: "13px", margin: 0 },
  myRankCard: {
    padding: "16px 24px", background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.3)", borderRadius: "16px", textAlign: "center",
  },
  myRankLabel: { color: "#94a3b8", fontSize: "11px", margin: "0 0 4px 0", textTransform: "uppercase" },
  myRankValue: { color: "#818cf8", fontSize: "28px", fontWeight: "800", margin: "0 0 2px 0" },
  myRankProblems: { color: "#64748b", fontSize: "12px", margin: 0 },
  podium: {
    display: "flex", justifyContent: "center", alignItems: "flex-end",
    gap: "24px", marginBottom: "32px",
  },
  podiumItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" },
  podiumAvatar1: {
    width: "56px", height: "56px", borderRadius: "50%",
    background: "linear-gradient(135deg, #FFD700, #FFA500)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "22px", fontWeight: "700", color: "#0f172a",
  },
  podiumAvatar2: {
    width: "48px", height: "48px", borderRadius: "50%",
    background: "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", fontWeight: "700", color: "#0f172a",
  },
  podiumAvatar3: {
    width: "44px", height: "44px", borderRadius: "50%",
    background: "linear-gradient(135deg, #CD7F32, #A0522D)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", fontWeight: "700", color: "#0f172a",
  },
  podiumName: { color: "#e2e8f0", fontSize: "13px", fontWeight: "600", margin: 0 },
  podiumBranch: { color: "#64748b", fontSize: "11px", margin: 0 },
  podiumBox: {
    width: "100px", borderRadius: "8px 8px 0 0",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
  },
  filterRow: {
    display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap",
  },
  searchInput: {
    flex: 1, minWidth: "200px", padding: "12px 16px",
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", color: "#e2e8f0", fontSize: "14px", outline: "none",
  },
  select: {
    padding: "12px 16px", background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
    color: "#e2e8f0", fontSize: "13px", outline: "none",
  },
  resultCount: { color: "#64748b", fontSize: "13px", whiteSpace: "nowrap" },
  tableCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px", overflow: "hidden", marginBottom: "20px",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "14px 16px", textAlign: "left", color: "#64748b",
    fontSize: "11px", fontWeight: "600", textTransform: "uppercase",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
  },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" },
  td: { padding: "14px 16px", color: "#cbd5e1", fontSize: "13px" },
  branchBadge: {
    padding: "3px 10px", background: "rgba(34,211,238,0.1)",
    border: "1px solid rgba(34,211,238,0.2)", borderRadius: "10px",
    color: "#22d3ee", fontSize: "11px",
  },
  pagination: {
    display: "flex", justifyContent: "center", alignItems: "center", gap: "20px",
  },
  pageBtn: {
    padding: "10px 20px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
    color: "#94a3b8", cursor: "pointer", fontSize: "13px",
  },
};