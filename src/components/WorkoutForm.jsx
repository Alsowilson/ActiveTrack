import React, { useState } from "react";

export default function WorkoutForm({ onAdd }) {
  const [exercise, setExercise] = useState("");
  const [category, setCategory] = useState("strength");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise.trim() || !duration) {
      setError("Please enter exercise and duration.");
      return;
    }
    const newWorkout = {
      id: Date.now(),
      exercise: exercise.trim(),
      category,
      duration,
      date: new Date().toISOString(),
    };
    onAdd(newWorkout);
    setExercise("");
    setCategory("strength");
    setDuration("");
    setError(null);
  };

  return (
    <form className="form" onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <h3>Add Workout</h3>
      {error && <div className="form-error">{error}</div>}

      <label className="form-label">
        Exercise
        <input
          className="form-input"
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="e.g. Push-ups"
        />
      </label>

      <label className="form-label">
        Category
        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="form-label">
        Duration (mins / sets)
        <input
          className="form-input"
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g. 30 mins"
        />
      </label>

      <button type="submit" className="btn" style={{ marginTop: 8 }}>
        Add Workout
      </button>
    </form>
  );
}

