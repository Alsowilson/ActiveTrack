import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./App.css";

function Home() {
  return (
    <div className="page">
      <h1>Welcome to ActiveTrack</h1>
      <p>Your workout & fitness tracker.</p>
      <div style={{ marginTop: 16 }}>
        <Link className="btn" to="/login">Log in</Link>
        <Link className="btn btn-ghost" to="/signup" style={{ marginLeft: 8 }}>Sign up</Link>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (userData) => {
   
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header className="site-header">
          <Link to="/" className="brand">ActiveTrack</Link>
          <nav>
            {user ? (
              <span className="muted">Hi, {user.username}</span>
            ) : (
              <>
                <Link to="/login" className="nav-link">Log in</Link>
                <Link to="/signup" className="nav-link">Sign up</Link>
              </>
            )}
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/signup" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
          </Routes>
        </main>

        <footer className="site-footer">
          <small>© {new Date().getFullYear()} ActiveTrack</small>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
