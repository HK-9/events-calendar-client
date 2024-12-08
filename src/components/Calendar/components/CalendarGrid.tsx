import React, { FC, useEffect, useState } from "react";
import { useCalendarContext } from "../CalendarContext";
import { IEventData } from "../../../types/forms";

interface ICalendarProps {
  events: IEventData[];
}

const CalendarGrid: FC<ICalendarProps> = ({ events }) => {
  const { days } = useCalendarContext();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  let hours = currentTime.getHours(); // getHours returns the hour in 24-hour format
  let minutes = currentTime.getMinutes();

  const minutesSinceMidnight = hours * 60 + minutes; // Calculate total minutes from midnight
  const pixelsPerMinute = 2302 / 1440; // 1px per minute (1440 minutes in a day)
  const currentPosition = minutesSinceMidnight * pixelsPerMinute;

  return (
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
              className="absolute left-0 right-0 h-[2px] bg-red-500 z-50"
              style={{
                top: `${currentPosition}px`,
              }}
            ></div>
          )}

          {/* Day Events */}
          {events
            .filter(
              (event) => event.startDate.toDateString() === day.toDateString()
            )
            .map((event, index) => {
              // Convert event's start time to minutes since midnight
              const startMinutes =
                event.startDate.getHours() * 60 + event.startDate.getMinutes();
              const endMinutes =
                event.endDate.getHours() * 60 + event.endDate.getMinutes();

              // Calculate event height and position based on start and end time
              const eventTop = startMinutes * pixelsPerMinute;
              const eventHeight = (endMinutes - startMinutes) * pixelsPerMinute;

              return (
                <div
                  key={index}
                  className="absolute left-1 right-1 bg-blue-500 text-white rounded-md p-2 text-xs"
                  style={{
                    top: `${eventTop}px`, // Position the event
                    height: `${eventHeight}px`, // Adjust the height based on duration
                  }}
                >
                  <strong>{event.name}</strong>
                  <div>
                    {event.startDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {event.endDate.toLocaleTimeString([], {
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
  );
};

export default CalendarGrid;
