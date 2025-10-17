import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
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

function AppContent() {
  const { login } = useAuthContext();

  const handleAuthSuccess = (userData) => {
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
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
