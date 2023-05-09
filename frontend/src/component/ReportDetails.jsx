import { Check, Clear, Close, Flag, LocationOn } from "@mui/icons-material";
import {
  Box,
  Fab,
  Grid,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import getURL from "../utils/getURL";
import { useToken } from "../hooks/AppContext";
import { useSnackbar } from "notistack";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

export default function ReportDetails({
  location,
  setClicked,
  setRefresh,
  refresh,
}) {
  const token = useToken();
  const { enqueueSnackbar } = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [flag, setFlag] = useState(false);
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
      <Box component="form" onSubmit={handleAccept} noValidate sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="Comment"
          variant="standard"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
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
              selected={flag}
              onChange={() => {
                setFlag(!flag);
              }}
            >
              <Flag />
            </ToggleButton>
          </Grid>

          <Grid item xs={6}>
            <LoadingButton
              loading={submitted}
              loadingPosition="start"
              startIcon={<Clear />}
              onClick={handleReject}
              fullWidth
              color="error"
              variant="contained"
            >
              Reject
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              loading={submitted}
              loadingPosition="start"
              startIcon={<Check />}
              type="submit"
              fullWidth
              color="success"
              variant="contained"
            >
              Accept
            </LoadingButton>
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
    setSubmitted(true);
    if (!comment || comment.length < 5) {
      enqueueSnackbar("Please enter a comment", { variant: "error" });
      return;
    }
    axios
      .request({
        method: "PATCH",
        url: getURL("incidents/accept/" + location._id),
        headers: {
          "x-auth-token": token,
        },
        data: {
          flag,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, { variant: "success" });

        setClicked(null);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data, { variant: "error" });
      })
      .finally(() => {
        setSubmitted(false);
      });
  }
  function handleReject() {
    setSubmitted(true);
    axios
      .request({
        method: "PATCH",
        url: getURL("incidents/reject/" + location._id),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, { variant: "success" });

        setClicked(null);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data, { variant: "error" });
      })
      .finally(() => {
        setSubmitted(false);
      });
  }
}
