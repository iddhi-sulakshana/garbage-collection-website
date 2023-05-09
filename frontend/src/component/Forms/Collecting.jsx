import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectMap from "../SelectMap";
import { useToken } from "../../hooks/AppContext";
import { useSnackbar } from "notistack";
import getURL from "../../utils/getURL";
import { Collections, Delete, Image, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Carousel from "react-material-ui-carousel";
import axios from "axios";

// coordinates for colombo
const center = {
  lat: 6.9271,
  lng: 79.8612,
};
export default function CollectingForm({ clicked, setClicked, setRefresh }) {
  const token = useToken();
  const { enqueueSnackbar } = useSnackbar();
  // to change values in form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [picture, setPicture] = useState(null);
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setName(clicked?.name || "");
    setDescription(clicked?.description || "");
    setLat(clicked?.location.lat || center.lat);
    setLng(clicked?.location.lng || center.lng);
    setImages([]);
    setPicture(null);
    if (clicked) {
      fetch(getURL(clicked?.picture))
        .then((res) => res.blob())
        .then((blob) => {
          setPicture(blob);
        });
      clicked.images?.map((image) => {
        fetch(getURL(image))
          .then((res) => res.blob())
          .then((blob) => {
            setImages((i) => [...i, blob]);
          });
        return null;
      });
    }
  }, [clicked]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    let error = false;
    if (name.trim().length < 5) {
      error = true;
      enqueueSnackbar("Name should be at least have 5 characters", {
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
    if (images.length === 0) {
      error = true;
      enqueueSnackbar("Please select at least one side image", {
        variant: "error",
      });
    }
    if (error) {
      setSubmitted(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("picture", picture);
    images.forEach((image) => {
      formData.append("images", image);
    });
    axios
      .request({
        method: clicked ? "PUT" : "POST",
        url: getURL(`collectings/${clicked ? clicked._id : ""}`),
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
        data: formData,
      })
      .then((res) => {
        enqueueSnackbar(res.data, {
          variant: "success",
        });
        setClicked(null);
        setName("");
        setDescription("");
        setLat(center.lat);
        setLng(center.lng);
        setImages([]);
        setPicture(null);
        setRefresh((prev) => prev + 2);
        setSubmitted(false);
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
      .delete(getURL(`collectings/${clicked._id}`), {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data, {
          variant: "success",
        });
        setClicked(null);
        setRefresh((prev) => prev + 2);
      })
      .catch((err) => {
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
        {!clicked && "Add"} Collecting Place
      </Typography>
      {picture || images.length !== 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {picture && (
              <Box
                component="img"
                sx={{
                  m: 1,
                  height: "30vh",
                }}
                src={URL.createObjectURL(picture)}
                alt="Article Picture"
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                m: 1,
                height: "30vh",
              }}
            >
              <Carousel
                sx={{
                  height: "30vh",
                  width: "100%",
                }}
                fullHeightHover={true}
              >
                {images.map((item, index) => (
                  <Box
                    key={index}
                    component="img"
                    sx={{
                      width: "100%",
                      objectFit: { xs: "fit", md: "cover" },
                    }}
                    alt={name}
                    src={URL.createObjectURL(item)}
                  />
                ))}
              </Carousel>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Image sx={{ m: 1, height: 125, width: 125 }} color="primary" />
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%", pl: 5, pr: 5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              component="label"
              fullWidth
              variant="contained"
              startIcon={<Image />}
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
              Select Cover Image
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              startIcon={<Collections />}
              component="label"
              color="info"
              fullWidth
              variant="contained"
            >
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={(e) => {
                  const newImages = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    const file = e.target.files[i];
                    if (!file) return setPicture(null);
                    newImages.push(new Blob([file], { type: file.type }));
                  }
                  setImages(newImages);
                }}
              />
              Select Images
            </Button>
          </Grid>
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
          <Grid container item xs={12} sm={6} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lat}
                required
                fullWidth
                name="location1"
                label="Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">lat</InputAdornment>
                  ),
                  readOnly: true,
                }}
                type="text"
                id="location1"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lng}
                required
                fullWidth
                name="location2"
                label="Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">lng</InputAdornment>
                  ),
                  readOnly: true,
                }}
                type="text"
                id="location2"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
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
              minRows={7}
              maxRows={7}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: { xs: 200, md: "100%" },
                mt: { xs: 0, md: 2 },
              }}
            >
              <SelectMap setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
            </Box>
          </Grid>
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
