import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { CheckBox, LockOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetToken, useToken } from "../hooks/AppContext";
import { useSnackbar } from "notistack";
import axios from "axios";
import getURL from "../utils/getURL";
import { LoadingButton } from "@mui/lab";

const theme = createTheme();

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const token = useToken();
  const setToken = useSetToken();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogIn = (event) => {
    event.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    const data = new FormData(event.currentTarget);

    const submitData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    let error = false;
    if (
      submitData.email.trim().length < 5 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitData.email)
    ) {
      error = true;
      setEmailError(true);
      enqueueSnackbar("Incorrect Email", { variant: "error" });
    }
    if (submitData.password.trim().length < 5) {
      error = true;
      setPasswordError(true);
      enqueueSnackbar("Incorrect password", { variant: "error" });
    }
    if (error) return setSubmitted(false);

    axios
      .request({
        method: "POST",
        url: getURL("auth/login"),
        data: submitData,
        maxBodyLength: Infinity,
      })
      .then((response) => {
        localStorage.setItem("x-token", response.headers.get("x-auth-token"));
        setToken(response.headers.get("x-auth-token"));
        enqueueSnackbar(response?.data || "Successfully logged in", {
          variant: "success",
        });
        setSubmitted(false);
        navigate("/");
      })
      .catch((error) => {
        setSubmitted(false);
        enqueueSnackbar(error.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
      });

    // if (response.status === 200) {
    //   localStorage.setItem("x-token", "12312313");
    //   setToken("12312313");
    //   navigate("/");
    // } else {
    //   alert("Login failed: " + response.message);
    // }
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogIn}
            noValidate
            sx={{ mt: 1 }}
          >
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
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<CheckBox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              loading={submitted}
              startIcon={<LockOutlined />}
              loadingPosition="start"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {submitted ? "Signing in..." : "Sign In"}
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link to="/ondev" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
