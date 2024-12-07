import React from "react";
import Calendar from "../components/Calendar/Calendar";
import { CalendarProvider } from "../components/Calendar/CalanderContex";

const Dashboard = () => {
  return (
    <CalendarProvider>
      <Calendar />;
    </CalendarProvider>
  );
};

export default Dashboard;
