import { useState } from "react"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import StudentDashboard from "./pages/student/StudentDashboard"

function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState("login")

  return (
    <div>
      {page === "login" && !user && (
        <LoginPage
          onLogin={(u) => setUser(u)}
          onRegister={() => setPage("register")}
        />
      )}
      {page === "register" && (
        <RegisterPage
          onRegister={(data) => {
            console.log("Registered:", data)
            setPage("login")
          }}
          onBack={() => setPage("login")}
        />
      )}
      {user && user.role === "student" && (
        <StudentDashboard
          user={user}
          onLogout={() => setUser(null)}
        />
      )}
      {user && user.role === "officer" && (
        <div style={{ color: "white", padding: "40px", background: "#0f172a", minHeight: "100vh" }}>
          <h1>Officer Dashboard — Coming Soon! 🏢</h1>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default App