import { useState } from "react"
import LoginPage from "./pages/auth/LoginPage"

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      {!user && <LoginPage onLogin={(u) => setUser(u)} />}
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