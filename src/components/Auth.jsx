import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function Auth({ onAuthSuccess }) {
  
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => setIsLogin(prev => !prev);

  
  const handleLogin = async (credentials) => {
    console.log("Login attempt:", credentials);
    
    
    onAuthSuccess && onAuthSuccess({ username: credentials.username });
  };

  const handleSignup = async (payload) => {
    console.log("Signup attempt:", payload);
    
    onAuthSuccess && onAuthSuccess({ username: payload.username });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome back!" : "Create your account"}</h2>
          <p className="muted">
            {isLogin ? "Log in to track your workouts." : "Sign up to start tracking."}
          </p>
        </div>

        <div className="auth-body">
          {isLogin ? (
            <LoginForm onSubmit={handleLogin} />
          ) : (
            <SignupForm onSubmit={handleSignup} />
          )}
        </div>

        <div className="auth-footer">
          <button className="link-btn" onClick={handleToggle}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
