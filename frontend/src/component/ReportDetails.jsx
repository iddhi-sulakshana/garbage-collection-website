import { Close, Flag, LocationOn } from "@mui/icons-material";
import {
  Box,
  Button,
  Fab,
  Grid,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
export default function ReportDetails({
  location,
  setClicked,
  setRefresh,
  refresh,
}) {
  const [selected, setSelected] = useState(false);
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
      <Box component="form" onSubmit={handleAccept} noValidate sx={{ mt: 1 }}>
        <TextField fullWidth label="Comment" variant="standard" />
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography component="div" variant="subtitle1" sx={{ pt: 1 }}>
              Mark as flagged
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButton
              value="check"
              color="error"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            >
              <Flag />
            </ToggleButton>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              color="error"
              onClick={handleReject}
            >
              Reject
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              type="submit"
              color="success"
            >
              Accept
            </Button>
          </Grid>
        </Grid>
      </Box>

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
  function handleAccept(e) {
    e.preventDefault();
    console.log("handle accept" + location.id);
    setClicked(null);
    setRefresh(refresh + 1);
  }
  function handleReject() {
    console.log("handle reject" + location.id);
    setClicked(null);
    setRefresh(refresh + 1);
  }
}
