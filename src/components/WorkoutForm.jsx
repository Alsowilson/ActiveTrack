import React, { useEffect, useState } from "react";

export default function WorkoutForm({ onAdd }) {
  const [exercise, setExercise] = useState("");
  const [categories, setCategories] = useState([
    { id: "strength", name: "Strength" },
    { id: "cardio", name: "Cardio" },
    { id: "flexibility", name: "Flexibility" },
    { id: "other", name: "Other" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("strength");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://wger.de/api/v2/exercisecategory/");
        const data = await res.json();
        setCategories(
          data.results.map((c) => ({
            id: c.id,
            name: c.name,
          }))
        );
      } catch (e) {
        console.error("Failed to fetch categories:", e);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise.trim() || !duration) {
      setError("Please enter exercise and duration.");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA"); 

    const newWorkout = {
      id: Date.now(),
      exercise: exercise.trim(),
      category: selectedCategory.toLowerCase(),
      duration,
      date: today,
    };

    onAdd(newWorkout);

    setExercise("");
    setSelectedCategory("strength");
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.name.toLowerCase()}>
              {c.name}
            </option>
          ))}
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
