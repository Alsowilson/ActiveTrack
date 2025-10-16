import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1>ActiveTrack Dashboard (placeholder)</h1>
      <p>This is a placeholder dashboard. We'll replace this with the main app views (workouts, calendar) soon.</p>

      <p>
        Quick links: <Link to="/login">Login</Link> · <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
