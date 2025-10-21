import React from "react";

export default function DailyWorkoutVie({ workouts }) {
    const today = new Date().toISOString().split("T")[0];

    const todaysWorkouts = workouts.filter((w) =>
        w.date.startsWith(today)
    );

    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Today's Workouts</h2>
            {todaysWorkouts.length ? (
                <ul className="daily-list">
                    {todaysWorkouts.map((w) => (
                        <li key={w.id}>
                            <strong>{w.excercise}</strong> -{w.duration} ({w.category})
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="muted">No workouts logged for today.</p>
            )}
        </div>
    );
}