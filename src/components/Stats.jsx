import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function Stats({ workouts }) {
 
  const totalWorkouts = workouts.length;

  const totalDuration = workouts.reduce((sum, w) => {
    const val = parseInt(w.duration);
    return !isNaN(val) ? sum + val : sum;
  }, 0);

  // Prepare data for last 7 days
  const last7DaysData = useMemo(() => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i)); // go 6 days back
      const iso = d.toISOString().split("T")[0];
      const count = workouts.filter((w) => w.date.startsWith(iso)).length;
      return {
        date: d.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      };
    });
    return days;
  }, [workouts]);

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Your Stats</h2>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>{totalWorkouts}</h3>
          <p>Total Workouts</p>
        </div>
        <div className="stat-card">
          <h3>{totalDuration}</h3>
          <p>Total Duration (mins/sets)</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Workouts (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={last7DaysData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={6} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Workout Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={last7DaysData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
