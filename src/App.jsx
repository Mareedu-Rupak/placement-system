import { useState } from "react"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import StudentDashboard from "./pages/student/StudentDashboard"
import OfficerDashboard from "./pages/officer/OfficerDashboard"

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
        <OfficerDashboard
          user={user}
          onLogout={() => setUser(null)}
        />
      )}
    </div>
  )
}

export default App