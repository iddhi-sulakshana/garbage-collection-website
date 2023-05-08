import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectMap from "../SelectMap";

// coordinates for colombo
const center = {
  lat: 6.9271,
  lng: 79.8612,
};
export default function CollectingForm({ clicked }) {
  // to change values in form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    setName(clicked?.name || "");
    setDescription(clicked?.description || "");
    setLat(clicked?.location.lat || center.lat);
    setLng(clicked?.location.lng || center.lng);
  }, [clicked]);

  const handleLogIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const submitData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    // let error = false;
    // if (
    //   submitData.email.trim().length === 0 ||
    //   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitData.email)
    // ) {
    //   error = true;
    //   setEmailError(true);
    // }
    // if (submitData.password.trim().length === 0) {
    //   error = true;
    //   setPasswordError(true);
    // }
    // if (error) return;

    const response = validate(submitData);

    if (response.status === 200) {
      alert("Success");
    }
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
        {!clicked && "Add"} Collecting Place
      </Typography>
      {clicked ? (
        <Box
          component="img"
          sx={{
            m: 1,
            height: "25vh",
          }}
          src={clicked?.picture}
          alt="Collecting Picture"
        />
      ) : (
        <Avatar
          sx={{ m: 1, height: 125, width: 125, bgcolor: "primary.main" }}
          alt="Collecting Picture"
        />
      )}

      <Box
        component="form"
        onSubmit={handleLogIn}
        noValidate
        sx={{ mt: 1, width: "100%", pl: 5, pr: 5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
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
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {clicked ? "Update" : "Create"}
        </Button>
        {clicked ? (
          <Button
            type="submit"
            fullWidth
            color="error"
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Delete
          </Button>
        ) : null}
      </Box>
    </Box>
  );
  function validate(data) {
    return {
      status: 200,
    };
  }
}
