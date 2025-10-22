import React from "react";
import CalendarDay from "./CalendarDay";
import { startOfWeek, addDays, format } from "date-fns"; 

export default function WeeklyCalendar({ workouts = [] }) {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); 

  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const iso = format(date, "yyyy-MM-dd");

    const dayWorkouts = workouts.filter((w) => w.date.startsWith(iso));
    return { date, iso, workouts: dayWorkouts };
  });

  return (
    <div className="weekly-calendar mt-8">
      <h2 className="text-xl font-semibold mb-4">This Week’s Workouts</h2>
      <div className="calendar-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {weekDays.map((day) => (
          <CalendarDay
            key={day.iso}
            date={day.date}
            workouts={day.workouts}
          />
        ))}
      </div>
    </div>
  );
}
