import { useState } from "react"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"

function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState("login") // "login" or "register"

  return (
    <div>
      {page === "login" && (
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
      {user && (
        <div style={{ color: "white", padding: "40px", background: "#0f172a", minHeight: "100vh" }}>
          <h1>Welcome, {user.name}! ✅</h1>
          <p>Role: {user.role}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default App