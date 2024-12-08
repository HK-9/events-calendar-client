import React, { useState, ReactNode, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

type AlertContextType = (
  message: string,
  severity?: AlertColor,
  duration?: number
) => void;

const AlertContext = React.createContext<AlertContextType | undefined>(
  undefined
);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [duration, setDuration] = useState<number>(6000);

  const showAlert = (
    newMessage: string,
    newSeverity: AlertColor = "info",
    newDuration: number = 6000
  ) => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setDuration(newDuration);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration]);

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideAlert} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
