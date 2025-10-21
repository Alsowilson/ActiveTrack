import React from "react";
import CalendarDay from "./CalendarDay";

export default function WeeklyCalendar({ workouts }) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Set to Sunday

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfweek);
        date.setDate(startOfWeek.getDate() + i);
        const iso = date.toISOString().split("T")[0];
        const dayworkouts = workouts.filter((w) => w.date.startsWith(iso));
        return { date: iso, workouts: dayWorkouts };
    });

    return (
        <div style={{ marginTop: 30 }}>
            <h2>This Week's Workouts</h2>
            <div className="calendar-grid">
                {weekDays.map((day) => (
                    <CalendarDay key={d.date} date={d.date} workouts={d.workouts} />    
                ))}
            </div>
        </div>
    );
}
