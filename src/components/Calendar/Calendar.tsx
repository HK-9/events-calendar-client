import React, { useState, useEffect } from "react";

// Event Data
const initialEvents = [
  {
    title: "Standup",
    start: new Date(2024, 11, 11, 10, 0),
    end: new Date(2024, 11, 11, 11, 0),
  },
  {
    title: "Demo",
    start: new Date(2024, 11, 14, 13, 30),
    end: new Date(2024, 11, 14, 14, 30),
  },
];

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const [currentTime, setCurrentTime] = useState(new Date());
  console.log("currentTimes", currentTime);

  // Helper to get week days
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const days = getWeekDays(currentWeek);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Convert to 24-hour format if necessary
  let hours = currentTime.getHours(); // getHours returns the hour in 24-hour format
  let minutes = currentTime.getMinutes();

  console.log(hours, minutes);

  const minutesSinceMidnight = hours * 60 + minutes; // Calculate total minutes from midnight
  const pixelsPerMinute = 2302 / 1440; // 1px per minute (1440 minutes in a day)
  const currentPosition = minutesSinceMidnight * pixelsPerMinute;
  console.log("position", currentPosition);

  // Generate hours for the left sidebar (AM/PM format)
  const generateHours = () => {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i % 12 === 0 ? 12 : i % 12; // Format for 12-hour time
      const period = i < 12 ? "AM" : "PM";
      return `${hour < 10 ? `0${hour}` : hour}:00 ${period}`;
    });
  };

  return (
    <div className="p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={() =>
            setCurrentWeek(
              new Date(currentWeek.setDate(currentWeek.getDate() - 7))
            )
          }
        >
          Previous Week
        </button>
        <h2 className="text-lg font-semibold">
          Week of {days[0].toDateString()} - {days[6].toDateString()}
        </h2>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={() =>
            setCurrentWeek(
              new Date(currentWeek.setDate(currentWeek.getDate() + 7))
            )
          }
        >
          Next Week
        </button>
      </div>

      <div className="flex">
        {/* Hours Sidebar */}
        <div className="w-16 mt-10 flex flex-col">
          {generateHours().map((hour, index) => (
            <div
              key={index}
              className="flex items-start h-24 text-sm text-gray-500"
            >
              {hour}
            </div>
          ))}
        </div>

        {/* Days Header and Grid */}
        <div className="flex-1">
          {/* Days Header */}
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

          {/* Calendar Grid */}
          <div className="relative grid grid-cols-7 divide-x divide-y divide-gray-200 border">
            {days.map((day, colIndex) => (
              <div
                key={colIndex}
                className="relative"
                style={{ height: "2302px" }} // Match hours sidebar height
              >
                {/* Current Time Line */}
                {day.toDateString() === currentTime.toDateString() && (
                  <div
                    className="absolute left-0 right-0 h-[2px] bg-red-500"
                    style={{
                      top: `${currentPosition}px`,
                    }}
                  ></div>
                )}

                {/* Day Events */}
                {events
                  .filter(
                    (event) => event.start.toDateString() === day.toDateString()
                  )
                  .map((event, index) => {
                    // Convert event's start time to minutes since midnight
                    const startMinutes =
                      event.start.getHours() * 60 + event.start.getMinutes();
                    const endMinutes =
                      event.end.getHours() * 60 + event.end.getMinutes();

                    // Calculate event height and position based on start and end time
                    const eventTop = startMinutes * pixelsPerMinute;
                    const eventHeight =
                      (endMinutes - startMinutes) * pixelsPerMinute;

                    return (
                      <div
                        key={index}
                        className="absolute left-1 right-1 bg-blue-500 text-white rounded-md p-2 text-xs"
                        style={{
                          top: `${eventTop}px`, // Position the event
                          height: `${eventHeight}px`, // Adjust the height based on duration
                        }}
                      >
                        <strong>{event.title}</strong>
                        <div>
                          {event.start.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {event.end.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
