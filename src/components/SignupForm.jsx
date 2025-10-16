import React, { useState } from "react";

export default function SignupForm({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!username.trim() || !email.trim() || !password) {
            setError("Please fill in all fields.");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
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
            await onSubmit({ username: username.trim(), email: email.trim(), password });
        } catch (err) {
            setError(err.message || "Signup failed.");
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
            placeholder="choose a username"
            />
        </label>

        <label className="form-label">
            Email
            <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            />
        </label>

        <label className="form-label">
            Password
            <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="at least 6 characters"
            />
        </label>

        <label className="form-label">
            Confirm Password
            <input
            className="form-input"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="repeat your password"
            />
        </label>

        <button type="submit" className="btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
        </button>
    </form>
  );
}   
