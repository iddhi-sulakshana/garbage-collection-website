import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function AccountForm({ clicked }) {
  // to change values in form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setName(clicked?.name || "");
    setEmail(clicked?.email || "");
    setAge(clicked?.age || 0);
    setAddress(clicked?.address || "");
    setRole(clicked?.role || "");
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
        {!clicked && "Add"} Account
      </Typography>
      <Avatar
        sx={{ m: 1, height: 125, width: 125, bgcolor: "primary.main" }}
        src={clicked?.picture}
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
          {/* age number field */}
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setAge(e.target.value);
              }}
              value={age}
              required
              fullWidth
              name="age"
              label="Age"
              type="number"
              id="age"
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {clicked ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
  function validate(data) {
    return {
      status: 200,
    };
  }
}
