import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { LocationOn } from "@mui/icons-material";
import getURL from "../../utils/getURL";

export default function LocationCard({ data }) {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {data.name}
          </Typography>
          <Typography
            variant="subtitle4"
            color="text.secondary"
            component="div"
          >
            {data.description.split(" ").slice(0, 15).join(" ") + "..."}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            display="flex"
            alignItems="center"
          >
            <LocationOn />
            {data.location.lat + " " + data.location.lng}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100, height: "auto", minHeight: 100 }}
        image={getURL(data.picture)}
        alt="Live from space album cover"
      />
    </Card>
  );
}
