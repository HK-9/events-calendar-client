import constate from "constate";

const calendarContext = () => {
  return {};
};

export const [CalendarProvider, useCalendarContext] = constate(calendarContext);
