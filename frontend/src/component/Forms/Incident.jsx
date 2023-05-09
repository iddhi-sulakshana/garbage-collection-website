import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectMap from "../SelectMap";
import { useToken } from "../../hooks/AppContext";
import { useSnackbar } from "notistack";
import getURL from "../../utils/getURL";
import { LoadingButton } from "@mui/lab";
import { Delete, Image, Save } from "@mui/icons-material";
import axios from "axios";

// coordinates for colombo
const center = {
  lat: 6.9271,
  lng: 79.8612,
};
export default function IncidentForm({ clicked, setClicked, setRefresh }) {
  const token = useToken();
  const { enqueueSnackbar } = useSnackbar();
  // to change values in form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [picture, setPicture] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTitle(clicked?.title || "");
    setDescription(clicked?.description || "");
    setLat(clicked?.location.lat || center.lat);
    setLng(clicked?.location.lng || center.lng);
    if (clicked) {
      fetch(getURL(clicked?.picture))
        .then((res) => res.blob())
        .then((blob) => {
          setPicture(blob);
        });
    } else {
      setPicture(null);
    }
  }, [clicked]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    let error = false;
    if (title.trim().length < 5) {
      error = true;
      enqueueSnackbar("Title should be at least have 5 characters", {
        variant: "error",
      });
    }
    if (description.trim().length < 5) {
      error = true;
      enqueueSnackbar("Description should be at least have 5 characters", {
        variant: "error",
      });
    }
    if (!picture) {
      error = true;
      enqueueSnackbar("Please select a picture", {
        variant: "error",
      });
    }
    if (error) {
      setSubmitted(false);
      return;
    }
    axios
      .request({
        method: clicked ? "PUT" : "POST",
        url: getURL("incidents/" + (clicked ? clicked._id : "")),
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
        data: {
          title,
          description,
          lat,
          lng,
          picture,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, {
          variant: "success",
        });
        setSubmitted(false);
        setClicked(null);
        setTitle("");
        setDescription("");
        setLat(center.lat);
        setLng(center.lng);
        setPicture(null);
        setRefresh((prev) => prev + 2);
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
        setSubmitted(false);
      });
  };

  const handleDelete = () => {
    setSubmitted(true);
    axios
      .delete(getURL("incidents/" + clicked._id), {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, {
          variant: "success",
        });
        setClicked(null);
        setRefresh((prev) => prev + 2);
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="div">
        {clicked ? "Update" : "Report"} Incident
      </Typography>
      {picture ? (
        <Box
          component="img"
          sx={{
            m: 1,
            height: "25vh",
          }}
          src={URL.createObjectURL(picture)}
          alt="Article Picture"
        />
      ) : (
        <Image sx={{ m: 1, height: 125, width: 125 }} color="primary" />
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%", pl: 5, pr: 5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Button
              startIcon={<Image />}
              component="label"
              fullWidth
              variant="contained"
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return setPicture(null);
                  setPicture(new Blob([file], { type: file.type }));
                }}
              />
              Select Image
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              required
              fullWidth
              name="title"
              label="Title"
              type="text"
              id="title"
            />
          </Grid>
          <Grid container item xs={12} sm={6} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lat}
                required
                fullWidth
                name="location1"
                label="Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">lat</InputAdornment>
                  ),
                  readOnly: true,
                }}
                type="text"
                id="location1"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lng}
                required
                fullWidth
                name="location2"
                label="Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">lng</InputAdornment>
                  ),
                  readOnly: true,
                }}
                type="text"
                id="location2"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              margin="normal"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              minRows={7}
              maxRows={7}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: { xs: 200, md: "100%" },
                mt: { xs: 0, md: 2 },
              }}
            >
              <SelectMap setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
            </Box>
          </Grid>{" "}
          <Grid item xs={6}>
            {clicked ? (
              <LoadingButton
                loading={submitted}
                loadingPosition="start"
                startIcon={<Delete />}
                onClick={handleDelete}
                fullWidth
                color="error"
                variant="contained"
              >
                {submitted ? "Deleting" : "Delete"}
              </LoadingButton>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              loading={submitted}
              loadingPosition="start"
              startIcon={<Save />}
              type="submit"
              fullWidth
              variant="contained"
            >
              {clicked && (submitted ? "Updating" : "Update")}
              {!clicked && (submitted ? "Creating" : "Create")}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
