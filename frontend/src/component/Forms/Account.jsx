import {
  Avatar,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import getURL from "../../utils/getURL";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useToken } from "../../hooks/AppContext";

export default function AccountForm({ clicked, setClicked, setRefresh }) {
  const token = useToken();
  const { enqueueSnackbar } = useSnackbar();
  // to change values in form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setName(clicked?.name || "");
    setEmail(clicked?.email || "");
    setPhone(clicked?.phone || 0);
    setAddress(clicked?.address || "");
    setRole(clicked?.role || "");
    setPassword("");
  }, [clicked]);

  const handleLogIn = (event) => {
    event.preventDefault();
    setSubmitted(true);
    let error = false;
    if (name.trim().length < 5) {
      error = true;
      enqueueSnackbar("Name should be at least have 5 characters", {
        variant: "error",
      });
    }
    if (email.trim().length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = true;
      enqueueSnackbar("Incorrect Email", { variant: "error" });
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      error = true;
      enqueueSnackbar("Phone number should be have 10 numbers", {
        variant: "error",
      });
    }
    if (address.trim().length < 5) {
      error = true;
      enqueueSnackbar("Address should be have at least 5 characters", {
        variant: "error",
      });
    }
    if (password.trim().length < 5) {
      error = true;
      enqueueSnackbar("Password should be have at least 5 characters", {
        variant: "error",
      });
    }
    if (error) return setSubmitted(false);
    axios
      .request({
        method: clicked ? "PUT" : "POST",
        url: getURL("users/admin/" + (clicked ? clicked?._id : "")),
        headers: {
          "x-auth-token": token,
        },
        data: {
          name,
          email,
          password,
          phone,
          address,
          role,
        },
      })
      .then((response) => {
        setSubmitted(false);
        setClicked(null);
        setName("");
        setEmail("");
        setPhone(0);
        setAddress("");
        setRole("");
        setPassword("");
        setRefresh((prev) => prev + 2);
        enqueueSnackbar(response.data, { variant: "success" });
      })
      .catch((err) => {
        setSubmitted(false);
        enqueueSnackbar(err.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
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
        {!clicked && "Add"} Account
      </Typography>
      <Avatar
        sx={{ m: 1, height: 125, width: 125, bgcolor: "primary.main" }}
        src={clicked?.picture && getURL(clicked?.picture)}
        alt="Profile Picture"
      />

      <Box
        component="form"
        onSubmit={handleLogIn}
        noValidate
        sx={{ mt: 1, width: "100%", pl: 5, pr: 5 }}
      >
        <Grid container spacing={2}>
          {/* name text field */}
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
          {/* email text field */}
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Grid>
          {/* phone number field */}
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
              required
              fullWidth
              name="phone"
              label="Phone"
              id="phone"
            />
          </Grid>
          {/* password text field */}
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          {/* address text field */}
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
            />
          </Grid>
          {/* role select menu */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="roleLabel">Role</InputLabel>
              <Select
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                value={role}
                labelId="demo-simple-select-label"
                id="role"
                label="Role"
              >
                <MenuItem value="gc">Green Captain</MenuItem>
                <MenuItem value="cs">Cleaning Staff</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <LoadingButton
          loading={submitted}
          loadingPosition="start"
          startIcon={<Save />}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {clicked && (submitted ? "Updating" : "Update")}
          {!clicked && (submitted ? "Creating" : "Create")}
        </LoadingButton>
      </Box>
    </Box>
  );
}
