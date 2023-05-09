import { Check, Close, LocationOn } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import React, { useState } from "react";
import getURL from "../utils/getURL";
import { LoadingButton } from "@mui/lab";
import { useToken } from "../hooks/AppContext";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
export default function IncidentDetails({ location, setClicked, setRefresh }) {
  const token = useToken();
  const [submitted, setSubmitted] = useState(false);

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
        src={getURL(location?.picture)}
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
      <LoadingButton
        loading={submitted}
        loadingPosition="start"
        startIcon={<Check />}
        onClick={markAsCompleted}
        fullWidth
        sx={{ mt: { xs: 1, md: 2 } }}
        color="success"
        variant="contained"
      >
        Mark as Completed
      </LoadingButton>
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
    setSubmitted(true);
    axios
      .request({
        method: "PATCH",
        url: getURL("incidents/complete/" + location._id),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, { variant: "success" });
        setClicked(null);
        setRefresh((prev) => prev + 2);
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data, { variant: "error" });
      })
      .finally(() => {
        setSubmitted(false);
      });
  }
}
