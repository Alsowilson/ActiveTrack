import React from "react";

export default function WorkoutItem({ workout, onDelete }) {
    const handleDelete = () => {
        if (confirm( 'Delete "${workout.exercise}" workout?' )) {
            onDelete(workout.id);
        }
    };

    return (
        <div className="workout-item">
            <div>
                <strong>{workout.excercise}</strong> - {workout.category}
                <div className="muted">{workout.duration}</div>
            </div>
            <div>
                <button className="link-btn" onClick={handleDelete}> Delete</button>

            </div>
        </div>
    );
}
