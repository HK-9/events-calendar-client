import React, { FC } from "react";
import Button from "@mui/material/Button";

import { IconButton, Tooltip } from "@mui/material";

import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import Add from "@mui/icons-material/Add";

import { useCalendarContext } from "../CalendarContext";

interface INavigationProps {
  toggle: () => void;
}

const Navigation: FC<INavigationProps> = ({ toggle }) => {
  const { currentWeek, setCurrentWeek, days } = useCalendarContext();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center mb-4 gap-3">
        <Tooltip title="Switch to current week">
          <Button
            variant="text"
            color="success"
            startIcon={<MoveUpIcon />}
            onClick={() => setCurrentWeek(new Date())}
          >
            Today
          </Button>
        </Tooltip>
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
      <div>
        <Button
          color="success"
          variant="contained"
          startIcon={<Add />}
          onClick={toggle}
        >
          New Event
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
