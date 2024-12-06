import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertState } from "@/constants/types";

interface AlertComponentProps {
  alertState: AlertState;
  setAlertState: React.Dispatch<React.SetStateAction<AlertState>>;
}

export default function AlertComponent({
  alertState,
  setAlertState,
}: AlertComponentProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={alertState.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={alertState.severity}
        sx={{ width: "100%" }}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}
