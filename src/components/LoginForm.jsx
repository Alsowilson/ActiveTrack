import React, { useState } from "react"; 

export default function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!username.trim() || !password.trim()) { 
            setError("Username and password are required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!validate()) return;
        setLoading(true);
        try {
            await onSubmit({ username: username.trim(), password: password  });
        } catch (err) {
            setError(Error.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
    <form className="form" onSubmit={handleSubmit}>
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
    </form>
  );
}