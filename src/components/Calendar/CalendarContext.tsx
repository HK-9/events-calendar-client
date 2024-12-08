import React, { createContext, useState, useContext, ReactNode } from "react";
import { getWeekDays } from "./helpers";

interface CalendarContextType {
  currentWeek: Date;
  setCurrentWeek: React.Dispatch<React.SetStateAction<Date>>;
  days: Date[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const days = getWeekDays(currentWeek);

  return (
    <CalendarContext.Provider value={{ currentWeek, setCurrentWeek, days }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
};
