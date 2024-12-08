import React from "react";
import { CircularProgress, Backdrop, Box } from "@mui/material";

interface OverlaidSpinnerProps {
  loading: boolean;
  children: React.ReactNode;
}

export function OverlaidSpinner({ loading, children }: OverlaidSpinnerProps) {
  return (
    <Box className="relative w-full">
      {loading && (
        <Backdrop
          open={loading}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {children}
    </Box>
  );
}
