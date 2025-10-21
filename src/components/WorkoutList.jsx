import React from "react";
import WorkoutItem from "./WorkoutItem";

export default function WorkoutList({ workouts, onDelete }) {
    if (!workouts.length) {
        return <p className="muted">No workouts logged yet. Start tracking!</p>;
    }

    return (
        <div className="workout-list">
            {workouts.map((w) => (
                <workoutItem key={w.id} workout={w} onDelete={onDelete} />
            ))}
        </div>
    );
}
