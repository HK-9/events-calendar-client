import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import CreateEvent from "./components/CreateEvent";

import { IconButton, Tooltip } from "@mui/material";
import { useToggle } from "ahooks";

import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import Add from "@mui/icons-material/Add";
import useGetCalendarEvents from "../../hooks/use-get-calendar-events.hook";
import { OverlaidSpinner } from "../Shared";
import { generateHours, getWeekDays } from "./helpers";

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [open, { toggle }] = useToggle(false);

  const { data: events, getMyEvents, loading } = useGetCalendarEvents();

  useEffect(() => {
    getMyEvents();
  }, []);

  //REFS
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState(new Date());

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

  const minutesSinceMidnight = hours * 60 + minutes; // Calculate total minutes from midnight
  const pixelsPerMinute = 2302 / 1440; // 1px per minute (1440 minutes in a day)
  const currentPosition = minutesSinceMidnight * pixelsPerMinute;

  return (
    <OverlaidSpinner loading={loading}>
      <div className="p-4">
        {/* Navigation */}
        <div className="flex justify-between">
          <div className="flex items-center mb-4 gap-3">
            <Button
              variant="text"
              startIcon={<MoveUpIcon />}
              onClick={() => setCurrentWeek(new Date())}
            >
              Today
            </Button>
            <Tooltip title="Go to previous week">
              <IconButton
                onClick={() =>
                  setCurrentWeek(
                    new Date(currentWeek.setDate(currentWeek.getDate() - 7))
                  )
                }
              >
                <ArrowLeft />
              </IconButton>
            </Tooltip>
            <h2 className="text-lg font-semibold">
              {days[0].toDateString()} - {days[6].toDateString()}
            </h2>
            <Tooltip title="Go to next week">
              <IconButton
                onClick={() =>
                  setCurrentWeek(
                    new Date(currentWeek.setDate(currentWeek.getDate() + 7))
                  )
                }
              >
                <ArrowRight />
              </IconButton>
            </Tooltip>
          </div>
          <Button
            color="success"
            variant="outlined"
            startIcon={<Add />}
            onClick={toggle}
          >
            New Event
          </Button>
        </div>

        <div className="flex ">
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
            <div
              className="grid grid-cols-7 border-b border-gray-200"
              ref={gridContainerRef}
            >
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
                      className="absolute left-0 right-0 h-[2px] bg-red-500 z-50"
                      style={{
                        top: `${currentPosition}px`,
                      }}
                    ></div>
                  )}

                  {/* Day Events */}
                  {events
                    .filter(
                      (event) =>
                        event.startDate.toDateString() === day.toDateString()
                    )
                    .map((event, index) => {
                      // Convert event's start time to minutes since midnight
                      const startMinutes =
                        event.startDate.getHours() * 60 +
                        event.startDate.getMinutes();
                      const endMinutes =
                        event.endDate.getHours() * 60 +
                        event.endDate.getMinutes();

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
          </div>
        </div>
        <CreateEvent open={open} handleClose={toggle} />
      </div>
    </OverlaidSpinner>
  );
};

export default Calendar;
