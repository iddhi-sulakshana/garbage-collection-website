import { Close, LocationOn } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

export default function LocationDetails({ location, setClicked }) {
  return (
    <Box sx={{ p: { xs: 0, md: 3 }, position: "relative" }} textAlign="center">
      <Carousel
        sx={{ height: { xs: "25vh", md: "50vh" } }}
        fullHeightHover={true}
      >
        {location.images.map((item, index) => (
          <Box
            key={index}
            component="img"
            sx={{
              width: "100%",
              height: { xs: "25vh", md: "50vh" },
              objectFit: { xs: "fit", md: "cover" },
            }}
            alt={location.name}
            src={item}
          />
        ))}
      </Carousel>
      <Typography component="div" variant="h5" sx={{ pt: 1 }}>
        {location.name}
      </Typography>
      <Typography
        variant="subtitle4"
        color="text.secondary"
        component="div"
        sx={{ pt: 1 }}
      >
        {location.description}
      </Typography>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 1 }}
      >
        <LocationOn />
        {location.location.lat + " " + location.location.lng}
      </Typography>
      <Fab
        sx={{ position: "absolute", top: { xs: 0, md: 0 }, right: 0 }}
        color="primary"
        size="small"
        aria-label="refresh"
        onClick={() => {
          setTimeout(() => {
            setClicked(null);
          }, 200);
        }}
      >
        <Close />
      </Fab>
    </Box>
  );
}
