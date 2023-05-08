import { Close, LocationOn } from "@mui/icons-material";
import { Box, Button, Fab, Typography } from "@mui/material";
import React from "react";
export default function IncidentDetails({ location, setClicked }) {
  return (
    <Box sx={{ p: { xs: 0, md: 3 }, position: "relative" }} textAlign="center">
      <Box
        component="img"
        sx={{
          width: "100%",
          height: { xs: "25vh", md: "30vh" },
          objectFit: { xs: "fit", md: "cover" },
        }}
        alt={location?.title}
        src={location?.picture}
      />

      <Typography component="div" variant="h5" sx={{ pt: 1 }}>
        {location?.title}
      </Typography>
      <Typography
        variant="subtitle4"
        color="text.secondary"
        component="div"
        sx={{ pt: 1 }}
      >
        {location?.description}
      </Typography>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 1 }}
      >
        <LocationOn />
        {location?.location.lat + " " + location?.location.lng}
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 1 }}
        onClick={markAsCompleted}
        color="success"
      >
        Mark as Completed
      </Button>
      <Fab
        sx={{ position: "absolute", top: { xs: 0, md: 0 }, right: 0 }}
        color="primary"
        size="small"
        aria-label="refresh"
        onClick={() => {
          setTimeout(() => {
            setClicked(null);
          }, 200);
        }}
      >
        <Close />
      </Fab>
    </Box>
  );
  function markAsCompleted() {
    console.log("Marked as completed" + location.id);
  }
}
