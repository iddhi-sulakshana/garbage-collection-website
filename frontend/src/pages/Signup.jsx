import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { CheckBox, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
const theme = createTheme();
export default function Signup() {
  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const submitData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    let error = false;
    if (submitData.firstName.trim().length === 0) {
      error = true;
      setFNameError(true);
    }
    if (submitData.lastName.trim().length === 0) {
      error = true;
      setLNameError(true);
    }
    if (
      submitData.email.trim().length === 0 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitData.email)
    ) {
      error = true;
      setEmailError(true);
    }
    if (submitData.password.trim().length === 0) {
      error = true;
      setPasswordError(true);
    }

    if (!error) {
      alert("Signup success");
    } else {
      alert("Signup failed");
    }
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
                      e.target.value.trim().length === 0
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
                      e.target.value.trim().length === 0
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
                      e.target.value.trim().length === 0 ||
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
                      e.target.value.trim().length === 0
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <CheckBox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
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
