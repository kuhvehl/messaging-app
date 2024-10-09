// frontend/src/App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav>
          {user ? (
            <>
              <span>Welcome, {user.username}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat/:userId"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
