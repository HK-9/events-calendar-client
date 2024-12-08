import { memo, useEffect } from "react";
import CreateEvent from "./components/CreateEvent";

import { useToggle } from "ahooks";
import useGetCalendarEvents from "../../hooks/use-get-calendar-events.hook";
import { OverlaidSpinner } from "../Shared";
import Navigation from "./components/Navigation";
import HoursSideBar from "./components/HoursSideBar";
import DaysHeaderBar from "./components/DaysHeaderBar";
import CalendarGrid from "./components/CalendarGrid";

const Calendar = () => {
  // const [currentWeek, setCurrentWeek] = useState(new Date());
  const [open, { toggle }] = useToggle(false);
  const { data: events, getMyEvents, loading } = useGetCalendarEvents();

  useEffect(() => {
    getMyEvents();
  }, []);

  return (
    <OverlaidSpinner loading={loading}>
      <div className="p-4">
        <Navigation toggle={toggle} />
        <div className="flex ">
          <HoursSideBar />
          <div className="flex-1">
            <DaysHeaderBar />
            <CalendarGrid events={events} />
          </div>
        </div>
        <CreateEvent open={open} handleClose={toggle} />
      </div>
    </OverlaidSpinner>
  );
};

export default memo(Calendar);
