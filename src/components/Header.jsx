import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
    const { user, logout } = useAuthContext();

    return (
        <header className=" site-header">
            <Link to= "/" className="brand">ActiveTrack</Link>
            <nav>
                {user ? (
                    <>
                    <span className="muted">Hi, {user.username}</span>
                    <button className="link-btn" onClick={logout} style={{ marginleft: 12 }}>
                        logout
                    </button>
                    </>
                ) : (   
                    <>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

