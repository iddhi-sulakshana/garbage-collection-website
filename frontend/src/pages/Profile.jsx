import React from "react";
import CustomThemeProvider from "../component/CustomThemeProvider";
import { useUser } from "../hooks/AppContext";
import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import Loader, { LoaderError } from "../component/Loader";

export default function Profile() {
  const { user, error, loading } = useUser();
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
              src={user?.picture}
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
                <Button variant="contained" type="submit" sx={{ mb: 2 }}>
                  Change Password
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Card>
    </CustomThemeProvider>
  );
}
