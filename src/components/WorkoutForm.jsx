import React, { useEffect, useState } from "react";

export default function WorkoutForm({ onAdd }) {
  const [exercise, setExercise] = useState("");
  // ✅ FIX 1a: Correctly define categories as state, initialized to an array of default values.
  const [categories, setCategories] = useState([
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'flexibility', name: 'Flexibility' },
    { id: 'other', name: 'Other' },
  ]);
  // ✅ FIX 1b: Use a separate state for the currently selected category value.
  const [selectedCategory, setSelectedCategory] = useState("strength"); 
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://wger.de/api/v2/exercisecategory/");
      const data = await res.json();
      // Only set categories if the fetch is successful.
      // We are overriding the default list here.
      setCategories(data.results.map(c => ({ id: c.id, name: c.name })));
    }
    fetchCategories();
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise.trim() || !duration) {
      setError("Please enter exercise and duration.");
      return;
    }
    
    // Get the date in the YYYY-MM-DD format for filtering in Dashboard.jsx
    const today = new Date().toISOString().split("T")[0]; // FIX 2

    const newWorkout = {
      id: Date.now(),
      exercise: exercise.trim(),
      category: selectedCategory, // Use the state holding the selected value
      duration,
      date: today, // ✅ FIX 2: Use the YYYY-MM-DD format for filtering
    };
    
    onAdd(newWorkout);
    
    setExercise("");
    setSelectedCategory("strength"); // Use the correct setter
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
          value={selectedCategory} // Use the state holding the selected value
          onChange={(e) => setSelectedCategory(e.target.value)} // Use the correct setter
        >
          {/* Dynamically render categories from state */}
          {categories.map((c) => (
            // Ensure the value matches the id used for selection
            <option key={c.id} value={c.name}>
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