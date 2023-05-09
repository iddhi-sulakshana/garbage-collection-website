import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useToken } from "../../hooks/AppContext";
import { useSnackbar } from "notistack";
import { Delete, Image, Save } from "@mui/icons-material";
import axios from "axios";
import getURL from "../../utils/getURL";

export default function ArticleForm({ clicked, setClicked, setRefresh }) {
  const token = useToken();
  const { enqueueSnackbar } = useSnackbar();
  // to change values in form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setTitle(clicked?.title || "");
    setDescription(clicked?.description || "");
    if (clicked) {
      fetch(getURL(clicked?.picture))
        .then((res) => res.blob())
        .then((blob) => {
          setPicture(blob);
        });
    } else {
      setPicture(null);
    }
  }, [clicked]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    let error = false;
    if (title.trim().length < 5) {
      error = true;
      enqueueSnackbar("Title should be at least have 5 characters", {
        variant: "error",
      });
    }
    if (description.trim().length < 5) {
      error = true;
      enqueueSnackbar("Description should be at least have 5 characters", {
        variant: "error",
      });
    }
    if (!picture) {
      error = true;
      enqueueSnackbar("Please select a picture", {
        variant: "error",
      });
    }
    if (error) {
      setSubmitted(false);
      return;
    }
    axios
      .request({
        method: clicked ? "PUT" : "POST",
        url: getURL(`articles/${clicked ? clicked._id : ""}`),
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
        data: {
          title,
          description,
          picture,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, { variant: "success" });
        setSubmitted(false);
        setClicked(null);
        setTitle("");
        setDescription("");
        setPicture(null);
        setRefresh((prev) => prev + 2);
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
        setSubmitted(false);
      });
  };

  const handleDelete = () => {
    axios
      .request({
        method: "DELETE",
        url: getURL(`articles/${clicked._id}`),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, { variant: "success" });
        setSubmitted(false);
        setClicked(null);
        setRefresh((prev) => prev + 2);
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data || "500 Error Sending Request", {
          variant: "error",
        });
        setSubmitted(false);
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
        {!clicked && "Add"} Article
      </Typography>
      {picture ? (
        <Box
          component="img"
          sx={{
            m: 1,
            height: "25vh",
          }}
          src={URL.createObjectURL(picture)}
          alt="Article Picture"
        />
      ) : (
        <Image sx={{ m: 1, height: 125, width: 125 }} color="primary" />
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%", pl: 5, pr: 5 }}
      >
        <Button
          startIcon={<Image />}
          component="label"
          fullWidth
          variant="contained"
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return setPicture(null);
              setPicture(new Blob([file], { type: file.type }));
            }}
          />
          Select Image
        </Button>
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          required
          fullWidth
          margin="normal"
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
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            {clicked ? (
              <LoadingButton
                loading={submitted}
                loadingPosition="start"
                startIcon={<Delete />}
                onClick={handleDelete}
                fullWidth
                color="error"
                variant="contained"
              >
                {submitted ? "Deleting" : "Delete"}
              </LoadingButton>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              loading={submitted}
              loadingPosition="start"
              startIcon={<Save />}
              type="submit"
              fullWidth
              variant="contained"
            >
              {clicked && (submitted ? "Updating" : "Update")}
              {!clicked && (submitted ? "Creating" : "Create")}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
