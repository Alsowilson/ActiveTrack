import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
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

function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className="site-header">
      <Link to="/" className="brand">ActiveTrack</Link>
      <nav>
        {user ? (
          <>
            <span className="muted">Hi, {user.username}</span>
            <button className="link-btn" onClick={logout} style={{ marginLeft: 12 }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Log in</Link>
            <Link to="/signup" className="nav-link">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function AppContent() {
  const { login, signup, user } = useAuthContext();

  const handleAuthSuccess = (userData) => {
    // context handles persistence
    login(userData);
  };

  return (
    <div className="app">
      <Header />

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
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
