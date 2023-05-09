import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNotification, useSetNotification } from "../hooks/AppContext";

export default function Notification() {
  const notification = useNotification();
  const setNotification = useSetNotification();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (notification) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notification]);
  function handleClose() {
    setNotification(null);
  }
  return (
    <Snackbar
      TransitionComponent={TransitionDown}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert severity={notification?.type} sx={{ width: "100%" }}>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
