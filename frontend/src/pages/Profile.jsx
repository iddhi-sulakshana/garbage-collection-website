import React, { useEffect, useState } from "react";
import CustomThemeProvider from "../component/CustomThemeProvider";
import { useSetRefresh, useToken, useUser } from "../hooks/AppContext";
import { Avatar, Box, Button, Card, Grid, TextField } from "@mui/material";
import Loader, { LoaderError } from "../component/Loader";
import getURL from "../utils/getURL";
import { LoadingButton } from "@mui/lab";
import { Edit, Image, Password } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function Profile() {
  const token = useToken();
  const setRefresh = useSetRefresh();
  const { user, error, loading } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const [picture, setPicture] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    fetch(getURL(user?.picture))
      .then((res) => res.blob())
      .then((blob) => {
        setPicture(blob);
      });
  }, [user]);
  return (
    <CustomThemeProvider>
      <Card
        elevation={5}
        sx={{
          minWidth: { xs: "90vw", md: "50vw" },
          minHeight: "50vh",
          maxHeight: "75vh",
          overflowY: "auto",
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
              src={picture ? URL.createObjectURL(picture) : null}
              alt="Profile Picture"
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
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  pl: { xs: 2, md: 3 },
                  pr: { xs: 2, md: 3 },
                }}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<Image />}
                      component="label"
                      fullWidth
                      variant="contained"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        name="picture"
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
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      size="small"
                      margin="normal"
                      required
                      fullWidth
                      name="name"
                      label="Name"
                      type="text"
                      id="name"
                      autoComplete="name"
                      defaultValue={user?.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      size="small"
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      autoComplete="email"
                      defaultValue={user?.email}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      size="small"
                      margin="normal"
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      type="text"
                      id="address"
                      autoComplete="address"
                      defaultValue={user?.address}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      size="small"
                      margin="normal"
                      required
                      fullWidth
                      name="phone"
                      label="Phone"
                      type="text"
                      id="phone"
                      autoComplete="phone"
                      defaultValue={user?.phone}
                    />
                  </Grid>
                </Grid>
                <LoadingButton
                  loading={submitted}
                  startIcon={<Edit />}
                  loadingPosition="start"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  {submitted ? "Changing" : "Change"}
                </LoadingButton>
              </Box>
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
  function handleSubmit(event) {
    event.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    const data = new FormData(event.currentTarget);
    axios
      .request({
        method: "PUT",
        url: getURL("users"),
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
        data,
      })
      .then((response) => {
        setSubmitted(false);
        enqueueSnackbar(response?.data || "Successfully logged in", {
          variant: "success",
        });
        setRefresh((prev) => prev + 2);
      })
      .catch((err) => {
        setSubmitted(false);
        enqueueSnackbar(err.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
      });
  }
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
