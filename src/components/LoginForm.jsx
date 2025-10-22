import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    try {
      const result = login({ username: username.trim(), password });

      if (result.success) {
        navigate("/dashboard"); 
      } else {
        setError(result.message || "Invalid credentials.");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Welcome Back!</h2>

      {error && <div className="form-error">{error}</div>}

      <label className="form-label">
        Username
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your username"
        />
      </label>

      <label className="form-label">
        Password
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </label>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </button>

      <p className="muted">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-link">
          Sign up
        </Link>
      </p>
    </form>
  );
}
