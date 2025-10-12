import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">ActiveTrack Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here’s your latest activity summary.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold text-indigo-500">Workouts Completed</h2>
          <p className="text-4xl font-bold mt-3">12</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold text-indigo-500">Active Days</h2>
          <p className="text-4xl font-bold mt-3">25</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold text-indigo-500">Weekly Goal</h2>
          <p className="text-4xl font-bold mt-3">5/7</p>
        </div>
      </section>
    </div>
  );
}
