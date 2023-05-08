import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import getURL from "../utils/getURL";
import { LoadingButton } from "@mui/lab";
const theme = createTheme();
export default function Signup() {
  const { enqueueSnackbar } = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    const data = new FormData(event.currentTarget);

    const submitData = {
      name: data.get("firstName") + " " + data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      password: data.get("password"),
    };
    let error = false;
    if (submitData.name.trim().length < 5) {
      error = true;
      setFNameError(true);
      setLNameError(true);
      enqueueSnackbar("Name should be at least have 5 characters", {
        variant: "error",
      });
    }
    if (
      submitData.email.trim().length < 5 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitData.email)
    ) {
      error = true;
      setEmailError(true);
      enqueueSnackbar("Incorrect Email", { variant: "error" });
    }
    if (
      submitData.phone.trim().length < 5 ||
      !/^[0-9]{10}$/.test(submitData.phone)
    ) {
      error = true;
      setPhoneError(true);
      enqueueSnackbar("Phone number should be have 10 numbers", {
        variant: "error",
      });
    }
    if (submitData.address.trim().length < 5) {
      error = true;
      setAddressError(true);
      enqueueSnackbar("Address should be have at least 5 characters", {
        variant: "error",
      });
    }
    if (submitData.password.trim().length < 5) {
      error = true;
      setPasswordError(true);
      enqueueSnackbar("Password should be have at least 5 characters", {
        variant: "error",
      });
    }
    if (error) return setSubmitted(false);
    axios
      .request({
        method: "post",
        maxBodyLength: Infinity,
        url: getURL(),
        data: submitData,
      })
      .then((response) => {
        enqueueSnackbar(response.data, { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignup}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => {
                    if (
                      e.target.value.trim === "" ||
                      e.target.value.trim().length < 5
                    )
                      return setFNameError(true);
                    setFNameError(false);
                  }}
                  error={fNameError}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => {
                    if (
                      e.target.value.trim === "" ||
                      e.target.value.trim().length < 5
                    )
                      return setLNameError(true);
                    setLNameError(false);
                  }}
                  error={lNameError}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    if (
                      e.target.value.trim === "" ||
                      e.target.value.trim().length < 5 ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    )
                      return setEmailError(true);
                    setEmailError(false);
                  }}
                  error={emailError}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className="error"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    if (
                      e.target.value.trim === "" ||
                      e.target.value.trim().length < 5 ||
                      !/^[0-9]{10}$/.test(e.target.value)
                    )
                      return setPhoneError(true);
                    setPhoneError(false);
                  }}
                  error={phoneError}
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  className="error"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    if (
                      e.target.value.trim === "" ||
                      e.target.value.trim().length < 5
                    )
                      return setAddressError(true);
                    setAddressError(false);
                  }}
                  error={addressError}
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  className="error"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    if (
                      e.target.value.trim === "" ||
                      e.target.value.trim().length < 5
                    )
                      return setPasswordError(true);
                    setPasswordError(false);
                  }}
                  error={passwordError}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={submitted}
              loadingPosition="start"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {submitted ? "Signing up..." : "Sign Up"}
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
