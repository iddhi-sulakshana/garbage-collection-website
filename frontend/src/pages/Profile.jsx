import React, { useState } from "react";
import CustomThemeProvider from "../component/CustomThemeProvider";
import { useToken, useUser } from "../hooks/AppContext";
import { Avatar, Box, Card, TextField, Typography } from "@mui/material";
import Loader, { LoaderError } from "../component/Loader";
import getURL from "../utils/getURL";
import { LoadingButton } from "@mui/lab";
import { Password } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function Profile() {
  const token = useToken();
  const { user, error, loading } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <CustomThemeProvider>
      <Card
        elevation={5}
        sx={{
          minWidth: { xs: "90vw", md: "50vw" },
          minHeight: "50vh",
          maxHeight: "75vh",
        }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <LoaderError error={error} />
        ) : (
          <>
            <Avatar
              elevation={3}
              src={getURL(user?.picture)}
              alt="User Picture"
              sx={{
                height: 150,
                width: 150,
                position: "absolute",
                top: -40,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
            <Box
              sx={{
                pt: 15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography component="div" variant="h4">
                {user?.name}
              </Typography>
              <Typography component="div" variant="h6">
                {user?.email}
              </Typography>
              <Typography component="div" variant="subtitle2">
                {user?.address}
              </Typography>
              <Typography component="div" variant="subtitle1">
                {user?.phone}
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={changePassword}
              >
                <TextField
                  variant="standard"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <LoadingButton
                  loading={submitted}
                  startIcon={<Password />}
                  loadingPosition="start"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {submitted ? "Changing" : "Change"}
                </LoadingButton>
              </Box>
            </Box>
          </>
        )}
      </Card>
    </CustomThemeProvider>
  );
  function changePassword(event) {
    event.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    if (password.trim().length < 5) {
      setSubmitted(false);
      return enqueueSnackbar("Password must be at least 5 characters long", {
        variant: "error",
      });
    }
    axios
      .request({
        method: "PATCH",
        url: getURL("users/password"),
        headers: {
          "x-auth-token": token,
        },
        data: { password },
      })
      .then((response) => {
        setSubmitted(false);
        enqueueSnackbar(response?.data || "Successfully logged in", {
          variant: "success",
        });
      })
      .catch((err) => {
        setSubmitted(false);
        enqueueSnackbar(err.response?.data || "500 Error Sending Request", {
          variant: "success",
        });
      });
  }
}
