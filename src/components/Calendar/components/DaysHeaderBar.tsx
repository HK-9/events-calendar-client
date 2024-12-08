import React from "react";
import { useCalendarContext } from "../CalendarContext";

const DaysHeaderBar = () => {
  const { days } = useCalendarContext();
  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {days.map((day) => (
        <div
          key={day.toISOString()}
          className="text-center py-2 font-medium text-gray-700"
        >
          {day.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          })}
        </div>
      ))}
    </div>
  );
};

export default DaysHeaderBar;
