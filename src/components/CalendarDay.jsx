import React from "react";

export default function CalendarDay({ date, workouts }) {
  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  const isToday = new Date().toDateString() === new Date(date).toDateString();
  const hasWorkout = workouts.length > 0;

  return (
    <div
      className={`calendar-day ${isToday ? "today" : ""} ${
        hasWorkout ? "active" : ""
      }`}
    >
      <div className="day-name">{dayName}</div>
      <div className="day-count">{hasWorkout ? workouts.length : 0}</div>
    </div>
  );
}
