import React, { useState, useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutList from "../components/WorkoutList";
import DailyWorkoutView from "../components/DailyWorkoutView";
import WeeklyCalendar from "../components/WeeklyCalendar";
import Stats from "../components/Stats";
import StreakCounter from "../components/StreakCounter";
import Header from "../components/Header";
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

  const today = new Date().toISOString().split("T")[0];
  const todaysWorkouts = workouts.filter((w) => w.date === today);

  return (
    <div className="min-h-screen bg-gray-50">
  

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Welcome back, {user?.username || "Athlete"} 🏋️
        </h1>
        <p className="text-gray-600 mb-8">
          Stay consistent and track your progress for this week.
        </p>

       
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <Stats workouts={workouts} />
          </div>

          <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Streak Counter</h2>
            <StreakCounter workouts={workouts} />
          </div>
        </section>

        
        <section className="mb-10 p-6 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Calendar</h2>
          <WeeklyCalendar workouts={workouts} />
        </section>

        
        <section className="mb-10 p-6 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Today’s Workouts</h2>
          {todaysWorkouts.length > 0 ? (
            <WorkoutList workouts={todaysWorkouts} onDelete={deleteWorkout} />
          ) : (
            <p className="text-gray-500 italic">
              No workouts yet for today. Let’s add one!
            </p>
          )}
        </section>

        
        <section className="p-6 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add a New Workout</h2>
          <WorkoutForm onAdd={addWorkout} />
        </section>

       
        <section className="mt-10">
          <DailyWorkoutView workouts={workouts} />
        </section>
      </main>
    </div>
  );
}
