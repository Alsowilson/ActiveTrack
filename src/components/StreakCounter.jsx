import React, { useMemo } from "react";

export default function StreakCounter({ workouts }) {
  const streak = useMemo(() => {
    if (!workouts.length) return 0;

    // Get unique workout dates (YYYY-MM-DD)
    const uniqueDates = [
      ...new Set(workouts.map((w) => w.date.split("T")[0])),
    ].sort((a, b) => new Date(b) - new Date(a)); // newest first

    let count = 0;
    let currentDate = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const workoutDate = new Date(uniqueDates[i]);
      const diffDays = Math.floor(
        (currentDate - workoutDate) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0 || diffDays === 1) {
        count++;
        currentDate = workoutDate; // move back one day
      } else {
        break; // streak broken
      }
    }

    return count;
  }, [workouts]);

  const getBadge = (streak) => {
    if (streak >= 14) return "🏆 Fitness Champion (14+ days!)";
    if (streak >= 7) return "🔥 One Week Warrior";
    if (streak >= 3) return "💪 3-Day Streak Starter";
    return null;
  };

  const badge = getBadge(streak);

  return (
    <div className="streak-section">
      <h2>🔥 Your Streak</h2>
      <div className="streak-display">
        <span className="streak-number">{streak}</span>
        <span className="streak-label">day{streak !== 1 ? "s" : ""} in a row</span>
      </div>
      {badge && <div className="badge">{badge}</div>}
      {!badge && <p className="muted">Keep logging workouts to earn badges!</p>}
    </div>
  );
}
