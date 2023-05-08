import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ArticleForm({ clicked }) {
  // to change values in form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(clicked?.title || "");
    setDescription(clicked?.description || "");
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
        {!clicked && "Add"} Article
      </Typography>
      {clicked ? (
        <Box
          component="img"
          sx={{
            m: 1,
            height: "25vh",
          }}
          src={clicked?.picture}
          alt="Article Picture"
        />
      ) : (
        <Avatar
          sx={{ m: 1, height: 125, width: 125, bgcolor: "primary.main" }}
          alt="Article Picture"
        />
      )}

      <Box
        component="form"
        onSubmit={handleLogIn}
        noValidate
        sx={{ mt: 1, width: "100%", pl: 5, pr: 5 }}
      >
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
          minRows={5}
          maxRows={10}
        />

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
