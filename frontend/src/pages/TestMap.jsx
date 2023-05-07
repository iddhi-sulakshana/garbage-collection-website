import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectMap from "../component/SelectMap";
import { useAppBarHei } from "../hooks/AppContext";

export default function TestMap() {
  const { height } = useAppBarHei();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  return (
    <Box
      sx={{
        position: "relative",
        display: { xs: "block", md: "flex" },
        width: "100%",
        height: {
          xs: `calc(100vh - ${height}px)`,
          md: `calc(100vh - ${height}px)`,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 50,
          left: 50,
          zIndex: 100,
          p: 1,
          backgroundColor: "white",
        }}
      >
        <Typography>Lan: {lat}</Typography>
        <Typography>Lng: {lng}</Typography>
      </Box>

      <SelectMap setLat={setLat} setLng={setLng} />
    </Box>
  );
}
