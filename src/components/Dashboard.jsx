import React, { useState, useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutList from "../components/WorkoutList";
import { useAuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [workouts, setWorkouts] = useState([]);

 
  useEffect(() => {
    const saved = localStorage.getItem("activeTrackWorkouts");
    if (saved) setWorkouts(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("activeTrackWorkouts", JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout) => {
    setWorkouts([workout, ...workouts]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  return (
    <div>
      <h1>{user ? `${user.username}'s Dashboard` : "Dashboard"}</h1>
      <WorkoutForm onAdd={addWorkout} />
      <hr style={{ margin: "20px 0" }} />
      <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
    </div>
  );
}
