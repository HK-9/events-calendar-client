import constate from "constate";
import { useState } from "react";
import { getWeekDays } from "./helpers";

const CalendarContext = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const days = getWeekDays(currentWeek);

  return { currentWeek, setCurrentWeek, days };
};

export const [CalendarProvider, useCalendarContext] = constate(CalendarContext);
