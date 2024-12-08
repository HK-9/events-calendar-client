import React, { FC } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CreateEventForm from "./CreateEventForm";

interface IModal {
  open: boolean;
  handleClose: () => void;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateEvent: FC<IModal> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <div className="mb-10">
          <Typography variant="h4" className="mb-10">
            Create New Event
          </Typography>
        </div>

        <CreateEventForm />
      </Box>
    </Modal>
  );
};

export default CreateEvent;
